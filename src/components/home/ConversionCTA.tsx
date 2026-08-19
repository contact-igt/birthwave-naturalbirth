import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function ConversionCTA() {
  return (
    <section
      id="conversion-cta"
      className="scroll-mt-[100px] flex min-h-[300px] items-center bg-blush py-12"
    >
      <Reveal className="w-full">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-lg">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              Need Help Choosing?
            </p>
            <h2 className="mt-2 font-display text-[31px] font-bold leading-tight text-ink">
              Not sure which service to choose?
            </h2>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">
              Tell us what you need help with. We&rsquo;ll guide you to the right
              appointment pathway.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <a
              href="#enquiry"
              className="rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700"
            >
              Book Appointment
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
