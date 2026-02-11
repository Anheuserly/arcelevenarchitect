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

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker">Contact</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">Let’s start with your site, scope, and story.</h1>
            <p className="mt-6 max-w-xl text-lg">
              Tell us about your timeline, budget range, and functional needs. We will reply
              within 48 hours with next steps and scheduling options.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackingPdfLink
                href="/docs/Port-Folio_Shashank_Saini.pdf"
                className="rounded-full bg-[var(--foreground)] px-5 py-2 text-xs uppercase tracking-[0.22em] text-white visited:text-white hover:text-white"
                placement="contact_intro"
              >
                Portfolio PDF
              </TrackingPdfLink>
              <TrackingPdfLink
                href="/docs/ARC11ARCHITECT_PROFILE.pdf"
                className="rounded-full border border-[var(--line)] bg-white px-5 py-2 text-xs uppercase tracking-[0.22em]"
                placement="contact_intro"
              >
                Company Profile
              </TrackingPdfLink>
            </div>

            <div className="mt-10 space-y-4 text-sm text-[var(--muted)]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Head Office
                </p>
                <p className="mt-2">D-21, Chhatarpur Hills, II Floor</p>
                <p>Ambedkar Colony, New Delhi-74</p>
                <a
                  className="mt-2 inline-block text-xs uppercase tracking-[0.3em] text-[var(--foreground)]"
                  href="https://www.google.com/maps/place/ARC+11+ARCHITECT/@28.5068683,77.1821208,17z/data=!3m1!4b1!4m6!3m5!1s0x8b99e39acef87ea3:0x6f5f84cfaba72863!8m2!3d28.5068683!4d77.1846957!16s%2Fg%2F11x60035f9?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                  rel="noreferrer"
                  target="_blank"
                >
                  View on Maps
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Branch Office
                </p>
                <p className="mt-2">
                  E1, DDA Flats, A2/04, Rangpuri Pahari, Vasant Kunj
                </p>
                <p>New Delhi, Delhi 110070</p>
                <a
                  className="mt-2 inline-block text-xs uppercase tracking-[0.3em] text-[var(--foreground)]"
                  href="https://www.google.com/maps/place/Arc+11+Architect/@28.537786,77.1305869,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1d9dea5dc7e9:0x4595ec7be90d05d7!8m2!3d28.537786!4d77.1331618!16s%2Fg%2F11yxg50dsz?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                  rel="noreferrer"
                  target="_blank"
                >
                  View on Maps
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Email
                </p>
                <p className="mt-2">arcelevenarchitect@gmail.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Phone
                </p>
                <p className="mt-2">+91 8527378555</p>
                <p className="mt-2">+91-96500 58444</p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
