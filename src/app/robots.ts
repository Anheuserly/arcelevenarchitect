// app/robots.ts
import { MetadataRoute } from "next";

// 🔒 REQUIRED for `output: "export"`
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.arcelevenarchitect.com/sitemap.xml",
  };
}
