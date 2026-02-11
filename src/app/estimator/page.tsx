import type { Metadata } from "next";
import EstimatorCalculator from "@/components/EstimatorCalculator";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Estimator",
  description:
    "Estimate architecture and interior project cost with location-based currency conversion and configurable project inputs.",
  keywords: [
    "architecture cost estimator",
    "interior design cost calculator",
    "construction budget estimator",
    "project cost calculator India",
  ],
};

export default function EstimatorPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker">Estimator</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">Project Cost Estimator</h1>
          <p className="mt-6 max-w-3xl text-lg">
            Get a preliminary budget estimate using project type, size, quality, timeline,
            features, and country-specific currency conversion.
          </p>
          <div className="mt-12">
            <EstimatorCalculator />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
