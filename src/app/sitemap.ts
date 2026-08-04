import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PRIVATE_ROUTES = [
  "/admin",
  "/dashboard",
  "/dashboard/settings",
  "/judge",
  "/login",
  "/mentor",
  "/mentor/dashboard",
  "/register",
  "/apply-mentor",
  "/speaker",
  "/sponsor",
  "/api",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split("T")[0];

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/2025/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tracks/arbitrum/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demoday/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/conduct/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return routes.filter((route) => {
    const path = new URL(route.url).pathname;
    return !PRIVATE_ROUTES.some(
      (privateRoute) =>
        path === privateRoute ||
        path.startsWith(privateRoute === "/api" ? "/api" : `${privateRoute}/`)
    );
  });
}
