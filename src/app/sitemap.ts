// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  // 2️⃣ DYNAMIC ROUTES (Optional — Projects, Journal Articles)
  // Add this only if you have dynamic pages like:
  // /projects/[slug]
  // /journal/[slug]
  // ============================================================

  // Example: Fetch your projects (if you use JSON / DB / API)
  // Replace with real data source later.
  const projectSlugs: string[] = []; // e.g. ["modern-villa", "office-design"]

  const dynamicProjects: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Example: Fetch your journal/blog posts
  const journalSlugs: string[] = []; // e.g. ["interior-trends-2025", "architecture-guide"]

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
