"use client";

import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
  "/": "Studio Home",
  "/studio": "Studio",
  "/services": "Services",
  "/work": "Selected Work",
  "/estimator": "Estimator",
  "/start-project": "Start Project",
  "/careers": "Careers",
  "/contact": "Contact",
  "/journal": "Journal",
  "/instagram": "Instagram",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function getRouteLabel(pathname: string) {
  if (routeLabels[pathname]) {
    return routeLabels[pathname];
  }

  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return "Studio Home";
  }

  return toTitleCase(segments[segments.length - 1]);
}

export default function PageTransitionOverlay() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="page-transition-layer" aria-hidden="true">
      <div key={pathname} className="page-transition-flight">
        <span className="page-transition-sheet" />
        <span className="page-transition-line" />
        <span className="page-transition-caption">{getRouteLabel(pathname)}</span>
      </div>
    </div>
  );
}
