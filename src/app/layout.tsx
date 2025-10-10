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
      </head>

      <body
        className={`bg-amcmep-bg text-amcmep-text antialiased font-sans text-sm`}
      >
        <Navigation />
        <main className="flex-grow p-4">{children}</main>

        {/* Embedded Google Map */}
        <section className="w-full mt-10 mb-10 flex justify-center">
          <iframe
            title="ARC 11 ARCHITECT Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.477987383593!2d77.1846772!3d28.5069594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8b99e39acef87ea3%3A0x6f5f84cfaba72863!2sARC%2011%20ARCHITECT!5e0!3m2!1sen!2sin!4v1730895500000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <Footer />
        <SEO />
        <Analytics />
      </body>
    </html>
  );
}