// Shared, source-agnostic shape for live Google Business data — the rest of
// the app (Home's reviews section, About's photo gallery) only ever imports
// this type, never a raw Business Profile or Places API response shape.
// Every field is populated from a live API response; nothing here is ever
// hand-authored or hardcoded.

export type GoogleBusinessSource = "business_profile" | "places";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number; // 1-5
  text: string | null;
  relativeTime: string | null; // e.g. "2 weeks ago", as supplied by Google
  createTime: string | null; // ISO 8601, when the API supplies one
};

export type GooglePhoto = {
  // Always same-origin: either a Google-hosted CDN URL (Business Profile
  // media) or our own /api/google-business/photo proxy (Places photos,
  // which otherwise require the API key in the URL). Never a raw
  // places.googleapis.com URL with a key query param.
  url: string;
  alt: string;
};

export type GoogleBusinessData = {
  businessName: string;
  rating: number | null;
  reviewCount: number | null;
  googleMapsUrl: string | null;
  reviews: GoogleReview[];
  photos: GooglePhoto[];
  source: GoogleBusinessSource;
  fetchedAt: string; // ISO 8601
};
