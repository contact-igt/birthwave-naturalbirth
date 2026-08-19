import Image from "next/image";
import { Container } from "@/components/Container";

const trustPoints = ["Pregnancy & birth", "Women's wellness", "Newborn & pediatric"];

export function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-[100px] flex min-h-[680px] items-center bg-cream py-14 md:py-16"
    >
      <Container className="grid items-center gap-12 xl:grid-cols-[1.02fr_0.98fr] xl:gap-14">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Women&rsquo;s Health &bull; Pregnancy &bull; Newborn Care
          </p>
          <h1 className="mt-4 max-w-[560px] font-display text-[34px] sm:text-[44px] md:text-[52px] font-bold leading-[1.1] text-ink">
            Care that sees the whole woman &mdash; before, during and after birth.
          </h1>

          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-1.5 text-[13px] font-medium text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full border border-rose" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-[540px] text-[17px] leading-[1.58] text-muted">
            From fertility and pregnancy to birth preparation, postpartum recovery and
            newborn care, Birthwave brings your care journey together with clarity,
            warmth and clinical guidance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#conversion-cta"
              className="rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700"
            >
              Book an Appointment
            </a>
            <a
              href="#services"
              className="rounded-full border border-border bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
            >
              Explore Our Care
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[520px]">
          <div
            className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue/20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 overflow-hidden rounded-[34px] bg-blush shadow-[0_20px_60px_rgba(97,62,55,0.15)]">
            <Image
              src="/images/clinic.JPG"
              alt="The Birth Wave clinic space in Nungambakkam, Chennai"
              fill
              sizes="(min-width: 1280px) 520px, 90vw"
              className="object-cover object-top"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/50 to-transparent"
              aria-hidden="true"
            />
            <Image
              src="/images/hero-flourish-left.png"
              alt=""
              width={233}
              height={236}
              className="absolute right-4 top-4 h-20 w-20 opacity-90"
            />
          </div>

          <div className="absolute bottom-6 left-6 right-6 rounded-[20px] bg-white p-5 shadow-[0_8px_24px_rgba(46,36,33,0.1)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-rose">
              Your Care Journey
            </p>
            <p className="mt-1.5 font-display text-base font-bold text-ink">
              One place for every chapter
            </p>
            <p className="mt-1 text-[12.5px] text-muted">
              Fertility &bull; Pregnancy &bull; Birth &bull; Postpartum &bull; Baby
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
