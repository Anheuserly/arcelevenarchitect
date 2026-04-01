/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Arc 11 Architect for architecture and interior design projects. Reach our head office and branch office in Delhi.",
  keywords: [
    "contact architect Delhi",
    "Arc 11 office address",
    "architecture consultation",
    "interior design inquiry",
  ],
};

const consultationModes = [
  "Architecture and interior design consultations",
  "Residential and builder-floor design inquiries",
  "Commercial and institutional project discussions",
  "Portfolio presentations and capability walkthroughs",
];

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="grid gap-6">
              <div className="card p-8 lg:p-10">
                <p className="kicker">Contact</p>
                <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                  Let’s start with the site, scope, and ambition for your project.
                </h1>
                <p className="mt-5 max-w-2xl text-base">
                  Share your timeline, budget range, and required services. We respond with
                  the right next step, whether that means a consultation, a presentation, or a
                  project-specific roadmap.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackingPdfLink
                    href="/documents/portfolio-shashank-saini.pdf"
                    className="button-primary visited:text-white hover:text-white"
                    placement="contact_intro"
                  >
                    Portfolio PDF
                  </TrackingPdfLink>
                  <TrackingPdfLink
                    href="/documents/company-profile.pdf"
                    className="button-secondary"
                    placement="contact_intro"
                  >
                    Company Profile
                  </TrackingPdfLink>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Reach Us
                  </p>
                  <div className="mt-5 space-y-6 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                        Head Office
                      </p>
                      <p className="mt-2">D-21, Chhatarpur Hills, II Floor</p>
                      <p>Ambedkar Colony, New Delhi-74</p>
                      <a
                        className="mt-3 inline-block text-xs uppercase tracking-[0.28em] text-[var(--foreground)]"
                        href="https://www.google.com/maps/place/ARC+11+ARCHITECT/@28.5068683,77.1821208,17z/data=!3m1!4b1!4m6!3m5!1s0x8b99e39acef87ea3:0x6f5f84cfaba72863!8m2!3d28.5068683!4d77.1846957!16s%2Fg%2F11x60035f9?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                        rel="noreferrer"
                        target="_blank"
                      >
                        View on Maps
                      </a>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                        Branch Office
                      </p>
                      <p className="mt-2">E1, DDA Flats, A2/04, Rangpuri Pahari, Vasant Kunj</p>
                      <p>New Delhi, Delhi 110070</p>
                      <a
                        className="mt-3 inline-block text-xs uppercase tracking-[0.28em] text-[var(--foreground)]"
                        href="https://www.google.com/maps/place/Arc+11+Architect/@28.537786,77.1305869,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1d9dea5dc7e9:0x4595ec7be90d05d7!8m2!3d28.537786!4d77.1331618!16s%2Fg%2F11yxg50dsz?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                        rel="noreferrer"
                        target="_blank"
                      >
                        View on Maps
                      </a>
                    </div>

                    <div className="border-t border-[var(--line)] pt-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                        Direct
                      </p>
                      <p className="mt-2">arcelevenarchitect@gmail.com</p>
                      <p className="mt-2">+91 8527378555</p>
                      <p className="mt-2">+91 96500 58444</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]">
                    <img
                      src="/contact/contact-card.png"
                      alt="Arc 11 Architect contact card"
                      className="w-full"
                    />
                  </div>

                  <div className="card p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Consultation Modes
                    </p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {consultationModes.map((item) => (
                        <li key={item} className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-4">
                      <img
                        src="/contact/qr-code.png"
                        alt="Arc 11 Architect QR code"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 lg:p-10">
              <p className="kicker">Project Inquiry</p>
              <h2 className="mt-4 text-4xl">Tell us what you’re planning.</h2>
              <p className="mt-4 max-w-xl text-sm">
                The more context you share about site, timeline, deliverables, and level of
                design support, the more precisely we can guide the next conversation.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
