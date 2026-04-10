import type { Metadata } from "next";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import MediaProtection from "@/components/MediaProtection";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import ScrollRevealController from "@/components/ScrollRevealController";
import { StartProjectModalProvider } from "@/components/StartProjectModalProvider";
import {
  DEFAULT_INDEX_ROBOTS,
  SITE_CATEGORY,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SHARE_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import { Playfair_Display, Roboto } from "next/font/google";
import SeoJsonLd from "@/components/SeoJsonLd";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  category: SITE_CATEGORY,
  keywords: SITE_KEYWORDS,
  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/brand/proportion-study.png", type: "image/png" }],
    apple: [{ url: "/brand/proportion-study.png", type: "image/png" }],
    shortcut: ["/brand/proportion-study.png"],
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    countryName: "India",
    type: "website",
    images: [
      {
        url: absoluteUrl(SITE_SHARE_IMAGE),
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(SITE_SHARE_IMAGE)],
  },
  robots: DEFAULT_INDEX_ROBOTS,
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.5068683;77.1846957",
    ICBM: "28.5068683, 77.1846957",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <StartProjectModalProvider>
          <AnalyticsScripts />
          <MediaProtection />
          <PageTransitionOverlay />
          <ScrollRevealController />
          <SeoJsonLd />
          {children}
          <WhatsAppFloat />
        </StartProjectModalProvider>
      </body>
    </html>
  );
}
