import Image from "next/image";
import Link from "next/link";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import TrackingPdfLink from "@/components/TrackingPdfLink";
import type {
  DirectAccessAction,
  DirectAccessContactPoint,
  DirectAccessProfile,
  DirectAccessSocialLink,
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
    ) : point.href && point.href.startsWith("http") ? (
      <a
        href={point.href}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-[var(--foreground)] underline-link"
      >
        {point.value}
      </a>
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

function renderSocialLink(link: DirectAccessSocialLink) {
  const value = link.href ? (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-[var(--foreground)] underline-link"
    >
      {link.handle}
    </a>
  ) : (
    <p className="text-sm text-[var(--foreground)]">{link.handle}</p>
  );

  return (
    <div
      key={`${link.platform}-${link.handle}`}
      className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.58)] p-4"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
        {link.platform}
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
              <p className="mt-1 text-sm text-[var(--muted)]">{profile.role}</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <span className="rounded-full border border-[var(--line)] bg-white/76 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
              {profile.name}
            </span>
            <Link href="/" className="button-secondary">
              Back to Home
            </Link>
          </div>
        </header>

        <main className="space-y-6 pb-10">
          <section className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
              <div className="relative p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  <span className="rounded-full border border-[var(--line)] bg-white/72 px-3 py-2">
                    Portfolio Profile
                  </span>
                  <span>{profile.location}</span>
                </div>
                <h1 className="mt-6 max-w-4xl text-5xl sm:text-7xl">{profile.name}</h1>
                <div className="mt-6 max-w-4xl border-l border-[var(--line-strong)] pl-5">
                  <p className="text-xl leading-tight text-[var(--foreground)] sm:text-[1.85rem]">
                    {profile.headline}
                  </p>
                </div>
                <p className="mt-6 max-w-3xl text-base leading-7">{profile.summary}</p>

                <div className="mt-9 flex flex-wrap gap-3">
                  {profile.actions.map((action) => renderAction(action, profile))}
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {profile.facts.slice(0, 2).map((fact) => (
                    <article
                      key={`${profile.slug}-hero-${fact.label}`}
                      className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-5"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                        {fact.label}
                      </p>
                      <h2 className="mt-4 text-2xl">{fact.value}</h2>
                      <p className="mt-3 text-sm leading-6">{fact.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[420px] border-t border-[var(--line)] lg:border-l lg:border-t-0">
                <Image
                  src={profile.heroImage}
                  alt={profile.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.08),rgba(18,16,14,0.48))]" />
                <div className="absolute left-6 top-6 rounded-full border border-white/18 bg-[rgba(18,16,14,0.18)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/86 backdrop-blur-md">
                  {profile.role}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[26px] border border-white/18 bg-[rgba(16,16,16,0.22)] p-5 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                        Profile Lens
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/92">{profile.heroCaption}</p>
                    </div>
                    <div className="rounded-[26px] border border-white/18 bg-[rgba(255,255,255,0.12)] p-5 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                        Base
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/92">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-px border-t border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              {profile.facts.slice(2).map((fact) => (
                <article
                  key={`${profile.slug}-fact-${fact.label}`}
                  className="bg-[rgba(255,255,255,0.78)] p-6"
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    {fact.label}
                  </p>
                  <h2 className="mt-4 text-2xl">{fact.value}</h2>
                  <p className="mt-3 text-sm leading-6">{fact.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <aside className="grid gap-6">
              <div className="subtle-card p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {profile.contactTitle}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6">{profile.contactIntro}</p>
                <div className="mt-6 grid gap-4">{profile.contactPoints.map(renderContactPoint)}</div>
              </div>

              <div className="card p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {profile.socialTitle}
                </p>
                <p className="mt-4 text-sm leading-6">{profile.socialIntro}</p>
                <div className="mt-6 grid gap-4">{profile.socialLinks.map(renderSocialLink)}</div>
              </div>

              <div className="card p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  {profile.noteTitle}
                </p>
                <p className="mt-4 text-sm leading-6">{profile.noteBody}</p>
                <Link href="/" className="button-secondary mt-6">
                  Back to Home
                </Link>
              </div>
            </aside>

            <div className="grid gap-6">
              <div className="subtle-card p-8 lg:p-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      {profile.principlesTitle}
                    </p>
                    <h2 className="mt-4 text-4xl">How the work is approached.</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {profile.principles.map((item) => (
                    <article
                      key={`${profile.slug}-${item.title}`}
                      className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.54)] p-5"
                    >
                      <h3 className="text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="card p-8 lg:p-10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      {profile.timelineTitle}
                    </p>
                    <h2 className="mt-4 text-4xl">Experience through built phases.</h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {profile.timeline.map((item) => (
                    <article
                      key={`${profile.slug}-${item.period}-${item.title}`}
                      className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.56)] p-5"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                        {item.period}
                      </p>
                      <h3 className="mt-3 text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6">{item.description}</p>
                    </article>
                  ))}
                </div>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={profile.nextStepHref} className="button-secondary">
                  {profile.nextStepLabel}
                </Link>
                <Link href="/" className="button-secondary">
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="card p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Studio Context
              </p>
              <p className="mt-4 text-sm leading-6">
                This page is designed as a focused reading of one person inside the Arc 11
                ecosystem, so the work, thinking, and contact route stay clear without the noise
                of the full studio website around it.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
