import type { Metadata } from "next";

export const SITE_NAME = "Arc 11 Architect";
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Arc 11 Architect delivers construction, architectural, and interiors end-to-end solutions in Delhi NCR, India, across residential, commercial, and institutional projects.";
export const SITE_SHARE_IMAGE = "/brand/proportion-study.png?v=20260402-social";
export const SITE_LOCALE = "en_IN";
export const SITE_CATEGORY = "Architecture and Interior Design";
export const SITE_KEYWORDS = [
  "Arc 11 Architect",
  "ARC 11 Architect",
  "Arc Eleven Architect",
  "architecture studio Delhi NCR",
  "architect in Delhi NCR",
  "architecture firm India",
  "interior design studio Delhi",
  "architecture interiors studio India",
  "construction architectural interiors solutions",
  "end to end construction and interiors",
  "spatial strategy studio Delhi",
  "residential architect Delhi",
  "commercial architect India",
  "institutional architect Delhi",
  "architectural service India",
  "interior architecture studio",
  "Delhi architecture studio",
];

type MetadataImageInput =
  | string
  | {
      alt?: string;
      height?: number;
      url: string;
      width?: number;
    };

type BuildPageMetadataOptions = {
  category?: string;
  description: string;
  images?: MetadataImageInput[];
  keywords?: string[];
  openGraphType?: "website" | "article";
  path: string;
  robots?: Metadata["robots"];
  title: string;
};

export const DEFAULT_INDEX_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${normalizePath(path)}`;
}

function uniqueKeywords(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeImages(title: string, images?: MetadataImageInput[]) {
  const fallback = [
    {
      url: absoluteUrl(SITE_SHARE_IMAGE),
      width: 512,
      height: 512,
      alt: `${SITE_NAME} logo`,
    },
  ];

  if (!images?.length) {
    return fallback;
  }

  return images.map((image) => {
    if (typeof image === "string") {
      return {
        url: absoluteUrl(image),
        alt: `${title} | ${SITE_NAME}`,
      };
    }

    return {
      ...image,
      url: absoluteUrl(image.url),
      alt: image.alt || `${title} | ${SITE_NAME}`,
    };
  });
}

export function buildPageMetadata({
  category,
  description,
  images,
  keywords = [],
  openGraphType = "website",
  path,
  robots = DEFAULT_INDEX_ROBOTS,
  title,
}: BuildPageMetadataOptions): Metadata {
  const normalizedPath = normalizePath(path);
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const socialImages = normalizeImages(title, images);

  return {
    title,
    description,
    category: category || SITE_CATEGORY,
    keywords: uniqueKeywords([...SITE_KEYWORDS, ...keywords]),
    alternates: {
      canonical: normalizedPath,
    },
    robots,
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(normalizedPath),
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      countryName: "India",
      type: openGraphType,
      images: socialImages,
    },
    twitter: {
      card: socialImages.length > 0 ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: socialImages.map((image) => image.url),
    },
  };
}
