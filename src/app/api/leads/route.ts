import { NextResponse } from "next/server";
import { validateLeadInput } from "@/lib/leads/validation";
import { submitLead } from "@/lib/leads/service";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per server instance — not distributed,
// which is fine for launch-scale abuse deterrence without adding infra).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const validation = validateLeadInput(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fields: validation.errors },
      { status: 422 }
    );
  }

  const result = await submitLead(validation.value, validation.value.ip_address || ip);

  if (!result.ok) {
    const status = result.reason === "sink_not_configured" ? 503 : 502;
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your enquiry right now. Please try again, or continue on WhatsApp.",
        reason: result.reason,
      },
      { status }
    );
  }

  return NextResponse.json({ ok: true, lead_id: result.lead_id }, { status: 201 });
}
