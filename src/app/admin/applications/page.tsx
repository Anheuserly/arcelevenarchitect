import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import { getDashboardData, pickValue } from "@/lib/adminData";
import { requireAdminContext } from "@/lib/adminAccess";

export const metadata: Metadata = {
  title: "Admin Applications",
  robots: { index: false, follow: false },
};

function linkCell(label: string, href: string | null) {
  if (!href || href === "-") return "-";
  return (
    <a href={href} target="_blank" rel="noreferrer" className="underline-link">
      {label}
    </a>
  );
}

export default async function AdminApplicationsPage() {
  const { session, role } = await requireAdminContext();
  const { applications } = await getDashboardData();

  const cards = applications.slice(0, 50).map((item, index) => {
    const resumeLink = pickValue(item, ["resumeLink"]);
    const portfolioLink = pickValue(item, ["portfolioLink"]);
    const resumeFileId = pickValue(item, ["resumeFileId"]);
    const portfolioFileId = pickValue(item, ["portfolioFileId"]);

    const resumeFileUrl = resumeFileId !== "-" ? `/api/admin/files/${resumeFileId}` : null;
    const portfolioFileUrl =
      portfolioFileId !== "-" ? `/api/admin/files/${portfolioFileId}` : null;

    return {
      id: String(item.$id || `application-${index}`),
      title: pickValue(item, ["name"]),
      subtitle: pickValue(item, ["jobTitle", "jobSlug"]),
      status: pickValue(item, ["status"]),
      createdAt: pickValue(item, ["createdAt", "$createdAt"]),
      fields: [
        { label: "Email", value: pickValue(item, ["email"]) },
        { label: "Phone", value: pickValue(item, ["phone"]) },
        { label: "Resume ID", value: resumeFileId },
        { label: "Portfolio ID", value: portfolioFileId },
        { label: "Resume Link", value: linkCell("Open Resume", resumeLink !== "-" ? resumeLink : null) },
        { label: "Resume File", value: linkCell("Open File", resumeFileUrl) },
        {
          label: "Portfolio Link",
          value: linkCell("Open Portfolio", portfolioLink !== "-" ? portfolioLink : null),
        },
        { label: "Portfolio File", value: linkCell("Open File", portfolioFileUrl) },
      ],
    };
  });

  return (
    <AdminShell
      heading="Career Applications"
      subheading="Review applicant data and open uploaded resume/portfolio attachments directly from admin."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Applications</p>
        <p className="mt-3 text-4xl">{applications.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No career applications found." />
    </AdminShell>
  );
}
