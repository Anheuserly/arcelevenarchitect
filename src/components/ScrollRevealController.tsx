"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = ".card, .subtle-card, .metric-tile, .gallery-figure, .hero-panel";

export default function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.setAttribute("data-reveal-state", "visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element, index) => {
      if (element.getAttribute("data-reveal-state") === "visible") {
        return;
      }

      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 45}ms`);
      const bounds = element.getBoundingClientRect();
      const isAlreadyVisible =
        bounds.top < window.innerHeight * 0.88 && bounds.bottom > window.innerHeight * 0.08;

      if (isAlreadyVisible) {
        element.setAttribute("data-reveal-state", "visible");
        return;
      }

      element.setAttribute("data-reveal-state", "pending");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
