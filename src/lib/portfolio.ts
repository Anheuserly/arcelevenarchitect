import "server-only";

import { cache } from "react";
import { portfolioAssetFiles } from "./portfolio-assets.generated";

export type PortfolioCategory = "Residential" | "Commercial";

export type PortfolioImage = {
  alt: string;
  filename: string;
  label: string;
  src: string;
};

export type PortfolioProject = {
  category: PortfolioCategory;
  description: string;
  folder: string;
  gallery: PortfolioImage[];
  heroImage: string;
  heroLabel: string;
  href: string;
  imageCount: number;
  location: string;
  scope: string;
  slug: string;
  spaces: string[];
  status: string;
  title: string;
  year: string;
};

export type PortfolioCategoryBreakdown = {
  category: PortfolioCategory;
  imageCount: number;
  projectCount: number;
};

type ProjectConfig = Omit<
  PortfolioProject,
  "gallery" | "heroImage" | "heroLabel" | "href" | "imageCount"
> & {
  heroFile: string;
};

const projectConfigs: ProjectConfig[] = [
  {
    slug: "mr-tushar-faridabad",
    title: "Mr. Tushar Residence",
    location: "Faridabad",
    year: "Current",
    category: "Residential",
    status: "Visualization Set",
    scope: "Facade design, interior visualization, and room-wise detailing",
    description:
      "A contemporary family residence composed through dark framing, soft lighting, and a warm neutral palette across bedrooms, hall, kitchen, and pooja spaces.",
    folder: "portfolio/residential/mr-tushar-faridabad/gallery",
    heroFile: "front-elevation.png",
    spaces: [
      "Front elevation",
      "Hall",
      "Kitchen",
      "Pooja",
      "Master bedroom",
      "Parents bedroom",
      "Kids bedroom",
    ],
  },
  {
    slug: "mira-bagh-builder-floor",
    title: "Builder Floor, Mira Bagh",
    location: "West Delhi",
    year: "2023-24",
    category: "Residential",
    status: "Completed",
    scope: "Interior visualization and lighting-led detailing",
    description:
      "A builder-floor interior with modern classical restraint, layered ceilings, soft beige tones, and refined joinery details designed for everyday calm.",
    folder: "portfolio/residential/mira-bagh-builder-floor/gallery",
    heroFile: "mira-bagh-interior-19.jpeg",
    spaces: ["Bedrooms", "Kitchen", "Ceiling details", "Wall elevations"],
  },
  {
    slug: "mr-vikram-residence",
    title: "Mr. Vikram Residence",
    location: "Delhi NCR",
    year: "Current",
    category: "Residential",
    status: "Visualization Set",
    scope: "Exterior, landscape, and arrival experience studies",
    description:
      "A private residence study focused on a polished arrival sequence, illuminated boundary treatments, and elegant exterior composition for evening ambience.",
    folder: "portfolio/residential/mr-vikram-residence/gallery",
    heroFile: "mr-vikram-exterior-01.png",
    spaces: ["Arrival court", "Landscape edge", "Facade studies", "Boundary detailing"],
  },
  {
    slug: "aiims-extension-block",
    title: "AIIMS Extension Block",
    location: "New Delhi",
    year: "2019",
    category: "Commercial",
    status: "Completed",
    scope: "Institutional design visualization and landscape approach studies",
    description:
      "An institutional expansion visualized through massing, landscape movement, and exterior experience views for a large healthcare campus setting.",
    folder: "portfolio/commercial/aiims-extension-block/gallery",
    heroFile: "aiims-extension-block-01.jpg",
    spaces: ["Aerial massing", "Landscape paths", "Campus frontage", "Approach views"],
  },
];

function toPublicSrc(relativePath: string) {
  return encodeURI(`/${relativePath}`);
}

function normalizeLabel(name: string) {
  const label = name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return label.replace(/\b\w/g, (character) => character.toUpperCase());
}

function listImages(folder: string, title: string) {
  return (portfolioAssetFiles[folder] ?? []).map((filename) => {
      const label = normalizeLabel(filename);

      return {
        alt: `${title} - ${label}`,
        filename,
        label,
        src: toPublicSrc(`${folder}/${filename}`),
      } satisfies PortfolioImage;
    });
}

function createProject(config: ProjectConfig): PortfolioProject {
  const gallery = listImages(config.folder, config.title);
  const heroAsset = gallery.find((image) => image.filename === config.heroFile) ?? gallery[0];

  return {
    ...config,
    gallery,
    heroImage: heroAsset?.src ?? "",
    heroLabel: heroAsset?.label ?? "Gallery pending",
    href: `/work/${config.slug}`,
    imageCount: gallery.length,
  };
}

export const getPortfolioProjects = cache(() => projectConfigs.map(createProject));

export function getPortfolioProject(slug: string) {
  return getPortfolioProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return getPortfolioProjects().slice(0, 4);
}

export function getPortfolioStats() {
  const projects = getPortfolioProjects();

  return {
    averageGallerySize: Math.round(
      projects.reduce((count, project) => count + project.imageCount, 0) / projects.length,
    ),
    categories: new Set(projects.map((project) => project.category)).size,
    images: projects.reduce((count, project) => count + project.imageCount, 0),
    projects: projects.length,
  };
}

export function getPortfolioCategoryBreakdown(): PortfolioCategoryBreakdown[] {
  const projects = getPortfolioProjects();

  return (["Residential", "Commercial"] as const).map((category) => {
    const categoryProjects = projects.filter((project) => project.category === category);

    return {
      category,
      imageCount: categoryProjects.reduce((count, project) => count + project.imageCount, 0),
      projectCount: categoryProjects.length,
    };
  });
}

export function getPortfolioInsights() {
  const projects = getPortfolioProjects();
  const categoryBreakdown = getPortfolioCategoryBreakdown();
  const largestGalleryProject = [...projects].sort(
    (left, right) => right.imageCount - left.imageCount,
  )[0];
  const totalSpaces = new Set(projects.flatMap((project) => project.spaces)).size;
  const leadCategory = [...categoryBreakdown].sort(
    (left, right) => right.projectCount - left.projectCount,
  )[0];

  return {
    categoryBreakdown,
    largestGalleryProject,
    leadCategory,
    totalSpaces,
  };
}

export const getMoodboardImages = cache(() =>
  listImages(
    "portfolio/references/moodboards/modern-contemporary-interior",
    "Modern Contemporary Interior Moodboard",
  ),
);
