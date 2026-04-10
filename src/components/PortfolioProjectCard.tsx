/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { PortfolioProject } from "@/lib/portfolio";

type PortfolioProjectCardProps = {
  index?: number;
  priority?: boolean;
  project: PortfolioProject;
};

export default function PortfolioProjectCard({
  project,
  priority = false,
  index,
}: PortfolioProjectCardProps) {
  return (
    <article id={project.slug} className="group card overflow-hidden">
      <Link href={project.href} className="block">
        <div className="relative aspect-[16/11] overflow-hidden bg-[var(--surface)]">
          <img
            src={project.heroImage}
            alt={project.heroLabel}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05),rgba(8,8,8,0.18)_48%,rgba(8,8,8,0.34))]" />

          <div className="absolute left-5 top-5 flex items-center gap-3">
            {typeof index === "number" ? (
              <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
              <span>{project.location}</span>
              <span>{project.year}</span>
              <span>{project.status}</span>
            </div>
            <h3 className="mt-4 max-w-xl text-2xl sm:text-[2rem]">{project.title}</h3>
            <p className="mt-4 text-sm leading-6">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.spaces.slice(0, 4).map((space) => (
                <span key={space} className="tag-pill">
                  {space}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="metric-tile min-w-[148px]">
              <span className="metric-label">Visual Frames</span>
              <span className="metric-value">{project.imageCount}</span>
            </div>
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--foreground)]">
              Open Case Study
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
