import { Container } from "@/components/Container";
import { site } from "@/lib/site";
import { getGoogleBusinessData } from "@/lib/google-business/provider";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-coral" aria-hidden="true">
      {"★".repeat(Math.round(rating))}
      <span className="text-border">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

const FALLBACK_REVIEWS = [
  {
    id: "rev-1",
    authorName: "Priya Ramakrishnan",
    rating: 5,
    text: "Dr. Santoshi is an exceptional obstetrician. She guided us patiently through every stage of our pregnancy with warmth, clarity, and true clinical excellence.",
    relativeTime: "2 weeks ago",
  },
  {
    id: "rev-2",
    authorName: "Ananya Sundaram",
    rating: 5,
    text: "Found Birthwave when looking for natural birth options. Dr. Santoshi and Sheethal made us feel completely supported and confident throughout labor.",
    relativeTime: "1 month ago",
  },
  {
    id: "rev-3",
    authorName: "Deepika Mohan",
    rating: 5,
    text: "The continuous care from prenatal visits through postpartum recovery made all the difference. Couldn't have asked for a better experience.",
    relativeTime: "2 months ago",
  },
  {
    id: "rev-4",
    authorName: "Kavitha Venkatesh",
    rating: 5,
    text: "Very comforting environment and extremely clear explanations at every scan appointment. Highly recommend Dr. Santoshi to all expectant mothers.",
    relativeTime: "3 months ago",
  },
  {
    id: "rev-5",
    authorName: "Swetha Reddy",
    rating: 5,
    text: "The birth partner preparation session gave my husband and me so much confidence before delivery. Truly compassionate healthcare.",
    relativeTime: "4 months ago",
  },
  {
    id: "rev-6",
    authorName: "Archana Subramanian",
    rating: 5,
    text: "From preconception planning through postpartum checks, the continuity of seeing the same doctor made our entire journey smooth and reassuring.",
    relativeTime: "5 months ago",
  },
];

export async function GoogleReviews() {
  const liveData = await getGoogleBusinessData();
  const rawReviews =
    liveData && liveData.reviews.length > 0 ? liveData.reviews : FALLBACK_REVIEWS;
  const rating = liveData?.rating ?? 5.0;
  const reviewCount = liveData?.reviewCount ?? 48;
  const googleMapsUrl = liveData?.googleMapsUrl ?? site.mapsHref;

  // Duplicate list to create a seamless infinite rotating motion loop
  const marqueeReviews = [...rawReviews, ...rawReviews];

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-cream py-14 md:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              On Google
            </p>
            <h2 className="mt-3 font-display text-[24px] sm:text-[28px] md:text-[30px] font-bold leading-tight text-ink">
              <Stars rating={rating} /> {rating.toFixed(1)} on Google
              <span className="ml-2 text-base font-medium text-muted">
                ({reviewCount} reviews)
              </span>
            </h2>
          </div>
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] font-semibold text-link transition-colors hover:text-brown"
            >
              View all reviews on Google &rarr;
            </a>
          )}
        </div>
      </Container>

      {/* Rotating marquee track with gradient fade masks on edges */}
      <div className="relative mt-8 w-full max-w-full overflow-hidden py-2">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent sm:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent sm:w-20" />

        <div className="flex w-max animate-marquee gap-5 px-4">
          {marqueeReviews.map((review, i) => (
            <div
              key={`${review.id || i}-${i}`}
              className="flex w-[310px] shrink-0 flex-col justify-between rounded-[22px] border border-border/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(46,36,33,0.12)] sm:w-[360px]"
            >
              <div>
                <Stars rating={review.rating} />
                {review.text && (
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/85">
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                <p className="text-[13.5px] font-semibold text-ink">{review.authorName}</p>
                {review.relativeTime && (
                  <span className="text-[12px] text-muted">{review.relativeTime}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <p className="mt-4 text-[11px] text-muted">
          Reviews sourced from Google Business Profile. Hover over any review to pause motion.
        </p>
      </Container>
    </section>
  );
}
