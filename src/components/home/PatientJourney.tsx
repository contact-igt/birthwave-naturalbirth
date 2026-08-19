import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Find the care path that matches your concern.",
  },
  {
    n: "02",
    title: "Book",
    body: "Choose appointment or WhatsApp as the next step.",
  },
  {
    n: "03",
    title: "Consult",
    body: "Meet the right doctor with your context already understood.",
  },
  {
    n: "04",
    title: "Continue",
    body: "Receive follow up guidance and move into the next stage of care.",
  },
] as const;

export function PatientJourney() {
  return (
    <section
      id="patient-journey"
      className="scroll-mt-[100px] flex min-h-[600px] flex-col justify-center bg-brown py-16 text-white"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-journey-eyebrow">
            From First Question To Follow Up
          </p>
          <h2 className="mt-3 font-display text-[26px] sm:text-[32px] md:text-[37px] font-bold leading-tight text-white">
            A simpler care journey, with fewer gaps between steps.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-border">
            From initial guidance to treatment and post-care follow up, we support you every step of the way.
          </p>
        </div>

        <ol className="mt-10 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} as="li" delay={i * 80} className="min-h-[172px] rounded-[22px] bg-journey-card p-6">
              <span className="text-[13px] font-bold text-coral">{step.n}</span>
              <h3 className="mt-3 font-display text-[17.5px] font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-border">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
