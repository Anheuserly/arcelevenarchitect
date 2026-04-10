import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for could not be found. Return to Arc 11 Architect's studio, work, services, or contact pages.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": 0,
      "max-video-preview": 0,
    },
  },
};

const quickRoutes = [
  {
    href: "/",
    label: "Home",
    title: "Return to the main studio page",
    description: "Go back to the homepage and start again from the main presentation.",
  },
  {
    href: "/work",
    label: "Work",
    title: "Browse built and visual case studies",
    description: "Move straight into residential, commercial, and institutional project galleries.",
  },
  {
    href: "/services",
    label: "Services",
    title: "Review design and delivery scope",
    description: "See architecture, interiors, BIM, and execution support in one place.",
  },
  {
    href: "/contact",
    label: "Contact",
    title: "Reach the studio directly",
    description: "Use contact details or the inquiry flow if you were trying to connect with Arc 11.",
  },
];

export default function NotFoundPage() {
  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <section className="card p-8 lg:p-10">
              <p className="kicker">404 | Page Not Found</p>
              <h1 className="mt-4 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
                The page has slipped out of the drawing set.
              </h1>
              <p className="mt-5 max-w-2xl text-base">
                The address you opened may have moved, expired, or never existed. Use the paths
                below to return to the main studio pages and continue from a cleaner route.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="button-primary">
                  Back to Home
                </Link>
                <Link href="/work" className="button-secondary">
                  Explore Work
                </Link>
                <StartProjectTrigger className="button-secondary" source="not_found_page">
                  Start a Project
                </StartProjectTrigger>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="subtle-card block p-6 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      {route.label}
                    </p>
                    <h2 className="mt-4 text-2xl">{route.title}</h2>
                    <p className="mt-3 text-sm">{route.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <aside className="grid gap-6">
              <div className="card overflow-hidden">
                <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="border-b border-[var(--line)] bg-[var(--surface)] p-8 lg:border-b-0 lg:border-r">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                      Recovery Route
                    </p>
                    <p className="mt-4 text-5xl sm:text-6xl">04</p>
                    <p className="mt-4 text-sm">
                      Zero useful paths found in the current address. Use a valid studio route to
                      continue.
                    </p>
                  </div>
                  <div className="relative min-h-[320px] bg-white">
                    <Image
                      src="/brand/geometry-study.jpeg"
                      alt="Arc 11 Architect geometry study"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.08),rgba(20,18,16,0.28))]" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/20 bg-[rgba(18,16,14,0.38)] p-5 text-white backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                        Suggested Next Move
                      </p>
                      <p className="mt-3 text-lg">
                        Return to the homepage, review case studies, or open contact to connect
                        with the studio directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="subtle-card p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Helpful Destinations
                </p>
                <div className="mt-5 space-y-4 text-sm">
                  <div className="border-b border-[var(--line)] pb-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Work Archive
                    </p>
                    <p className="mt-2">Residential, commercial, and institutional case studies.</p>
                  </div>
                  <div className="border-b border-[var(--line)] pb-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Instagram Feed
                    </p>
                    <p className="mt-2">Visual updates, posts, and reels from the studio.</p>
                  </div>
                  <div className="border-b border-[var(--line)] pb-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Contact
                    </p>
                    <p className="mt-2">General inquiries, meetings, and studio communication.</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Start a Project
                    </p>
                    <p className="mt-2">Share a real project brief if you are looking to work with Arc 11.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
