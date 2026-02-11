import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Arc 11 Architect covering data submitted through contact, feedback, and career forms.",
  keywords: [
    "privacy policy architecture website",
    "arc 11 architect privacy",
    "data policy contact forms",
  ],
};

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
