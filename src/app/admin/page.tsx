import type { Metadata } from "next";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getDashboardData } from "@/lib/adminData";
import { requireAdminContext } from "@/lib/adminAccess";


export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const { session, role, permissions } = await requireAdminContext();
  const { requests, feedback, applications, projects, team } = await getDashboardData();

  return (
    <AdminShell
      heading="Dashboard Overview"
      subheading="Track lead flow, feedback, and hiring pipeline in one place."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Requests</p>
          <p className="mt-3 text-4xl">{requests.length}</p>
          <Link href="/admin/requests" className="mt-4 inline-block text-sm underline-link">
            Open list
          </Link>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Feedback</p>
          <p className="mt-3 text-4xl">{feedback.length}</p>
          <Link href="/admin/feedback" className="mt-4 inline-block text-sm underline-link">
            Open list
          </Link>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Applications</p>
          <p className="mt-3 text-4xl">{applications.length}</p>
          <Link href="/admin/applications" className="mt-4 inline-block text-sm underline-link">
            Open list
          </Link>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Projects</p>
          <p className="mt-3 text-4xl">{projects.length}</p>
          <Link href="/admin/projects" className="mt-4 inline-block text-sm underline-link">
            Open list
          </Link>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Team</p>
          <p className="mt-3 text-4xl">{team.length}</p>
          <Link href="/admin/team" className="mt-4 inline-block text-sm underline-link">
            Open list
          </Link>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-2xl">Role Access</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="subtle-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">View Dashboard</p>
            <p className="mt-2">{permissions.canViewDashboard ? "Allowed" : "Blocked"}</p>
          </div>
          <div className="subtle-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Manage Settings</p>
            <p className="mt-2">{permissions.canManageSettings ? "Allowed" : "Blocked"}</p>
          </div>
          <div className="subtle-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Manage Admins</p>
            <p className="mt-2">{permissions.canManageAdmins ? "Allowed" : "Blocked"}</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
