import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — a stray package-lock.json in the
  // parent home directory (pre-existing, unrelated to this app) would otherwise
  // confuse Next's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
