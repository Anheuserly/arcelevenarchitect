import EstimatorCalculator from "@/components/EstimatorCalculator";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Architecture and Interior Cost Estimator",
  description:
    "Estimate architecture and interior project budgets with Arc 11 Architect's project cost estimator for homes, commercial spaces, and multi-scope design work.",
  path: "/estimator",
  images: [
    {
      url: "/brand/proportion-study.png",
      alt: "Arc 11 Architect estimator share image",
    },
  ],
  keywords: [
    "architecture cost estimator",
    "interior design cost calculator India",
    "project budget estimator Delhi NCR",
    "construction cost planning tool",
    "residential project calculator",
  ],
});

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
