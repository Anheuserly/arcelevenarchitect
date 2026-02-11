import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interior design, urban design, landscape, BIM, and project delivery services by Arc 11 Architect.",
  keywords: [
    "architectural services",
    "interior design services",
    "BIM services India",
    "project delivery architecture",
  ],
};

export const services = [
  {
    title: "Architectural Design & Master Planning",
    description:
      "Comprehensive architectural solutions including site analysis, spatial planning, and built-form strategy for residential, commercial, and mixed-use developments—from concept to completion.",
  },
  {
    title: "Interior Architecture & Design",
    description:
      "Thoughtfully crafted interior environments featuring curated material palettes, lighting design, custom furniture, and seamless spatial flow that enhance user experience and identity.",
  },
  {
    title: "Urban Design & Planning",
    description:
      "Designing cohesive, human-centered, and sustainable urban environments that promote community interaction, accessibility, and long-term resilience.",
  },
  {
    title: "Landscape Design",
    description:
      "Functional and aesthetic outdoor spaces integrating greenery, circulation, and environmental sensitivity to complement the built environment.",
  },
  {
    title: "Structural Engineering",
    description:
      "Robust engineering solutions ensuring safety, stability, and durability while aligning structural performance with architectural intent.",
  },
  {
    title: "Computational Design & BIM",
    description:
      "Advanced digital workflows using computational tools and Building Information Modeling (BIM) for precise visualization, coordination, and efficient project delivery.",
  },
  {
    title: "Project Delivery & Execution",
    description:
      "Detailed documentation, tender assistance, and on-site execution oversight to ensure quality control, cost efficiency, and predictable timelines.",
  },
  {
    title: "Workspace, Hospitality & Wellness Design",
    description:
      "Experience-driven environments for offices, boutique hotels, and wellness spaces that balance functionality, comfort, and brand identity.",
  },
  {
    title: "Sustainability & Resilience",
    description:
      "Environmentally responsible design strategies focused on energy efficiency, resource optimization, climate responsiveness, and long-term sustainability.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker">Services</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">A full-spectrum design partner.</h1>
          <p className="mt-6 max-w-2xl text-lg">
            We deliver a disciplined, workshop-led process from concept to construction. Every
            engagement includes clarity on scope, schedule, and design intent.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((item) => (
              <div key={item.title} className="card p-8">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="subtle-card p-8">
              <h2 className="text-3xl">Deliverables</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>Detailed drawing sets and coordination packages</li>
                <li>Material and finish specifications</li>
                <li>Lighting and automation schematics</li>
                <li>Custom furniture design and sourcing</li>
                <li>On-site quality reviews and site reports</li>
              </ul>
            </div>
            <div className="card p-8">
              <h2 className="text-3xl">Engagement Models</h2>
              <div className="mt-4 space-y-4 text-sm text-[var(--muted)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Architecture + Interior</span>
                  <span className="text-[var(--foreground)]">End-to-End</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span>Interior Only</span>
                  <span className="text-[var(--foreground)]">12-20 weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Consulting</span>
                  <span className="text-[var(--foreground)]">Retainer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
