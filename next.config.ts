import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://scripts.clarity.ms;
  script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://scripts.clarity.ms;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://www.googletagmanager.com;
  style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://www.googletagmanager.com;
  img-src 'self' data: blob: https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://*.googleusercontent.com https://*.gstatic.com https://*.clarity.ms https://c.bing.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://tagmanager.google.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://api.whatsapp.com https://wa.me;
  frame-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com https://*.google.com https://*.doubleclick.net https://api.whatsapp.com https://web.whatsapp.com;
  child-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com https://*.google.com https://*.doubleclick.net https://api.whatsapp.com https://web.whatsapp.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://wa.me https://api.whatsapp.com;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — a stray package-lock.json in the
  // parent home directory (pre-existing, unrelated to this app) would otherwise
  // confuse Next's root inference.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

