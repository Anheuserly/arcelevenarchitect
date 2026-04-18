import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import {
  AI_DISCOVERY_PLATFORMS,
  JUSTDIAL_URL,
  SERVICE_AREAS,
  SITE_URL,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pan India and International Architecture Services",
  description:
    "Arc 11 Architect serves Delhi NCR, Pan India, and selected international architecture and interiors commissions, including Germany, and inquiries from Dubai and Qatar.",
  path: "/international",
  images: [
    {
      url: "/brand/geometry-study.jpeg",
      alt: "Arc 11 Architect international architecture services",
    },
  ],
  keywords: [
    "international architecture services India",
    "pan India architecture firm",
    "architecture studio Germany India",
    "architecture studio Dubai India",
    "architecture studio Qatar India",
    "global architecture and interiors practice",
  ],
});

const engagementModes = [
  {
    title: "Delhi NCR and Pan India",
    description:
      "Core design, interior, coordination, and execution support for residential, commercial, and institutional projects across India.",
  },
  {
    title: "Germany-linked delivery",
    description:
      "The studio has delivered work connected to Germany and can support clients who need Indian design intelligence with clear remote coordination.",
  },
  {
    title: "Dubai and Qatar inquiries",
    description:
      "Arc 11 Architect is open to selected architecture and interiors inquiries from Dubai, Qatar, and the wider international market.",
  },
];

const workingMethods = [
  "Remote design presentations, reviews, and decision rounds",
  "Material, lighting, and detailing guidance with buildable documentation",
  "Coordination with consultants, vendors, and project stakeholders across locations",
  "Calm, detail-led architecture and interiors with execution awareness from the start",
];

const regionGroups = [
  {
    title: "Middle East and GCC",
    description:
      "Open to architecture and interiors inquiries from Dubai, Abu Dhabi, Qatar, Saudi Arabia, Bahrain, Oman, and Kuwait.",
  },
  {
    title: "Europe",
    description:
      "Germany is already part of the studio's international story, with the practice also open to work across the UK, France, Italy, Spain, the Netherlands, and Switzerland.",
  },
  {
    title: "North America and APAC",
    description:
      "The studio is also open to selected collaborations from the United States, Canada, Singapore, Malaysia, Thailand, Indonesia, Australia, and New Zealand.",
  },
];

const aiSignals = [
  "Machine-readable llms.txt and llms-full.txt profiles",
  "Structured business, service, contact, and portfolio metadata",
  "Public sitemap and image discovery paths",
  `Explicit crawler allowances for ${AI_DISCOVERY_PLATFORMS.join(", ")}`,
];

export default function InternationalPage() {
  const countryAreas = new Set([
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Switzerland",
    "Qatar",
    "United Arab Emirates",
    "Saudi Arabia",
    "Bahrain",
    "Oman",
    "Kuwait",
    "Singapore",
    "Malaysia",
    "Thailand",
    "Indonesia",
    "Australia",
    "New Zealand",
    "South Africa",
  ]);
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
        name: "International",
        item: `${SITE_URL}/international`,
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Arc 11 Architect International Services",
    url: `${SITE_URL}/international`,
    description:
      "International and pan-India practice profile for Arc 11 Architect, covering service footprint, Germany-linked work, and inquiries from Dubai and Qatar.",
    about: {
      "@type": "ArchitecturalService",
      "@id": `${SITE_URL}/#head-office`,
      areaServed: SERVICE_AREAS.map((area) => ({
        "@type": countryAreas.has(area) ? "Country" : "Place",
        name: area,
      })),
    },
    mentions: [
      {
        "@type": "WebPage",
        name: "Arc 11 Architect Work",
        url: `${SITE_URL}/work`,
      },
      {
        "@type": "WebPage",
        name: "Arc 11 Architect Contact",
        url: `${SITE_URL}/contact`,
      },
      {
        "@type": "WebPage",
        name: "Arc 11 Architect Justdial Listing",
        url: JUSTDIAL_URL,
      },
    ],
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="card p-8 lg:p-10">
              <p className="kicker">International Reach</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                Delhi NCR based, Pan India in practice, and open to selected global commissions.
              </h1>
              <p className="mt-5 max-w-3xl text-base">
                Arc 11 Architect works from New Delhi with a practice built around architecture,
                interiors, detailing, and end-to-end delivery logic. Alongside Pan India work,
                the studio supports selected international commissions and remote collaborations
                where calm design thinking, clear communication, and buildable detail matter.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/work" className="button-primary">
                  Explore Work
                </Link>
                <StartProjectTrigger className="button-secondary" source="international_page">
                  Start an International Inquiry
                </StartProjectTrigger>
                <a
                  href={JUSTDIAL_URL}
                  className="button-secondary"
                  rel="noreferrer"
                  target="_blank"
                >
                  View Justdial Listing
                </a>
              </div>
            </div>

            <div className="subtle-card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Service Footprint
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span key={area} className="tag-pill">
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-8 space-y-4 text-sm">
                <p>
                  The studio is rooted in Delhi NCR and serves projects across India while also
                  remaining open to clients abroad who need architecture and interiors handled
                  with thoughtful coordination.
                </p>
                <p>
                  Germany is part of the studio&apos;s international story already, and Dubai
                  plus Qatar are active markets the practice is ready to support through remote
                  coordination and structured design delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {engagementModes.map((mode) => (
              <div key={mode.title} className="subtle-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Practice Mode
                </p>
                <h2 className="mt-4 text-2xl">{mode.title}</h2>
                <p className="mt-3 text-sm">{mode.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {regionGroups.map((group) => (
              <div key={group.title} className="subtle-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Region Focus
                </p>
                <h2 className="mt-4 text-2xl">{group.title}</h2>
                <p className="mt-3 text-sm">{group.description}</p>
              </div>
            ))}
          </div>

          <section className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="card p-8">
              <p className="kicker">How We Work</p>
              <h2 className="mt-4 text-4xl">A process built for clarity across distance.</h2>
              <p className="mt-4 text-sm">
                International work succeeds when the design language is strong and the delivery
                logic is even stronger. Arc 11 Architect approaches this through clear reviews,
                measured detailing, and tight coordination with the people building the work.
              </p>
            </div>

            <div className="subtle-card p-8">
              <ul className="space-y-4 text-sm">
                {workingMethods.map((item) => (
                  <li key={item} className="border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="card p-8">
              <p className="kicker">AI Visibility</p>
              <h2 className="mt-4 text-4xl">Prepared for search engines and AI answer systems.</h2>
              <p className="mt-4 text-sm">
                The website is configured so that modern AI-assisted discovery tools can read the
                studio clearly through public pages, structured data, sitemap coverage, and
                machine-readable summaries.
              </p>
            </div>

            <div className="subtle-card p-8">
              <ul className="space-y-4 text-sm">
                {aiSignals.map((item) => (
                  <li key={item} className="border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
