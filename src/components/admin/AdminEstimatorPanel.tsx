"use client";

import { useMemo, useState } from "react";

type EstimatorRecord = Record<string, unknown> & {
  $id?: string;
  $createdAt?: string;
  project_type?: string;
  property_type?: string;
  selected_country?: string;
  selected_currency?: string;
  quality_level?: string;
  timeline_months?: number;
  estimated_cost_inr?: number;
  estimated_cost_local?: number;
  status?: string;
  created_at?: string;
};

type AdminEstimatorPanelProps = {
  records: EstimatorRecord[];
};

function toCsv(rows: EstimatorRecord[]) {
  const headers = [
    "id",
    "project_type",
    "property_type",
    "country",
    "currency",
    "quality",
    "timeline_months",
    "estimated_cost_inr",
    "estimated_cost_local",
    "status",
    "created_at",
  ];

  const lines = rows.map((item) =>
    [
      item.$id || "",
      item.project_type || "",
      item.property_type || "",
      item.selected_country || "",
      item.selected_currency || "",
      item.quality_level || "",
      item.timeline_months || "",
      item.estimated_cost_inr || "",
      item.estimated_cost_local || "",
      item.status || "",
      item.created_at || item.$createdAt || "",
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );

  return [headers.join(","), ...lines].join("\n");
}

export default function AdminEstimatorPanel({ records }: AdminEstimatorPanelProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return records.filter((item) => {
      const statusOk = status === "all" || String(item.status || "calculated") === status;
      if (!statusOk) return false;

      const haystack = [
        item.project_type,
        item.property_type,
        item.selected_country,
        item.selected_currency,
        item.quality_level,
        item.status,
      ]
        .map((value) => String(value || "").toLowerCase())
        .join(" ");
      return haystack.includes(query.toLowerCase());
    });
  }, [records, query, status]);

  function exportFiltered() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `estimator-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project/country/currency..."
            className="min-w-[260px] flex-1 rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="all">All statuses</option>
            <option value="calculated">Calculated</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
          <button
            type="button"
            onClick={exportFiltered}
            className="rounded-full bg-[var(--foreground)] px-5 py-3 text-xs uppercase tracking-[0.22em] text-white"
          >
            Export CSV
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-6">
          <p className="text-sm text-[var(--muted)]">No estimator submissions found for this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((item, index) => (
            <article key={item.$id || `estimate-${index}`} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-2)]">
                  {String(item.project_type || "Project")}
                </p>
                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">
                  {String(item.status || "calculated")}
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                <p>
                  <strong>Property:</strong> {String(item.property_type || "-")}
                </p>
                <p>
                  <strong>Quality:</strong> {String(item.quality_level || "-")}
                </p>
                <p>
                  <strong>Country:</strong> {String(item.selected_country || "-")}
                </p>
                <p>
                  <strong>Currency:</strong> {String(item.selected_currency || "-")}
                </p>
                <p>
                  <strong>INR:</strong> ₹{Number(item.estimated_cost_inr || 0).toLocaleString("en-IN")}
                </p>
                <p>
                  <strong>Local:</strong> {Number(item.estimated_cost_local || 0).toLocaleString()}
                </p>
                <p>
                  <strong>Timeline:</strong> {String(item.timeline_months || "-")} months
                </p>
                <p>
                  <strong>Created:</strong> {String(item.created_at || item.$createdAt || "-")}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
