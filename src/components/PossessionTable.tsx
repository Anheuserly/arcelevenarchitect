"use client";

import { useMemo, useState } from "react";

export type PossessionRecord = {
  id: string;
  project: string;
  serialNo: string;
  meterNo: string;
  applicationNo: string;
  towerFlat: string;
  unitReference: string;
  customerName: string;
  tower: string;
  unit: string;
  mobile: string;
  email: string;
  handoverStatus: string;
  possessionDate: string | null;
  possessionMonth: string;
  carpetArea: string;
  balconyArea: string;
  totalArea: string;
  type: string;
  person: string;
  meterKwh: string;
  sourceCount: number;
  sources: { file: string; row: number }[];
};

export default function PossessionTable({ records }: { records: PossessionRecord[] }) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("all");
  const months = useMemo(() => Array.from(new Set(records.map((item) => item.possessionMonth))).sort(), [records]);
  const filtered = useMemo(() => records.filter((item) => {
    const text = `${item.project} ${item.tower} ${item.unit} ${item.customerName} ${item.possessionMonth}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (month === "all" || item.possessionMonth === month);
  }), [records, query, month]);
  function changeFilter(value: string, nextMonth = month) {
    setQuery(value); setMonth(nextMonth);
  }

  return <section className="card overflow-hidden">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] p-6">
      <div><p className="kicker">Canonical possession records</p><h2 className="mt-3 text-2xl">Complete possession register</h2><p className="mt-2 text-sm text-[var(--muted)]">{filtered.length} unique tower and unit records. Final sources are preferred; duplicate copies are merged as evidence.</p></div>
      <div className="flex flex-wrap gap-2"><input value={query} onChange={(event) => changeFilter(event.target.value)} placeholder="Search name, tower, or unit" className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm" /><select value={month} onChange={(event) => changeFilter(query, event.target.value)} className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm"><option value="all">All months</option>{months.map((value) => <option key={value}>{value}</option>)}</select></div>
    </div>
    <div className="overflow-x-auto"><table className="min-w-max text-left text-sm"><thead className="sticky top-0 bg-[var(--background)] text-xs uppercase tracking-wide text-[var(--muted)]"><tr>{["Project","S.No.","Meter","Application","Tower / Flat","Customer","Mobile","Email","Handover","Possession date","Month","Carpet","Balcony","Total area","Type","Person","Meter KWH","Evidence"].map((heading) => <th key={heading} className="whitespace-nowrap px-4 py-3">{heading}</th>)}</tr></thead><tbody className="divide-y divide-[var(--line)]">{filtered.map((item) => <tr key={item.id}><td className="whitespace-nowrap px-4 py-3 font-medium">{item.project}</td><td className="px-4 py-3">{item.serialNo}</td><td className="px-4 py-3">{item.meterNo}</td><td className="px-4 py-3">{item.applicationNo}</td><td className="whitespace-nowrap px-4 py-3">{item.towerFlat}</td><td className="whitespace-nowrap px-4 py-3">{item.customerName}</td><td className="whitespace-nowrap px-4 py-3">{item.mobile}</td><td className="whitespace-nowrap px-4 py-3">{item.email}</td><td className="px-4 py-3">{item.handoverStatus}</td><td className="whitespace-nowrap px-4 py-3">{item.possessionDate ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${item.possessionDate}T00:00:00`)) : "Needs review"}</td><td className="whitespace-nowrap px-4 py-3">{item.possessionMonth}</td><td className="px-4 py-3">{item.carpetArea}</td><td className="px-4 py-3">{item.balconyArea}</td><td className="px-4 py-3">{item.totalArea}</td><td className="px-4 py-3">{item.type}</td><td className="px-4 py-3">{item.person}</td><td className="px-4 py-3">{item.meterKwh}</td><td className="px-4 py-3">{item.sourceCount}</td></tr>)}</tbody></table></div>
  </section>;
}
