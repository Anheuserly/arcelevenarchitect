/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import WorkSlider from "@/components/WorkSlider";
import {
  getFeaturedProjects,
  getMoodboardImages,
  getPortfolioCategoryBreakdown,
  getPortfolioInsights,
  getPortfolioStats,
} from "@/lib/portfolio";

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

const practiceNotes = [
  {
    title: "Composed planning",
    description:
      "Layouts are developed around movement, daylight, privacy, and clear functional adjacencies.",
  },
  {
    title: "Refined detailing",
    description:
      "Interior elevations, joinery logic, and lighting decisions are treated as one coordinated system.",
  },
  {
    title: "Buildable atmosphere",
    description:
      "Material calm, tactile palettes, and execution logic stay connected from concept through delivery.",
  },
];

const processSteps = [
  {
    label: "01",
    title: "Program and site reading",
    description:
      "We begin by decoding spatial priorities, site constraints, movement patterns, and future growth.",
  },
  {
    label: "02",
    title: "Concept and visual alignment",
    description:
      "Massing, interior language, and mood direction are translated into visuals that clarify the design intent early.",
  },
  {
    label: "03",
    title: "Detail development",
    description:
      "Drawings, palettes, lighting, and junctions are coordinated so the built result stays precise and coherent.",
  },
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const moodboards = getMoodboardImages().slice(0, 4);
  const stats = getPortfolioStats();
  const categoryBreakdown = getPortfolioCategoryBreakdown();
  const insights = getPortfolioInsights();

  const slides = featuredProjects.map((project) => ({
    title: project.title,
    location: project.location,
    year: project.year,
    category: project.category,
    status: project.status,
    image: project.heroImage,
    href: project.href,
    imageCount: project.imageCount,
  }));

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main>
        <WorkSlider slides={slides} />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="card p-8 lg:p-10">
                <p className="kicker">Studio Overview</p>
                <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
                  Architecture and interiors designed with spatial restraint and lasting clarity.
                </h2>
                <p className="mt-5 max-w-2xl text-base">
                  Arc 11 Architect works across private residences, commercial interiors, and
                  institutional environments with a practice grounded in calm composition,
                  material refinement, and buildable detailing.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="metric-tile">
                    <span className="metric-label">Projects</span>
                    <span className="metric-value">{stats.projects}</span>
                  </div>
                  <div className="metric-tile">
                    <span className="metric-label">Visual Frames</span>
                    <span className="metric-value">{stats.images}</span>
                  </div>
                  <div className="metric-tile">
                    <span className="metric-label">Avg. Gallery</span>
                    <span className="metric-value">{stats.averageGallerySize}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackingPdfLink
                    href="/documents/portfolio-shashank-saini.pdf"
                    className="button-primary visited:text-white hover:text-white"
                    placement="home_highlight"
                  >
                    View Portfolio PDF
                  </TrackingPdfLink>
                  <TrackingPdfLink
                    href="/documents/company-profile.pdf"
                    className="button-secondary"
                    placement="home_highlight"
                  >
                    Company Profile
                  </TrackingPdfLink>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Sector Mix
                  </p>
                  <div className="mt-6 space-y-5">
                    {categoryBreakdown.map((entry) => (
                      <div key={entry.category}>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-lg text-[var(--foreground)]">{entry.category}</p>
                            <p className="text-xs uppercase tracking-[0.26em] text-[var(--muted-2)]">
                              {entry.projectCount} projects
                            </p>
                          </div>
                          <p className="text-xl text-[var(--foreground)]">{entry.imageCount}</p>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${(entry.imageCount / stats.images) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Portfolio Insight
                  </p>
                  <h3 className="mt-4 text-3xl">
                    {insights.largestGalleryProject.title}
                  </h3>
                  <p className="mt-4 text-sm">
                    The most extensive visual dossier currently belongs to this project, with{" "}
                    {insights.largestGalleryProject.imageCount} curated frames across facade,
                    room, and atmosphere studies.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="tag-pill">{insights.leadCategory.category} leads</span>
                    <span className="tag-pill">{insights.totalSpaces} spatial tags</span>
                    <span className="tag-pill">Delhi NCR focus</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {practiceNotes.map((item) => (
                <div key={item.title} className="subtle-card p-6">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker">Selected Case Studies</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">
                  A portfolio framed through atmosphere, sequence, and detail.
                </h2>
              </div>
              <Link href="/work" className="button-secondary">
                Explore All Work
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <PortfolioProjectCard
                  key={project.slug}
                  project={project}
                  priority={index < 2}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="card p-8 lg:p-10">
                <p className="kicker">Methodology</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">
                  Design intelligence that stays visible from concept to execution.
                </h2>
                <p className="mt-4 max-w-xl text-base">
                  Every project is treated as a chain of spatial decisions, not isolated
                  visuals. The result is a calmer client process and a sharper built outcome.
                </p>

                <div className="mt-8 space-y-5">
                  {processSteps.map((step) => (
                    <div key={step.label} className="subtle-card p-5">
                      <div className="flex items-start gap-4">
                        <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                          {step.label}
                        </span>
                        <div>
                          <h3 className="text-2xl">{step.title}</h3>
                          <p className="mt-2 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="subtle-card p-8 lg:p-10">
                <p className="kicker">Material Direction</p>
                <h2 className="mt-4 text-4xl">Moodboards and palette thinking.</h2>
                <p className="mt-4 max-w-xl text-base">
                  Concept references are used to align clients around tone, detailing, and
                  furniture language before the deeper documentation phase begins.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {moodboards.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-[26px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]"
                    >
                      <img src={image.src} alt={image.alt} loading="lazy" className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="card p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="kicker">Client Experience</p>
                  <h2 className="mt-4 text-4xl">Measured, collaborative, and highly guided.</h2>
                  <p className="mt-4 text-base">
                    Clear communication, transparent checkpoints, and thoughtful revisions are
                    as important to us as the aesthetic outcome.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
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
              </div>

              <div className="mt-12 grid gap-8 border-t border-[var(--line)] pt-10 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="text-3xl">Share your feedback</h3>
                  <p className="mt-3 max-w-lg text-sm">
                    Feedback from clients and collaborators helps us improve the process,
                    documentation, and overall design experience.
                  </p>
                </div>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <div className="card p-8 lg:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="kicker">Start a Project</p>
                  <h2 className="mt-4 text-4xl sm:text-5xl">
                    Let’s shape your next environment with clarity and intent.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base">
                    Share the site, timeline, and ambition for your project. We respond with a
                    measured next-step plan and consultation path.
                  </p>
                </div>
                <Link href="/contact" className="button-primary">
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
