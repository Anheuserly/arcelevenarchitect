import type { MetadataRoute } from "next";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { SITE_SHARE_IMAGE, SITE_URL, absoluteUrl } from "@/lib/seo";
import {
  getFeaturedProjects,
  getMoodboardImages,
  getPortfolioProjects,
} from "@/lib/portfolio";

type CareerRole = { slug?: string; status?: string };

const fallbackCareerSlugs = ["international-design-associate", "architect"];

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
  const now = new Date();
  const featuredProjects = getFeaturedProjects();
  const workProjects = getPortfolioProjects();
  const moodboards = getMoodboardImages().slice(0, 6);
  const shareImage = absoluteUrl(SITE_SHARE_IMAGE);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        ...featuredProjects.map((project) => absoluteUrl(project.heroImage)),
        ...moodboards.map((image) => absoluteUrl(image.src)),
      ],
    },
    {
      url: `${SITE_URL}/studio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [shareImage, ...moodboards.map((image) => absoluteUrl(image.src))],
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: workProjects.map((project) => absoluteUrl(project.heroImage)),
    },
    {
      url: `${SITE_URL}/estimator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/start-project`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/instagram`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.75,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/international`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [shareImage],
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        absoluteUrl("/contact/contact-card.png"),
        absoluteUrl("/contact/qr-code.png"),
      ],
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = workProjects.map((project) => ({
    url: `${SITE_URL}${project.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    images: project.gallery.map((image) => absoluteUrl(image.src)),
  }));

  const careerSlugs = await getCareerSlugs();
  const careerRoutes: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${SITE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
    images: [shareImage],
  }));

  return [...staticRoutes, ...workRoutes, ...careerRoutes];
}
