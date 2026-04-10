import Link from "next/link";
import ProjectRequestForm from "@/components/ProjectRequestForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Start an Architecture or Interior Design Project",
  description:
    "Share your project brief, location, budget, and timeline to start an architecture or interior design engagement with Arc 11 Architect.",
  path: "/start-project",
  images: [
    {
      url: "/brand/geometry-study.jpeg",
      alt: "Arc 11 Architect design detail",
    },
  ],
  keywords: [
    "start architecture project Delhi NCR",
    "hire architect India",
    "interior design project brief",
    "architecture studio intake form",
    "design consultation request",
  ],
});

const projectFitNotes = [
  "Residential commissions, builder floors, villas, and renovations",
  "Commercial interiors, workplace, retail, and hospitality environments",
  "Institutional, campus, and mixed-use planning conversations",
  "End-to-end architecture, interiors, visualization, and execution support",
];

const prepChecklist = [
  "Site location, plot or floor details, and current stage",
  "Approximate budget comfort zone and decision timeline",
  "What you want help with: architecture, interiors, or both",
  "Any drawings, references, or estimator context already available",
];

export default function StartProjectPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="grid gap-6">
              <div className="card p-8 lg:p-10">
                <p className="kicker">Start a Project</p>
                <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                  Bring us in when you are ready to shape a real project.
                </h1>
                <p className="mt-5 max-w-2xl text-base">
                  This page is for prospective clients who want to work with Arc 11 Architect.
                  Share the essentials of your project and we will respond with fit, next
                  steps, and the best consultation route.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/estimator" className="button-primary">
                    Use Project Estimator
                  </Link>
                  <TrackingPdfLink
                    href="/documents/company-profile.pdf"
                    className="button-secondary"
                    placement="start_project_intro"
                  >
                    Company Profile
                  </TrackingPdfLink>
                  <Link href="/contact" className="button-secondary">
                    General Inquiry Instead
                  </Link>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Good Fit For
                  </p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {projectFitNotes.map((item) => (
                      <li
                        key={item}
                        className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-6">
                  <div className="card p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      What To Prepare
                    </p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {prepChecklist.map((item) => (
                        <li
                          key={item}
                          className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="subtle-card p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Response Rhythm
                    </p>
                    <p className="mt-4 text-sm">
                      We review project briefs for scope clarity, location, timeline, and budget
                      alignment before proposing the right next conversation.
                    </p>
                    <p className="mt-4 text-sm">
                      If you already used the estimator, that context will be carried into the
                      project brief automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 lg:p-10">
              <p className="kicker">Project Brief</p>
              <h2 className="mt-4 text-4xl">Share the essentials.</h2>
              <p className="mt-4 max-w-xl text-sm">
                Tell us what the project is, where it is, what stage you are in, and the level
                of design support you need. The clearer the brief, the sharper our first
                response can be.
              </p>
              <div className="mt-8">
                <ProjectRequestForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
