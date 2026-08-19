import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

const GRID_COLS = {
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-2 xl:grid-cols-5",
} as const;

export function JourneySteps({
  eyebrow,
  heading,
  intro,
  steps,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: readonly { title: string; body: string }[];
}) {
  const cols = GRID_COLS[steps.length === 5 ? 5 : 4];
  return (
    <section className="bg-brown py-16 text-white md:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-journey-eyebrow">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[32px] font-bold leading-tight text-white">
            {heading}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-border">{intro}</p>
        </div>

        <ol className={`mt-10 grid gap-3.5 ${cols}`}>
          {steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 80} className="min-h-[160px] rounded-[22px] bg-journey-card p-6">
              <span className="text-[13px] font-bold text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[16px] font-semibold text-white">
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
