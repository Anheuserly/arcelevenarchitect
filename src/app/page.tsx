// app/page.tsx


import HeroSection from "../components/HeroSection";
import WhoWeAreSection from "../components/WhoWeAreSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";

/* =====================================================
   HOME PAGE METADATA (MOST IMPORTANT FOR SEO)
===================================================== */
export const metadata = {
  title:
    "Arc 11 Architect – Architecture & Interior Design Studio in Delhi NCR",
  description:
    "Arc 11 Architect is a New Delhi–based architecture and interior design studio offering residential and commercial architecture, luxury interiors, 3D visualization, renovation, and turnkey construction services across Delhi NCR and PAN India.",
  keywords: [
    // BRAND
    "Arc 11 Architect",
    "Arc Eleven Architect",

    // CORE SERVICES
    "architecture firm in Delhi NCR",
    "interior designers in Delhi NCR",
    "architectural design services",
    "interior design services",
    "residential architecture Delhi",
    "commercial architecture Delhi NCR",
    "luxury interior design Delhi",
    "turnkey construction services",

    // SPECIALIZED
    "3D architectural visualization",
    "facade design services",
    "modern house design Delhi",
    "villa architecture design",
    "apartment interior design",

    // POSITIONING
    "architecture and interior design studio",
    "design and build firm India",
  ],
  alternates: { canonical: "https://www.arcelevenarchitect.com" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen font-['Ubin_Sans']">
      <HeroSection />
      <WhoWeAreSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
