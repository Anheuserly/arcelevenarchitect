import Image from "next/image";
import Link from "next/link";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import type {
  DirectAccessAction,
  DirectAccessContactPoint,
  DirectAccessProfile,
  DirectAccessShowcase,
} from "@/lib/directAccessProfiles";

type DirectAccessLandingProps = {
  profile: DirectAccessProfile;
};

function actionClassName(action: DirectAccessAction) {
  return action.variant === "primary" ? "button-primary" : "button-secondary";
}

function renderAction(action: DirectAccessAction, profile: DirectAccessProfile) {
  const className = actionClassName(action);
  const key = `${profile.slug}-${action.kind}-${action.label}`;

  if (action.kind === "startProject") {
    return (
      <StartProjectTrigger
        key={key}
        className={className}
        source={action.source || `${profile.slug}_direct_profile`}
      >
        {action.label}
      </StartProjectTrigger>
    );
  }

  if (action.kind === "document" && action.href) {
    return (
      <TrackingPdfLink
        key={key}
        href={action.href}
        className={className}
        placement={action.placement || `${profile.slug}_direct_profile_document`}
      >
        {action.label}
      </TrackingPdfLink>
    );
  }

  if (action.kind === "email" && action.href) {
    return (
      <a key={key} href={action.href} className={className}>
        {action.label}
      </a>
    );
  }

  if (action.kind === "link" && action.href) {
    return (
      <Link key={key} href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return null;
}

function renderContactPoint(point: DirectAccessContactPoint) {
  const value =
    point.href && point.href.startsWith("/") ? (
      <Link href={point.href} className="text-sm text-[var(--foreground)] underline-link">
        {point.value}
      </Link>
    ) : point.href ? (
      <a href={point.href} className="text-sm text-[var(--foreground)] underline-link">
        {point.value}
      </a>
    ) : (
      <p className="text-sm text-[var(--foreground)]">{point.value}</p>
    );

  return (
    <div
      key={`${point.label}-${point.value}`}
      className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.58)] p-4"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
        {point.label}
      </p>
      <div className="mt-3">{value}</div>
    </div>
  );
}

function renderShowcaseLink(showcase: DirectAccessShowcase, profileSlug: string) {
  if (showcase.kind === "document") {
    return (
      <TrackingPdfLink
        href={showcase.href}
        className="inline-flex text-xs uppercase tracking-[0.24em] text-[var(--foreground)]"
        placement={showcase.placement || `${profileSlug}_showcase_document`}
      >
        {showcase.linkLabel}
      </TrackingPdfLink>
    );
  }

  return (
    <Link
      href={showcase.href}
      className="inline-flex text-xs uppercase tracking-[0.24em] text-[var(--foreground)]"
    >
      {showcase.linkLabel}
    </Link>
  );
}

export default function DirectAccessLanding({ profile }: DirectAccessLandingProps) {
  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
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
              <p className="mt-1 text-sm text-[var(--muted)]">Direct profile route</p>
            </div>
          </Link>

          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]">
              Hidden Access
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Available only through the direct URL, not the public navigation.
            </p>
          </div>
        </header>

        <main className="space-y-6 pb-10">
          <section className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 lg:p-10">
                <p className="kicker">Private Portfolio</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  <span>{profile.role}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--muted-2)]" />
                  <span>{profile.location}</span>
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl sm:text-6xl">{profile.name}</h1>
                <p className="mt-4 max-w-4xl text-xl text-[var(--foreground)] sm:text-2xl">
                  {profile.headline}
                </p>
                <p className="mt-5 max-w-3xl text-base">{profile.summary}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {profile.actions.map((action) => renderAction(action, profile))}
                </div>
              </div>

              <div className="relative min-h-[320px] border-t border-[var(--line)] lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src={profile.heroImage}
                  alt={profile.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,22,20,0.45)] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="max-w-lg rounded-[26px] border border-white/18 bg-[rgba(16,16,16,0.2)] p-5 backdrop-blur-md">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                      Profile Lens
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/92">{profile.heroCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.facts.map((fact) => (
                <div
                  key={`${profile.slug}-${fact.label}`}
                  className="card rounded-[28px] p-6 shadow-[var(--shadow-soft)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                    {fact.label}
                  </p>
                  <h2 className="mt-4 text-2xl sm:text-[2rem]">{fact.value}</h2>
                  <p className="mt-3 text-sm leading-6">{fact.detail}</p>
                </div>
              ))}
            </div>

            <aside className="grid gap-6">
              <div className="subtle-card p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {profile.contactTitle}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6">{profile.contactIntro}</p>
                <div className="mt-6 grid gap-4">{profile.contactPoints.map(renderContactPoint)}</div>
              </div>

              <div className="card p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {profile.noteTitle}
                </p>
                <p className="mt-4 text-sm leading-6">{profile.noteBody}</p>
              </div>
            </aside>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="subtle-card p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                {profile.principlesTitle}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {profile.principles.map((item) => (
                  <article
                    key={`${profile.slug}-${item.title}`}
                    className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.54)] p-5"
                  >
                    <h2 className="text-2xl">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="card p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                {profile.timelineTitle}
              </p>
              <div className="mt-6 space-y-4">
                {profile.timeline.map((item) => (
                  <article
                    key={`${profile.slug}-${item.period}-${item.title}`}
                    className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.56)] p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                      {item.period}
                    </p>
                    <h2 className="mt-3 text-2xl">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="card p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="kicker">{profile.showcaseTitle}</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">A clearer reading of the work.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6">{profile.showcaseIntro}</p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {profile.showcases.map((showcase) => (
                <article
                  key={`${profile.slug}-${showcase.title}`}
                  className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.72)] shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--line)]">
                    <Image
                      src={showcase.imageSrc}
                      alt={showcase.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      {showcase.eyebrow}
                    </p>
                    <h3 className="mt-4 text-3xl">{showcase.title}</h3>
                    <p className="mt-4 text-sm leading-6">{showcase.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {showcase.tags.map((tag) => (
                        <span
                          key={`${showcase.title}-${tag}`}
                          className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">{renderShowcaseLink(showcase, profile.slug)}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="subtle-card p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                {profile.nextStepTitle}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6">{profile.nextStepBody}</p>
              <Link href={profile.nextStepHref} className="button-secondary mt-6">
                {profile.nextStepLabel}
              </Link>
            </div>

            <div className="card p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Why this route exists
              </p>
              <p className="mt-4 text-sm leading-6">
                These pages are meant to be shared one-to-one when someone needs context on a
                person behind the studio without turning that information into a visible public
                navigation section. It keeps the main website focused while still giving you a
                strong direct portfolio page when needed.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
