"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

// Lightweight scroll-reveal — no animation library. A single
// IntersectionObserver per instance toggles a CSS class; the transition
// itself is plain Tailwind (opacity + translateY), so `prefers-reduced-
// motion` is already handled by the global media query in globals.css
// (which zeroes every transition-duration to 0.01ms). Only opacity/
// transform are animated, so this never causes layout shift.
//
// Fires once — content that has already revealed stays revealed on scroll
// back up, matching "restrained", not attention-grabbing, motion.
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  scaleFrom,
}: {
  children: ReactNode;
  className?: string;
  delay?: number; // ms — for staggering a row of siblings
  as?: ElementType; // e.g. "li" when reveal wraps a list item
  scaleFrom?: number; // e.g. 0.97 — adds a subtle scale-in alongside the fade
}) {
  const ref = useRef<HTMLElement>(null);
  // Starts false on both server and client so SSR/hydration output matches —
  // an initializer that branched on `typeof IntersectionObserver` (undefined
  // during SSR, defined in the browser) rendered opposite opacity on each
  // side and triggered a hydration mismatch. Flipping to visible always
  // happens post-mount, in the effect below.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // Defer rather than set state synchronously in the effect body.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${scaleFrom ? "" : visible ? "translate-y-0" : "translate-y-4"} ${className}`}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : undefined),
        ...(scaleFrom
          ? { transform: visible ? "none" : `scale(${scaleFrom}) translateY(1rem)` }
          : undefined),
      }}
    >
      {children}
    </Tag>
  );
}
