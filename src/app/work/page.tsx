import Link from "next/link";
import PortfolioExplorer from "@/components/PortfolioExplorer";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import {
  getPortfolioCategoryBreakdown,
  getPortfolioInsights,
  getPortfolioProjects,
  getPortfolioStats,
} from "@/lib/portfolio";
import { SITE_URL, buildPageMetadata } from "@/lib/seo";

const workPreviewImages = getPortfolioProjects().slice(0, 3).map((project) => ({
  url: project.heroImage,
  alt: project.heroLabel,
}));

export const metadata = buildPageMetadata({
  title: "Residential and Commercial Architecture Portfolio",
  description:
    "Explore Arc 11 Architect's portfolio of residential, commercial, and institutional case studies through curated architecture and interior image galleries.",
  path: "/work",
  images: workPreviewImages,
  keywords: [
    "architecture portfolio India",
    "residential architecture case studies",
    "commercial interior portfolio Delhi NCR",
    "architectural visualization gallery",
    "institutional architecture projects",
  ],
});

export default function WorkPage() {
  const projects = getPortfolioProjects();
  const stats = getPortfolioStats();
  const insights = getPortfolioInsights();
  const categoryBreakdown = getPortfolioCategoryBreakdown();

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Arc 11 Architect Work Portfolio",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Project",
        name: project.title,
        description: project.description,
        location: project.location,
        category: project.category,
        status: project.status,
        url: `${SITE_URL}${project.href}`,
      },
    })),
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main>
        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
            />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="card p-8 lg:p-10">
                <p className="kicker">Work Archive</p>
                <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                  A visual archive of residential, commercial, and institutional studies.
                </h1>
                <p className="mt-5 max-w-2xl text-base">
                  This archive brings together project imagery, room-by-room studies, and
                  atmosphere-led compositions into a more navigable portfolio system.
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
                    <span className="metric-label">Spatial Tags</span>
                    <span className="metric-value">{insights.totalSpaces}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Archive Analysis
                  </p>
                  <div className="mt-5 space-y-5">
                    {categoryBreakdown.map((entry) => (
                      <div key={entry.category}>
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-lg text-[var(--foreground)]">{entry.category}</p>
                            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                              {entry.projectCount} case studies
                            </p>
                          </div>
                          <p className="text-2xl text-[var(--foreground)]">{entry.imageCount}</p>
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
                    Largest Dossier
                  </p>
                  <h2 className="mt-4 text-3xl">{insights.largestGalleryProject.title}</h2>
                  <p className="mt-3 text-sm">
                    The deepest visual set currently available in the archive, useful for
                    understanding how the studio develops atmosphere across multiple spaces.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="tag-pill">
                      {insights.largestGalleryProject.imageCount} frames
                    </span>
                    <span className="tag-pill">{insights.largestGalleryProject.location}</span>
                    <span className="tag-pill">{insights.leadCategory.category} leads</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <TrackingPdfLink
                href="/documents/portfolio-shashank-saini.pdf"
                className="button-primary visited:text-white hover:text-white"
                placement="work_notes"
              >
                Portfolio PDF
              </TrackingPdfLink>
              <TrackingPdfLink
                href="/documents/company-profile.pdf"
                className="button-secondary"
                placement="work_notes"
              >
                Company Profile
              </TrackingPdfLink>
              <Link href="/contact" className="button-secondary">
                Request a Presentation
              </Link>
            </div>

            <div className="mt-14">
              <PortfolioExplorer projects={projects} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
