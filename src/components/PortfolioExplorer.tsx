"use client";

import { startTransition, useDeferredValue, useState } from "react";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";
import type { PortfolioCategory, PortfolioProject } from "@/lib/portfolio";

const filters = ["All", "Residential", "Commercial"] as const;

type ExplorerFilter = (typeof filters)[number];

function matchesProject(
  project: PortfolioProject,
  filter: ExplorerFilter,
  query: string,
) {
  const withinFilter = filter === "All" || project.category === filter;

  if (!withinFilter) {
    return false;
  }

  if (!query) {
    return true;
  }

  const haystack = [
    project.title,
    project.location,
    project.category,
    project.status,
    project.scope,
    ...project.spaces,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export default function PortfolioExplorer({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [activeFilter, setActiveFilter] = useState<ExplorerFilter>("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredProjects = projects.filter((project) =>
    matchesProject(project, activeFilter, deferredQuery),
  );

  const categoryCounts = projects.reduce<Record<PortfolioCategory, number>>(
    (counts, project) => {
      counts[project.category] += 1;
      return counts;
    },
    { Commercial: 0, Residential: 0 },
  );

  return (
    <section className="space-y-8">
      <div className="card overflow-hidden p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">Portfolio Explorer</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Browse by sector, location, and space type.</h2>
            <p className="mt-3 max-w-2xl text-sm">
              Search across titles, locations, key spaces, and project scope to move through
              the archive with more precision.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="metric-tile">
              <span className="metric-label">All Projects</span>
              <span className="metric-value">{projects.length}</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">Residential</span>
              <span className="metric-value">{categoryCounts.Residential}</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">Commercial</span>
              <span className="metric-value">{categoryCounts.Commercial}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    startTransition(() => setActiveFilter(filter));
                  }}
                  className={`filter-pill ${isActive ? "filter-pill-active" : ""}`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <label className="search-field lg:max-w-sm">
            <span className="sr-only">Search the portfolio</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by location, room, or scope"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-2)]"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
          Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
        </p>
        <p className="text-sm">
          {activeFilter === "All" ? "Cross-sector archive" : `${activeFilter} archive`}
        </p>
      </div>

      {filteredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <PortfolioProjectCard
              key={project.slug}
              project={project}
              priority={index < 2}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="card p-10 text-center">
          <p className="kicker">No Match</p>
          <h3 className="mt-4 text-2xl">Try a broader term or switch the sector filter.</h3>
          <p className="mt-3 text-sm">
            Searches currently check project names, locations, scope descriptions, and the
            listed room or space tags.
          </p>
        </div>
      )}
    </section>
  );
}
