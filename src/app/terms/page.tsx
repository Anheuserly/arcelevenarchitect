import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Review the terms covering Arc 11 Architect website content, portfolio material, studio information, and inquiry use.",
  path: "/terms",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "terms of use architecture website",
    "Arc 11 Architect terms",
    "portfolio content disclaimer",
  ],
});

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
