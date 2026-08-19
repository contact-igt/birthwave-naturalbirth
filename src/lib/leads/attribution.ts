"use client";

import type { LeadAttribution } from "./types";

// Minimal first-party attribution: first-touch campaign context (source/
// campaign/creative/UTMs/click ids) is captured once and kept in
// localStorage for the lifetime of the browser profile — no fingerprinting,
// no third-party cookies. Landing page and referrer always reflect the
// CURRENT page, since that's genuinely where this enquiry came from.
const STORAGE_KEY = "birthwave_first_touch";

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

function inferSource(params: URLSearchParams, referrer: string): string | null {
  const utmSource = params.get("utm_source");
  if (utmSource) return utmSource;
  if (params.get("gclid")) return "Google";
  if (params.get("fbclid")) return "Meta";
  if (referrer && !referrer.includes(window.location.hostname)) {
    try {
      return new URL(referrer).hostname.replace(/^www\./, "");
    } catch {
      return "Referral";
    }
  }
  return referrer ? "Referral" : "Organic";
}

function captureFromCurrentUrl(): StoredTouch {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  return {
    source: inferSource(params, referrer),
    campaign: params.get("utm_campaign"),
    creative: params.get("utm_content"),
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    gclid: params.get("gclid"),
    fbclid: params.get("fbclid"),
  };
}

function readStoredTouch(): StoredTouch | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredTouch) : null;
  } catch {
    return null;
  }
}

function writeStoredTouch(touch: StoredTouch) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
  } catch {
    // localStorage unavailable (private mode etc.) — attribution just won't
    // persist across visits; current-page attribution below still works.
  }
}

/** Call once when the app mounts — persists first-touch if not already set. */
export function ensureFirstTouchCaptured() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const hasCampaignParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ].some((k) => params.has(k));

  const existing = readStoredTouch();
  if (!existing || hasCampaignParams) {
    // First visit ever, OR arriving with fresh campaign params on a later
    // visit — either way, this is a real touch worth recording. We keep
    // whichever touch is the FIRST one seen (don't overwrite silently)
    // unless this visit actually carries campaign params.
    if (!existing || hasCampaignParams) {
      writeStoredTouch(captureFromCurrentUrl());
    }
  }
}

/** Build the attribution payload for a form submission on the current page. */
export function getAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      source: null,
      campaign: null,
      creative: null,
      channel: "Form",
      landing_page: "/",
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }

  const stored = readStoredTouch() ?? captureFromCurrentUrl();

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
