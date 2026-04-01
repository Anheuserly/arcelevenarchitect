import type { MetadataRoute } from "next";
import { listDocumentsServer } from "@/lib/appwriteServer";
import {
  getFeaturedProjects,
  getMoodboardImages,
  getPortfolioProjects,
} from "@/lib/portfolio";

type CareerRole = { slug?: string; status?: string };

const fallbackCareerSlugs = ["international-design-associate", "architect"];

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";
}

function absoluteUrl(baseUrl: string, pathname: string) {
  return `${baseUrl}${pathname}`;
}

async function getCareerSlugs(): Promise<string[]> {
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_CAREERS_COLLECTION_ID;
  if (!collectionId) return fallbackCareerSlugs;

  try {
    const roles = await listDocumentsServer<CareerRole>({ collectionId, limit: 200 });
    const slugs = roles
      .map((role) => String(role.slug || "").trim())
      .filter(Boolean);
    return Array.from(new Set([...fallbackCareerSlugs, ...slugs]));
  } catch {
    return fallbackCareerSlugs;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();
  const featuredProjects = getFeaturedProjects();
  const workProjects = getPortfolioProjects();
  const moodboards = getMoodboardImages().slice(0, 6);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: featuredProjects.map((project) => absoluteUrl(baseUrl, project.heroImage)),
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: moodboards.map((image) => absoluteUrl(baseUrl, image.src)),
    },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: workProjects.map((project) => absoluteUrl(baseUrl, project.heroImage)),
    },
    { url: `${baseUrl}/estimator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const workRoutes: MetadataRoute.Sitemap = workProjects.map((project) => ({
    url: `${baseUrl}${project.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    images: project.gallery.map((image) => absoluteUrl(baseUrl, image.src)),
  }));

  const careerSlugs = await getCareerSlugs();
  const careerRoutes: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${baseUrl}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...careerRoutes];
}
