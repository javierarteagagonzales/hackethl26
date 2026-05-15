import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Si usas un dominio personalizado, comenta esta línea:
  basePath: "/hackethl26",
};

export default nextConfig;
