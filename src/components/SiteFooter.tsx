import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="text-xs tracking-[0.4em] text-[var(--muted-2)]">ARC 11 ARCHITECT</p>
          <h3 className="mt-4 text-2xl">Spaces shaped by light, proportion, and purpose.</h3>
          <p className="mt-4 text-sm">
            Architecture, interior, and project delivery across residential, commercial, and
            hospitality.
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
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            Contact
          </p>
          <p>arcelevenarchitect@gmail.com</p>
          <p>+91 8527378555</p>
          <div className="mt-4 space-y-2 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            <p>Head Office</p>
          </div>
          <p>D-21, Chhatarpur Hills, II Floor</p>
          <p>Ambedkar Colony, New Delhi-74</p>
          <div className="mt-4 space-y-2 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            <p>Branch Office</p>
          </div>
          <p>E1, DDA Flats, A2/04, Rangpuri Pahari</p>
          <p>Vasant Kunj, New Delhi 110070</p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            Quick Links
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/studio">Studio</Link>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/estimator">Estimator</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/journal">Journal</Link>
          </div>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            Studio Info
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Office Hours
              </p>
              <p>Mon–Sat, 10:00–19:00</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Project Types
              </p>
              <p>Residential • Commercial</p>
              <p>Institutional • Renovation</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Service Areas
              </p>
              <p>Delhi NCR • Pan India • International</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Legal
              </p>
              <div className="flex flex-col gap-1">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
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
