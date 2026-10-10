import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  activityProjects,
  getActivityProgress,
  getActivityProject,
  getActivityProjectImages,
} from "@/lib/activityProjects";
import { buildPageMetadata } from "@/lib/seo";

type ActivityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return activityProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ActivityDetailPageProps) {
  const { slug } = await params;
  const project = getActivityProject(slug);

  if (!project) {
    return { title: "Project Activity | Arc 11 Architect" };
  }

  return buildPageMetadata({
    title: `${project.name} Activity`,
    description: `Live project activity, delivery context, and site photos for ${project.name}.`,
    path: `/activity/${project.slug}`,
  });
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { slug } = await params;
  const project = getActivityProject(slug);

  if (!project) {
    notFound();
  }

  const progress = getActivityProgress(project);
  const images = getActivityProjectImages(project);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/activity" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)]">
            Back to activity
          </Link>

          <section className="mt-8 grid gap-8 border-b border-[var(--line)] pb-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="kicker">Active project record</p>
              <h1 className="mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">{project.name}</h1>
              <p className="mt-5 text-base text-[var(--muted)]">{project.location}</p>
              <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
                <div><dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Client</dt><dd className="mt-1 font-medium">{project.client}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Sector</dt><dd className="mt-1 font-medium">{project.sector}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Start</dt><dd className="mt-1 font-medium">{project.expectedStart}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted-2)]">Duration</dt><dd className="mt-1 font-medium">{project.duration ?? "To be confirmed"}</dd></div>
              </dl>
              <p className="mt-8 text-sm leading-relaxed text-[var(--muted)]">Delivery partner: {project.partner}</p>
            </div>

            <div className="card self-start p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">Reported progress</p>
              {progress !== null ? (
                <>
                  <p className="mt-4 text-6xl">{progress}%</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--line)]"><div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} /></div>
                </>
              ) : (
                <p className="mt-4 text-2xl">Update pending</p>
              )}
              <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{project.status} - {project.progressState}</p>
            </div>
          </section>

          <section className="mt-12" aria-labelledby="project-gallery-heading">
            <div className="flex flex-col justify-between gap-3 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Site gallery</p>
                <h2 id="project-gallery-heading" className="mt-2 text-3xl sm:text-4xl">Work pictures</h2>
              </div>
              <p className="text-sm text-[var(--muted)]">{images.length} photo{images.length === 1 ? "" : "s"}</p>
            </div>

            {images.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className="group relative block aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white">Photo {index + 1}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-6 border border-dashed border-[var(--line-strong)] p-8 text-sm leading-relaxed text-[var(--muted)]">
                Site photographs will appear here as they are added to this project record.
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
