"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/auth");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="w-full rounded-full border border-[var(--line)] bg-white px-5 py-3 text-xs uppercase tracking-[0.2em] transition hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white lg:w-auto"
    >
      Logout
    </button>
  );
}
