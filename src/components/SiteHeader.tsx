"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StartProjectTrigger from "@/components/StartProjectTrigger";

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

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenuPath(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, pathname]);

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
        <Link href="/" className="hidden items-center gap-4 md:flex">
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

        <Link href="/" className="flex min-w-0 max-w-[15rem] flex-1 items-center gap-2.5 md:hidden">
          <div className="overflow-hidden rounded-[14px] border border-[var(--line-strong)] bg-white p-1.5 shadow-[var(--shadow-soft)]">
            <Image
              src="/brand/proportion-study.png"
              alt="Arc 11 Architect"
              width={36}
              height={36}
              className="h-8.5 w-8.5 object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.58rem] uppercase tracking-[0.28em] text-[var(--muted-2)]">
              Arc 11 Architect
            </p>
            <p className="mt-1 truncate text-[0.72rem] text-[var(--muted)]">
              Architecture and interiors
            </p>
          </div>
        </Link>

        <div className="hidden md:flex">
          <nav ref={navRef} className="site-nav-shell" aria-label="Primary">
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
        </div>

        <div className="site-header-actions">
          <button
            type="button"
            onClick={() => {
              setOpenMenuPath((current) => (current === pathname ? null : pathname));
            }}
            className={`site-mobile-utility md:hidden ${menuOpen ? "site-mobile-utility-active" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-panel"
            aria-label="Toggle menu"
          >
            <span className="site-mobile-utility-copy">{menuOpen ? "Close" : "Menu"}</span>
            <span className="site-mobile-utility-glyph" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
          <div className="hidden md:flex">
            <StartProjectTrigger className="button-secondary" source="header_desktop">
              Start a Project
            </StartProjectTrigger>
          </div>
        </div>

        <span
          className="site-header-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl px-2 md:hidden">
          <div className="site-mobile-panel-shell">
            <div className="site-mobile-panel" id="site-mobile-panel">
              <div className="site-mobile-panel-header">
                <p className="site-mobile-panel-kicker">Menu</p>
                <p className="site-mobile-panel-caption">
                  Studio pages, casework, tools, and project intake in one cleaner mobile sheet.
                </p>
              </div>
              <nav className="site-mobile-list">
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
                      <span className="site-mobile-link-inner">
                        <span className="site-mobile-link-rule" aria-hidden="true" />
                        <span className="site-mobile-link-label">{item.label}</span>
                      </span>
                      <span className="site-mobile-link-mark" aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>
              <div className="site-mobile-panel-actions">
                <StartProjectTrigger
                  className="button-primary justify-center"
                  onOpen={() => setOpenMenuPath(null)}
                  source="header_mobile"
                >
                  Start a Project
                </StartProjectTrigger>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
