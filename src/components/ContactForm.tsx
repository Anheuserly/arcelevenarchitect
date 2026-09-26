"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ContactForm() {
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
      name: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      projectType: String(formData.get("inquiryType") || ""),
      location: String(formData.get("organization") || ""),
      timeline: String(formData.get("timeline") || ""),
      message: String(formData.get("message") || ""),
      referral: String(formData.get("referral") || ""),
      source: "arcelevenarchitect.com/contact",
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Submission failed");
      }

      trackEvent("contact_inquiry_submit", {
        source_page: "contact",
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="fullName"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="you@email.com"
          type="email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="inquiryType"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Inquiry Topic
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select inquiry topic
          </option>
          <option value="General question">General question</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Vendor / consultant">Vendor / consultant</option>
          <option value="Press / publication">Press / publication</option>
          <option value="Office visit / meeting">Office visit / meeting</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="organization"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Organization or Location
        </label>
        <input
          id="organization"
          name="organization"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Studio, company, city, or project address"
        />
      </div>
      <div>
        <label
          htmlFor="timeline"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Preferred Response Window
        </label>
        <select
          id="timeline"
          name="timeline"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          defaultValue=""
        >
          <option value="">No preference</option>
          <option value="Routine">Routine</option>
          <option value="This week">This week</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="mt-2 min-h-[140px] w-full rounded-3xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Tell us what you need, who you are, and how we can help."
          required
        />
      </div>
      <div>
        <label
          htmlFor="referral"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          How did you hear about us?
        </label>
        <input
          id="referral"
          name="referral"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Referral, Instagram, Google, Architect, Other"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
      {status === "success" ? (
        <p className="text-xs text-[var(--muted-2)]">
          Thank you. We will route your inquiry to the right person and reply soon.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : null}
    </form>
  );
}
