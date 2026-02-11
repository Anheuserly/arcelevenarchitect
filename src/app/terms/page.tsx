import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for Arc 11 Architect website content, project information, and inquiries.",
  keywords: [
    "terms of use architecture website",
    "arc 11 architect terms",
    "project information disclaimer",
  ],
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-3xl px-6">
          <p className="kicker">Terms</p>
          <h1 className="mt-5 text-4xl">Terms of use</h1>
          <p className="mt-6 text-base">
            Project information shared on this site is for reference only and may not
            represent full project scope or specifications. All content is owned by
            Arc 11 Architect unless otherwise stated.
          </p>
          <p className="mt-4 text-base">
            For detailed proposals, timelines, and pricing, please contact our studio.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
