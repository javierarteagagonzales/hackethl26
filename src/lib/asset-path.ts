/** Helper para paths de assets — funciona en local (vacío) y en producción (/hackethl26) */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Logo del evento */
export const LOGO_SRC = `${BASE}/Ethlogo.png`;
