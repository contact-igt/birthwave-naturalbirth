// Lead record contract — shaped to hand off cleanly into the Birthwave IGT
// Lead Management system. The website is responsible only for capturing
// this correctly; follow-up/appointment/outcome lifecycle lives downstream.

export type LeadStatus = "new";
export type FollowUpStatus = "pending";
export type Channel = "Form";

export type LeadAttribution = {
  source: string | null; // e.g. "Meta", "Google", "Organic", "Referral"
  campaign: string | null;
  creative: string | null; // aka utm_content
  channel: Channel; // always "Form" for website submissions — never overwrites source
  landing_page: string; // first-touch landing path, e.g. "/vbac"
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
};

export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  consent: boolean;
  ip_address?: string | null;
  honeypot?: string; // spam trap — must arrive empty
  attribution: LeadAttribution;
};

export type NormalizedLead = {
  lead_id: string;
  created_at: string;

  name: string;
  phone: string; // normalized E.164-ish
  email: string | null;
  service: string;
  message: string | null;

  source: string | null;
  campaign: string | null;
  creative: string | null;
  channel: Channel;

  landing_page: string;
  referrer: string | null;
  ipaddress: string | null;
  ip_address: string | null;

  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;

  gclid: string | null;
  fbclid: string | null;

  lead_status: LeadStatus;
  lead_owner: null;
  follow_up_status: FollowUpStatus;
  next_follow_up_at: null;

  appointment_status: null;
  appointment_date_time: null;

  outcome: null;
  next_action: "contact lead";

  consent: true;
};

export type LeadSinkResult =
  | { ok: true; lead_id: string; matched: boolean }
  | { ok: false; reason: "sink_not_configured" | "sink_error"; detail?: string };
