import type { LeadSinkResult, NormalizedLead } from "../types";

const unquote = (v?: string | null) => (v || "").trim().replace(/^["']|["']$/g, "");

// This deployment's stable identifier in the IGT Lead Panel. One key per
// website / landing page — the admin panel groups enquiries by it.
const SOURCE_KEY = "birthwave_naturalbirth";

// Birthwave IGT Lead Panel public intake. The panel stores the lead and
// mirrors it to the right Google Sheet tab server-side (retried up to 3
// times), so the site hands the lead off exactly once.
//
//   LEADS_API_SERVER          localhost | stage | production   (default: localhost)
//   LEADS_LOCALHOST_API_URL   http://localhost:8000/api/v1
//   LEADS_STAGE_API_URL       https://stageapi.invictusglobaltech.com/api/v1
//   LEADS_PRODUCTION_API_URL  https://invictusleadbackend-production.up.railway.app/api/v1
//   IGT_LEAD_PANEL_ENDPOINT   optional — full URL, overrides everything above
//   IGT_LEAD_PANEL_CLIENT_KEY tenant key (default: "birthwave")
const resolveEndpoint = (): string => {
  const override = unquote(process.env.IGT_LEAD_PANEL_ENDPOINT);
  if (override) return override;

  const server = (unquote(process.env.LEADS_API_SERVER) || "localhost").toLowerCase();
  const base =
    server === "production"
      ? unquote(process.env.LEADS_PRODUCTION_API_URL)
      : server === "stage"
        ? unquote(process.env.LEADS_STAGE_API_URL)
        : unquote(process.env.LEADS_LOCALHOST_API_URL) || unquote(process.env.LEADS_API_URL);

  return `${(base || "http://localhost:8000/api/v1").replace(/\/+$/, "")}/birthwave-public/leads`;
};

export async function sendToIgtLeadPanel(lead: NormalizedLead): Promise<LeadSinkResult> {
  const endpoint = resolveEndpoint();
  const clientKey = unquote(process.env.IGT_LEAD_PANEL_CLIENT_KEY) || "birthwave";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Key": clientKey,
      },
      body: JSON.stringify({
        source_key: SOURCE_KEY,
        client_key: clientKey,
        lead_id: lead.lead_id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        message: lead.message,
        consent: lead.consent,
        ip_address: lead.ip_address,
        attribution: {
          source: lead.source,
          campaign: lead.campaign,
          creative: lead.creative,
          channel: lead.channel,
          landing_page: lead.landing_page,
          referrer: lead.referrer,
          utm_source: lead.utm_source,
          utm_medium: lead.utm_medium,
          utm_campaign: lead.utm_campaign,
          utm_content: lead.utm_content,
          utm_term: lead.utm_term,
          gclid: lead.gclid,
          fbclid: lead.fbclid,
        },
      }),
    });

    if (!res.ok) {
      return { ok: false, reason: "sink_error", detail: `HTTP ${res.status}` };
    }

    const data = (await res.json().catch(() => ({}))) as { lead_id?: string };
    return { ok: true, lead_id: data.lead_id ?? lead.lead_id, matched: false };
  } catch (err) {
    return {
      ok: false,
      reason: "sink_error",
      detail: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
