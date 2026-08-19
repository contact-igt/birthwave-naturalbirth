import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { QuickActions } from "@/components/QuickActions";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Obstetrician Gynaecologist in Nungambakkam Chennai – The BirthWave",
  description:
    "The Birth Wave is a doctor-led obstetrics & gynaecology practice in Nungambakkam, Chennai, offering continuous care across pregnancy, birth and recovery.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${poppins.variable} h-full antialiased overflow-x-hidden max-w-full`}
    >
      <GoogleTagManager gtmId="GTM-PW4F5S6P" />
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y3ragh8nww");
          `,
        }}
      />
      <body className="min-h-full flex flex-col bg-cream text-ink pb-24 xl:pb-0 overflow-x-hidden max-w-full relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PW4F5S6P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <QuickActions />
      </body>
    </html>
  );
}
