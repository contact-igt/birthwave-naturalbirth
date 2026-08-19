import type { LeadSinkResult, NormalizedLead } from "../types";

// Adapter boundary for the IGT Lead Panel (the operational source of truth
// for Birthwave leads). Required config:
//
//   IGT_LEAD_PANEL_ENDPOINT   — base URL for the create-or-match lead API
//   IGT_LEAD_PANEL_API_KEY    — server-side credential, never exposed to the client
//
// Neither exists in this project yet. This adapter does not fabricate a
// successful response when they're missing — it reports exactly that, so
// the API route can fail safely instead of pretending a lead was saved.
//
// Once the real endpoint/contract is available, replace the body of
// `sendToIgtLeadPanel` with the actual create-or-match request — the
// call site (src/lib/leads/service.ts) and its return contract don't need
// to change.
export async function sendToIgtLeadPanel(lead: NormalizedLead): Promise<LeadSinkResult> {
  const endpoint = process.env.IGT_LEAD_PANEL_ENDPOINT;
  const apiKey = process.env.IGT_LEAD_PANEL_API_KEY;

  if (!endpoint || !apiKey) {
    return { ok: false, reason: "sink_not_configured" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      // Primary match key per the operational architecture: normalized phone.
      body: JSON.stringify({ ...lead, match_key: lead.phone }),
    });

    if (!res.ok) {
      return { ok: false, reason: "sink_error", detail: `HTTP ${res.status}` };
    }

    const data = (await res.json()) as { lead_id?: string; matched?: boolean };
    return {
      ok: true,
      lead_id: data.lead_id ?? lead.lead_id,
      matched: Boolean(data.matched),
    };
  } catch (err) {
    return {
      ok: false,
      reason: "sink_error",
      detail: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
