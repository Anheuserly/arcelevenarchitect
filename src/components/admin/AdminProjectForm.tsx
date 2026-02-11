"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminProjectForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setError("");

    let extra: Record<string, unknown> = {};
    const extraRaw = String(formData.get("extra") || "").trim();
    if (extraRaw) {
      try {
        const parsed = JSON.parse(extraRaw) as Record<string, unknown>;
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          extra = parsed;
        }
      } catch {
        setStatus("error");
        setError("Extra attributes must be valid JSON object.");
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          slug: String(formData.get("slug") || ""),
          location: String(formData.get("location") || ""),
          category: String(formData.get("category") || ""),
          status: String(formData.get("projectStatus") || ""),
          year: String(formData.get("year") || ""),
          summary: String(formData.get("summary") || ""),
          coverImage: String(formData.get("coverImage") || ""),
          gallery: String(formData.get("gallery") || ""),
          services: String(formData.get("services") || ""),
          featured: String(formData.get("featured") || "") === "true",
          order: Number(formData.get("order") || 0),
          areaSqft: String(formData.get("areaSqft") || ""),
          client: String(formData.get("client") || ""),
          extra,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Failed to create project");
      }

      setStatus("success");
      form.reset();
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to create project");
    }
  }

  return (
    <form className="card p-6" onSubmit={onSubmit}>
      <h3 className="text-2xl">Create Project</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Add core fields now. Extra attribute JSON lets you store custom fields from your
        Appwrite collection.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Project name"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
        <input
          name="slug"
          placeholder="Slug (optional, auto-generated if blank)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="location"
          placeholder="Location"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="category"
          placeholder="Category (Residential / Commercial)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="projectStatus"
          placeholder="Status (Planning / Ongoing / Completed)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="year"
          placeholder="Year (2026)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="client"
          placeholder="Client (optional)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="areaSqft"
          placeholder="Area (e.g. 4500)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="coverImage"
          placeholder="Cover image URL"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none md:col-span-2"
        />
        <input
          name="gallery"
          placeholder="Gallery image URLs (comma-separated)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none md:col-span-2"
        />
        <input
          name="services"
          placeholder="Services (comma-separated)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none md:col-span-2"
        />
        <select
          name="featured"
          defaultValue="false"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="false">Featured: No</option>
          <option value="true">Featured: Yes</option>
        </select>
        <input
          name="order"
          type="number"
          min={0}
          defaultValue={0}
          placeholder="Sort order"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4">
        <textarea
          name="summary"
          placeholder="Project summary"
          className="min-h-[110px] w-full rounded-3xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
      </div>

      <div className="mt-4">
        <textarea
          name="extra"
          placeholder='Extra attributes JSON (optional), e.g. {"budget":"high","designTheme":"modern"}'
          className="min-h-[110px] w-full rounded-3xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Saving..." : "Create Project"}
      </button>

      {status === "error" ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      {status === "success" ? (
        <p className="mt-3 text-xs text-[var(--muted)]">Project created successfully.</p>
      ) : null}
    </form>
  );
}
