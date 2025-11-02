import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";

export const metadata = {
  title: "ARC 11 ARCHITECT - Modern Architecture & Interior Design",
  description:
    "ARC 11 ARCHITECT provides creative architectural design, interior solutions, and construction services across Delhi NCR.",
  keywords: [
    "architecture Delhi",
    "interior design Delhi",
    "modern building design",
    "residential architecture",
    "commercial interior",
    "sustainable architecture",
  ],
  authors: [{ name: "ARC 11 ARCHITECT", url: "https://www.arcelevenarchitect.com" }],
  alternates: { canonical: "https://www.arcelevenarchitect.com" },
  openGraph: {
    title: "ARC 11 ARCHITECT - Modern Architecture & Interior Design",
    description:
      "Creative architectural, interior, and construction solutions across Delhi NCR.",
    url: "https://www.arcelevenarchitect.com",
    siteName: "ARC 11 ARCHITECT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARC 11 ARCHITECT Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC 11 ARCHITECT - Modern Architecture & Interior Design",
    description:
      "Creative architectural and interior solutions across Delhi NCR.",
    images: ["/og-image.png"],
    creator: "@arcelevenarchitect",
  },
  icons: {
    icon: "/Arcelevenarchitect.svg",
    shortcut: "/Arcelevenarchitect.svg",
    apple: "/Arcelevenarchitect.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Arcelevenarchitect.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>

      <body
        className={`bg-amcmep-bg text-amcmep-text antialiased font-sans text-sm`}
      >
        <Navigation />
        <main className="flex-grow p-4">{children}</main>

    

        <Footer />
        <SEO />
        <Analytics />
      </body>
    </html>
  );
}