"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

export function VideoExperience({
  eyebrow = "Inside Birthwave",
  heading = "Care designed around the whole journey.",
  body = "See how Birthwave brings pregnancy, birth, recovery and newborn care together in one connected experience.",
  className = "bg-cream py-16 md:py-24 border-y border-border/60",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  className?: string;
} = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Play video automatically when it intersects the viewport, pause when offscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section className={className}>
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink md:text-[36px]">
            {heading}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {body}
          </p>
        </Reveal>

        <Reveal scaleFrom={0.97} delay={100} className="mt-10 w-full">
          <div className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[24px] bg-ink shadow-[0_24px_60px_rgba(46,36,33,0.18)] border border-border/60">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src="/videos/birthwave-hospital-experience.mp4"
              poster="/images/birthwave/video/birthwave-hospital-poster.webp"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Birthwave hospital care experience"
            />
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_4px_18px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95"
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 5V4L8 9H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
                  <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 5V4L8 9H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
