import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Arc 11 Architect handles contact, project, career, and feedback data submitted through the website.",
  path: "/privacy",
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
    "privacy policy architecture website",
    "Arc 11 Architect privacy",
    "website inquiry data policy",
  ],
});

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-3xl px-6">
          <p className="kicker">Privacy</p>
          <h1 className="mt-5 text-4xl">Privacy policy</h1>
          <p className="mt-6 text-base">
            We only collect information submitted through our contact forms to respond to
            project inquiries. We do not sell or share your information with third parties
            outside project coordination.
          </p>
          <p className="mt-4 text-base">
            You may request deletion of your data at any time by emailing
            arcelevenarchitect@gmail.com.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
