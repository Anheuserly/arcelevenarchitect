import type { Metadata } from "next";

export const SITE_NAME = "Arc 11 Architect";
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com").replace(/\/$/, "");
export const BUSINESS_EMAIL = "arcelevenarchitect@gmail.com";
export const BUSINESS_PHONE_PRIMARY = "+91-85273-78555";
export const BUSINESS_PHONE_SECONDARY = "+91-96500-58444";
export const HEAD_OFFICE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Plot+No.+535%2C+Second+Floor%2C+Left+Side%2C+Khasra+No.+60%2C+128-D21%2C+Chattarpur+Pahadi%2C+New+Delhi+110074";
export const BRANCH_OFFICE_MAP_URL =
  "https://www.google.com/maps/place/Arc+11+Architect/@28.537786,77.1305869,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1d9dea5dc7e9:0x4595ec7be90d05d7!8m2!3d28.537786!4d77.1331618!16s%2Fg%2F11yxg50dsz";
export const BUSINESS_SAME_AS = [
  "https://www.instagram.com/arc11architect/",
  "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
  "https://www.facebook.com/profile.php?id=61578009358525",
  "https://koloapp.in/delhi/architects/shashank-saini--delhi",
  "https://www.justdial.com/Delhi/Arc-11-Architect-Near-Jindal-Store-Near-Dhan-Mill-Chattarpur/011PXX11-XX11-260316154855-M3B7_BZDET",
];
export const JUSTDIAL_URL =
  "https://www.justdial.com/Delhi/Arc-11-Architect-Near-Jindal-Store-Near-Dhan-Mill-Chattarpur/011PXX11-XX11-260316154855-M3B7_BZDET";
export const SERVICE_AREAS = [
  "Delhi NCR",
  "Pan India",
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Dubai",
  "Qatar",
  "United Arab Emirates",
  "Saudi Arabia",
  "Bahrain",
  "Oman",
  "Kuwait",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Australia",
  "New Zealand",
  "South Africa",
];
export const AI_DISCOVERY_PLATFORMS = [
  "ChatGPT",
  "OpenAI Search",
  "Claude",
  "Perplexity",
  "Google AI features",
  "Common Crawl",
];
export const HEAD_OFFICE_ADDRESS = {
  streetAddress:
    "Plot No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi",
  addressLocality: "New Delhi",
  addressRegion: "Delhi",
  postalCode: "110074",
  addressCountry: "IN",
};
export const BRANCH_OFFICE_ADDRESS = {
  streetAddress: "E1, DDA Flats, A2/04, Rangpuri Pahari, Vasant Kunj",
  addressLocality: "New Delhi",
  addressRegion: "Delhi",
  postalCode: "110070",
  addressCountry: "IN",
};
export const HEAD_OFFICE_GEO = {
  latitude: 28.5068683,
  longitude: 77.1846957,
};
export const BRANCH_OFFICE_GEO = {
  latitude: 28.537786,
  longitude: 77.1331618,
};
export const BUSINESS_OPENING_HOURS = [
  { dayOfWeek: "Monday", opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Tuesday", opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Wednesday", opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Thursday", opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Friday", opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Saturday", opens: "10:00", closes: "19:00" },
];
export const SITE_DESCRIPTION =
  "Arc 11 Architect delivers construction, architectural, and interiors end-to-end solutions from Delhi NCR across Pan India and selected international residential, commercial, and institutional projects.";
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
  "architect in New Delhi",
  "architect in Chattarpur",
  "interior designer Delhi NCR",
  "turnkey interior contractor Delhi NCR",
  "architectural consultant Delhi India",
  "commercial interiors Delhi NCR",
  "residential commercial institutional architect",
  "pan India architecture firm",
  "international architecture studio India",
  "architecture firm Germany India",
  "architecture studio Dubai from India",
  "architecture firm Qatar from India",
  "architecture studio UAE from India",
  "architecture studio Saudi Arabia from India",
  "architecture studio UK from India",
  "architecture studio USA from India",
  "architecture firm worldwide from India",
  "global architecture and interiors studio",
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
