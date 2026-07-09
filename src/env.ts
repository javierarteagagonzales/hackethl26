import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Variables de servidor (solo disponibles en el servidor Node.js).
   * No exponer al cliente.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine((url) => url.startsWith("prisma") || url.startsWith("postgres"), {
        message: "DATABASE_URL debe ser una URL de PostgreSQL o Prisma Postgres válida",
      }),
    NEXTAUTH_SECRET: z.string().min(32, {
      message: "NEXTAUTH_SECRET debe tener al menos 32 caracteres",
    }),
    NEXTAUTH_URL: z.string().url().optional(),
    GITHUB_ID: z.string().min(1, { message: "GITHUB_ID es requerido" }),
    GITHUB_SECRET: z.string().min(1, { message: "GITHUB_SECRET es requerido" }),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // Email (opcional — solo requerido si se usa Resend)
    RESEND_API_KEY: z.string().optional(),
    APPLICATION_EMAIL_FROM: z.string().email().optional(),
  },

  /**
   * Variables de cliente (deben empezar con NEXT_PUBLIC_).
   */
  client: {
    // Agrega aquí variables públicas si las necesitas, e.g.:
    // NEXT_PUBLIC_SITE_URL: z.string().url(),
  },

  /**
   * Mapeo manual de variables de entorno para que Next.js pueda
   * hacer tree-shaking correcto durante el build.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    APPLICATION_EMAIL_FROM: process.env.APPLICATION_EMAIL_FROM,
  },

  /**
   * Omitir validación en entornos donde no se tienen todas las variables
   * (ej. builds de Docker sin variables de entorno completas).
   * Cambiar a `true` solo si es absolutamente necesario.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Hace que los strings vacíos sean tratados como `undefined`.
   * Útil cuando los servicios de CI/CD inyectan strings vacíos.
   */
  emptyStringAsUndefined: true,
});
