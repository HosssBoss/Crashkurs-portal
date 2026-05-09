import type { NextConfig } from "next";

// In local development, Node.js can't verify the SSL certificate of some
// external services (e.g. Supabase) when running behind a corporate CA/proxy.
// This is safe for local-only use — never deploy with this flag active.
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {};

export default nextConfig;
