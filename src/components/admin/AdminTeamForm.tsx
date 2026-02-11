"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminTeamForm() {
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
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          role: String(formData.get("role") || ""),
          group: String(formData.get("group") || ""),
          photo: String(formData.get("photo") || ""),
          bio: String(formData.get("bio") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          linkedin: String(formData.get("linkedin") || ""),
          order: Number(formData.get("order") || 0),
          active: String(formData.get("active") || "") !== "false",
          extra,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Failed to create team member");
      }

      setStatus("success");
      form.reset();
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to create team member");
    }
  }

  return (
    <form className="card p-6" onSubmit={onSubmit}>
      <h3 className="text-2xl">Add Team Member</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Add member profile details. Use extra JSON for custom attributes in your collection.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Full name"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
        <input
          name="role"
          placeholder="Role (e.g. Studio Director)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
          required
        />
        <input
          name="group"
          placeholder="Group (Creative / Operations)"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="photo"
          placeholder="Photo URL"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="email"
          placeholder="Email"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="phone"
          placeholder="Phone"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none md:col-span-2"
        />
        <select
          name="active"
          defaultValue="true"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="true">Active: Yes</option>
          <option value="false">Active: No</option>
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
          name="bio"
          placeholder="Short bio"
          className="min-h-[100px] w-full rounded-3xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4">
        <textarea
          name="extra"
          placeholder='Extra attributes JSON (optional), e.g. {"experience":"8+ years","city":"Delhi"}'
          className="min-h-[100px] w-full rounded-3xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Saving..." : "Add Member"}
      </button>

      {status === "error" ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      {status === "success" ? (
        <p className="mt-3 text-xs text-[var(--muted)]">Team member created successfully.</p>
      ) : null}
    </form>
  );
}
