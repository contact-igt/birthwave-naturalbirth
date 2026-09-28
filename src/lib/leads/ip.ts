"use client";

// Best-effort public client IPv4, resolved via a public IP API (ipify, with
// fallbacks) — mirrors the VLS lead pipeline. Fetched once on form mount and
// cached so it is ready at submit; never throws, resolves to "" when every
// provider is unreachable (offline, blocked, ad-blocker, etc).
const PROVIDERS: Array<{ url: string; pick: (json: any) => string | null }> = [
  { url: "https://api.ipify.org?format=json", pick: (j) => j?.ip ?? null },
  { url: "https://ipwho.is/", pick: (j) => (j?.success !== false ? j?.ip ?? null : null) },
  { url: "https://ipapi.co/json/", pick: (j) => j?.ip ?? null },
];

const isValidIp = (ip: unknown): ip is string =>
  typeof ip === "string" && /^(\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/.test(ip) && ip !== "::1";

async function lookup(): Promise<string | null> {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(provider.url, { cache: "no-store" });
      if (!res.ok) continue;
      const ip = provider.pick(await res.json());
      if (isValidIp(ip)) return ip;
    } catch {
      // try the next provider
    }
  }
  return null;
}

let cachedIp: string | null = null;
let inflight: Promise<string | null> | null = null;

/** Fire the lookup early (call on form mount). */
export function primeClientIp(): void {
  if (typeof window === "undefined" || cachedIp || inflight) return;
  inflight = lookup().then((ip) => {
    cachedIp = ip;
    inflight = null;
    return ip;
  });
}

/** Resolve the cached IP (awaits an in-flight lookup). Returns "" if unknown. */
export async function getClientIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  if (inflight) return (await inflight) ?? "";
  primeClientIp();
  return (inflight ? await inflight : null) ?? "";
}
