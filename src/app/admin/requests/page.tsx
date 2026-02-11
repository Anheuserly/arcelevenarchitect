import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import { getDashboardData, pickValue } from "@/lib/adminData";
import { requireAdminContext } from "@/lib/adminAccess";


export const metadata: Metadata = {
  title: "Admin Requests",
  robots: { index: false, follow: false },
};

export default async function AdminRequestsPage() {
  const { session, role } = await requireAdminContext();
  const { requests } = await getDashboardData();

  const cards = requests.slice(0, 50).map((item, index) => ({
    id: String(item.$id || `request-${index}`),
    title: pickValue(item, ["name", "fullName"]),
    subtitle: "Project Request",
    status: pickValue(item, ["status"]),
    createdAt: pickValue(item, ["createdAt", "$createdAt"]),
    fields: [
      { label: "Email", value: pickValue(item, ["email"]) },
      { label: "Project Type", value: pickValue(item, ["projectType", "project_type"]) },
      { label: "Budget", value: pickValue(item, ["budgetRange", "budget_range"]) },
      { label: "Timeline", value: pickValue(item, ["timeline"]) },
      { label: "Location", value: pickValue(item, ["location", "city"]) },
      { label: "Message", value: pickValue(item, ["message", "details"]) },
    ],
  }));

  return (
    <AdminShell
      heading="Project Requests"
      subheading="Incoming leads from contact and request forms."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Requests</p>
        <p className="mt-3 text-4xl">{requests.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No requests found." />
    </AdminShell>
  );
}
