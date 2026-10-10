import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminAuthForm from "@/components/admin/AdminAuthForm";
import { getAdminSession } from "@/lib/adminSession";

export const metadata: Metadata = { title: "Possession Intelligence Access", robots: { index: false, follow: false } };

export default async function PossessionIntelligenceAccessPage() {
  if (await getAdminSession()) redirect("/possession-intelligence");
  return <main className="min-h-screen bg-[var(--background)] px-6 py-20"><div className="mx-auto max-w-md"><div className="card p-8"><p className="kicker">Private workspace</p><h1 className="mt-4 text-3xl">Possession Intelligence</h1><p className="mt-3 text-sm text-[var(--muted)]">Sign in with your authorised studio account to access private intake data.</p><div className="mt-8"><AdminAuthForm nextPath="/possession-intelligence" /></div></div></div></main>;
}
