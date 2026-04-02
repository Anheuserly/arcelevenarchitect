/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import TrackingPdfLink from "@/components/TrackingPdfLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Arc 11 Architect for general inquiries, collaborations, vendor introductions, and direct studio communication.",
  keywords: [
    "contact architect Delhi",
    "Arc 11 office address",
    "design studio inquiry",
    "architect collaboration contact",
  ],
};

const inquiryTopics = [
  "General studio questions and service clarifications",
  "Collaborator, consultant, and vendor introductions",
  "Press, publication, and profile-sharing requests",
  "Meeting coordination, office visits, and follow-ups",
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
                  General inquiries, studio correspondence, and collaborations.
                </h1>
                <p className="mt-5 max-w-2xl text-base">
                  Use this page when you want to ask a question, introduce your practice,
                  coordinate a meeting, or connect with the studio directly. If you want to
                  hire Arc 11 for a live commission, use the dedicated project intake flow.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:arcelevenarchitect@gmail.com"
                    className="button-primary visited:text-white hover:text-white"
                  >
                    Email Studio
                  </a>
                  <StartProjectTrigger
                    className="button-secondary"
                    source="contact_hero_secondary"
                  >
                    Start a Project
                  </StartProjectTrigger>
                  <TrackingPdfLink
                    href="/documents/portfolio-shashank-saini.pdf"
                    className="button-secondary"
                    placement="contact_intro"
                  >
                    Portfolio PDF
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
                  <div className="framed-media overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]">
                    <img
                      src="/contact/contact-card.png"
                      alt="Arc 11 Architect contact card"
                      className="w-full"
                    />
                  </div>

                  <div className="card p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Best Use For
                    </p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {inquiryTopics.map((item) => (
                        <li key={item} className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="framed-media mt-6 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-4">
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
              <p className="kicker">Quick Inquiry</p>
              <h2 className="mt-4 text-4xl">Ask a question or introduce yourself.</h2>
              <p className="mt-4 max-w-xl text-sm">
                This form is for general contact, collaborations, vendors, and studio
                communication. If you are sharing a real project brief, head to the dedicated
                intake page so we can review it properly.
              </p>
              <div className="mt-5 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.66)] p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  Hiring The Studio?
                </p>
                <p className="mt-2">
                  Use the project intake page for residential, commercial, institutional, and
                  turnkey work.
                </p>
                <StartProjectTrigger
                  className="mt-4 inline-flex text-xs uppercase tracking-[0.28em] text-[var(--foreground)]"
                  source="contact_inline_prompt"
                >
                  Go to Start a Project
                </StartProjectTrigger>
              </div>
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
