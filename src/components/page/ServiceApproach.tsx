import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

function ApproachIcon({ index }: { index: number }) {
  const icons = [
    // 0: Pregnancy & medical care / Stethoscope & Cross
    <svg key="0" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><path d="M9 12.5v3.5a3 3 0 0 0 6 0v-2"/><circle cx="18" cy="10" r="3"/></svg>,
    // 1: Nutrition / Leaf
    <svg key="1" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20z"/><path d="m2 21 7-7"/></svg>,
    // 2: Yoga & movement / Balance
    <svg key="2" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="m5 17 3-6 4 2 4-2 3 6"/><path d="M12 13v8"/></svg>,
    // 3: Childbirth preparation / Cradle
    <svg key="3" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    // 4: Pelvic health & recovery / Shield
    <svg key="4" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    // 5: Lactation preparation / Drop & Care
    <svg key="5" className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  ];

  return icons[index % icons.length];
}

export function ServiceApproach({
  eyebrow,
  heading,
  body,
  items,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  items: readonly { title: string; description: string }[];
}) {
  return (
    <section className="bg-cream/45 py-16 md:py-24 border-y border-border/60">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[30px] font-bold leading-tight text-ink sm:text-[34px]">
            {heading}
          </h2>
          <p className="mt-3.5 text-[16px] leading-[1.65] text-muted whitespace-pre-line">
            {body}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 60}
              className="group flex flex-col justify-between rounded-[24px] border border-border/80 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(46,36,33,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-brown/40 hover:shadow-[0_12px_32px_rgba(46,36,33,0.08)]"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-cream/70 shadow-[0_2px_8px_rgba(46,36,33,0.04)] transition-colors group-hover:border-brown/30 group-hover:bg-blush">
                  <ApproachIcon index={i} />
                </span>
                <h3 className="mt-5 font-display text-[18px] font-bold leading-snug text-ink transition-colors group-hover:text-brown">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
