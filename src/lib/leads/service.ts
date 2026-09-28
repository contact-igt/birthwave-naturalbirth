import { randomUUID } from "crypto";
import type { LeadInput, LeadSinkResult, NormalizedLead } from "./types";
import { normalizePhone } from "./validation";
import { sendToIgtLeadPanel } from "./sinks/igtLeadPanel";

function buildNormalizedLead(input: LeadInput, clientIp?: string): NormalizedLead {
  return {
    lead_id: randomUUID(),
    created_at: new Date().toISOString(),

    name: input.name,
    phone: normalizePhone(input.phone),
    email: input.email ?? null,
    service: input.service,
    message: input.message ?? null,

    source: input.attribution.source,
    campaign: input.attribution.campaign,
    creative: input.attribution.creative,
    channel: "Form",

    landing_page: input.attribution.landing_page,
    referrer: input.attribution.referrer,
    ipaddress: input.ip_address || clientIp || null,
    ip_address: input.ip_address || clientIp || null,

    utm_source: input.attribution.utm_source,
    utm_medium: input.attribution.utm_medium,
    utm_campaign: input.attribution.utm_campaign,
    utm_content: input.attribution.utm_content,
    utm_term: input.attribution.utm_term,

    gclid: input.attribution.gclid,
    fbclid: input.attribution.fbclid,

    lead_status: "new",
    lead_owner: null,
    follow_up_status: "pending",
    next_follow_up_at: null,

    appointment_status: null,
    appointment_date_time: null,

    outcome: null,
    next_action: "contact lead",

    consent: true,
  };
}

export type SubmitLeadResult =
  | { ok: true; lead_id: string }
  | { ok: false; reason: "sink_not_configured" | "sink_error" };

// The website/landing pages hand a lead to the IGT Lead Panel API and nothing
// else. The panel persists it and mirrors it to this source's Google Sheet
// server-side (retried up to 3 times) — success here means the panel
// acknowledged the lead, never a fake local 200.
export async function submitLead(input: LeadInput, clientIp?: string): Promise<SubmitLeadResult> {
  const lead = buildNormalizedLead(input, clientIp);

  const result: LeadSinkResult = await sendToIgtLeadPanel(lead);

  if (result.ok) {
    return { ok: true, lead_id: result.lead_id };
  }

  console.error("[leads] IGT Lead Panel submission failed", { lead_id: lead.lead_id, result });
  return { ok: false, reason: result.reason };
}
