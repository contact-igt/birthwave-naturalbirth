import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/Container";
import { ThankYouContent } from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Enquiry Received | The Birth Wave",
  description: "Your enquiry has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream py-20 md:py-28">
          <Container className="max-w-xl text-center">
            <Suspense fallback={null}>
              <ThankYouContent />
            </Suspense>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
