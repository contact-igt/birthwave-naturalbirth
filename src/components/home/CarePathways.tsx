import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

const pathways = [
  {
    n: "01",
    bg: "bg-blush",
    accentBorder: "group-hover:border-rose/40",
    title: "Planning a pregnancy",
    body: "Fertility, preconception and cycle guidance for your starting chapter.",
    link: "Fertility & Preconception",
    href: "/fertility-preconception",
    image: "/images/birthwave/birthwave-prenatal-workshop.png",
    alt: "Planning a pregnancy counseling at Birthwave",
  },
  {
    n: "02",
    bg: "bg-sky",
    accentBorder: "group-hover:border-blue/40",
    title: "I’m pregnant",
    body: "Antenatal care, scans, birth planning and continuous clinical support.",
    link: "Pregnancy & Antenatal Care",
    href: "/pregnancy-antenatal-care",
    image: "/images/birthwave/birthwave-antenatal-movement-coaching.png",
    alt: "Antenatal movement coaching and care",
  },
  {
    n: "03",
    bg: "bg-sand",
    accentBorder: "group-hover:border-brown/40",
    title: "I want natural birth",
    body: "Normal birth preparation, VBAC guidance and birth partner readiness.",
    link: "Natural Birth",
    href: "/natural-birth",
    image: "/images/birthwave/birthwave-birth-position-practice.png",
    alt: "Birth options and positioning practice",
  },
  {
    n: "04",
    bg: "bg-pink",
    accentBorder: "group-hover:border-rose/40",
    title: "I need women’s care",
    body: "Gynaecology, vaginismus treatment, pelvic wellness and holistic support.",
    link: "Gynaecology & Wellness",
    href: "/gynaecology",
    image: "/images/birthwave/birthwave-childbirth-workshop-01.png",
    alt: "Women's wellness and education session",
  },
] as const;

export function CarePathways() {
  return (
    <section id="care-pathways" className="relative overflow-hidden scroll-mt-[100px] bg-white py-16 md:py-[96px]">
      {/* Decorative background flourish accents */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blush/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-sky/50 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Start With Your Need
          </p>
          <h2 className="mt-3 font-display text-[36px] font-bold leading-tight text-ink md:text-[40px]">
            Start with what you need today.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            Choose a care path and reach the right service without searching through
            the whole website.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pathways.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <Link
                href={p.href}
                className="group relative flex min-h-[380px] h-full flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(46,36,33,0.25)] border border-white/20"
              >
                {/* Background Image */}
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for optimal readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/65 to-black/35 transition-opacity duration-300 group-hover:from-ink/90 group-hover:via-ink/60"
                  aria-hidden="true"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[13px] font-extrabold text-coral shadow-md backdrop-blur-md">
                    {p.n}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 mt-auto pt-16">
                  <h3 className="font-display text-[21px] font-bold text-white transition-colors group-hover:text-blush">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/85">
                    {p.body}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-[14px] font-semibold text-rose-200 group-hover:text-white transition-colors">
                    <span>{p.link}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
