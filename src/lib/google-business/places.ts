// Server-only module — reads process.env secrets directly, so it must never
// be imported from a "use client" component.
import type { GoogleBusinessData } from "./types";
import { normalizePlacesResponse } from "./normalize";

// Fallback adapter using Places API (New) — used only when the Business
// Profile adapter isn't configured or fails. Required config, absent from
// this project today:
//
//   GOOGLE_PLACES_API_KEY  — a Places API (New) key, restricted server-side
//   GOOGLE_PLACE_ID        — the clinic's Place ID (from Google Maps /
//                            the Places API "Find Place" tool)
//
// Uses the official places.googleapis.com/v1 endpoint only — no scraping
// of maps.google.com or any unofficial surface.

const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
  "photos",
].join(",");

export async function fetchFromPlaces(): Promise<GoogleBusinessData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    // 30-60 min server-side cache, per Gate C.
    next: { revalidate: 2400 }, // 40 minutes
  });

  if (!res.ok) return null;
  const data = await res.json();
  return normalizePlacesResponse(data);
}
