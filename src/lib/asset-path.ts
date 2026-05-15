/**
 * Asset path helper.
 * For GitHub Pages deployment, we hardcode the base path to ensure it's always prepended correctly
 * in both static HTML and client-side hydration.
 */
const isProduction = typeof window !== "undefined" 
  ? !window.location.hostname.includes("localhost") 
  : process.env.NODE_ENV === "production" || process.env.GITHUB_ACTIONS === "true";

export const BASE = isProduction ? "/hackethl26" : "";
export const LOGO_SRC = `${BASE}/Ethlogo.png`;
