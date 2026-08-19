import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { services, type ServiceContent } from "@/lib/services";

export function RelatedSupport({
  currentSlug,
  connectedCare,
}: {
  currentSlug: string;
  connectedCare?: ServiceContent["connectedCare"];
}) {
  const cards = connectedCare
    ? connectedCare.cards
    : services
        .filter((s) => s.slug !== currentSlug)
        .slice(0, 3)
        .map((s) => ({
          title: s.title,
          description: s.shortDescription,
          href: `/${s.slug}`,
          ctaText: "Learn more",
        }));

  const eyebrow = connectedCare?.eyebrow ?? "RELATED CARE";
  const heading = connectedCare?.heading ?? "Related Birthwave support";
  const intro = connectedCare?.intro;

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[32px] font-bold leading-tight text-ink">
            {heading}
          </h2>
          {intro && (
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {cards.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 60}
              className="group flex flex-col justify-between rounded-[22px] border border-border/80 bg-cream/40 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40 hover:bg-white hover:shadow-[0_12px_32px_rgba(46,36,33,0.08)]"
            >
              <div>
                <h3 className="font-display text-[18px] font-bold text-ink transition-colors group-hover:text-brown">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-link transition-colors group-hover:text-brown"
              >
                {item.ctaText} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
