export const runtime = "nodejs";

import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminThemeSelector from "@/components/admin/AdminThemeSelector";
import { requireAdminContext } from "@/lib/adminAccess";
import { getThemeControlData, SITE_THEMES } from "@/lib/siteTheme";

export const metadata: Metadata = { title: "Website Theme Control", robots: { index: false, follow: false } };

export default async function AdminThemePage() {
  const { session, role, permissions } = await requireAdminContext();
  const { appearance, customThemes } = await getThemeControlData();
  return (
    <AdminShell heading="Website Theme Control" subheading="Select one architectural visual system for the full Arc 11 public website. The choice is saved against the Arc 11 business record." role={role} name={session.name} email={session.email}>
      {permissions.canManageSettings ? (
        <div className="card p-6 md:p-8">
          <p className="kicker">Public Design System</p>
          <h3 className="mt-3 text-3xl">Six spatial directions</h3>
          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">Each option changes shared colour, surface, contrast, accent, and interface tokens. Content and project data remain untouched.</p>
          <div className="mt-7"><AdminThemeSelector appearance={appearance} themes={SITE_THEMES} customThemes={customThemes} /></div>
        </div>
      ) : (
        <div className="card p-6"><h3 className="text-2xl">Restricted</h3><p className="mt-3 text-sm text-[var(--muted)]">Your role can view the active site configuration but cannot change the public theme.</p></div>
      )}
    </AdminShell>
  );
}
