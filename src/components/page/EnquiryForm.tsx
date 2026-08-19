"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formServiceOptions, getFormServiceTitle } from "@/lib/services";
import { site } from "@/lib/site";
import { ensureFirstTouchCaptured, getAttribution } from "@/lib/leads/attribution";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "error";

export function EnquiryForm({ defaultService }: { defaultService?: string } = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? defaultService ?? "";

  useEffect(() => {
    ensureFirstTouchCaptured();
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselected);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const serviceLabel = getFormServiceTitle(service) ?? service;

  function whatsappFallbackHref() {
    const lines = [
      `Hi, I'd like to book an appointment with The Birth Wave.`,
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      serviceLabel && `Interested in: ${serviceLabel}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    return `https://wa.me/919363031925?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return; // double-submit guard

    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          service,
          message: message || undefined,
          consent,
          honeypot,
          attribution: getAttribution(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        if (data.fields) setFieldErrors(data.fields);
        return;
      }

      trackEvent("birthwave_lead_submitted", {
        lead_id: data.lead_id,
        service,
        page: window.location.pathname,
      });

      router.push(`/thank-you?service=${encodeURIComponent(service)}`);
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please try again, or use WhatsApp below.");
    }
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="relative scroll-mt-[100px] grid w-full max-w-full box-border gap-4 rounded-[24px] border border-border bg-white p-5 sm:p-8 overflow-hidden"
    >
      {/* Honeypot — hidden from real users, bots often fill every field */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid w-full min-w-0 max-w-full gap-4 sm:grid-cols-2">
        <label className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
          <span className="text-sm font-semibold text-ink">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full min-w-0 max-w-full box-border min-h-11 rounded-xl border border-border bg-cream px-4 text-base text-ink outline-none transition-colors focus:border-brown"
          />
          {fieldErrors.name && <span className="text-xs text-coral">{fieldErrors.name}</span>}
        </label>
        <label className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
          <span className="text-sm font-semibold text-ink">Phone</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full min-w-0 max-w-full box-border min-h-11 rounded-xl border border-border bg-cream px-4 text-base text-ink outline-none transition-colors focus:border-brown"
          />
          {fieldErrors.phone && (
            <span className="text-xs text-coral">{fieldErrors.phone}</span>
          )}
        </label>
      </div>

      <label className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
        <span className="text-sm font-semibold text-ink">What do you need help with?</span>
        <select
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full min-w-0 max-w-full box-border truncate min-h-11 rounded-xl border border-border bg-cream px-4 text-base text-ink outline-none transition-colors focus:border-brown"
        >
          <option value="">Not sure yet</option>
          {formServiceOptions.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
        <span className="text-sm font-semibold text-ink">Email (optional)</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-0 max-w-full box-border min-h-11 rounded-xl border border-border bg-cream px-4 text-base text-ink outline-none transition-colors focus:border-brown"
        />
        {fieldErrors.email && <span className="text-xs text-coral">{fieldErrors.email}</span>}
      </label>

      <label className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
        <span className="text-sm font-semibold text-ink">Message (optional)</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full min-w-0 max-w-full box-border rounded-xl border border-border bg-cream px-4 py-3 text-base text-ink outline-none transition-colors focus:border-brown resize-y"
        />
      </label>

      <label className="flex w-full min-w-0 max-w-full items-start gap-2.5 text-sm leading-relaxed text-ink/80">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brown"
        />
        Birthwave may contact me regarding this enquiry or appointment request.
      </label>
      {fieldErrors.consent && (
        <span className="-mt-2 text-xs text-coral">{fieldErrors.consent}</span>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-full bg-brown px-7 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brown-600 active:scale-[0.98] active:bg-brown-700 disabled:opacity-60 disabled:active:scale-100"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>

      {status === "error" && (
        <div className="w-full min-w-0 max-w-full rounded-xl border border-coral/40 bg-coral/5 p-4">
          <p className="text-sm font-medium text-ink">{errorMessage}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-ink hover:border-brown"
            >
              Retry
            </button>
            <a
              href={whatsappFallbackHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brown px-5 py-2 text-sm font-semibold text-white hover:bg-brown-600"
            >
              Continue on WhatsApp
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-muted">
        Prefer to call? {site.phone}.
      </p>
    </form>
  );
}
