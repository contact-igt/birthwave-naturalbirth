// Server-only entry point — import this from Server Components or Route
// Handlers only, never from a "use client" file (it transitively reads
// process.env secrets in businessProfile.ts / places.ts).
import type { GoogleBusinessData } from "./types";
import { fetchFromBusinessProfile } from "./businessProfile";
import { fetchFromPlaces } from "./places";

// Business Profile API is preferred (first-party, verified-owner data);
// Places API (New) is the fallback. On ANY failure — missing credentials,
// a non-2xx response, a network error — this resolves to null. There is no
// fabricated/placeholder data path: callers must render nothing when this
// returns null, per Gate C.
export async function getGoogleBusinessData(): Promise<GoogleBusinessData | null> {
  try {
    const fromBusinessProfile = await fetchFromBusinessProfile();
    if (fromBusinessProfile) return fromBusinessProfile;
  } catch (err) {
    console.error("[google-business] Business Profile adapter failed", err);
  }

  try {
    const fromPlaces = await fetchFromPlaces();
    if (fromPlaces) return fromPlaces;
  } catch (err) {
    console.error("[google-business] Places adapter failed", err);
  }

  return null;
}
