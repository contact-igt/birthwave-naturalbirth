import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

export function WhoItsFor({
  heading = "Who this may be relevant for",
  points,
}: {
  heading?: string;
  points: readonly string[];
}) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <Container>
        <h2 className="max-w-xl font-display text-[28px] font-bold leading-tight text-ink">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal
              key={point}
              as="li"
              delay={i * 60}
              className="flex items-start gap-3 rounded-2xl bg-white p-5 text-[15px] leading-relaxed text-ink/80"
            >
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue"
                aria-hidden="true"
              />
              {point}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
