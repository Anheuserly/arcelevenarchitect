/* eslint-disable @next/next/no-img-element */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  getMoodboardImages,
  getPortfolioInsights,
  getPortfolioStats,
} from "@/lib/portfolio";
import { buildPageMetadata } from "@/lib/seo";

const studioPreviewImages = [
  {
    url: "/brand/proportion-study.png",
    alt: "Arc 11 Architect proportion study",
  },
  ...getMoodboardImages().slice(0, 2).map((image) => ({
    url: image.src,
    alt: image.alt,
  })),
];

export const metadata = buildPageMetadata({
  title: "Studio Profile, Leadership and Design Approach",
  description:
    "Discover Arc 11 Architect's studio profile, leadership, design philosophy, and working range across residential, commercial, and institutional projects.",
  path: "/studio",
  images: studioPreviewImages,
  keywords: [
    "about Arc 11 Architect",
    "architecture studio Delhi NCR",
    "principal architect Delhi",
    "interior design studio profile",
    "architecture leadership India",
  ],
});

const values = [
  {
    title: "Quiet minimalism",
    description:
      "Visual calm is achieved through alignment, texture, daylight, and measured restraint.",
  },
  {
    title: "Context first",
    description:
      "Every scheme responds to site behavior, user routines, climate, and lived use rather than style alone.",
  },
  {
    title: "Detail as structure",
    description:
      "Junctions, materials, and lighting details are developed as part of the core architectural logic.",
  },
];

const team = [
  { name: "Sohel Latif", role: "Partner", group: "Creative" },
  { name: "Shrishti", role: "Creative Team Head", group: "Creative" },
  { name: "Chand", role: "Woodwork Head", group: "Craftsmanship" },
  { name: "Rajeev", role: "Head Painter", group: "Finishing" },
  { name: "Mukesh Kumar", role: "Accountant", group: "Operations" },
];

export default function StudioPage() {
  const moodboards = getMoodboardImages().slice(0, 4);
  const stats = getPortfolioStats();
  const insights = getPortfolioInsights();

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card p-8 lg:p-10">
              <p className="kicker">Studio</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                Designing calm through proportion, material tone, and precise execution.
              </h1>
              <p className="mt-5 max-w-2xl text-base">
                Arc 11 Architect is a multidisciplinary architecture and interiors practice
                working across Delhi NCR, Pan India, and selected international contexts. Our
                work balances clarity of planning with atmosphere, warmth, and constructible
                detail.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="metric-tile">
                  <span className="metric-label">Projects in Archive</span>
                  <span className="metric-value">{stats.projects}</span>
                </div>
                <div className="metric-tile">
                  <span className="metric-label">Visual Studies</span>
                  <span className="metric-value">{stats.images}</span>
                </div>
                <div className="metric-tile">
                  <span className="metric-label">Spatial Tags</span>
                  <span className="metric-value">{insights.totalSpaces}</span>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="grid h-full lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-[var(--line)] bg-[var(--surface)] p-8 lg:border-b-0 lg:border-r">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Design Principle
                  </p>
                  <h2 className="mt-4 text-3xl">Geometry as a quiet discipline.</h2>
                  <p className="mt-4 text-sm">
                    Proportion and order are not decorative afterthoughts. They shape how our
                    projects hold structure, rhythm, and visual stillness.
                  </p>
                </div>
                <div className="bg-white">
                  <img
                    src="/brand/proportion-study.png"
                    alt="Arc 11 Architect proportion study"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="subtle-card p-6">
                <h2 className="text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="card p-8">
              <p className="kicker">Leadership</p>
              <h2 className="mt-4 text-4xl">A studio built around design and delivery.</h2>
              <p className="mt-4 max-w-2xl text-base">
                Each engagement is led through a collaborative core of architects, interior
                designers, site leadership, and craftsmanship partners so that the design
                language remains coherent from concept through execution.
              </p>
              <div className="mt-8 grid gap-4 text-sm">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Principal Architect</span>
                  <span className="text-[var(--foreground)]">Shashank Saini</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Studio Director</span>
                  <span className="text-[var(--foreground)]">Ujjwal Sinha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Project Leadership</span>
                  <span className="text-[var(--foreground)]">A.K Saini</span>
                </div>
              </div>
            </div>

            <div className="subtle-card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Working Range
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="border-b border-[var(--line)] pb-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Core Sectors
                  </p>
                  <p className="mt-2">Residential, commercial, institutional, renovation</p>
                </div>
                <div className="border-b border-[var(--line)] pb-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Capability
                  </p>
                  <p className="mt-2">
                    Architecture, interiors, visual strategy, detailing, and on-site coordination
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Largest Current Dossier
                  </p>
                  <p className="mt-2">{insights.largestGalleryProject.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="kicker">Moodboard Library</p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-4xl sm:text-5xl">Concept references and material atmosphere.</h2>
              <p className="max-w-xl text-sm">
                These studies help align interior tone, furniture language, finish palettes,
                and emotional character before the deeper design development stage.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {moodboards.map((image) => (
                <div
                  key={image.src}
                  className="framed-media overflow-hidden rounded-[26px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]"
                >
                  <img src={image.src} alt={image.alt} loading="lazy" className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <p className="kicker">Team</p>
            <h2 className="mt-4 text-4xl">People behind the built work.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {team.map((member) => (
                <div key={member.name} className="subtle-card p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    {member.group}
                  </p>
                  <h3 className="mt-3 text-2xl">{member.name}</h3>
                  <p className="mt-2 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
