export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import MetaInbox from "@/components/admin/MetaInbox";
import { requireAdminContext } from "@/lib/adminAccess";
import { getMetaInboxData } from "@/lib/metaInbox";

export const metadata: Metadata = {
  title: "Meta Inbox | Arc 11 Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMetaInboxPage() {
  const { session, role } = await requireAdminContext();
  const data = await getMetaInboxData();

  return (
    <AdminShell
      heading="Meta Inbox"
      subheading="A private communication workspace for Arc 11 WhatsApp and Instagram Direct. Every verified webhook event, contact, message, delivery update, and human takeover is recorded separately from the public website."
      role={role}
      name={session.name}
      email={session.email}
    >
      <MetaInbox {...data} />
    </AdminShell>
  );
}
