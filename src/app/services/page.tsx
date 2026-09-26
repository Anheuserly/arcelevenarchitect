import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import { buildPageMetadata } from "@/lib/seo";
import { createArchitecturalJsonLd } from "@/lib/architectural-schema";

export const metadata = buildPageMetadata({
  title: "Architecture, Interior Design and BIM Services",
  description:
    "Bespoke residential architecture, luxury interior design, computational BIM coordination, and turnkey project delivery by Arc 11 Architect across Delhi NCR and India.",
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
    "residential villa architecture",
    "turnkey architectural execution",
    "luxury interior architecture studio",
  ],
});

async function getArchitecturalPackages() {
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
  try {
    const res = await fetch("https://storage.amcmep.in/v1/listings", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const rows = data.rows || [];
    return rows.filter((r: any) =>
      r.business_id === businessId ||
      r.business_name?.toLowerCase().includes("arc")
    );
  } catch (error) {
    console.error("Failed to load architectural packages:", error);
    return [];
  }
}

const deliverables = [
  "Comprehensive Good-For-Construction (GFC) drawing packages",
  "Statutory municipal sanction drawings & DCR compliance sets",
  "Autodesk Revit BIM models (LOD 300 / 350) & clash reports",
  "Material moodboards, finish schedules & millwork details",
  "Milestone site supervision audits & quality inspection logs",
  "Archival bonded A1/A3 master drawing books couriered to site",
];

const engagementModels = [
  { label: "Villa & Residential Architecture", value: "Turnkey Concept to GFC" },
  { label: "Interior Architecture & Joinery", value: "Full Spatial & Millwork Detailing" },
  { label: "Computational BIM & Coordination", value: "LOD 350 Navisworks Coordination" },
  { label: "Site Quality Supervision PMC", value: "Scheduled Senior Architect Audits" },
];

export default async function ServicesPage() {
  const packages = await getArchitecturalPackages();

  const jsonLdPackages = packages.map((pkg: any) => createArchitecturalJsonLd(pkg));

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />

      {jsonLdPackages.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPackages) }}
        />
      )}

      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Hero Section */}
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-8 lg:p-12">
              <p className="kicker">Architectural Practice</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl font-serif">
                A rigorous spatial practice from conceptual clarity to execution integrity.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-[var(--foreground)]/80 leading-relaxed">
                We approach each commission as a bespoke architectural system—aligning zoning, daylight,
                material calm, and structural coordination into cohesive, enduring environments.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <StartProjectTrigger className="button-primary" source="services_hero">
                  Discuss a Commission
                </StartProjectTrigger>
                <Link href="/work" className="button-secondary">
                  Explore Built Portfolio
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="subtle-card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)] font-semibold">
                  Studio Deliverables
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0">
                      <span className="text-[var(--accent)] font-bold">―</span>
                      <span className="text-[var(--foreground)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="subtle-card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)] font-semibold">
                  Commission Frameworks
                </p>
                <div className="mt-5 space-y-3.5 text-sm">
                  {engagementModels.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[var(--muted)]">{item.label}</span>
                      <span className="font-serif font-medium text-[var(--foreground)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Packages Catalog from Live Database */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--line)] pb-6 mb-10 gap-4">
              <div>
                <p className="kicker">Live Commission Registry</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[var(--foreground)]">
                  Architectural Packages & Retainers
                </h2>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                SAC 998717 Certified Architectural Services
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg: any) => {
                const specs = pkg.specifications || {};
                const priceFormatted = pkg.price
                  ? `₹${Number(pkg.price).toLocaleString("en-IN")}`
                  : "Scope on Request";

                return (
                  <article
                    key={pkg.id}
                    className="card flex flex-col overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl group"
                  >
                    {/* Perspective / Elevation Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171614]">
                      {pkg.media_url ? (
                        <Image
                          src={pkg.media_url}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-[var(--muted-2)]">
                          <span className="font-serif text-sm">ARC 11 SPATIAL STUDY</span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 rounded bg-[#171614]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#faf7f1] backdrop-blur-sm">
                        {specs.typology || pkg.category || "Design Package"}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="uppercase tracking-[0.2em] text-[var(--accent)] font-semibold text-[11px]">
                          {pkg.category || "Architecture"}
                        </span>
                        <span className="font-serif font-bold text-base text-[var(--foreground)]">
                          {priceFormatted}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                        {pkg.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-[var(--muted)] line-clamp-3">
                        {pkg.description}
                      </p>

                      {/* Technical Blueprint Tags */}
                      <div className="mt-4 pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-2 text-[11px] text-[var(--muted-2)]">
                        <div>
                          <span className="block uppercase tracking-wider text-[9px]">Drawing Scales</span>
                          <span className="text-[var(--foreground)] font-medium truncate block">{specs.scales || "1:50, 1:100"}</span>
                        </div>
                        <div>
                          <span className="block uppercase tracking-wider text-[9px]">SLA Milestone</span>
                          <span className="text-[var(--foreground)] font-medium truncate block">{specs.leadTime || "7–10 Days"}</span>
                        </div>
                      </div>

                      {/* Action Link */}
                      <div className="mt-6 pt-2">
                        <Link
                          href={`/services/${pkg.id}`}
                          className="flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                        >
                          <span>Explore Architectural Dossier</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
