// Minimal, safe event tracking. No-ops if no dataLayer/GTM is present —
// this project has no analytics stack installed, so this never assumes one
// exists. Never pass PII (name, phone, email, message) through this.
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type SafeEventParams = {
  page?: string;
  service?: string;
  source?: string;
  campaign?: string;
  lead_id?: string;
};

export function trackEvent(event: string, params: SafeEventParams = {}) {
  if (typeof window === "undefined") return;
  if (!Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...params });
}
