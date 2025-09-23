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
  authors: [{ name: "ARC 11 ARCHITECT", url: "https://www.amcmep.in" }],
  alternates: { canonical: "https://www.amcmep.in" },
  openGraph: {
    title: "ARC 11 ARCHITECT - Modern Architecture & Interior Design",
    description:
      "Creative architectural, interior, and construction solutions across Delhi NCR.",
    url: "https://www.amcmep.in",
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
    icon: "/arcelevenarchitect.svg",
    shortcut: "/arcelevenarchitect.svg",
    apple: "/arcelevenarchitect.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/amcmep.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:opsz,wght@14..32,100..900&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-amcmep-bg font-inter text-sm text-amcmep-text antialiased">
        <Navigation />
        <main className="flex-grow p-4">{children}</main>
        <Footer />

        {/* SEO JSON-LD */}
        <SEO />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
