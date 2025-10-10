// app/page.tsx
"use client";

import HeroSection from "../components/HeroSection";

import WhoWeAreSection from "../components/WhoWeAreSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";

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