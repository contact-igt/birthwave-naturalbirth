"use client";

import type { LeadAttribution } from "./types";

// First-touch campaign attribution, resolved the same way as the VLS lead
// pipeline: campaign params win, then Google/Meta click ids, then the
// referring hostname, then "direct". Values are never left empty — a lead
// with no campaign context is recorded as source "direct" / medium "none".
// The first resolved touch is persisted in localStorage for the browser
// profile's lifetime; a later visit carrying fresh campaign params replaces it.
const STORAGE_KEY = "birthwave_first_touch_v3";

type StoredTouch = {
  source: string | null;
  campaign: string | null;
  creative: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
};

// Short campaign codes → canonical host (as used across the VLS forms).
const UTM_SOURCE_MAP: Record<string, string> = {
  fb: "facebook.com",
  ig: "instagram.com",
  insta: "instagram.com",
  meta: "facebook.com",
  yt: "youtube.com",
  li: "linkedin.com",
  tw: "twitter.com",
  x: "twitter.com",
  gads: "google.com",
  google: "google.com",
  googleads: "google.com",
};

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const isDirect = (value: string): boolean =>
  !value || value === "direct" || value.includes("localhost") || value.includes("127.0.0.1");

// Friendly label for the admin "Source" column.
const toSourceLabel = (utmSource: string): string => {
  const s = utmSource.toLowerCase();
  if (isDirect(s)) return "Direct";
  if (s.includes("google")) return "Google";
  if (s.includes("facebook") || s.includes("instagram")) return "Meta";
  if (s.includes("youtube")) return "YouTube";
  if (s.includes("linkedin")) return "LinkedIn";
  if (s.includes("twitter") || s === "x.com" || s === "t.co") return "Twitter/X";
  if (s === "organic" || s === "none") return "Organic";
  return utmSource; // a referring hostname
};

function resolveTouch(): StoredTouch {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";

  let utm_source = params.get("utm_source");
  if (utm_source) {
    utm_source = UTM_SOURCE_MAP[utm_source.toLowerCase()] || utm_source;
  } else if (params.get("gclid")) {
    utm_source = "google.com";
  } else if (params.get("fbclid")) {
    utm_source = "facebook.com";
  } else if (referrer) {
    try {
      utm_source = new URL(referrer).hostname.replace(/^www\./, "");
    } catch {
      utm_source = "direct";
    }
  } else {
    utm_source = "direct";
  }

  let utm_medium = params.get("utm_medium");
  let utm_campaign = params.get("utm_campaign");
  let utm_content = params.get("utm_content");
  let utm_term = params.get("utm_term");

  if (isDirect(utm_source.toLowerCase())) {
    utm_source = "direct";
    utm_medium = "none";
    utm_campaign = "none";
    utm_content = "none";
    utm_term = "none";
  } else {
    utm_medium =
      utm_medium ||
      (params.get("gclid") ? "cpc" : params.get("fbclid") ? "paid-social" : "referral");
    utm_campaign = utm_campaign || "none";
    utm_content = utm_content || "none";
    utm_term = utm_term || "none";
  }

  return {
    source: toSourceLabel(utm_source),
    campaign: utm_campaign,
    creative: utm_content,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    gclid: params.get("gclid"),
    fbclid: params.get("fbclid"),
  };
}

function readStored(): StoredTouch | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredTouch>;
    // A valid touch always carries a resolved (never-null) utm_source.
    if (!parsed || typeof parsed.utm_source !== "string" || !parsed.utm_source) return null;
    return parsed as StoredTouch;
  } catch {
    return null;
  }
}

function writeStored(touch: StoredTouch): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
  } catch {
    // localStorage unavailable (private mode etc.) — current-page resolution
    // in getAttribution() still works, it just won't persist across visits.
  }
}

/** Call once when the app/form mounts — persists first-touch if not already set. */
export function ensureFirstTouchCaptured(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const hasCampaignParams = CAMPAIGN_KEYS.some((k) => params.has(k));
  const existing = readStored();
  if (!existing || hasCampaignParams) {
    writeStored(resolveTouch());
  }
}

/** Build the attribution payload for a form submission on the current page. */
export function getAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      source: "Direct",
      campaign: "none",
      creative: "none",
      channel: "Form",
      landing_page: "/",
      referrer: null,
      utm_source: "direct",
      utm_medium: "none",
      utm_campaign: "none",
      utm_content: "none",
      utm_term: "none",
      gclid: null,
      fbclid: null,
    };
  }

  const stored = readStored() ?? resolveTouch();

  return {
    source: stored.source,
    campaign: stored.campaign,
    creative: stored.creative,
    channel: "Form",
    landing_page: window.location.pathname,
    referrer: document.referrer || null,
    utm_source: stored.utm_source,
    utm_medium: stored.utm_medium,
    utm_campaign: stored.utm_campaign,
    utm_content: stored.utm_content,
    utm_term: stored.utm_term,
    gclid: stored.gclid,
    fbclid: stored.fbclid,
  };
}
