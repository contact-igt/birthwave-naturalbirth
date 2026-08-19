import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

// No verified patient testimonials exist yet, so this stays story-ready rather
// than inventing quotes or names — but presented as finished, public-facing
// copy, not developer placeholder text.
const categories = [
  {
    label: "Pregnancy Care",
    body: "Clear guidance across scans, appointments and birth preparation.",
    image: "/images/birthwave/birthwave-prenatal-workshop.png",
    alt: "Prenatal workshop session at Birthwave",
    // Both subjects' heads sit in the top third of this square source photo —
    // the default centered crop in this wide card cuts them off entirely, so
    // this one needs an explicit top-biased focal point.
    focal: "object-[50%_12%]",
  },
  {
    label: "Birth Support",
    body: "Conversations that help patients understand preferences and options.",
    image: "/images/birthwave/birthwave-birth-partner-session.png",
    alt: "Birth partner preparation session at Birthwave",
    focal: "object-center",
  },
  {
    label: "Postpartum + Baby",
    body: "Continuity from recovery into newborn and pediatric care.",
    image: "/images/birthwave/birthwave-community-event.png",
    alt: "Birthwave community care event",
    focal: "object-center",
  },
] as const;

export function PatientExperience() {
  return (
    <section id="patient-experience" className="scroll-mt-[100px] bg-white py-14 md:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Patient Experience
          </p>
          <h2 className="mt-3 font-display text-[25px] sm:text-[30px] md:text-[35px] font-bold leading-tight text-ink">
            Trust grows when patients can see the experience, not just the treatment.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            A glimpse into how personalized, continuous care transforms every stage of your healthcare journey.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="overflow-hidden rounded-[22px] bg-cream transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(46,36,33,0.08)]">
                <div className="relative h-48 w-full">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className={`object-cover ${c.focal}`}
                  />
                </div>
                <div className="p-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
                    {c.label}
                  </p>
                  <p className="mt-3 text-[15px] font-medium leading-snug text-ink">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
