/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortfolioGallery from "@/components/PortfolioGallery";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import { getPortfolioProject, getPortfolioProjects } from "@/lib/portfolio";
import { SITE_URL, absoluteUrl, buildPageMetadata } from "@/lib/seo";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPortfolioProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Project Not Found",
      description: "The requested Arc 11 Architect case study could not be found.",
      path: `/work/${slug}`,
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-image-preview": "none",
          "max-snippet": 0,
          "max-video-preview": 0,
        },
      },
    });
  }

  const projectDescription = `${project.description} Located in ${project.location}, this ${project.category.toLowerCase()} case study by Arc 11 Architect focuses on ${project.scope.toLowerCase()}.`;

  return buildPageMetadata({
    title: project.title,
    description: projectDescription,
    path: project.href,
    category: project.category,
    openGraphType: "article",
    images: [
      {
        url: project.heroImage,
        alt: project.heroLabel,
      },
      ...project.gallery.slice(0, 2).map((image) => ({
        url: image.src,
        alt: image.alt,
      })),
    ],
    keywords: [
      project.title,
      `${project.location} architecture project`,
      `${project.category} architecture`,
      `${project.category} interiors`,
      project.status,
      `${project.year} architecture project`,
      ...project.spaces,
    ],
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  const projects = getPortfolioProjects();
  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}${project.href}`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(project.heroImage),
      contentUrl: absoluteUrl(project.heroImage),
      caption: project.heroLabel,
    },
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${project.title} Gallery`,
    url: `${SITE_URL}${project.href}#gallery`,
    associatedMedia: project.gallery.map((image) => ({
      "@type": "ImageObject",
      url: absoluteUrl(image.src),
      contentUrl: absoluteUrl(image.src),
      caption: image.alt,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}${project.href}`,
      },
    ],
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <Link href="/work" className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
              Back to Work
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="card overflow-hidden">
                <div className="relative overflow-hidden">
                  <img src={project.heroImage} alt={project.heroLabel} className="w-full" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.58))]" />
                  <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                      {project.category}
                    </p>
                    <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl">{project.title}</h1>
                    <p className="mt-4 max-w-2xl text-sm text-white/76 sm:text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="card p-8 lg:p-10">
                  <p className="kicker">Project Dossier</p>
                  <div className="mt-6 grid gap-4 text-sm">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <span>Location</span>
                      <span className="text-[var(--foreground)]">{project.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <span>Status</span>
                      <span className="text-[var(--foreground)]">{project.status}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <span>Year</span>
                      <span className="text-[var(--foreground)]">{project.year}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Visual Frames</span>
                      <span className="text-[var(--foreground)]">{project.imageCount}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Scope
                    </p>
                    <p className="mt-3 text-sm">{project.scope}</p>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Key Spaces
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.spaces.map((space) => (
                        <span key={space} className="tag-pill">
                          {space}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <StartProjectTrigger className="button-primary" source="work_case_study">
                      Discuss a Similar Project
                    </StartProjectTrigger>
                    <Link href="/work" className="button-secondary">
                      Browse More Work
                    </Link>
                  </div>
                </div>

                <div className="subtle-card p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Search Visibility
                  </p>
                  <p className="mt-4 text-sm">
                    This project page now exposes its main image and gallery URLs through the
                    sitemap and structured data so search engines can better associate the
                    visuals with the case study itself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker">Gallery</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">Complete project visual sequence.</h2>
              </div>
              <p className="max-w-xl text-sm">
                A curated set of images showing spatial tone, focal elements, and the project’s
                broader visual rhythm across multiple spaces.
              </p>
            </div>

            <div id="gallery" className="mt-10">
              <PortfolioGallery images={project.gallery} />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Link href={previousProject.href} className="subtle-card p-8 transition hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Previous Project
                </p>
                <h3 className="mt-4 text-3xl">{previousProject.title}</h3>
                <p className="mt-3 text-sm">{previousProject.location}</p>
              </Link>
              <Link href={nextProject.href} className="subtle-card p-8 transition hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Next Project
                </p>
                <h3 className="mt-4 text-3xl">{nextProject.title}</h3>
                <p className="mt-3 text-sm">{nextProject.location}</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
