import type { Metadata } from "next";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import AdminShell from "@/components/admin/AdminShell";
import AdminTeamForm from "@/components/admin/AdminTeamForm";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { requireAdminContext } from "@/lib/adminAccess";
import { getPermissions } from "@/lib/adminRoles";

type TeamRecord = {
  $id?: string;
  $createdAt?: string;
  createdAt?: string;
  name?: string;
  role?: string;
  group?: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  photo?: string;
  active?: boolean;
  order?: number;
};

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Admin Team",
  robots: { index: false, follow: false },
};

export default async function AdminTeamPage() {
  const { session, role } = await requireAdminContext();
  const permissions = getPermissions(role);
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_TEAM_COLLECTION_ID || "team";

  let team: TeamRecord[] = [];
  try {
    team = await listDocumentsServer<TeamRecord>({ collectionId, limit: 100 });
  } catch {
    team = [];
  }

  const cards = team.map((member, index) => ({
    id: member.$id || `member-${index}`,
    title: member.name || "Unnamed Member",
    subtitle: member.group || "Team",
    status: member.active === false ? "Inactive" : "Active",
    createdAt: member.createdAt || member.$createdAt || "-",
    fields: [
      { label: "Role", value: member.role || "-" },
      { label: "Email", value: member.email || "-" },
      { label: "Phone", value: member.phone || "-" },
      { label: "LinkedIn", value: member.linkedin || "-" },
      { label: "Photo", value: member.photo || "-" },
      { label: "Sort Order", value: String(member.order ?? 0) },
      { label: "Bio", value: member.bio || "-" },
    ],
  }));

  return (
    <AdminShell
      heading="Team Records"
      subheading="Manage studio members, groups, roles, and contact details."
      role={role}
      name={session.name}
      email={session.email}
    >
      {permissions.canManageSettings ? <AdminTeamForm /> : null}
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Team Members</p>
        <p className="mt-3 text-4xl">{team.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No team members found." />
    </AdminShell>
  );
}
