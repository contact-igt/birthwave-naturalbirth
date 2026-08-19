"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getFormServiceTitle } from "@/lib/services";
import { site } from "@/lib/site";

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service");
  const serviceTitle = serviceSlug ? getFormServiceTitle(serviceSlug) : undefined;

  const whatsappHref = `https://wa.me/919363031925?text=${encodeURIComponent(
    `Hi, I just submitted an enquiry through the Birthwave website${
      serviceTitle ? ` for ${serviceTitle}` : ""
    }.`
  )}`;

  return (
    <>
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
        Request Received
      </p>
      <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.15] text-ink sm:text-[42px]">
        Thank you. We&rsquo;ve received your enquiry.
      </h1>
      <p className="mt-5 text-[16px] leading-[1.6] text-muted">
        Birthwave&rsquo;s team will review the request and contact you using the
        details you submitted.
      </p>

      {serviceTitle && (
        <div className="mt-6 inline-flex flex-col items-center rounded-2xl border border-border bg-white px-6 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-rose">
            Your enquiry
          </p>
          <p className="mt-1 font-display text-base font-bold text-ink">{serviceTitle}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brown px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700"
        >
          Continue on WhatsApp
        </a>
        <a
          href={site.phoneHref}
          className="rounded-full border border-border bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
        >
          Call {site.phone}
        </a>
        <Link
          href="/"
          className="rounded-full border border-border bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:border-brown hover:text-brown active:scale-[0.98]"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
