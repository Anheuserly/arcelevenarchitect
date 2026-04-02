export const runtime = "edge";

import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import { getDashboardData, pickValue } from "@/lib/adminData";
import { requireAdminContext } from "@/lib/adminAccess";


export const metadata: Metadata = {
  title: "Admin Requests",
  robots: { index: false, follow: false },
};

function getRequestSource(record: Record<string, unknown>) {
  return String(record.page || "").trim().toLowerCase();
}

function buildRequestCard(record: Record<string, unknown>, index: number) {
  const source = getRequestSource(record);
  const isInquiry = source === "contact_inquiry";

  return {
    id: String(record.$id || `request-${index}`),
    title: pickValue(record, ["name", "fullName"]),
    subtitle: isInquiry ? "General Inquiry" : "Project Request",
    status: pickValue(record, ["status"]),
    createdAt: pickValue(record, ["createdAt", "$createdAt"]),
    fields: isInquiry
      ? [
          { label: "Email", value: pickValue(record, ["email"]) },
          { label: "Inquiry Topic", value: pickValue(record, ["projectType", "project_type"]) },
          { label: "Organization / Location", value: pickValue(record, ["location", "city"]) },
          { label: "Response Window", value: pickValue(record, ["timeline"]) },
          { label: "Referral", value: pickValue(record, ["referral"]) },
          { label: "Message", value: pickValue(record, ["message", "details"]) },
        ]
      : [
          { label: "Email", value: pickValue(record, ["email"]) },
          { label: "Project Type", value: pickValue(record, ["projectType", "project_type"]) },
          { label: "Location", value: pickValue(record, ["location", "city"]) },
          { label: "Budget", value: pickValue(record, ["budgetRange", "budget_range"]) },
          { label: "Timeline", value: pickValue(record, ["timeline"]) },
          { label: "Message", value: pickValue(record, ["message", "details"]) },
        ],
  };
}

export default async function AdminRequestsPage() {
  const { session, role } = await requireAdminContext();
  const { requests } = await getDashboardData();

  const cards = requests.slice(0, 50).map((item, index) => buildRequestCard(item, index));

  return (
    <AdminShell
      heading="Requests & Inquiries"
      subheading="Incoming project briefs and general studio inquiries."
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
