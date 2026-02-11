import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackingPdfLink from "@/components/TrackingPdfLink";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore selected residential and commercial projects by Arc 11 Architect across Delhi NCR, Pan India, and global locations.",
  keywords: [
    "architecture portfolio",
    "residential projects Delhi",
    "commercial architecture projects",
    "interior renovation portfolio",
  ],
};

const projects = [
  {
    name: "Private Residence, 8000 Sq. Ft. Built-Up",
    location: "Signature City, Ghaziabad",
    summary:
      "Modern classical villa blending timeless elements with contemporary living.",
    year: "2021",
    category: "Residential",
    status: "On-Going",
  },
  {
    name: "Jorbagh Villa, 4800 Sq. Ft. Built-Up",
    location: "Near Pari Chowk, Greater Noida",
    summary: "Minimalist villa interior with clean lines and a neutral palette.",
    year: "2022",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "4 BHK Apartment, Builder Floor, P-37",
    location: "Gurgaon",
    summary: "Modern interior design with a unique parametric outlook.",
    year: "2024",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "Micro 2 BHK Apartment",
    location: "Chhatarpur, South Delhi",
    summary: "Minimal interior design with a vibrant pop-of-color theme.",
    year: "2023",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "Germany 3 BHK Apartment",
    location: "Germany",
    summary: "3D interior design and rendering with a modern minimal dark theme.",
    year: "2022",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "Builder Floor, Mira Bagh",
    location: "Mira Bagh",
    summary: "Elegant interiors in a modern classical theme.",
    year: "2023",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "Private Villa, 4500 Sq. Ft.",
    location: "Raj Nagar Extension",
    summary: "Turnkey project combining innovative architecture with modern living.",
    year: "2023",
    category: "Residential",
    status: "On-Going",
  },
  {
    name: "Sarita Vihar 3BHK Apartment",
    location: "Sarita Vihar",
    summary: "Interior renovation blending comfort and luxury.",
    year: "2024",
    category: "Residential",
    status: "On-Going",
  },
  {
    name: "Mira Bagh Exterior Elevation",
    location: "Janakpuri",
    summary:
      "Exterior elevation designs across modern, classical, and Roman-Persian styles.",
    year: "2022",
    category: "Residential",
    status: "Completed",
  },
  {
    name: "Noida Windsor Court",
    location: "Noida",
    summary: "Residential renovation focused on contemporary modern interiors.",
    year: "2024",
    category: "Residential",
    status: "On-Going",
  },
  {
    name: "AIIMS Extension Block",
    location: "New Delhi",
    summary: "3D design of interiors and exterior landscape for the extension block.",
    year: "2019",
    category: "Commercial",
    status: "Completed",
  },
];

export default function WorkPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";
  const workSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Arc 11 Architect Work Portfolio",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Project",
        name: project.name,
        description: project.summary,
        location: project.location,
        category: project.category,
        status: project.status,
        url: `${siteUrl}/work`,
      },
    })),
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker">Work</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">Curated environments in context.</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Our portfolio spans private residences, apartments, builder floors, and
            institutional projects. Each space is guided by a clear narrative and refined
            material palette.
          </p>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.name} className="card p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl">{project.name}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    {project.location}
                  </span>
                </div>
                <p className="mt-3 text-sm">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="subtle-card p-8">
              <h2 className="text-3xl">Project Notes</h2>
              <p className="mt-4 text-sm">
                We protect client privacy and share curated highlights. For full case studies,
                request our portfolio deck via the contact page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackingPdfLink
                  href="/docs/Port-Folio_Shashank_Saini.pdf"
                  className="rounded-full bg-[var(--foreground)] px-5 py-2 text-xs uppercase tracking-[0.22em] text-white visited:text-white hover:text-white"
                  placement="work_notes"
                >
                  Portfolio PDF
                </TrackingPdfLink>
                <TrackingPdfLink
                  href="/docs/ARC11ARCHITECT_PROFILE.pdf"
                  className="rounded-full border border-[var(--line)] bg-white px-5 py-2 text-xs uppercase tracking-[0.22em]"
                  placement="work_notes"
                >
                  Company Profile
                </TrackingPdfLink>
              </div>
            </div>
            <div className="card p-8">
              <h2 className="text-3xl">How we work</h2>
              <p className="mt-4 text-sm">
                Each project is guided by clear documentation, material control, and steady
                on-site coordination to ensure design intent is delivered.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
