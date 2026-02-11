import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { listDocumentsServer } from "@/lib/appwriteServer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore current openings at Arc 11 Architect across architecture, interiors, BIM, and design leadership roles.",
  keywords: [
    "architecture jobs Delhi",
    "interior designer jobs",
    "BIM jobs India",
    "careers at architecture firm",
  ],
};

type CareerCard = {
  id: string;
  title: string;
  location: string;
  discipline: string;
  slug: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const fallbackRoles: CareerCard[] = [
  {
    id: "01",
    title: "International Design Associate",
    location: "Head Office",
    discipline: "Residential • Hospitality • Education",
    slug: "international-design-associate",
  },
  {
    id: "02",
    title: "Architect",
    location: "Head Office",
    discipline: "Corporate • Science & Technology",
    slug: "architect",
  },
  {
    id: "03",
    title: "Interior Designer",
    location: "Head Office",
    discipline: "Hospitality • Healthcare • Residential",
    slug: "interior-designer",
  },
  {
    id: "04",
    title: "BIM Developer",
    location: "Head Office",
    discipline: "Digital Delivery",
    slug: "bim-developer",
  },
  {
    id: "05",
    title: "BIM Manager",
    location: "Head Office",
    discipline: "Standards • Coordination",
    slug: "bim-manager",
  },
  {
    id: "06",
    title: "BIM Modeler / Coordinator",
    location: "Head Office",
    discipline: "Production • Coordination",
    slug: "bim-modeler-coordinator",
  },
  {
    id: "07",
    title: "Computational Designer",
    location: "Head Office",
    discipline: "Parametric • R&D",
    slug: "computational-designer",
  },
  {
    id: "08",
    title: "Head — AI",
    location: "Head Office",
    discipline: "Automation • Insight",
    slug: "head-ai",
  },
  {
    id: "09",
    title: "HR Generalist",
    location: "Head Office",
    discipline: "People • Culture",
    slug: "hr-generalist",
  },
  {
    id: "10",
    title: "Human-Centric Design Consultant",
    location: "Head Office",
    discipline: "Experience • Research",
    slug: "human-centric-design-consultant",
  },
  {
    id: "11",
    title: "Narration Head",
    location: "Head Office",
    discipline: "Storytelling • Brand",
    slug: "narration-head",
  },
  {
    id: "12",
    title: "Senior Estimator",
    location: "Head Office",
    discipline: "Cost • Feasibility",
    slug: "senior-estimator",
  },
  {
    id: "13",
    title: "Infographics Designer",
    location: "Head Office",
    discipline: "Visualization • Layout",
    slug: "infographics-designer",
  },
  {
    id: "14",
    title: "Intern",
    location: "Head Office",
    discipline: "Studio Rotation",
    slug: "intern",
  },
];

export default async function CareersPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_CAREERS_COLLECTION_ID;
  let roles = fallbackRoles;

  if (collectionId) {
    try {
      const documents = await listDocumentsServer<CareerCard>({
        collectionId,
        limit: 50,
      });
      if (documents.length > 0) {
        roles = documents.map((role, index) => ({
          ...role,
          id: role.id || String(index + 1).padStart(2, "0"),
          slug: role.slug || slugify(role.title),
        }));
      }
    } catch {
      roles = fallbackRoles;
    }
  }

  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Arc 11 Architect Careers",
    itemListElement: roles.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        title: role.title,
        description: role.discipline,
        employmentType: "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Arc 11 Architect",
          sameAs: siteUrl,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: role.location || "New Delhi",
            addressCountry: "IN",
          },
        },
        url: `${siteUrl}/careers/${role.slug}`,
      },
    })),
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <div>
            <p className="kicker">Careers</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">Life at Arc 11</h1>
            <p className="mt-6 max-w-3xl text-base">
              We started Arc 11 with a desire to practice architecture with clarity and
              care. Our culture is built on collaboration, respect for craft, and steady
              mentorship. We welcome architects, designers, and thinkers who want to build
              spaces that feel calm and precise.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-[var(--muted)]">
              We are certified as a Great Place to Work and believe in long-term growth for
              every team member. If you love detail, materiality, and human-centered planning,
              you will feel at home.
            </p>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
            />

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                We’re looking for
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="group relative h-[210px] overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--surface)]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(20,20,20,0.9), rgba(20,20,20,0.2)), radial-gradient(circle at top, rgba(255,255,255,0.25), transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[var(--foreground)]" />
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        {role.id}. {role.location}
                      </p>
                      <h3 className="mt-3 text-xl leading-snug">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/70">{role.discipline}</p>
                    </div>
                    <Link
                      href={`/careers/${role.slug}`}
                      className="flex items-center justify-between text-xs uppercase tracking-[0.3em]"
                    >
                      <span>Apply now</span>
                      <span className="text-base">→</span>
                    </Link>
                  </div>
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-[1.02]" />
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
