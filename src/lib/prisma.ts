import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  // Aumenta el pool para dev con Turbopack HMR (evita P2024)
  const datasourceUrl = url
    ? `${url}${url.includes('?') ? '&' : '?'}connection_limit=10&pool_timeout=30`
    : undefined;

  return new PrismaClient({
    datasourceUrl,
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
