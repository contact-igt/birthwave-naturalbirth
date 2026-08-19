import Image from "next/image";
import { Container } from "@/components/Container";
import { getGoogleBusinessData } from "@/lib/google-business/provider";

// Live photos from the practice's Google Business Profile — server
// component, fetched at render time. Renders nothing when credentials
// aren't configured, the API call fails, or Google simply has no photos
// for this listing (Gate C: no placeholder in place of live data).
export async function GoogleGallery() {
  const data = await getGoogleBusinessData();
  if (!data || data.photos.length === 0) return null;

  const photos = data.photos.slice(0, 6);

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-[28px] font-bold leading-tight text-ink">
            More from Google
          </h2>
          {data.googleMapsUrl && (
            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-link"
            >
              See on Google &rarr;
            </a>
          )}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {photos.map((photo) => (
            <figure key={photo.url} className="overflow-hidden rounded-[22px] bg-cream">
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-[10.5px] text-muted">Photos sourced live from Google.</p>
      </Container>
    </section>
  );
}
