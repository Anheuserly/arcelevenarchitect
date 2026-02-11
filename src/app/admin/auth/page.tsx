import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminAuthForm from "@/components/admin/AdminAuthForm";
import { getAdminSession } from "@/lib/adminSession";


export const metadata: Metadata = {
  title: "Admin Auth",
  robots: { index: false, follow: false },
};

export default async function AdminAuthPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="card p-8">
          <p className="kicker">Admin</p>
          <h1 className="mt-4 text-3xl">Control panel access</h1>
          <p className="mt-3 text-sm">
            Authenticate with your admin account from the `admin` collection.
          </p>
          <div className="mt-8">
            <AdminAuthForm />
          </div>
        </div>
      </div>
    </main>
  );
}
