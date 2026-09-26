"use client";

import { useState } from "react";

type FeedbackFormProps = {
  onSuccess?: () => void;
  page?: string;
};

export default function FeedbackForm({
  onSuccess,
  page = "home",
}: FeedbackFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setError(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("feedbackName") || ""),
      email: String(formData.get("feedbackEmail") || ""),
      message: String(formData.get("feedbackMessage") || ""),
      rating: Number(formData.get("feedbackRating") || 5),
      page,
      source: "arcelevenarchitect.com",
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to submit feedback.");
      }

      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="feedbackName"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Name
        </label>
        <input
          id="feedbackName"
          name="feedbackName"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="feedbackEmail"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Email
        </label>
        <input
          id="feedbackEmail"
          name="feedbackEmail"
          type="email"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="you@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="feedbackRating"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Rating (1-5)
        </label>
        <select
          id="feedbackRating"
          name="feedbackRating"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          defaultValue="5"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Great</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Needs Improvement</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="feedbackMessage"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Feedback
        </label>
        <textarea
          id="feedbackMessage"
          name="feedbackMessage"
          className="mt-2 min-h-[120px] w-full rounded-3xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Share your experience"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Feedback"}
      </button>
      {status === "success" ? (
        <p className="text-xs text-[var(--muted-2)]">
          Thank you for your feedback.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : null}
    </form>
  );
}
