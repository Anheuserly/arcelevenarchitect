import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { activityProjects, getActivityProgress } from "@/lib/activityProjects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Live Project Activity",
  description:
    "Follow Arc 11 Architect's active architecture, interiors, engineering, and turnkey project activity.",
  path: "/activity",
  keywords: [
    "Arc 11 Architect ongoing projects",
    "architecture project progress Delhi NCR",
    "turnkey project activity",
  ],
});

const numberFormat = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export default function ActivityPage() {
  const measuredProjects = activityProjects.filter((project) => getActivityProgress(project) !== null);
  const averageProgress = Math.round(
    measuredProjects.reduce((total, project) => total + (getActivityProgress(project) ?? 0), 0) /
      measuredProjects.length,
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <section className="grid gap-8 border-b border-[var(--line)] pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="kicker">Live Delivery Register</p>
              <h1 className="mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">
                Project activity, tracked with clear delivery context.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                Current work across architecture, interiors, engineering, and turnkey delivery. Each record
                retains its client, location, partner, execution state, and reported activity measure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="metric-tile">
                <span className="metric-label">Active projects</span>
                <span className="metric-value">{activityProjects.length}</span>
              </div>
              <div className="metric-tile">
                <span className="metric-label">Under execution</span>
                <span className="metric-value">
                  {activityProjects.filter((project) => project.status === "Under Execution").length}
                </span>
              </div>
              <div className="metric-tile col-span-2 sm:col-span-1">
                <span className="metric-label">Measured average</span>
                <span className="metric-value">{averageProgress}%</span>
              </div>
            </div>
          </section>

          <section className="mt-12" aria-labelledby="active-projects-heading">
            <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Current Register</p>
                <h2 id="active-projects-heading" className="mt-2 text-3xl sm:text-4xl">
                  Active projects
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Completion is shown only where a target and reported value were supplied. It is a register
                measure, not a substitute for a site-inspection certificate.
              </p>
            </div>

            <div className="mt-6 grid gap-5">
              {activityProjects.map((project) => {
                const progress = getActivityProgress(project);

                return (
                  <article key={project.slug} className="card grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:p-8">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag-pill">{project.status}</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                          {project.progressState}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl leading-snug sm:text-3xl">{project.name}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{project.location}</p>

                      <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[var(--line)] pt-5 text-sm sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Client</dt>
                          <dd className="mt-1 font-medium text-[var(--foreground)]">{project.client}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Sector</dt>
                          <dd className="mt-1 font-medium text-[var(--foreground)]">{project.sector}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Start</dt>
                          <dd className="mt-1 font-medium text-[var(--foreground)]">{project.expectedStart}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Duration</dt>
                          <dd className="mt-1 font-medium text-[var(--foreground)]">{project.duration ?? "To be confirmed"}</dd>
                        </div>
                      </dl>

                      <p className="mt-5 text-xs leading-relaxed text-[var(--muted-2)]">
                        Delivery partner: {project.partner}
                      </p>
                      <Link
                        href={`/activity/${project.slug}`}
                        className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
                      >
                        Open project details and photos
                      </Link>
                    </div>

                    <div className="border-t border-[var(--line)] pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                        Reported progress
                      </p>
                      {progress !== null ? (
                        <>
                          <p className="mt-3 text-5xl text-[var(--foreground)]">{progress}%</p>
                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--line)]">
                            <div
                              className="h-full rounded-full bg-[var(--accent)]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="mt-4 text-sm text-[var(--muted)]">
                            {numberFormat.format(project.completionValue ?? 0)} of {numberFormat.format(project.targetValue ?? 0)} reported
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="mt-3 text-2xl text-[var(--foreground)]">Update pending</p>
                          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                            A target value has not yet been supplied for this workstream.
                          </p>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mt-14 border-t border-[var(--line)] pt-10">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">New Commission</p>
                <h2 className="mt-2 text-3xl">Planning a similar project?</h2>
              </div>
              <Link href="/start-project" className="button-primary">
                Start a project
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
