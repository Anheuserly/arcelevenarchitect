"use client";

import { useState } from "react";
import { createDocument } from "@/lib/appwriteClient";
import { trackEvent } from "@/lib/analytics";

const requestsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID || "requests";
const publicDocumentPermissions = [
  'read("any")',
  'update("any")',
  'delete("any")',
];

export default function ContactForm() {
  const initialPrefill = (() => {
    if (typeof window === "undefined") {
      return { projectType: "", budget: "", message: "", hasEstimate: false };
    }
    try {
      const raw = localStorage.getItem("projectEstimate");
      if (!raw) return { projectType: "", budget: "", message: "", hasEstimate: false };
      const parsed = JSON.parse(raw) as {
        project_type?: string;
        estimate?: { inr?: number; local?: number; currency?: string };
      };
      const projectType = String(parsed.project_type || "");
      const inr = Number(parsed.estimate?.inr || 0);
      const local = Number(parsed.estimate?.local || 0);
      const currency = String(parsed.estimate?.currency || "INR");
      const budget = inr > 0 ? `Estimated ~ ₹${inr.toLocaleString("en-IN")} INR` : "";
      const message =
        inr > 0 || local > 0
          ? `I used your project estimator and would like a detailed quote.\n` +
            `Estimated cost: ₹${inr.toLocaleString("en-IN")} INR` +
            (currency !== "INR" && local > 0 ? ` (${local.toLocaleString()} ${currency})` : "") +
            `.`
          : "";
      return { projectType, budget, message, hasEstimate: true };
    } catch {
      return { projectType: "", budget: "", message: "", hasEstimate: false };
    }
  })();

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [projectTypeValue, setProjectTypeValue] = useState(initialPrefill.projectType);
  const [budgetRangeValue, setBudgetRangeValue] = useState(initialPrefill.budget);
  const [messageValue, setMessageValue] = useState(initialPrefill.message);
  const [loadedEstimate] = useState(initialPrefill.hasEstimate);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setError(null);

    if (!requestsCollectionId) {
      setStatus("error");
      setError("Service requests collection is not configured.");
      return;
    }

    const formData = new FormData(form);
      const payload = {
        name: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
      projectType: String(formData.get("projectType") || ""),
      budgetRange: String(formData.get("budgetRange") || ""),
      timeline: String(formData.get("timeline") || ""),
      message: String(formData.get("message") || ""),
      referral: String(formData.get("referral") || ""),
      status: "new",
        page: "contact",
        hasEstimate: loadedEstimate,
        createdAt: new Date().toISOString(),
      };

    try {
      await createDocument({
        collectionId: requestsCollectionId,
        data: payload,
        permissions: publicDocumentPermissions,
      });
      trackEvent("contact_submit", {
        source_page: "contact",
        has_estimate: loadedEstimate,
      });
      setStatus("success");
      form.reset();
      setProjectTypeValue("");
      setBudgetRangeValue("");
      setMessageValue("");
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
          htmlFor="projectType"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Project Type
        </label>
        <input
          id="projectType"
          name="projectType"
          value={projectTypeValue}
          onChange={(event) => setProjectTypeValue(event.target.value)}
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Residential, commercial, hospitality"
        />
      </div>
      <div>
        <label
          htmlFor="budgetRange"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Project Budget Range
        </label>
        <input
          id="budgetRange"
          name="budgetRange"
          value={budgetRangeValue}
          onChange={(event) => setBudgetRangeValue(event.target.value)}
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="₹25–50L, ₹50L–1Cr, ₹1Cr+"
        />
      </div>
      <div>
        <label
          htmlFor="timeline"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Timeline
        </label>
        <input
          id="timeline"
          name="timeline"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Start month + expected duration"
        />
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
          value={messageValue}
          onChange={(event) => setMessageValue(event.target.value)}
          className="mt-2 min-h-[140px] w-full rounded-3xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Tell us about the site, timeline, and goals"
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
        {status === "submitting" ? "Submitting..." : "Submit Request"}
      </button>
      {status === "success" ? (
        <p className="text-xs text-[var(--muted-2)]">
          Thank you. We will respond within 48 hours.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : null}
    </form>
  );
}
