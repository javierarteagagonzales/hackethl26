/**
 * Asset path helper.
 * NEXT_PUBLIC_BASE_PATH is "" in dev and "/hackethl26" in production (set in next.config.ts).
 * Use LOGO_SRC anywhere you need the Ethereum Lima logo.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const LOGO_SRC = `${BASE}/Ethlogo.png`;
