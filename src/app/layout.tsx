import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";
import FloatingWhatsApp from "../components/FloatingWhatsApp";


// ========================================================================
//                 🔥 FINAL ADVANCED METADATA FOR ARC 11 ARCHITECT
// ========================================================================
export const metadata = {
  title:
    "ARC 11 ARCHITECT – Modern Architecture, Interior Design, 3D Visualization, Construction & Renovation Experts",

  description:
    "ARC 11 ARCHITECT delivers high-end architectural design, luxury interiors, 3D visualizations, façade design, conceptual space planning, vastu-based layouts, commercial interiors, residential architecture, office design, restaurant & café interiors, farmhouse planning, villa design, apartment interiors, workspace modernization, and turnkey construction services across Delhi NCR and PAN India.",

  keywords: [
    // BRAND
    "ARC 11 Architect",
    "Arc Eleven Architect",
    "ARC 11 Studio",
    "architecture firm Delhi NCR",
    "interior design studio India",

    // ARCHITECTURE
    "best architects in Delhi",
    "architects in Delhi NCR",
    "top architecture firms Delhi",
    "modern architecture India",
    "architectural planning Delhi",
    "building architecture design",
    "luxury home architect Delhi",
    "villa architecture designers",
    "farmhouse architectural design",
    "commercial architecture India",
    "office architecture design",
    "bungalow architectural design",
    "apartment layout plans",
    "townhouse architectural planning",
    "industrial architecture consultants",
    "residential architectural services",

    // INTERIOR DESIGN
    "interior designers in Delhi NCR",
    "luxury interior design Delhi",
    "modern interior designers India",
    "3BHK interior design",
    "4BHK interior design",
    "villa interior designers",
    "office interior designers",
    "modular kitchen designers",
    "wardrobe design India",
    "restaurant interior designers",
    "cafe interior design",
    "retail store interior design",
    "hotel interior designers India",
    "commercial interior design Delhi",
    "kids room interior design",
    "minimalist interior design India",

    // SPECIALIZED DESIGN
    "3D visualization architects",
    "3D rendering services",
    "architectural walkthrough design",
    "façade design experts",
    "elevation designers Delhi",
    "landscape designers Delhi NCR",
    "luxury exterior design India",
    "modern home elevation design",

    // RENOVATION & TURNKEY
    "home renovation contractors Delhi",
    "office renovation services",
    "turnkey interior contractors",
    "turnkey construction company Delhi",
    "complete home renovation",
    "kitchen renovation Delhi",
    "bathroom renovation India",

    // DRAFTING & DRAWINGS
    "architectural drawing services",
    "floor plan design India",
    "MEP & structural drawings",
    "interior working drawings",
    "municipal approval drawings",
    "building plan approval Delhi",

    // VASTU DESIGN
    "Vastu compliant architecture",
    "Vastu home design Delhi",
    "Vastu interior planning",
    "Vastu architect near me",

    // CONSTRUCTION
    "civil construction company Delhi",
    "residential construction Delhi",
    "commercial construction contractors India",
    "building contractors Delhi NCR",
    "villa construction experts",
    "interior execution company Delhi",

    // HIGH-INTENT SEARCH KEYWORDS
    "best architect near me",
    "interior designer near me",
    "architecture firm near me",
    "house design architect Delhi",
    "modern house design India",
    "luxury home interior design India",
    "Delhi top architect",
    "high-end interior design Delhi",

    // GEOGRAPHIC SEO
    "architects in Delhi NCR",
    "architects in Gurugram",
    "interior designers Gurugram",
    "architects in Noida",
    "interior design Faridabad",
    "Delhi architecture consultancy",
    "India architecture firm",

    // LSI SEO EXTENSIONS
    "space planning experts",
    "home interior makeover",
    "commercial space designers",
    "corporate interior specialists",
    "fabrication and carpentry services",
    "material selection consultants",
    "luxury furniture design Delhi",
    "end-to-end architecture solutions",
    "modern minimalist design India"
  ],

  authors: [{ name: "ARC 11 ARCHITECT", url: "https://www.arcelevenarchitect.com" }],

  alternates: { canonical: "https://www.arcelevenarchitect.com" },

  openGraph: {
    title:
      "ARC 11 ARCHITECT – Luxury Architecture, Interiors, 3D Visualization & Construction Services",
    description:
      "Premium modern architecture, luxury interior design, 3D visualization, elevation design, renovation, and turnkey construction services across Delhi NCR & PAN India.",
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
    title: "ARC 11 ARCHITECT – Modern Architecture & Interior Design Experts",
    description:
      "Creative architectural design, luxury interiors, commercial spaces, and turnkey construction solutions across India.",
    images: ["/og-image.png"],
    creator: "@arcelevenarchitect",
  },

  icons: {
    icon: "/Arcelevenarchitect.svg",
    shortcut: "/Arcelevenarchitect.svg",
    apple: "/Arcelevenarchitect.svg",
  },
};

// ========================================================================
//                              ROOT LAYOUT
// ========================================================================
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Arcelevenarchitect.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
