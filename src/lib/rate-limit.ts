/**
 * Rate Limiting Utility
 *
 * Implementa un rate limiter simple usando almacenamiento en memoria
 * para entornos de desarrollo/MVP. Para producción con múltiples instancias
 * se recomienda migrar a Upstash Redis (ver comentario al final del archivo).
 *
 * Uso:
 *   import { rateLimit } from "@/lib/rate-limit";
 *
 *   const result = await rateLimit(request, { max: 5, windowMs: 60_000 });
 *   if (!result.success) {
 *     return new Response("Too Many Requests", { status: 429 });
 *   }
 */

interface RateLimitOptions {
  /** Número máximo de solicitudes permitidas en la ventana de tiempo */
  max?: number;
  /** Duración de la ventana en milisegundos (default: 60 segundos) */
  windowMs?: number;
}

interface RateLimitResult {
  success: boolean;
  /** Solicitudes restantes en la ventana actual */
  remaining: number;
  /** Timestamp de cuando se reinicia la ventana */
  reset: number;
}

// Almacenamiento en memoria (válido para instancia única / desarrollo)
const store = new Map<string, { count: number; resetAt: number }>();

/**
 * Obtiene la IP del cliente desde el objeto Request de Next.js.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  // Fallback genérico
  return "unknown";
}

/**
 * Aplica rate limiting por IP.
 * @param identifier - IP u otro identificador único (ej. userId)
 * @param options - Configuración del límite
 */
export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const max = options.max ?? 10;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();

  const key = `rl:${identifier}`;
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    // Primera solicitud o ventana expirada
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1, reset: now + windowMs };
  }

  if (record.count >= max) {
    return { success: false, remaining: 0, reset: record.resetAt };
  }

  record.count += 1;
  return {
    success: true,
    remaining: max - record.count,
    reset: record.resetAt,
  };
}

/**
 * Limpia entradas expiradas del store en memoria.
 * Llamar periódicamente para evitar memory leaks en desarrollo.
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetAt) {
      store.delete(key);
    }
  }
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * MIGRACIÓN A UPSTASH REDIS (Para producción con múltiples instancias)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. Instalar: npm install @upstash/ratelimit @upstash/redis
 *
 * 2. Agregar a .env.local:
 *    UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
 *    UPSTASH_REDIS_REST_TOKEN=xxxxxx
 *
 * 3. Reemplazar este archivo con:
 *
 *    import { Ratelimit } from "@upstash/ratelimit";
 *    import { Redis } from "@upstash/redis";
 *
 *    const redis = new Redis({
 *      url: process.env.UPSTASH_REDIS_REST_URL!,
 *      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
 *    });
 *
 *    export const rateLimit = new Ratelimit({
 *      redis,
 *      limiter: Ratelimit.slidingWindow(10, "60 s"),
 *      analytics: true,
 *    });
 *
 *    // En tu Server Action o Route Handler:
 *    const { success } = await rateLimit.limit(identifier);
 *    if (!success) return new Response("Too Many Requests", { status: 429 });
 * ─────────────────────────────────────────────────────────────────────────────
 */
