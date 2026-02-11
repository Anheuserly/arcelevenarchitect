export const runtime = "edge";

import type { Metadata } from "next";
import AdminEstimatorPanel from "@/components/admin/AdminEstimatorPanel";
import AdminShell from "@/components/admin/AdminShell";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { requireAdminContext } from "@/lib/adminAccess";

type EstimatorRecord = Record<string, unknown> & {
  $id?: string;
  $createdAt?: string;
};


export const metadata: Metadata = {
  title: "Admin Estimator",
  robots: { index: false, follow: false },
};

export default async function AdminEstimatorPage() {
  const { session, role } = await requireAdminContext();
  const collectionId =
    process.env.NEXT_PUBLIC_APPWRITE_ESTIMATOR_SUBMISSIONS_COLLECTION_ID || "estimator_submissions";

  let records: EstimatorRecord[] = [];
  try {
    records = await listDocumentsServer<EstimatorRecord>({ collectionId, limit: 250 });
  } catch {
    records = [];
  }

  return (
    <AdminShell
      heading="Estimator Submissions"
      subheading="Review, filter, and export estimator calculations captured from the public calculator."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
          Total Estimations
        </p>
        <p className="mt-3 text-4xl">{records.length}</p>
      </div>
      <AdminEstimatorPanel records={records} />
    </AdminShell>
  );
}
