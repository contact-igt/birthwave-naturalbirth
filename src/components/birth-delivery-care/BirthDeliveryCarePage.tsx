"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/page/PageHero";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import { TeamAvatar } from "@/components/TeamAvatar";
import { VideoExperience } from "@/components/home/VideoExperience";
import { site } from "@/lib/site";
import { getTeamMember } from "@/lib/team";

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-coral" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function SectionIcon({ type }: { type: string }) {
  switch (type) {
    case "labour":
    case "pulse":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
    case "planning":
    case "document":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case "breathing":
    case "wind":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>;
    case "movement":
    case "yoga":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="m5 17 3-6 4 2 4-2 3 6"/><path d="M12 13v8"/></svg>;
    case "partner":
    case "heart":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
    case "education":
    case "book":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>;
    case "pelvic":
    case "shield":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "nutrition":
    case "leaf":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20z"/><path d="m2 21 7-7"/></svg>;
    case "emotional":
    case "sun":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
    case "lactation":
    case "drop":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
    case "medical":
    case "stethoscope":
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><path d="M9 12.5v3.5a3 3 0 0 0 6 0v-2"/><circle cx="18" cy="10" r="3"/></svg>;
    default:
      return <svg className="h-5 w-5 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  }
}

const faqsData = [
  {
    q: "What is natural birth?",
    a: "Natural birth generally refers to an approach to labour and vaginal birth that aims to allow labour to progress naturally with minimal medical intervention when clinically appropriate.\n\nWomen may prepare using breathing and relaxation techniques, movement, comfortable positions, childbirth education and support from their birth partner and care team.\n\nYour individual pregnancy, health, preferences and clinical circumstances are considered when discussing your birth options.",
  },
  {
    q: "What is the difference between natural birth and normal vaginal delivery?",
    a: "Both can involve giving birth vaginally.\n\nNatural birth usually refers to an approach that aims for minimal medical intervention where appropriate, with greater emphasis on preparation, movement, breathing, relaxation and other supportive methods during labour.\n\nNormal vaginal delivery refers more broadly to the baby being delivered vaginally. Pain-relief options and other appropriate obstetric interventions may also be used depending on the woman’s preferences and clinical needs.\n\nYour obstetrician can explain which options are relevant to your individual pregnancy.",
  },
  {
    q: "When should I start preparing for natural birth?",
    a: "Birth preparation can begin during pregnancy rather than waiting until labour starts.\n\nAntenatal preparation gives you time to understand the stages of labour, discuss your birth preferences, learn breathing and relaxation techniques, explore movement and positioning, prepare your birth partner and ask questions about childbirth.\n\nThe timing and type of preparation can be personalized according to your stage of pregnancy and individual needs.",
  },
  {
    q: "Can I use pain relief if I originally planned for a natural birth?",
    a: "Yes. Your preferences around pain relief can be discussed during pregnancy and again during labour.\n\nThere are both non-medical and medical options for managing labour pain. What you choose can depend on your preferences, how labour progresses and your individual clinical circumstances.\n\nChoosing pain relief does not take away from the importance of being informed, supported and involved in decisions about your birth.",
  },
  {
    q: "Does Birthwave provide yoga, nutrition and birth preparation along with pregnancy care?",
    a: "Birthwave’s approach brings medical pregnancy care together with supportive services around pregnancy, childbirth and recovery.\n\nDepending on your individual needs and the services appropriate for your pregnancy, this may include pregnancy yoga and movement, nutrition guidance, childbirth education, birth-partner preparation, pelvic health support, lactation support and postpartum recovery.\n\nThis allows different aspects of pregnancy and birth preparation to be connected within your overall care journey.",
  },
  {
    q: "What does holistic natural birth preparation mean?",
    a: "Holistic preparation means looking beyond the day of delivery and considering the different aspects that can influence a woman’s experience of pregnancy and childbirth.\n\nAt Birthwave, this may include medical pregnancy care, childbirth education, physical preparation, movement, nutrition, emotional wellbeing, birth-partner involvement and postpartum preparation based on each woman’s individual needs.",
  },
];

export function BirthDeliveryCarePage() {
  const santoshi = getTeamMember("santoshi-nandigam")!;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <main>
      {/* SECTION 1: Page Hero */}
      <PageHero
        eyebrow="NATURAL BIRTH CARE IN CHENNAI"
        heading="Prepare for a natural birth with confidence, knowledge and the right support."
        intro="At Birthwave, natural birth preparation begins during pregnancy. We help you understand labour, prepare your body and mind, explore your birth preferences, and approach childbirth with personalised obstetric care and holistic support."
        accent="coral"
        image={{
          src: "/images/birthwave/birthwave-childbirth-workshop-01.png",
          alt: "Birth preparation workshop at Birthwave",
        }}
        illustration="birth"
      />

      {/* SECTION 2: Understanding Natural Birth */}
      <section id="understanding" className="scroll-mt-[100px] bg-white py-16 md:py-20 border-b border-border/60">
        <Container className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Understanding Natural Birth
          </p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
            What is Natural Birth?
          </h2>
          <div className="mt-5 space-y-4 text-[16px] leading-[1.7] text-muted">
            <p>
              Natural birth is a way of giving birth vaginally while allowing labour to progress as naturally as possible, with less medical intervention when it is safe and appropriate.
            </p>
            <p>
              During labour, a mother may use breathing and relaxation techniques, walking or changing positions, gentle movement, massage, and physical and emotional support to help her stay comfortable and cope with contractions. These approaches are recognised in childbirth guidance as options that can support women during labour.
            </p>
            <p>
              At Birthwave, preparation for natural birth begins during pregnancy. We help you understand what happens during labour, practise ways to stay calm and comfortable, prepare your body and mind, and discuss your birth preferences with your doctor.
            </p>
            <p className="font-medium text-ink/85">
              Throughout your pregnancy and birth, your care is personalised around you, your baby and how your pregnancy and labour progress.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 3: CLEARING UP A COMMON QUESTION */}
      <section id="comparison" className="scroll-mt-[100px] bg-cream/40 py-16 md:py-24 border-b border-border/60">
        <Container>
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              Clearing Up A Common Question
            </p>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
              Natural birth and normal vaginal delivery — are they the same?
            </h2>
            <p className="mt-3.5 text-[16px] leading-[1.65] text-muted">
              Both may result in a baby being born vaginally, but the terms are often used differently when discussing the approach to labour.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Card 1: Natural Birth */}
            <Reveal className="flex flex-col rounded-[26px] border border-border/90 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(46,36,33,0.04)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blush px-3.5 py-1 text-[12px] font-semibold uppercase tracking-wider text-rose">
                Focused Preparation
              </span>
              <h3 className="mt-4 font-display text-[22px] font-bold text-ink">
                Natural Birth
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Natural birth usually describes an approach where a woman wishes to experience labour with minimal medical intervention when appropriate. Preparation and support may include:
              </p>
              <ul className="mt-5 space-y-3 border-t border-border/60 pt-5">
                <li className="flex items-start gap-3 text-[14.5px] text-ink/85">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-brown">✓</span>
                  <div><strong className="font-semibold text-ink">Breathing &amp; relaxation:</strong> Techniques to help you stay calm and work through contractions.</div>
                </li>
                <li className="flex items-start gap-3 text-[14.5px] text-ink/85">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-brown">✓</span>
                  <div><strong className="font-semibold text-ink">Movement &amp; positioning:</strong> Using comfortable positions and movement during labour where appropriate.</div>
                </li>
                <li className="flex items-start gap-3 text-[14.5px] text-ink/85">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-brown">✓</span>
                  <div><strong className="font-semibold text-ink">Non-medical comfort measures:</strong> Gentle techniques to aid natural comfort.</div>
                </li>
                <li className="flex items-start gap-3 text-[14.5px] text-ink/85">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-brown">✓</span>
                  <div><strong className="font-semibold text-ink">Continuous support:</strong> Emotional and practical support from your team and birth partner.</div>
                </li>
              </ul>
            </Reveal>

            {/* Card 2: Normal Vaginal Delivery */}
            <Reveal delay={80} className="flex flex-col rounded-[26px] border border-border/90 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(46,36,33,0.04)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3.5 py-1 text-[12px] font-semibold uppercase tracking-wider text-brown">
                Clinical Overview
              </span>
              <h3 className="mt-4 font-display text-[22px] font-bold text-ink">
                Normal Vaginal Delivery
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Normal vaginal delivery refers more broadly to giving birth vaginally. Depending on the individual situation and preferences, pain-relief options or obstetric support may form part of the labour care.
              </p>
              <div className="mt-6 rounded-2xl border border-border/70 bg-cream/40 p-5">
                <p className="text-[14px] leading-relaxed text-ink/80">
                  Whether labour progresses naturally or requires supportive pain relief or medical assistance, the focus is always on ensuring the safety and comfort of both mother and baby.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* VIDEO EXPERIENCE SECTION */}
      <div id="video" className="scroll-mt-[100px]">
        <VideoExperience />
      </div>

      {/* SECTION 4: THE BIRTHWAVE APPROACH */}
      <section id="preparation" className="scroll-mt-[100px] bg-white py-16 md:py-24 border-b border-border/60">
        <Container>
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              The Birthwave Approach
            </p>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
              Natural birth preparation starts before the day of delivery.
            </h2>
            <p className="mt-3.5 text-[16px] leading-[1.65] text-muted">
              Birth preparation is not only about what happens once labour begins. At Birthwave, conversations about birth can begin during pregnancy, giving you time to understand labour, discuss your preferences, prepare physically and emotionally, and involve the person who will support you during birth.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Understanding Labour",
                desc: "Learn about the stages of labour, contractions, signs that labour may be beginning and when to contact your care team.",
                icon: "labour",
              },
              {
                title: "Birth Planning",
                desc: "Discuss your preferences and understand the choices that may be available during labour and birth.",
                icon: "planning",
              },
              {
                title: "Breathing & Relaxation",
                desc: "Learn practical breathing and relaxation techniques that may help you cope with labour.",
                icon: "breathing",
              },
              {
                title: "Movement & Positioning",
                desc: "Understand comfortable movement and positions that may be used during labour based on your individual circumstances.",
                icon: "movement",
              },
              {
                title: "Birth Partner Preparation",
                desc: "Help your partner understand labour and how they can provide practical and emotional support.",
                icon: "partner",
              },
              {
                title: "Childbirth Education",
                desc: "Prepare for what to expect during labour, delivery and the early period after birth.",
                icon: "education",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 50}
                className="group flex flex-col justify-between rounded-[22px] border border-border/80 bg-cream/35 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40 hover:bg-white hover:shadow-[0_12px_32px_rgba(46,36,33,0.06)]"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-white shadow-[0_2px_8px_rgba(46,36,33,0.04)] transition-colors group-hover:bg-blush">
                    <SectionIcon type={item.icon} />
                  </span>
                  <h4 className="mt-4 font-display text-[17px] font-bold text-ink transition-colors group-hover:text-brown">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6: MEET YOUR DOCTOR */}
      <section id="doctor" className="scroll-mt-[100px] bg-cream/45 py-16 md:py-24 border-b border-border/60">
        <Container>
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              Doctor-Led, Women-Centred Care
            </p>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
              Meet Dr. Santoshi Nandigam
            </h2>
            <p className="mt-1 text-[15px] font-semibold text-muted">
              Founder, Birthwave | Obstetrician &amp; Gynaecologist
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-border/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
              <div className="relative mx-auto h-[280px] w-[240px] shrink-0 overflow-hidden rounded-[24px] border border-border shadow-[0_8px_24px_rgba(46,36,33,0.08)]">
                <TeamAvatar member={santoshi} focal="top" className="h-full w-full" />
              </div>
              <div className="space-y-4 text-[16px] leading-[1.7] text-ink/85">
                <p>
                  At Birthwave, Dr. Santoshi works with women throughout pregnancy to understand their health, concerns, preferences and expectations around childbirth.
                </p>
                <p>
                  For women interested in natural birth, discussions can begin during antenatal care — helping you understand labour, explore your birth preferences and prepare for childbirth with medical guidance alongside Birthwave’s supportive approach to pregnancy and wellness.
                </p>
                <p className="font-medium text-ink">
                  The focus is on informed choices, individualised care and clear communication throughout pregnancy and birth.
                </p>
                <div className="pt-3">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] shadow-[0_4px_16px_rgba(97,62,55,0.2)]"
                  >
                    Book a Consultation with Dr. Santoshi &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 10: FAQS */}
      <section id="faqs" className="scroll-mt-[100px] bg-white py-16 md:py-24 border-b border-border/60">
        <Container className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            Got Questions?
          </p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqsData.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={faq.q} className="rounded-2xl border border-border/80 bg-cream/35 transition-colors hover:border-brown/40 hover:bg-cream/60">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 text-left font-display text-[16px] sm:text-[17px] font-semibold text-ink"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brown shadow-sm">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[15px] leading-relaxed text-muted whitespace-pre-line border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 11: ENQUIRY / BOOKING */}
      <section id="contact-form" className="scroll-mt-[100px] bg-cream/45 py-16 md:py-24">
        <span id="enquiry" className="scroll-mt-[100px] block" aria-hidden="true" />
        <Container className="max-w-3xl">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              Begin Your Preparation
            </p>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
              Ready to discuss natural birth?
            </h2>
            <p className="mt-3 text-[16px] text-muted">
              Speak with Dr. Santoshi Nandigam about your birth preferences and preparation plan.
            </p>
          </div>
          <div className="mt-10 rounded-[28px] border border-border bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(46,36,33,0.06)]">
            <Suspense fallback={null}>
              <EnquiryForm defaultService="natural-birth" />
            </Suspense>
          </div>
        </Container>
      </section>
    </main>
  );
}
