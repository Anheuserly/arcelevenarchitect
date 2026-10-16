export const runtime = "nodejs";

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
      subheading="Role permissions and secure service configuration for this admin session."
      role={role}
      name={session.name}
      email={session.email}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-2xl">Role</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">Current role resolved from the platform admin membership.</p>
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
          <li>Admin authentication uses PostgreSQL `auth_accounts` plus `platform_admin_memberships`.</li>
          <li>Admin access requires an active platform role and a valid signed session cookie.</li>
          <li>Public website theme is stored in PostgreSQL `website_theme_settings` per business.</li>
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
