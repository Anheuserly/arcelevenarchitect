// app/sitemap.ts
import { MetadataRoute } from "next";

// 🔒 REQUIRED for `output: "export"`
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.arcelevenarchitect.com";

  // ============================================================
  // 1️⃣ STATIC ROUTES (Main website pages)
  // ============================================================

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ============================================================
  // 2️⃣ DYNAMIC ROUTES (STATICALLY KNOWN SLUGS ONLY)
  // IMPORTANT: Must be build-time constants for static export
  // ============================================================

  const projectSlugs: string[] = [];
  const journalSlugs: string[] = [];

  const dynamicProjects: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dynamicJournal: MetadataRoute.Sitemap = journalSlugs.map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  // ============================================================
  // 3️⃣ COMBINE EVERYTHING
  // ============================================================

  return [...staticRoutes, ...dynamicProjects, ...dynamicJournal];
}
