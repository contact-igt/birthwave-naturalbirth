// Server-only module — reads process.env secrets directly, so it must never
// be imported from a "use client" component (no `server-only` package is
// installed in this project; this comment plus the directory convention is
// the guard, matching how src/lib/leads/sinks already does this).
import type { GoogleBusinessData } from "./types";
import { normalizeBusinessProfileResponse } from "./normalize";

// Server-only adapter for Google's Business Profile APIs — the preferred
// source because it's first-party, verified-owner data (not a third-party
// read via Places). Required config, none of which exists in this project
// yet (confirmed: no .env file, no credentials anywhere in the repo):
//
//   GOOGLE_BUSINESS_ACCOUNT_ID     — "accounts/{id}" resource, from the
//                                    Business Profile the practice manages
//   GOOGLE_BUSINESS_LOCATION_ID    — "locations/{id}" resource for the
//                                    Nungambakkam clinic
//
// Auth (OAuth 2.0 — Business Profile APIs do not accept a plain API key):
//   GOOGLE_BUSINESS_REFRESH_TOKEN  — long-lived, from the one-time OAuth
//                                    consent grant by the verified owner
//   GOOGLE_BUSINESS_CLIENT_ID
//   GOOGLE_BUSINESS_CLIENT_SECRET
//
// (GOOGLE_BUSINESS_ACCESS_TOKEN may be set directly for local testing, but
// access tokens expire in ~1 hour — the refresh-token flow above is what a
// real deployment should rely on.)
//
// This file never fabricates a response when config is missing or a call
// fails — it returns null, and the caller (provider.ts) falls back to the
// Places API adapter.

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
// The reviews resource is still served by the legacy "My Business API" v4
// host — as of writing, Google has not moved review reads into the newer
// split Business Profile APIs (Account Management / Business Information /
// Performance). This is the documented, current endpoint for review data.
const MYBUSINESS_V4 = "https://mybusiness.googleapis.com/v4";
// Business Information API (v1) supplies the public-facing Maps URL.
const BUSINESS_INFO_V1 = "https://mybusinessbusinessinformation.googleapis.com/v1";

async function getAccessToken(): Promise<string | null> {
  const direct = process.env.GOOGLE_BUSINESS_ACCESS_TOKEN;
  if (direct) return direct;

  const refreshToken = process.env.GOOGLE_BUSINESS_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_BUSINESS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_BUSINESS_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) return null;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    // Tokens are short-lived; never cache the mint request itself.
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function fetchFromBusinessProfile(): Promise<GoogleBusinessData | null> {
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;
  if (!accountId || !locationId) return null;

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const authHeaders = { Authorization: `Bearer ${accessToken}` };
  // 30-60 min server-side cache, per Gate C — Next.js's fetch cache handles
  // this declaratively without any extra in-memory state.
  const cacheOpts = { next: { revalidate: 2400 } }; // 40 minutes

  const reviewsRes = await fetch(
    `${MYBUSINESS_V4}/accounts/${accountId}/locations/${locationId}/reviews`,
    { headers: authHeaders, ...cacheOpts }
  );
  if (!reviewsRes.ok) return null;
  const reviewsData = await reviewsRes.json();

  // Maps URL is a non-fatal enrichment — if this call fails, still return
  // real review data with googleMapsUrl left null.
  let mapsUrl: string | null = null;
  let businessName: string | null = null;
  try {
    const infoRes = await fetch(
      `${BUSINESS_INFO_V1}/locations/${locationId}?readMask=title,metadata`,
      { headers: authHeaders, ...cacheOpts }
    );
    if (infoRes.ok) {
      const info = await infoRes.json();
      mapsUrl = info?.metadata?.mapsUri ?? null;
      businessName = info?.title ?? null;
    }
  } catch {
    // Non-fatal — reviews are the primary data this adapter exists for.
  }

  return normalizeBusinessProfileResponse(reviewsData, { mapsUrl, businessName });
}
