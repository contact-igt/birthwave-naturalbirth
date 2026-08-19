import { NextRequest, NextResponse } from "next/server";

// Streams a Places API (New) photo server-side so the Places API key never
// appears in a client-facing URL (Gate C: "secrets server-side only").
// `ref` is the photo resource name Places returned, e.g.
// "places/ChIJ.../photos/AUy1...".
export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!ref || !ref.startsWith("places/") || !apiKey) {
    return new NextResponse(null, { status: 404 });
  }

  const upstream = await fetch(
    `https://places.googleapis.com/v1/${ref}/media?maxWidthPx=800&key=${apiKey}`,
    { next: { revalidate: 2400 } } // matches the 30-60 min provider cache window
  );

  if (!upstream.ok || !upstream.body) {
    return new NextResponse(null, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=2400",
    },
  });
}
