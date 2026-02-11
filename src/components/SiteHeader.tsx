"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Estimator", href: "/estimator" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Arc 11 Architect"
            width={44}
            height={44}
            className="h-10 w-10 object-contain"
          />
          <span className="text-xs uppercase tracking-[0.4em] text-[var(--muted-2)]">
            Arc 11 Architect
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="underline-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.2em] md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>
        <Link
          href="/contact"
          className="hidden rounded-full border border-[var(--line)] px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[var(--foreground)] md:inline-flex"
        >
          Start a Project
        </Link>
      </div>
      {menuOpen ? (
        <div className="border-t border-[var(--line)] bg-[var(--background)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-[var(--muted)]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-[var(--line)] bg-white px-4 py-3"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-[var(--foreground)] px-4 py-3 text-center text-xs uppercase tracking-[0.22em] text-white"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
