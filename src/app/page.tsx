import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BirthDeliveryCarePage } from "@/components/birth-delivery-care/BirthDeliveryCarePage";

export const metadata: Metadata = {
  title: "Natural Birth & Delivery Care in Nungambakkam, Chennai – The Birth Wave",
  description:
    "Doctor-led natural birth preparation, labour guidance, and holistic care with Dr. Santoshi Nandigam at The Birth Wave, Nungambakkam, Chennai.",
  keywords: [
    "Natural Birth Chennai",
    "Natural Delivery Nungambakkam",
    "Dr. Santoshi Nandigam",
    "Lower Intervention Birth",
    "Childbirth Education Chennai",
    "Water Birth & Natural Labour",
  ],
  openGraph: {
    title: "Natural Birth & Delivery Care in Nungambakkam, Chennai – The Birth Wave",
    description:
      "Doctor-led natural birth preparation and labour guidance with Dr. Santoshi Nandigam.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <BirthDeliveryCarePage />
      <Footer />
    </>
  );
}
