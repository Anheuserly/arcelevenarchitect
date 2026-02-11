import Link from "next/link";
import type { Metadata } from "next";
import CareerApplyForm from "@/components/CareerApplyForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { listDocumentsServer } from "@/lib/appwriteServer";

export const runtime = "edge";

type CareerRole = {
  slug: string;
  title: string;
  location: string;
  department: string;
  discipline?: string;
  id?: string;
  experience: string;
  qualification: string;
  skills: string;
  description: string;
  status: string;
};

const fallbackRoles: CareerRole[] = [
  {
    slug: "international-design-associate",
    title: "International Design Associate",
    location: "Head Office",
    department: "Architecture",
    experience: "0-3 years",
    qualification: "Bachelor's or Master's degree in Architecture",
    skills: "Concept design, spatial narratives, Rhino, Grasshopper, Adobe Suite",
    description:
      "Contribute to early-stage design thinking on residential and institutional projects. Explore alternatives, question briefs, and build strong conceptual narratives with the team.",
    status: "open",
  },
  {
    slug: "architect",
    title: "Architect",
    location: "Head Office",
    department: "Architecture",
    experience: "3-6 years",
    qualification: "B.Arch with site coordination experience",
    skills: "Detailing, coordination, client presentations, documentation",
    description:
      "Lead project documentation, coordinate with consultants, and ensure design intent is delivered on site.",
    status: "open",
  },
];

async function getRoleBySlug(slug: string): Promise<CareerRole | null> {
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_CAREERS_COLLECTION_ID;
  if (!collectionId) {
    return fallbackRoles.find((role) => role.slug === slug) || null;
  }

  try {
    const roles = await listDocumentsServer<CareerRole>({
      collectionId,
      limit: 200,
    });
    const match = roles.find((role) => role.slug === slug);
    if (match) return match;
  } catch {
    return fallbackRoles.find((role) => role.slug === slug) || null;
  }

  return null;
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";

  if (!role) {
    return (
      <div className="bg-[var(--background)]">
        <SiteHeader />
        <main className="section-padding">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-3xl">Role not found</h1>
            <p className="mt-4 text-sm text-[var(--muted)]">
              The role you are looking for is no longer available.
            </p>
            <Link href="/careers" className="underline-link mt-6 inline-block">
              Back to Careers
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
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
        addressLocality: role.location,
        addressCountry: "IN",
      },
    },
    qualifications: role.qualification,
    skills: role.skills,
    occupationalCategory: role.department,
    url: `${siteUrl}/careers/${role.slug}`,
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="kicker">Careers</p>
              <h1 className="mt-5 text-4xl sm:text-5xl">{role.title}</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                <span>{role.location}</span>
                <span>•</span>
                <span>{role.department}</span>
                <span>•</span>
                <span>{role.experience}</span>
              </div>

              <div className="mt-8 space-y-6 text-sm text-[var(--muted)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Qualification
                  </p>
                  <p className="mt-2">{role.qualification}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Key Skills
                  </p>
                  <p className="mt-2">{role.skills}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    Description
                  </p>
                  <p className="mt-2">{role.description}</p>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Apply Now
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Share your resume and portfolio. We will reach out if your profile matches
                the role.
              </p>
              <div className="mt-6">
                <CareerApplyForm jobTitle={role.title} jobSlug={role.slug} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);

  if (!role) {
    return {
      title: "Career Role Not Found | Arc 11 Architect",
      description: "This role is no longer available.",
    };
  }

  return {
    title: `${role.title} | Careers | Arc 11 Architect`,
    description: `${role.title} opening at Arc 11 Architect, ${role.location}. ${role.experience}.`,
    keywords: [
      "architecture jobs Delhi",
      "architect careers",
      role.title,
      role.department,
      role.location,
    ],
  };
}
