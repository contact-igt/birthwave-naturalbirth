import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

const services = [
  {
    title: "Pregnancy & Antenatal Care",
    description:
      "Routine and high touch pregnancy care with a clear plan for each trimester.",
    href: "/pregnancy-antenatal-care",
  },
  {
    title: "Fertility & Preconception",
    description: "Evaluation, counselling and planning before pregnancy.",
    href: "/fertility-preconception",
  },
  {
    title: "Normal Birth & VBAC Support",
    description:
      "Personalised discussions around birth preferences, eligibility and preparation.",
    href: "/normal-birth-delivery",
  },
  {
    title: "Gynaecology & Women’s Wellness",
    description: "Care for menstrual, hormonal and common gynaecological concerns.",
    href: "/gynaecology",
  },
  {
    title: "Vaginismus & Intimate Wellness",
    description:
      "Private, sensitive support for pain, fear and intimacy related concerns.",
    href: "/vaginismus",
  },
  {
    title: "Newborn & Pediatric Care",
    description:
      "Newborn review, vaccination guidance and continuing pediatric care.",
    href: "/newborn-pediatric-care",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-[100px] bg-cream py-16 md:py-[110px]">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Care Across Every Chapter
          </p>
          <h2 className="mt-3 font-display text-[26px] sm:text-[32px] md:text-[38px] font-bold leading-tight text-ink">
            Specialist care, designed around your journey.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            Comprehensive, doctor-led clinical services tailored to your individual health and wellness needs.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 80}>
              <div className="flex min-h-[222px] flex-col rounded-[22px] border border-border bg-white p-6 shadow-[0_1px_2px_rgba(46,36,33,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(46,36,33,0.08)]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-coral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-coral" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-[17.5px] font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-link transition-colors hover:text-brown"
                >
                  Explore service
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

