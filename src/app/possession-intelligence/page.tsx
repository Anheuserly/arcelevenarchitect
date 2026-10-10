import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminSession";
import PossessionTable from "@/components/PossessionTable";
import { getPossessionIntelligence, getPossessionRecords } from "@/lib/possessionData";

export const metadata = {
  title: "Possession Intelligence",
  robots: { index: false, follow: false },
};

export default async function PossessionIntelligencePage() {
  const session = await getAdminSession();
  if (!session) redirect("/possession-intelligence/access");

  const summary = await getPossessionIntelligence();
  const records = await getPossessionRecords();

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 md:px-10">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="card p-7 md:p-10">
          <p className="kicker">Private workspace</p>
          <h1 className="mt-3 text-3xl md:text-5xl">Possession Intelligence</h1>
          <p className="mt-4 max-w-3xl text-sm text-[var(--muted)] md:text-base">
            Controlled intake review for project, possession, and source-data validation.
          </p>
        </header>
        {summary ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[["Source files", summary.total_files], ["Ready for import", summary.by_status.ingest_ready || 0], ["Legacy conversion", summary.by_status.legacy_conversion || 0], ["Duplicate groups", summary.exact_duplicate_groups]].map(([label, value]) => (
                <article key={String(label)} className="card p-5"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></article>
              ))}
            </div>
            <section className="card p-6 md:p-8">
              <p className="kicker">Possession candidates</p><h2 className="mt-3 text-2xl">Files flagged for possession review</h2>
              <div className="mt-5 divide-y divide-[var(--line)]">{summary.possession_keyword_files.map((file) => <p key={file} className="py-3 text-sm text-[var(--muted)]">{file}</p>)}</div>
            </section>
            {records.length > 0 ? <PossessionTable records={records} /> : null}
          </>
        ) : <section className="card p-7"><h2 className="text-xl">Private intake storage is not connected</h2><p className="mt-3 text-sm text-[var(--muted)]">Set ARC11_PRIVATE_DATA_ROOT on the server to the private data directory. Raw files are never read from the public website folder.</p></section>}
      </section>
    </main>
  );
}
