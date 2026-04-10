import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Architecture, Interior Design and BIM Services",
  description:
    "Architecture, interior design, BIM coordination, visualization, planning, and project delivery services by Arc 11 Architect across Delhi NCR and India.",
  path: "/services",
  images: [
    {
      url: "/brand/geometry-study.jpeg",
      alt: "Arc 11 Architect geometry study",
    },
  ],
  keywords: [
    "architectural services Delhi NCR",
    "interior design services India",
    "BIM coordination services",
    "project delivery architecture studio",
    "visualization and detailing services",
  ],
});

const services = [
  {
    title: "Architectural Design & Master Planning",
    description:
      "Comprehensive architectural strategy from site reading and spatial planning to built-form development and phased coordination.",
  },
  {
    title: "Interior Architecture & Design",
    description:
      "Interior systems, lighting logic, finish palettes, and custom detailing shaped into calm, cohesive environments.",
  },
  {
    title: "Urban Design & Planning",
    description:
      "Larger frameworks for movement, civic legibility, human use, and long-term environmental response.",
  },
  {
    title: "Landscape Design",
    description:
      "Outdoor environments that connect circulation, planting, threshold-making, and climate sensitivity.",
  },
  {
    title: "Structural Engineering",
    description:
      "Structural coordination that supports architectural intent without compromising clarity or build quality.",
  },
  {
    title: "Computational Design & BIM",
    description:
      "Digital workflows for visualization, documentation accuracy, interdisciplinary coordination, and decision clarity.",
  },
  {
    title: "Project Delivery & Execution",
    description:
      "Documentation, vendor coordination, site reviews, and execution oversight to protect design intent on the ground.",
  },
  {
    title: "Workspace, Hospitality & Wellness Design",
    description:
      "Experience-led environments that support brand identity, user comfort, and operational flow.",
  },
  {
    title: "Sustainability & Resilience",
    description:
      "Climate-responsive design thinking focused on material durability, energy performance, and long-term viability.",
  },
];

const deliverables = [
  "Detailed drawing sets and interdisciplinary coordination packages",
  "Material, finish, and fixture specifications",
  "Lighting, automation, and furniture integration studies",
  "Site review checkpoints and execution guidance",
];

const engagementModels = [
  { label: "Architecture + Interior", value: "End-to-end" },
  { label: "Interior Design", value: "Concept to detailing" },
  { label: "Consulting", value: "Retainer or phase-based" },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="card p-8 lg:p-10">
              <p className="kicker">Services</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                A full-spectrum design practice from concept thinking to execution support.
              </h1>
              <p className="mt-5 max-w-2xl text-base">
                We approach each commission as a coordinated design system, aligning planning,
                atmosphere, detail, and delivery rather than separating them into isolated
                stages.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <StartProjectTrigger className="button-primary" source="services_cta">
                  Discuss Your Scope
                </StartProjectTrigger>
                <Link href="/work" className="button-secondary">
                  Review Related Work
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="subtle-card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Deliverables
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  {deliverables.map((item) => (
                    <li key={item} className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="subtle-card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Engagement
                </p>
                <div className="mt-5 space-y-4 text-sm">
                  {engagementModels.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span>{item.label}</span>
                      <span className="text-[var(--foreground)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item, index) => (
              <div key={item.title} className="card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-3xl">{item.title}</h2>
                <p className="mt-4 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
