import { randomUUID } from "crypto";
import type { LeadInput, LeadSinkResult, NormalizedLead } from "./types";
import { normalizePhone } from "./validation";
import { sendToIgtLeadPanel } from "./sinks/igtLeadPanel";
import { sendToGoogleSheets } from "./sinks/googleSheets";

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
    ipaddress: clientIp ?? null,
    ip_address: clientIp ?? null,

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

// Success is defined as an explicit sink acknowledgement — never a fake
// local 200. Sends to configured sinks (Google Sheets, IGT Lead Panel).
export async function submitLead(input: LeadInput, clientIp?: string): Promise<SubmitLeadResult> {
  const lead = buildNormalizedLead(input, clientIp);

  const results: LeadSinkResult[] = await Promise.all([
    sendToIgtLeadPanel(lead),
    sendToGoogleSheets(lead),
  ]);

  const activeResults = results.filter((r) => r.ok || r.reason !== "sink_not_configured");

  if (activeResults.length === 0) {
    console.error("[leads] No lead sink configured in environment variables");
    return { ok: false, reason: "sink_not_configured" };
  }

  const success = activeResults.find((r): r is Extract<LeadSinkResult, { ok: true }> => r.ok);

  if (success) {
    return { ok: true, lead_id: success.lead_id };
  }

  const error = activeResults.find((r): r is Extract<LeadSinkResult, { ok: false }> => !r.ok);
  console.error("[leads] lead sink failed", { lead_id: lead.lead_id, errors: activeResults });
  return { ok: false, reason: error ? error.reason : "sink_error" };
}
