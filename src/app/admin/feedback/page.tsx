import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import { getDashboardData, pickValue } from "@/lib/adminData";
import { requireAdminContext } from "@/lib/adminAccess";

export const metadata: Metadata = {
  title: "Admin Feedback",
  robots: { index: false, follow: false },
};

export default async function AdminFeedbackPage() {
  const { session, role } = await requireAdminContext();
  const { feedback } = await getDashboardData();

  const cards = feedback.slice(0, 50).map((item, index) => ({
    id: String(item.$id || `feedback-${index}`),
    title: pickValue(item, ["name"]),
    subtitle: "Client Feedback",
    status: pickValue(item, ["status"]),
    createdAt: pickValue(item, ["createdAt", "$createdAt"]),
    fields: [
      { label: "Email", value: pickValue(item, ["email"]) },
      { label: "Rating", value: pickValue(item, ["rating"]) },
      { label: "Project", value: pickValue(item, ["project", "projectType"]) },
      { label: "Message", value: pickValue(item, ["message"]) },
    ],
  }));

  return (
    <AdminShell
      heading="Client Feedback"
      subheading="Monitor quality and sentiment across delivered projects."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Feedback</p>
        <p className="mt-3 text-4xl">{feedback.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No feedback found." />
    </AdminShell>
  );
}
