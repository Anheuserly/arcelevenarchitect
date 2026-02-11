import type { Metadata } from "next";
import AdminJournalForm from "@/components/admin/AdminJournalForm";
import AdminShell from "@/components/admin/AdminShell";
import AdminRecordCards from "@/components/admin/AdminRecordCards";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { requireAdminContext } from "@/lib/adminAccess";
import { getPermissions } from "@/lib/adminRoles";

type JournalRecord = {
  $id?: string;
  title?: string;
  tag?: string;
  date?: string;
  excerpt?: string;
  $createdAt?: string;
};

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Admin Journal",
  robots: { index: false, follow: false },
};

export default async function AdminJournalPage() {
  const { session, role } = await requireAdminContext();
  const permissions = getPermissions(role);
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID || "journal";

  let posts: JournalRecord[] = [];
  try {
    posts = await listDocumentsServer<JournalRecord>({ collectionId, limit: 100 });
  } catch {
    posts = [];
  }

  const cards = posts.map((post, index) => ({
    id: post.$id || `post-${index}`,
    title: post.title || "-",
    subtitle: post.tag || "Journal",
    createdAt: post.$createdAt || "-",
    fields: [
      { label: "Tag", value: post.tag || "-" },
      { label: "Date", value: post.date || "-" },
      { label: "Excerpt", value: post.excerpt || "-" },
      { label: "Created", value: post.$createdAt || "-" },
    ],
  }));

  return (
    <AdminShell
      heading="Journal Records"
      subheading="Review the posts used on the public journal page."
      role={role}
      name={session.name}
      email={session.email}
    >
      {permissions.canManageSettings ? <AdminJournalForm /> : null}
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">Total Posts</p>
        <p className="mt-3 text-4xl">{posts.length}</p>
      </div>
      <AdminRecordCards items={cards} emptyText="No journal posts found." />
    </AdminShell>
  );
}
