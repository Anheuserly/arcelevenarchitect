"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminJournalForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/admin/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(formData.get("title") || ""),
          tag: String(formData.get("tag") || ""),
          date: String(formData.get("date") || ""),
          excerpt: String(formData.get("excerpt") || ""),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Failed to create post");
      }

      setStatus("success");
      form.reset();
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to create post");
    }
  }

  return (
    <form className="card p-6" onSubmit={onSubmit}>
      <h3 className="text-2xl">Create Journal Post</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          name="title"
          placeholder="Post title"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
        <input
          name="tag"
          placeholder="Tag (Materiality, Design, etc.)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>
      <div className="mt-4">
        <input
          name="date"
          placeholder="Date (2026-02-11 or Feb 2026)"
          className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>
      <div className="mt-4">
        <textarea
          name="excerpt"
          placeholder="Post excerpt"
          className="min-h-[120px] w-full rounded-3xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Publishing..." : "Publish Post"}
      </button>
      {status === "error" ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      {status === "success" ? (
        <p className="mt-3 text-xs text-[var(--muted)]">Journal post created successfully.</p>
      ) : null}
    </form>
  );
}
