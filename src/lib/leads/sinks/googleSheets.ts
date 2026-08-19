import type { LeadSinkResult, NormalizedLead } from "../types";

// Adapter for Google Sheets via Google Apps Script Web App URL.
// Configured via environment variable:
//   GOOGLE_SHEETS_WEBHOOK_URL or APPS_SCRIPT_URL
export async function sendToGoogleSheets(lead: NormalizedLead): Promise<LeadSinkResult> {
  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ??
    process.env.APPS_SCRIPT_URL ??
    "https://script.google.com/macros/s/AKfycbwzOqyTM_9GblvBiU0o3QpJ2y72oj0eIemZ6NR58cVSjMCgw9NYbtzMGb6F353uX1uf/exec";

  if (!webhookUrl) {
    return { ok: false, reason: "sink_not_configured" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      return { ok: false, reason: "sink_error", detail: `HTTP ${res.status}` };
    }

    let lead_id = lead.lead_id;
    try {
      const text = await res.text();
      if (text) {
        const data = JSON.parse(text);
        if (data.lead_id) {
          lead_id = data.lead_id;
        }
      }
    } catch {
      // Apps Script might return non-JSON success response; HTTP 200 is sufficient
    }

    return {
      ok: true,
      lead_id,
      matched: false,
    };
  } catch (err) {
    return {
      ok: false,
      reason: "sink_error",
      detail: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
