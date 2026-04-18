import type { MetadataRoute } from "next";
import { listDirectAccessSlugs } from "@/lib/directAccessProfiles";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const hiddenRoutes = listDirectAccessSlugs().map((slug) => `/${slug}`);
  const coreAllows = ["/", "/sitemap.xml", "/manifest.webmanifest", "/llms.txt", "/llms-full.txt", "/.well-known/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "Googlebot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "bingbot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/portfolio/", "/brand/", "/contact/", "/.well-known/"],
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "GPTBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "ChatGPT-User",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "ClaudeBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "Claude-User",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "PerplexityBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "Google-Extended",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
      {
        userAgent: "CCBot",
        allow: coreAllows,
        disallow: ["/admin/", "/api/", ...hiddenRoutes],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
