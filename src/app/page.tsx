import Link from "next/link";
import type { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import WorkSlider from "@/components/WorkSlider";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Arc 11 Architect delivers architecture and interior design projects across residential, commercial, and institutional sectors.",
  keywords: [
    "architect Delhi NCR",
    "architecture firm India",
    "interior design Delhi",
    "residential architecture",
    "commercial interiors",
  ],
};

const highlights = [
  {
    title: "Residential sanctuaries",
    description:
      "Tailored homes that balance privacy and openness, built for evolving family rituals.",
  },
  {
    title: "Workplace clarity",
    description:
      "Composed, light-led workplaces that improve focus and brand presence.",
  },
  {
    title: "Hospitality calm",
    description:
      "Warm, layered spaces that support guest flow, comfort, and brand storytelling.",
  },
];

const work = [
  {
    name: "Private Residence, 8000 Sq. Ft. Built-Up",
    location: "Signature City, Ghaziabad",
    scope: "Residential • On-Going",
  },
  {
    name: "Jorbagh Villa, 4800 Sq. Ft. Built-Up",
    location: "Greater Noida",
    scope: "Residential • Completed",
  },
  {
    name: "AIIMS Extension Block",
    location: "New Delhi",
    scope: "Commercial • Completed",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main>
        <WorkSlider />

        <section className="section-padding">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="kicker">Design Focus</p>
                <h2 className="mt-4 text-3xl sm:text-4xl">
                  Architecture that feels composed, connected, and quietly luxurious.
                </h2>
              </div>
              <p className="max-w-xl text-base">
                For over 10 years, we have delivered projects across Delhi NCR, Pan India,
                and internationally, including Germany and Turkey. We work with clarity and
                precision, pairing rigorous planning with a sensitive material palette.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="subtle-card p-6">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Selected Clients
              </p>
              <div className="mt-4 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 lg:grid-cols-4">
                <div className="subtle-card px-4 py-3">Private Residence Clients</div>
                <div className="subtle-card px-4 py-3">Developer Collaborations</div>
                <div className="subtle-card px-4 py-3">Healthcare Institutions</div>
                <div className="subtle-card px-4 py-3">Hospitality Partners</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackingPdfLink
                href="/docs/Port-Folio_Shashank_Saini.pdf"
                className="rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.24em] text-white visited:text-white hover:text-white"
                placement="home_highlight"
              >
                View Portfolio PDF
              </TrackingPdfLink>
              <TrackingPdfLink
                href="/docs/ARC11ARCHITECT_PROFILE.pdf"
                className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-xs uppercase tracking-[0.24em]"
                placement="home_highlight"
              >
                View Company Profile
              </TrackingPdfLink>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="kicker">Signature Work</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Selected environments</h2>
              <div className="mt-8 space-y-6">
                {work.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-2 border-b border-[var(--line)] pb-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl">{item.name}</h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-sm">{item.scope}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Process</p>
              <ol className="mt-6 space-y-4 text-sm text-[var(--muted)]">
                <li>
                  1. Discovery workshops to define vision, scope, and functional priorities.
                </li>
                <li>
                  2. Concept & spatial planning for layout efficiency and experiential flow.
                </li>
                <li>
                  3. Design development with materials, lighting, and custom detailing.
                </li>
                <li>
                  4. Technical documentation, coordination, and on-site execution support.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
            <div className="card p-10">
              <p className="kicker">Studio Ethos</p>
              <h2 className="mt-4 text-3xl">Materials with memory.</h2>
              <p className="mt-4 text-base">
                We favor stone, timber, lime plaster, and tactile metals to build atmosphere
                without excess. Each palette is refined to stay elegant across decades.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-semibold text-[var(--foreground)]">18</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Team members
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-[var(--foreground)]">35</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Cities served
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-[var(--foreground)]">92%</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Repeat clients
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-[var(--foreground)]">08</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Awards
                  </p>
                </div>
              </div>
            </div>
            <div className="subtle-card p-10">
              <p className="kicker">Client Experience</p>
              <h2 className="mt-4 text-3xl">Highly guided, deeply collaborative.</h2>
              <p className="mt-4 text-base">
                We share clear milestones, transparent budgets, and weekly progress updates.
                Every decision is mapped to intent, performance, and longevity.
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm text-[var(--muted)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Design options per phase</span>
                  <span className="text-[var(--foreground)]">2-3</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Average revision cycle</span>
                  <span className="text-[var(--foreground)]">10 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Post-handover support</span>
                  <span className="text-[var(--foreground)]">6 months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="card p-10 lg:p-12">
              <p className="kicker">Feedback</p>
              <h2 className="mt-4 text-3xl">What clients share</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="subtle-card p-6">
                  <p className="text-sm">
                    “Clear timelines, elegant detailing, and a calm process throughout.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Residential Client
                  </p>
                </div>
                <div className="subtle-card p-6">
                  <p className="text-sm">
                    “Every space feels intentional. The team was responsive and precise.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Commercial Client
                  </p>
                </div>
                <div className="subtle-card p-6">
                  <p className="text-sm">
                    “Materials and lighting were handled with real care and expertise.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Hospitality Client
                  </p>
                </div>
              </div>
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="text-2xl">Share your feedback</h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    Help us improve. Your feedback supports better design and smoother
                    project delivery.
                  </p>
                </div>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="card p-10 lg:p-12">
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div>
                  <p className="kicker">Start a Project</p>
                  <h2 className="mt-4 text-3xl">Let’s shape your next chapter.</h2>
                  <p className="mt-3 text-base">
                    Share your site, timeline, and goals. We respond within 48 hours with a
                    tailored roadmap.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="rounded-full bg-[var(--foreground)] px-8 py-3 text-xs uppercase tracking-[0.25em] text-white"
                >
                  Contact Studio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
