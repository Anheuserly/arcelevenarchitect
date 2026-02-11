import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Learn about Arc 11 Architect studio, leadership, capabilities, and our design approach across India and international projects.",
  keywords: [
    "architecture studio Delhi",
    "about arc 11 architect",
    "architecture leadership",
    "interior design studio profile",
  ],
};

const values = [
  {
    title: "Quiet minimalism",
    description:
      "We keep lines clean and rely on texture, proportion, and daylight for richness.",
  },
  {
    title: "Context first",
    description:
      "Every concept responds to climate, culture, and the daily rituals of occupants.",
  },
  {
    title: "Crafted detailing",
    description:
      "From joinery to junctions, we develop details to be built, not just drawn.",
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
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker">Studio</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">Designing the architecture of calm.</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Arc 11 Architect is a studio focused on architecture, interiors, and project
            leadership in one collaborative experience. For over 10 years since 2015, we have delivered
            projects across Delhi NCR, Pan India, and internationally, including Germany and
            Turkey. We can work anywhere with clarity, integrity, and grounded aesthetics.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="subtle-card p-6">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-8">
              <h2 className="text-3xl">Leadership</h2>
              <p className="mt-4 text-base">
                Our core team of architects, interior designers, and project managers lead
                each engagement. We partner with lighting, landscape, and sustainability
                consultants to bring depth to every space.
              </p>
              <div className="mt-6 grid gap-4 text-sm text-[var(--muted)]">
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
              <h2 className="text-3xl">Capabilities</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>Architecture + Master Planning</li>
                <li>Interior Design + Styling</li>
                <li>Workspace Strategy</li>
                <li>Construction Documentation</li>
                <li>Site Supervision</li>
                <li>Landscape Integration</li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <p className="kicker">Leadership</p>
            <h2 className="mt-4 text-3xl">Studio team</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="subtle-card p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    {member.group}
                  </p>
                  <h3 className="mt-3 text-xl">{member.name}</h3>
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
