/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ethlima.com",
  generateRobotsTxt: true,
  // Excluir rutas privadas / admin del sitemap público
  exclude: [
    "/admin",
    "/admin/*",
    "/dashboard",
    "/dashboard/*",
    "/judge",
    "/judge/*",
    "/mentor",
    "/mentor/*",
    "/api/*",
    "/login",
    "/register",
    "/apply-mentor",
    "/speaker",
    "/sponsor",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/judge/", "/api/"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://ethlima.com"}/sitemap.xml`,
    ],
  },
  // Prioridades de rutas clave para SEO
  transform: async (config, path) => {
    // Mayor prioridad a la home y la página del evento 2025
    const priority =
      path === "/"
        ? 1.0
        : path.startsWith("/2025")
          ? 0.9
          : path.startsWith("/tracks")
            ? 0.8
            : path.startsWith("/faq") || path.startsWith("/demoday")
              ? 0.7
              : 0.5;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
