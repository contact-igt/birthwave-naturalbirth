import { Suspense } from "react";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/page/EnquiryForm";

// Shared wrapper around the one EnquiryForm implementation — every public
// page ends with this so the conversion path is identical everywhere.
export function EnquirySection({
  heading = "Send an enquiry",
  body = "Prefer to write ahead? Fill this in and continue on WhatsApp.",
  defaultService,
  id = "enquiry",
}: {
  heading?: string;
  body?: string;
  defaultService?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-[100px] bg-white py-16 md:py-20 pb-24 md:pb-20">
      <Container className="max-w-3xl">
        <h2 className="font-display text-[26px] font-bold leading-tight text-ink">{heading}</h2>
        <p className="mt-2 text-[15px] text-muted">{body}</p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <EnquiryForm defaultService={defaultService} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
