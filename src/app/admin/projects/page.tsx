export const runtime = "edge";

import type { Metadata } from "next";
import AdminProjectForm from "@/components/admin/AdminProjectForm";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import AdminShell from "@/components/admin/AdminShell";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { requireAdminContext } from "@/lib/adminAccess";
import { getPermissions } from "@/lib/adminRoles";

type ProjectRecord = {
  $id?: string;
  $createdAt?: string;
  createdAt?: string;
  name?: string;
  slug?: string;
  location?: string;
  category?: string;
  status?: string;
  year?: string;
  summary?: string;
  coverImage?: string;
  featured?: boolean;
  order?: number;
  areaSqft?: string;
  client?: string;
  services?: string[];
  gallery?: string[];
};


export const metadata: Metadata = {
  title: "Admin Projects",
  robots: { index: false, follow: false },
};

function joinArray(value: string[] | undefined): string {
  if (!value || value.length === 0) return "-";
  return value.join(", ");
}

export default async function AdminProjectsPage() {
  const { session, role } = await requireAdminContext();
  const permissions = getPermissions(role);
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || "projects";

  let projects: ProjectRecord[] = [];
  try {
    projects = await listDocumentsServer<ProjectRecord>({ collectionId, limit: 100 });
  } catch {
    projects = [];
  }

  const cards = projects.map((project, index) => ({
    id: project.$id || `project-${index}`,
    title: project.name || "Untitled project",
    subtitle: project.location || "Location TBD",
    status: project.status || "Planning",
    createdAt: project.createdAt || project.$createdAt || "-",
    fields: [
      { label: "Slug", value: project.slug || "-" },
      { label: "Category", value: project.category || "-" },
      { label: "Year", value: project.year || "-" },
      { label: "Featured", value: project.featured ? "Yes" : "No" },
      { label: "Sort Order", value: String(project.order ?? 0) },
      { label: "Area (sqft)", value: project.areaSqft || "-" },
      { label: "Client", value: project.client || "-" },
      { label: "Services", value: joinArray(project.services) },
      { label: "Gallery", value: joinArray(project.gallery) },
      { label: "Summary", value: project.summary || "-" },
    ],
  }));

  return (
    <AdminShell
      heading="Project Portfolio Records"
      subheading="Create and manage portfolio projects in one place with schema-based attributes."
      role={role}
      name={session.name}
      email={session.email}
    >
      {permissions.canManageSettings ? <AdminProjectForm /> : null}
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Projects</p>
        <p className="mt-3 text-4xl">{projects.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No projects found." />
    </AdminShell>
  );
}
