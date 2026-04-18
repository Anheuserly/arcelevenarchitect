import Link from "next/link";
import StartProjectTrigger from "@/components/StartProjectTrigger";

export default function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="border-t border-[var(--line)] bg-[rgba(243,236,227,0.82)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left column - brand and description (image removed) */}
          <div className="card p-8 lg:p-10">
            <p className="kicker">Arc 11 Architect</p>
            <h3 className="mt-4 max-w-xl text-3xl sm:text-4xl">
              Spaces shaped by light, proportion, and lived rhythm.
            </h3>
            <p className="mt-4 max-w-xl text-sm">
              Architecture, interiors, and project delivery for residences, institutional
              environments, and detail-led transformations.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
              <a
                href="https://www.instagram.com/arc11architect/"
                className="underline-link"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/"
                className="underline-link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://koloapp.in/delhi/architects/shashank-saini--delhi"
                className="underline-link"
                target="_blank"
                rel="noreferrer"
              >
                Kolo
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578009358525"
                className="underline-link"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="button-primary">
                Explore Work
              </Link>
              <Link href="/instagram" className="button-secondary">
                Instagram Feed
              </Link>
              <StartProjectTrigger className="button-secondary" source="footer_cta">
                Start a Project
              </StartProjectTrigger>
            </div>
          </div>

          {/* Right column - contact and links */}
          <div className="grid gap-6">
            <div className="subtle-card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Contact
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <p>arcelevenarchitect@gmail.com</p>
                <p>+91 8527378555</p>
                <p>+91 96500 58444</p>
              </div>
              <div className="mt-6 border-t border-[var(--line)] pt-5 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Head Office
                </p>
                <p className="mt-2">Plot No. 535, Second Floor, Left Side</p>
                <p>Khasra No. 60, 128-D21, Chattarpur Pahadi</p>
                <p>New Delhi 110074</p>
              </div>
              <div className="mt-6 border-t border-[var(--line)] pt-5 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Branch Office
                </p>
                <p className="mt-2">E1, DDA Flats, A2/04, Rangpuri Pahari</p>
                <p>Vasant Kunj, New Delhi 110070</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="subtle-card p-6 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Quick Links
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/">Home</Link>
                  <Link href="/studio">Studio</Link>
                  <Link href="/services">Services</Link>
                  <Link href="/work">Work</Link>
                  <Link href="/instagram">Instagram</Link>
                  <StartProjectTrigger className="text-left" source="footer_quick_links">
                    Start a Project
                  </StartProjectTrigger>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>

              <div className="subtle-card p-6 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Studio Notes
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Office Hours
                    </p>
                    <p className="mt-1">Mon-Sat, 10:00-19:00</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                      Sectors
                    </p>
                    <p className="mt-1">Residential, Commercial, Institutional, Renovation</p>
                  </div>
                  <div className="pt-1">
                    <Link href="/privacy">Privacy</Link>
                    <span className="mx-2 text-[var(--muted-2)]">/</span>
                    <Link href="/terms">Terms</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-6 py-6 text-center text-xs text-[var(--muted-2)]">
        © 2026 Arc 11 Architect. All rights reserved. Made with{" "}
        <a
          href="https://openai.com/index/introducing-the-codex-app/"
          target="_blank"
          rel="noreferrer"
          className="underline-link"
        >
          Codex
        </a>
        .
      </div>
    </footer>
  );
}
