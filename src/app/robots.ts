import type { MetadataRoute } from "next";
import { listDirectAccessSlugs } from "@/lib/directAccessProfiles";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const hiddenRoutes = listDirectAccessSlugs().map((slug) => `/${slug}`);
  const coreAllows = ["/", "/sitemap.xml", "/manifest.webmanifest", "/.well-known/"];

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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
