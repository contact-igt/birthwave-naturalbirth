"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

export function PageFAQ({
  eyebrow = "Before You Book",
  heading,
  faqs,
}: {
  eyebrow?: string;
  heading: string;
  faqs: readonly { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-[100px] bg-cream py-16 md:py-20">
      <Container className="max-w-3xl">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[30px] font-bold leading-tight text-ink">
            {heading}
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal
                key={item.q}
                delay={i * 60}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`page-faq-panel-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex min-h-[62px] w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-base font-medium text-ink">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush text-rose transition-transform duration-200 ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1v14M1 8h14"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`page-faq-panel-${i}`}
                  className={`grid overflow-hidden text-[15px] leading-relaxed text-muted transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className={`min-h-0 overflow-hidden px-6 ${open ? "pb-4" : "pb-0"}`}>
                    {item.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
