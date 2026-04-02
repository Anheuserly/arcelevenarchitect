import Image from "next/image";
import Link from "next/link";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import type { DirectAccessProfile } from "@/lib/directAccessProfiles";
import { getPortfolioProject } from "@/lib/portfolio";

type DirectAccessLandingProps = {
  profile: DirectAccessProfile;
};

const studioContacts = [
  "arcelevenarchitect@gmail.com",
  "+91 8527378555",
  "+91 96500 58444",
];

const nextSteps = [
  "Review the reference project and open the relevant PDF.",
  "Use Start a Project if there is an active site, budget, or timeline to discuss.",
  "Use Contact instead if the requirement is only an inquiry, introduction, or follow-up.",
];

export default function DirectAccessLanding({ profile }: DirectAccessLandingProps) {
  const featuredProject = getPortfolioProject(profile.featuredProjectSlug);

  if (!featuredProject) {
    throw new Error(`Missing featured project for direct access page: ${profile.slug}`);
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="subtle-card flex flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <Link href="/" className="flex items-center gap-4">
            <div className="overflow-hidden rounded-[18px] border border-[var(--line-strong)] bg-white p-2 shadow-[var(--shadow-soft)]">
              <Image
                src="/brand/proportion-study.png"
                alt="Arc 11 Architect"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--muted-2)]">
                Arc 11 Architect
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Direct access page prepared for {profile.name}
              </p>
            </div>
          </Link>

          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]">
              Not Linked Publicly
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Opens only when the direct URL is used.
            </p>
          </div>
        </header>

        <main className="pb-10 pt-6 sm:pt-8">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <section className="card p-8 lg:p-10">
              <p className="kicker">Direct Access</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">{profile.title}</h1>
              <p className="mt-5 max-w-3xl text-base">{profile.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <StartProjectTrigger
                  className="button-primary"
                  source={`${profile.slug}_direct_access_primary`}
                >
                  Start a Project
                </StartProjectTrigger>
                <TrackingPdfLink
                  href={profile.documentHref}
                  className="button-secondary"
                  placement={`${profile.slug}_direct_access_pdf`}
                >
                  {profile.documentLabel}
                </TrackingPdfLink>
                <a
                  href="mailto:arcelevenarchitect@gmail.com"
                  className="button-secondary visited:text-[var(--foreground)] hover:text-[var(--foreground)]"
                >
                  Email Studio
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Best For
                  </p>
                  <p className="mt-3 text-sm">
                    Direct review, early alignment, and first-step project conversations.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Access Style
                  </p>
                  <p className="mt-3 text-sm">
                    Hidden from navigation, omitted from the sitemap, and marked noindex.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Studio Range
                  </p>
                  <p className="mt-3 text-sm">
                    Architecture, interiors, visualization, and execution-linked support.
                  </p>
                </div>
              </div>
            </section>

            <aside className="grid gap-6">
              <div className="subtle-card p-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Use This Page To
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {profile.focusAreas.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Studio Contact
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  {studioContacts.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>

                <div className="mt-5 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.58)] p-4 text-sm">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Direct-Only Route
                  </p>
                  <p className="mt-2">
                    Anyone with the link can open it, but it is not surfaced in the public site
                    navigation.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={featuredProject.heroImage}
                  alt={featuredProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  <span>{featuredProject.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--muted-2)]" />
                  <span>{featuredProject.location}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--muted-2)]" />
                  <span>{featuredProject.status}</span>
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl">{featuredProject.title}</h2>
                <p className="mt-4 max-w-2xl text-sm sm:text-base">{featuredProject.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredProject.spaces.slice(0, 4).map((space) => (
                    <span
                      key={space}
                      className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
                    >
                      {space}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={featuredProject.href} className="button-primary">
                    Open Case Study
                  </Link>
                  <Link href="/work" className="button-secondary">
                    Browse Selected Work
                  </Link>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              <div className="subtle-card p-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  What Happens Next
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {nextSteps.map((step) => (
                    <li
                      key={step}
                      className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  General Inquiry
                </p>
                <h2 className="mt-4 text-3xl">Need a lighter conversation first?</h2>
                <p className="mt-4 text-sm">
                  Use the contact page for collaborations, introductions, vendors, meetings, or
                  any inquiry that is not yet a live project brief.
                </p>
                <Link href="/contact" className="button-secondary mt-6">
                  Open Contact
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
