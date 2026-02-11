"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="admin@email.com"
          required
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="********"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in..." : "Admin Sign In"}
      </button>
      {status === "error" ? <p className="text-xs text-red-600">{error}</p> : null}
    </form>
  );
}
