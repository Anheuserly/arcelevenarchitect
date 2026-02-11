import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
