import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

// ========================================================================
//                 🔥 FINAL ADVANCED METADATA – ARC 11 ARCHITECT
// ========================================================================
export const metadata = {
  title:
    "Arc 11 Architect – Modern Architecture, Interior Design, 3D Visualization & Turnkey Construction",

  description:
    "Arc 11 Architect delivers premium architectural design, luxury interiors, 3D visualizations, façade design, space planning, vastu-based layouts, residential & commercial architecture, renovations, and turnkey construction services across Delhi NCR and PAN India.",

keywords: [
    // BRAND
    "Arc 11 Architect",
    "Arc Eleven Architect",
    "Arc 11 Architecture Studio",

    // CORE SERVICES (GENERIC)
    "architecture studio India",
    "interior design studio Delhi NCR",
    "architectural design services",
    "interior design services",
    "residential architecture",
    "commercial architecture",
    "turnkey construction services",
    "3D architectural visualization",
    "facade design services",
    "space planning and design",

    // POSITIONING (SAFE)
    "architecture and interior design firm",
    "design and build studio",
    "architecture consultancy India",
  ],


  authors: [{ name: "Arc 11 Architect", url: "https://www.arcelevenarchitect.com" }],

  alternates: { canonical: "https://www.arcelevenarchitect.com" },

  openGraph: {
    title:
      "Arc 11 Architect – Luxury Architecture, Interiors & Construction Services",
    description:
      "Modern architecture, luxury interior design, 3D visualization, elevation design, renovation, and turnkey construction services across India.",
    url: "https://www.arcelevenarchitect.com",
    siteName: "Arc 11 Architect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arc 11 Architect – Architecture & Interior Design Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arc 11 Architect – Modern Architecture & Interior Design Studio",
    description:
      "Creative architectural design, luxury interiors, commercial spaces, and turnkey construction solutions.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/arc-11-architect.svg",
    shortcut: "/arc-11-architect.svg",
    apple: "/arc-11-architect.svg",
  },
};

// ========================================================================
//                              ROOT LAYOUT
// ========================================================================
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Arc 11 Architect" />
        <meta name="apple-mobile-web-app-title" content="Arc 11 Architect" />

        <link rel="icon" href="/arc-11-architect.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>

      <body className="bg-amcmep-bg text-amcmep-text antialiased font-sans text-sm">
        <Navigation />

        <main className="flex-grow p-4">{children}</main>

        <FloatingWhatsApp />
        <Footer />
        <SEO />
        <Analytics />
      </body>
    </html>
  );
}
