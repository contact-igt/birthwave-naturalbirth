import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const trustBullets = [
  "Clear explanations before decisions",
  "Care plans that connect pregnancy, birth and recovery",
  "Support for sensitive conversations without judgement",
] as const;

export function DoctorLedCare() {
  return (
    <section id="doctor-led-care" className="scroll-mt-[100px] bg-white py-16 md:py-[100px]">
      <Container className="grid items-center gap-12 xl:grid-cols-[500px_1fr] xl:gap-16">
        <Reveal className="order-2 xl:order-1">
          <div className="relative mx-auto h-[460px] w-full max-w-[500px] overflow-hidden rounded-[32px] bg-sky xl:h-[580px]">
            <Image
              src="/images/dr-santoshi-nandigam.png"
              alt={`${site.doctor.name}, ${site.doctor.title}`}
              fill
              sizes="(min-width: 1280px) 500px, 90vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(46,36,33,0.08)]">
              <p className="font-display text-[15px] font-bold text-ink">{site.doctor.name}</p>
              <p className="text-[13px] text-muted">{site.doctor.title}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 xl:order-2" delay={80}>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
              Doctor Led, Women-Centred Care
            </p>
            <h2 className="mt-3 font-display text-[26px] sm:text-[32px] md:text-[37px] font-bold leading-tight text-ink">
              Clinical care and the birth experience can belong together.
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Birthwave is designed to feel less like moving between disconnected
              appointments and more like one continuous care journey, with space for
              questions, preferences, preparation and follow up.
            </p>

            <blockquote className="mt-6 rounded-2xl border border-border bg-quote p-6">
              <p className="text-[15px] font-medium leading-relaxed text-ink/85">
                &ldquo;Patients should understand their options and feel supported
                through every stage of care.&rdquo;
              </p>
            </blockquote>

            <ul className="mt-6 space-y-2.5">
              {trustBullets.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] font-medium text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="/doctors"
              className="mt-7 inline-flex rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700"
            >
              Meet Dr. Santoshi
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
