import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { LineArtIllustration, type LineArtVariant } from "@/components/illustrations/LineArt";
import { site } from "@/lib/site";

const ACCENT = {
  rose: "text-rose",
  blue: "text-blue",
  coral: "text-coral",
} as const;

const ACCENT_BG = {
  rose: "bg-blush",
  blue: "bg-sky",
  coral: "bg-pink",
} as const;

// Soft overlapping colour-field, echoing the Home hero's visual language,
// so illustration-led heroes (no real photo available) feel as complete as
// photo-led ones rather than a small icon floating in a flat colour box.
const ACCENT_BLOBS = {
  rose: ["bg-rose/25", "bg-brown/10", "bg-blue/15"],
  blue: ["bg-blue/25", "bg-rose/15", "bg-brown/10"],
  coral: ["bg-coral/20", "bg-rose/20", "bg-blue/10"],
} as const;

export function PageHero({
  eyebrow,
  heading,
  intro,
  accent = "rose",
  image,
  illustration,
  bookHref = "#contact-form",
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  accent?: keyof typeof ACCENT;
  image?: { src: string; alt: string; objectPosition?: string };
  illustration?: LineArtVariant;
  bookHref?: string;
}) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <Container className="grid items-center gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:gap-16">
        <div>
          <p
            className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${ACCENT[accent]}`}
          >
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-[28px] sm:text-[38px] md:text-[46px] font-bold leading-[1.1] text-ink">
            {heading}
          </h1>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.6] text-muted">{intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={bookHref}
              className="rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700"
            >
              Book an Appointment
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>

        <div
          className={`relative mx-auto flex h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-[32px] ${ACCENT_BG[accent]} p-3.5 sm:h-[460px] sm:p-4`}
        >
          {image ? (
            <div className="relative h-full w-full overflow-hidden rounded-[24px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 500px, 90vw"
                className={`object-cover ${image.objectPosition ?? "object-top"}`}
                priority
              />
            </div>
          ) : (
            <>
              <div
                className={`absolute -left-8 top-10 h-52 w-52 rounded-full ${ACCENT_BLOBS[accent][0]}`}
                aria-hidden="true"
              />
              <div
                className={`absolute right-0 top-0 h-40 w-40 rounded-full ${ACCENT_BLOBS[accent][1]}`}
                aria-hidden="true"
              />
              <div
                className={`absolute bottom-0 right-6 h-48 w-48 rounded-full ${ACCENT_BLOBS[accent][2]}`}
                aria-hidden="true"
              />
              <LineArtIllustration
                variant={illustration ?? "pregnancy"}
                className="relative h-64 w-64 opacity-90 sm:h-72 sm:w-72"
              />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
