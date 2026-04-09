"use client";

import { useEffect } from "react";

export default function HomeLoadReset() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    const navigationEntry = performance
      .getEntriesByType("navigation")
      .find((entry): entry is PerformanceNavigationTiming => entry instanceof PerformanceNavigationTiming);
    const shouldResetScroll =
      !navigationEntry ||
      navigationEntry.type === "navigate" ||
      navigationEntry.type === "reload";

    if (!shouldResetScroll) {
      return;
    }

    window.history.scrollRestoration = "manual";

    const alignToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    alignToTop();
    const rafId = window.requestAnimationFrame(alignToTop);
    const timeoutId = window.setTimeout(alignToTop, 120);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
