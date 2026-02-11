export const runtime = "edge";

import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { getPermissions } from "@/lib/adminRoles";
import { requireAdminContext } from "@/lib/adminAccess";


export const metadata: Metadata = {
  title: "Admin Settings",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const { session, role } = await requireAdminContext();
  const permissions = getPermissions(role);

  return (
    <AdminShell
      heading="Settings & Access"
      subheading="Environment checks and role permissions for this admin session."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-2xl">Role</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">Current role detected from admin table.</p>
          <p className="mt-4 text-xl">{role}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl">Permissions</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>View dashboard: {permissions.canViewDashboard ? "Yes" : "No"}</li>
            <li>Manage settings: {permissions.canManageSettings ? "Yes" : "No"}</li>
            <li>Manage admins: {permissions.canManageAdmins ? "Yes" : "No"}</li>
          </ul>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-2xl">Runtime Notes</h3>
        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          <li>Ensure `APPWRITE_API_KEY` is present in environment.</li>
          <li>Ensure `NEXT_PUBLIC_APPWRITE_DATABASE_ID` points to active database.</li>
          <li>
            Ensure collection IDs are correct for requests, feedback, careers, projects, team,
            and journal.
          </li>
        </ul>
      </div>

      {!permissions.canManageSettings ? (
        <div className="card p-6">
          <h3 className="text-2xl">Restricted</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Your role can view operational data but cannot modify system settings.
          </p>
        </div>
      ) : null}
    </AdminShell>
  );
}
