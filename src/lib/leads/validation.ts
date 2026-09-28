import type { LeadInput } from "./types";

const MAX_LENGTHS = {
  name: 100,
  phone: 20,
  email: 150,
  service: 100,
  message: 1000,
} as const;

export type ValidationResult =
  | { ok: true; value: LeadInput }
  | { ok: false; errors: Record<string, string> };

// Accepts Indian mobile numbers with or without +91/0 prefix, and generic
// 7-15 digit international numbers — deliberately permissive (this is lead
// intake, not a carrier-grade validator).
function isPlausiblePhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (phone.trim().startsWith("+")) return `+${digits}`;
  return `+${digits}`;
}

export function validateLeadInput(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof body !== "object" || body === null) {
    return { ok: false, errors: { _form: "Malformed request." } };
  }
  const b = body as Record<string, unknown>;

  // Honeypot — real users never fill this hidden field.
  if (typeof b.honeypot === "string" && b.honeypot.trim().length > 0) {
    return { ok: false, errors: { _form: "Rejected." } };
  }

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_LENGTHS.name) errors.name = "Name is too long.";

  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  if (!phone) errors.phone = "Phone is required.";
  else if (phone.length > MAX_LENGTHS.phone) errors.phone = "Phone number is too long.";
  else if (!isPlausiblePhone(phone)) errors.phone = "Enter a valid phone number.";

  const service = typeof b.service === "string" ? b.service.trim() : "";
  if (!service) errors.service = "Please select what you need help with.";
  else if (service.length > MAX_LENGTHS.service) errors.service = "Invalid service.";

  const consent = b.consent === true;
  if (!consent) errors.consent = "Consent is required to submit this form.";

  const email =
    typeof b.email === "string" && b.email.trim() ? b.email.trim() : undefined;
  if (email && email.length > MAX_LENGTHS.email) errors.email = "Email is too long.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";

  const message =
    typeof b.message === "string" && b.message.trim() ? b.message.trim() : undefined;
  if (message && message.length > MAX_LENGTHS.message)
    errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const rawAttribution =
    typeof b.attribution === "object" && b.attribution !== null
      ? (b.attribution as Record<string, unknown>)
      : {};
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : null);

  return {
    ok: true,
    value: {
      name,
      phone,
      email,
      service,
      message,
      consent: true,
      ip_address: str(b.ip_address),
      attribution: {
        source: str(rawAttribution.source),
        campaign: str(rawAttribution.campaign),
        creative: str(rawAttribution.creative),
        channel: "Form",
        landing_page: str(rawAttribution.landing_page) ?? "/",
        referrer: str(rawAttribution.referrer),
        utm_source: str(rawAttribution.utm_source),
        utm_medium: str(rawAttribution.utm_medium),
        utm_campaign: str(rawAttribution.utm_campaign),
        utm_content: str(rawAttribution.utm_content),
        utm_term: str(rawAttribution.utm_term),
        gclid: str(rawAttribution.gclid),
        fbclid: str(rawAttribution.fbclid),
      },
    },
  };
}
