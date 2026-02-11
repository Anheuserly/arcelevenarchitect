import type { Metadata } from "next";
import AnalyticsScripts from "@/components/AnalyticsScripts";
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
  title: {
    default: "Arc 11 Architect",
    template: "%s | Arc 11 Architect",
  },
  description:
    "Arc 11 Architect is an architecture and interior design studio delivering residential, commercial, and institutional projects across Delhi NCR, Pan India, and internationally.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com"),
  keywords: [
    "Arc 11 Architect",
    "ARC 11 Architect",
    "architect in Delhi NCR",
    "interior design studio",
    "residential architect",
    "commercial architect",
    "architecture firm India",
    "Delhi architecture studio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arc 11 Architect",
    description:
      "Architecture and interior design studio working across Delhi NCR, Pan India, and international projects.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com",
    siteName: "Arc 11 Architect",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Arc 11 Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arc 11 Architect",
    description:
      "Architecture and interior design studio working across Delhi NCR, Pan India, and international projects.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
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
        <AnalyticsScripts />
        <SeoJsonLd />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
