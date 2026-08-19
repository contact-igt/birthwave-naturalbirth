"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

// Questions are locked to the approved PDF. The PDF export only captured the
// collapsed question rows (no answer text) — answers below are minimal, factual,
// logistics-only copy needed to make the accordion functional. Flagged for
// human review; no outcomes/claims are asserted.
const faqs = [
  {
    q: "When should I first visit during pregnancy?",
    a: "As soon as you have a positive test or missed period — an early visit helps confirm dates and plan your antenatal schedule.",
  },
  {
    q: "Can I discuss normal birth or VBAC options with the doctor?",
    a: "Yes — birth preferences, including VBAC eligibility, are discussed as part of your antenatal visits.",
  },
  {
    q: "Does Birthwave support fertility and preconception concerns?",
    a: "Yes, fertility, preconception counselling and cycle guidance are part of our care pathways.",
  },
  {
    q: "Can I continue newborn and pediatric care after delivery?",
    a: "Yes — newborn review and continuing pediatric care are available after delivery.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-[100px] bg-cream py-16 md:py-[72px]">
      <Container className="max-w-4xl">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Before You Book
          </p>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-ink">
            Questions patients often have before they book.
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
                  aria-controls={`faq-panel-${i}`}
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
                  id={`faq-panel-${i}`}
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
