import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export function PageCTA({
  eyebrow = "Ready When You Are",
  heading,
  body,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="flex min-h-[260px] items-center bg-blush py-12">
      <Container className="flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
        <div className="max-w-lg">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-[28px] font-bold leading-tight text-ink">
            {heading}
          </h2>
          <p className="mt-2 text-[16px] leading-relaxed text-muted">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3.5">
          <a
            href="#enquiry"
            className="rounded-full bg-brown px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700 shadow-[0_4px_16px_rgba(97,62,55,0.2)]"
          >
            Book an Appointment
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
          >
            Chat on WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="rounded-full border border-border bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
          >
            Call: {site.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
