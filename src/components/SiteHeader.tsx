"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Estimator", href: "/estimator" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, opacity: 0, width: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuOpen = openMenuPath === pathname;

  const activeIndex = navItems.findIndex(
    (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
  );

  useEffect(() => {
    const updateScrollState = () => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 22);
      setScrollProgress(maxScroll > 0 ? currentScroll / maxScroll : 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeLink = linkRefs.current[activeIndex];
      const navElement = navRef.current;

      if (!activeLink || !navElement) {
        setIndicator((current) => ({ ...current, opacity: 0 }));
        return;
      }

      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicator({
        left: linkRect.left - navRect.left,
        opacity: 1,
        width: linkRect.width,
      });
    };

    updateIndicator();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && navRef.current
        ? new ResizeObserver(updateIndicator)
        : null;

    if (navRef.current && resizeObserver) {
      resizeObserver.observe(navRef.current);
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex, pathname]);

  return (
    <header className="site-header">
      <div
        className={`site-header-bar mx-auto max-w-7xl ${isScrolled ? "site-header-bar-scrolled" : ""}`}
      >
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
            <p className="mt-1 hidden text-sm text-[var(--muted)] sm:block">
              Architecture, interiors, and visual strategy
            </p>
          </div>
        </Link>

        <nav ref={navRef} className="site-nav-shell hidden md:flex" aria-label="Primary">
          <span
            className="site-nav-indicator"
            aria-hidden="true"
            style={{
              opacity: indicator.opacity,
              transform: `translate3d(${indicator.left}px, 0, 0)`,
              width: indicator.width,
            }}
          />
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={item.label}
                href={item.href}
                ref={(node) => {
                  linkRefs.current[index] = node;
                }}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive ? "true" : "false"}
                className="site-nav-link"
              >
                <span className="site-nav-link-content">
                  <span className="site-nav-link-text">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="site-header-actions">
          <button
            type="button"
            onClick={() => {
              setOpenMenuPath((current) => (current === pathname ? null : pathname));
            }}
            className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] shadow-[var(--shadow-soft)] md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            Menu
          </button>
          <Link href="/contact" className="button-secondary hidden md:inline-flex">
            Start a Project
          </Link>
        </div>

        <span
          className="site-header-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl px-2 md:hidden">
          <div className="site-mobile-panel">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpenMenuPath(null)}
                    aria-current={isActive ? "page" : undefined}
                    className={`site-mobile-link ${
                      isActive
                        ? "site-mobile-link-active"
                        : "border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="site-mobile-link-rule" aria-hidden="true" />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpenMenuPath(null)}
                className="button-primary mt-2 justify-center"
              >
                Start a Project
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
