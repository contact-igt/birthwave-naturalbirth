import type { GoogleBusinessData, GooglePhoto, GoogleReview } from "./types";

// --- Business Profile (My Business API v4) -------------------------------

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

type BusinessProfileReview = {
  reviewId?: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string };
  starRating?: string;
  comment?: string;
  createTime?: string;
};

type BusinessProfileReviewsResponse = {
  reviews?: BusinessProfileReview[];
  averageRating?: number;
  totalReviewCount?: number;
};

export function normalizeBusinessProfileResponse(
  data: BusinessProfileReviewsResponse,
  extra: { mapsUrl: string | null; businessName: string | null }
): GoogleBusinessData {
  const reviews: GoogleReview[] = (data.reviews ?? []).map((r, i) => ({
    id: r.reviewId ?? `bp-${i}`,
    authorName: r.reviewer?.displayName ?? "Google user",
    authorPhotoUrl: r.reviewer?.profilePhotoUrl ?? null,
    rating: r.starRating ? (STAR_RATING_MAP[r.starRating] ?? 0) : 0,
    text: r.comment ?? null,
    relativeTime: null,
    createTime: r.createTime ?? null,
  }));

  return {
    businessName: extra.businessName ?? "The Birth Wave",
    rating: typeof data.averageRating === "number" ? data.averageRating : null,
    reviewCount: typeof data.totalReviewCount === "number" ? data.totalReviewCount : null,
    googleMapsUrl: extra.mapsUrl,
    reviews,
    // Business Profile media requires a separate media.list call this
    // adapter doesn't make yet (reviews are the primary signal Home needs);
    // photos come from the Places fallback when populated there instead.
    photos: [],
    source: "business_profile",
    fetchedAt: new Date().toISOString(),
  };
}

// --- Places API (New) -----------------------------------------------------

type PlacesReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  publishTime?: string;
};

type PlacesPhoto = {
  name?: string;
  authorAttributions?: { displayName?: string }[];
};

type PlacesResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  photos?: PlacesPhoto[];
};

export function normalizePlacesResponse(data: PlacesResponse): GoogleBusinessData {
  const reviews: GoogleReview[] = (data.reviews ?? []).map((r, i) => ({
    id: r.name ?? `places-${i}`,
    authorName: r.authorAttribution?.displayName ?? "Google user",
    authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
    rating: r.rating ?? 0,
    text: r.text?.text ?? null,
    relativeTime: r.relativePublishTimeDescription ?? null,
    createTime: r.publishTime ?? null,
  }));

  // Photo bytes are fetched through our own server proxy (which holds the
  // API key) rather than ever putting the key in a client-facing URL.
  const photos: GooglePhoto[] = (data.photos ?? [])
    .filter((p): p is PlacesPhoto & { name: string } => Boolean(p.name))
    .map((p) => ({
      url: `/api/google-business/photo?ref=${encodeURIComponent(p.name)}`,
      alt: p.authorAttributions?.[0]?.displayName
        ? `Photo of The Birth Wave, via Google — ${p.authorAttributions[0].displayName}`
        : "Photo of The Birth Wave, via Google",
    }));

  return {
    businessName: data.displayName?.text ?? "The Birth Wave",
    rating: typeof data.rating === "number" ? data.rating : null,
    reviewCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    googleMapsUrl: data.googleMapsUri ?? null,
    reviews,
    photos,
    source: "places",
    fetchedAt: new Date().toISOString(),
  };
}
