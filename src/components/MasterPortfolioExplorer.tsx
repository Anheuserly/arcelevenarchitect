"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";
import {
  masterPortfolioDisciplines,
  type MasterPortfolioProject,
} from "@/lib/masterPortfolio";

const lifecycleFilters = ["All", "Completed", "Under Execution"] as const;

type LifecycleFilter = (typeof lifecycleFilters)[number];

const numberFormat = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function matchesProject(project: MasterPortfolioProject, filter: LifecycleFilter, query: string) {
  if (filter !== "All" && project.lifecycle !== filter) {
    return false;
  }

  if (!query) {
    return true;
  }

  return [
    project.title,
    project.client,
    project.discipline,
    project.entity,
    project.started,
    project.completedOrCurrent,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function amount(value?: number) {
  return value === undefined ? "Not disclosed" : `Rs. ${numberFormat.format(value)} lakh`;
}

export default function MasterPortfolioExplorer({
  projects,
}: {
  projects: MasterPortfolioProject[];
}) {
  const [activeFilter, setActiveFilter] = useState<LifecycleFilter>("All");
  const [activeDiscipline, setActiveDiscipline] = useState("All disciplines");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          matchesProject(project, activeFilter, deferredQuery) &&
          (activeDiscipline === "All disciplines" || project.discipline === activeDiscipline),
      ),
    [activeDiscipline, activeFilter, deferredQuery, projects],
  );

  const completedCount = projects.filter((project) => project.lifecycle === "Completed").length;
  const activeCount = projects.filter((project) => project.lifecycle === "Under Execution").length;

  return (
    <section className="mt-20 border-t border-[var(--line)] pt-14" aria-labelledby="delivery-register-heading">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="kicker">Master Portfolio Register</p>
          <h2 id="delivery-register-heading" className="mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
            Confirmed project delivery record.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            A searchable record of completed and active work across architecture, interiors,
            commercial delivery, MEP, and infrastructure consultancy. Project values are retained
            exactly as supplied in the master portfolio register.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="metric-tile">
            <span className="metric-label">Records</span>
            <span className="metric-value">{projects.length}</span>
          </div>
          <div className="metric-tile">
            <span className="metric-label">Completed</span>
            <span className="metric-value">{completedCount}</span>
          </div>
          <div className="metric-tile">
            <span className="metric-label">Active</span>
            <span className="metric-value">{activeCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 border-y border-[var(--line)] py-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2">
          {lifecycleFilters.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => startTransition(() => setActiveFilter(filter))}
                className={`filter-pill ${selected ? "filter-pill-active" : ""}`}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <label className="search-field lg:min-w-80">
          <span className="sr-only">Search project records</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search project, client, sector, or year"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-2)]"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => startTransition(() => setActiveDiscipline("All disciplines"))}
          className={`filter-pill ${activeDiscipline === "All disciplines" ? "filter-pill-active" : ""}`}
        >
          All disciplines
        </button>
        {masterPortfolioDisciplines.map((discipline) => (
          <button
            key={discipline}
            type="button"
            onClick={() => startTransition(() => setActiveDiscipline(discipline))}
            className={`filter-pill ${activeDiscipline === discipline ? "filter-pill-active" : ""}`}
          >
            {discipline}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
        Showing {filteredProjects.length} of {projects.length} records
      </p>

      <div className="mt-5 overflow-x-auto border border-[var(--line)] bg-white">
        <table className="w-full min-w-[72rem] border-collapse text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">
            <tr>
              <th className="px-5 py-4 font-semibold">Project</th>
              <th className="px-5 py-4 font-semibold">Client</th>
              <th className="px-5 py-4 font-semibold">Discipline</th>
              <th className="px-5 py-4 font-semibold">Timeline</th>
              <th className="px-5 py-4 font-semibold">Project value</th>
              <th className="px-5 py-4 font-semibold">Lifecycle</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-t border-[var(--line)] align-top">
                <td className="px-5 py-5">
                  <p className="font-medium text-[var(--foreground)]">{project.title}</p>
                  <p className="mt-1 text-xs text-[var(--muted-2)]">Record {String(project.id).padStart(2, "0")}</p>
                </td>
                <td className="px-5 py-5 text-[var(--muted)]">{project.client}</td>
                <td className="px-5 py-5">
                  <p className="text-[var(--foreground)]">{project.discipline}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted-2)]">{project.entity}</p>
                </td>
                <td className="px-5 py-5 text-[var(--muted)]">
                  <p>{project.started}</p>
                  <p className="mt-1 text-xs text-[var(--muted-2)]">{project.duration}</p>
                  <p className="mt-1 text-xs text-[var(--muted-2)]">{project.completedOrCurrent}</p>
                </td>
                <td className="px-5 py-5">
                  <p className="font-medium text-[var(--foreground)]">{amount(project.workCostLakh)}</p>
                  <p className="mt-1 text-xs text-[var(--muted-2)]">
                    Consultancy: {amount(project.consultancyCostLakh)}
                  </p>
                </td>
                <td className="px-5 py-5">
                  <span className="tag-pill">{project.lifecycle}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
