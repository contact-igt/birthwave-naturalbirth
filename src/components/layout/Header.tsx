"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

const navItems = [
  { label: "Overview", href: "#understanding" },
  { label: "Comparison", href: "#comparison" },
  { label: "Experience", href: "#video" },
  { label: "Preparation", href: "#preparation" },
  { label: "Doctor", href: "#doctor" },
  { label: "FAQs", href: "#faqs" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-[80px] md:h-[100px] border-b bg-white transition-shadow duration-200 ${
        scrolled ? "border-border shadow-[0_2px_12px_rgba(46,36,33,0.06)]" : "border-border/70"
      }`}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center">
          <BrandMark size="sm" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[16px] font-medium text-ink/80 transition-colors hover:text-brown"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact-form"
          className="hidden rounded-full bg-brown px-5 py-2.5 text-[16px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] lg:inline-block"
        >
          Book Appointment
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            {open ? (
              <path d="M1 1l20 14M21 1L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border bg-white transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden grid ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ display: "grid" }}
      >
        <div className="min-h-0 max-h-[calc(100vh-85px)] overflow-y-auto">
          <Container className="flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-11 flex items-center border-b border-border/60 py-2.5 text-base font-medium text-ink/85 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 pb-2">
              <a href={site.phoneHref} className="min-h-11 rounded-full border border-border bg-white py-2.5 text-center text-sm font-semibold text-ink">
                Call {site.phone}
              </a>
              <a href="#contact-form" onClick={() => setOpen(false)} className="min-h-11 rounded-full bg-brown py-2.5 text-center text-sm font-semibold text-white flex items-center justify-center">
                Book Appointment
              </a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
