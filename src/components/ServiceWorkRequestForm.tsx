"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ListingData = {
  id: string;
  title: string;
  price?: number | string | null;
  currency?: string | null;
  category?: string | null;
  specifications?: Record<string, any> | null;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

interface SubmittedRequest {
  id: string;
  request_number: string;
  title: string;
  requester_name: string;
  requester_email: string;
  requester_phone: string;
  address: string;
  amount: number | null;
  status: string;
  created_at: string;
}

export default function ServiceWorkRequestForm({ listing }: { listing: ListingData }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedRequest | null>(null);

  const specs = listing.specifications || {};
  const formattedPrice = listing.price
    ? `₹${Number(listing.price).toLocaleString("en-IN")}`
    : "Bespoke Retainer";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setError(null);

    const formData = new FormData(form);

    const payload = {
      listingId: listing.id,
      serviceTitle: listing.title,
      sku: specs.sku || `ARC11-${listing.id.substring(0, 6).toUpperCase()}`,
      amount: listing.price ? Number(listing.price) : null,
      requestType: "architectural_commission",
      name: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      projectType: String(formData.get("projectType") || specs.typology || "Residential"),
      builtUpArea: String(formData.get("builtUpArea") || "").trim(),
      timeline: String(formData.get("timeline") || "Immediate"),
      budget: String(formData.get("budget") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source: typeof window !== "undefined" ? window.location.href : "/services",
    };

    try {
      const res = await fetch("/api/work-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to register work request.");
      }

      setSubmittedData(data.request);
      setStatus("success");
      trackEvent("service_work_request_created", {
        listing_id: listing.id,
        listing_title: listing.title,
        request_number: data.request?.request_number,
      });
      form.reset();
    } catch (err: any) {
      console.error("Submission failed:", err);
      setStatus("error");
      setError(err.message || "An unexpected error occurred. Please try again or reach out directly.");
    }
  }

  if (status === "success" && submittedData) {
    const waMessage = encodeURIComponent(
      `Hello Arc 11 Architect studio, I have submitted Work Request #${submittedData.request_number} for "${listing.title}" regarding my site at ${submittedData.address || "my location"}. Please review.`
    );

    return (
      <div className="card p-8 sm:p-10 border border-[var(--line-strong)] bg-[#171614] text-[#faf7f1]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#2e7d32]/20 border border-[#2e7d32] flex items-center justify-center text-[#4caf50]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#4caf50] font-semibold">
              Work Request Registered in Studio Ledger
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Commission Reference #{submittedData.request_number}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#c7beaf]">
          Your architectural commission request for <strong className="text-white font-medium">{listing.title}</strong> has been assigned to our practice register. A Principal Architect will analyze your site coordinates and reach out within 24 working hours.
        </p>

        <div className="mt-6 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white/[0.04] p-5">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#d6cdb8] font-medium mb-3">
            Commission Summary Dossier
          </h4>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div>
              <dt className="text-[#a49a88] uppercase tracking-wider">Package Scope</dt>
              <dd className="font-medium text-white mt-0.5">{listing.title}</dd>
            </div>
            <div>
              <dt className="text-[#a49a88] uppercase tracking-wider">Estimated Retainer</dt>
              <dd className="font-mono text-[#d4af37] font-semibold mt-0.5">{formattedPrice}</dd>
            </div>
            <div>
              <dt className="text-[#a49a88] uppercase tracking-wider">Client Representative</dt>
              <dd className="font-medium text-white mt-0.5">{submittedData.requester_name}</dd>
            </div>
            <div>
              <dt className="text-[#a49a88] uppercase tracking-wider">Contact</dt>
              <dd className="text-white mt-0.5">
                {submittedData.requester_phone} {submittedData.requester_email ? `• ${submittedData.requester_email}` : ""}
              </dd>
            </div>
            {submittedData.address ? (
              <div className="sm:col-span-2">
                <dt className="text-[#a49a88] uppercase tracking-wider">Site / Project Location</dt>
                <dd className="text-white mt-0.5">{submittedData.address}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[#a49a88] uppercase tracking-wider">Review Status</dt>
              <dd className="text-[#4caf50] uppercase tracking-wider font-semibold mt-0.5">
                ● Pending Architect Assignment
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <a
            href={`https://wa.me/919871936847?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary bg-[#25D366] hover:bg-[#20ba5a] text-white border-none inline-flex items-center gap-2"
          >
            <span>Coordinate on WhatsApp</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="button-secondary text-xs uppercase tracking-[0.2em]"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="commission-request-form" className="card p-8 sm:p-10 border border-[var(--line-strong)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
            Atelier Commission Desk
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] mt-1">
            Create Work Request
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Commissioning: <strong className="text-[var(--foreground)] font-medium">{listing.title}</strong>
          </p>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4 text-left sm:text-right">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Package Retainer
          </span>
          <span className="font-serif text-xl sm:text-2xl text-[var(--foreground)] font-bold">
            {formattedPrice}
          </span>
          <span className="block text-[10px] text-[var(--muted)]">
            REF: {specs.sku || `ARC11-${listing.id.substring(0, 6).toUpperCase()}`}
          </span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Client / Representative Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder="e.g. Vikram Singhania"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="e.g. vikram@example.com"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Phone / Mobile (WhatsApp) *
            </label>
            <input
              id="phone"
              name="phone"
              required
              placeholder="+91 98765 43210"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            />
          </div>

          {/* Project Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Site / Project Location *
            </label>
            <input
              id="location"
              name="location"
              required
              placeholder="Plot, Sector, City (e.g. DLF Phase 5, Gurugram)"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            />
          </div>

          {/* Project Typology */}
          <div>
            <label
              htmlFor="projectType"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Project Typology
            </label>
            <select
              id="projectType"
              name="projectType"
              defaultValue={specs.typology || "Residential"}
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            >
              <option value="Luxury Residential Villa">Luxury Residential Villa</option>
              <option value="Builder Floor / Multistorey Residence">Builder Floor / Multistorey Residence</option>
              <option value="Corporate Office & Commercial Workspace">Corporate Office & Commercial Workspace</option>
              <option value="Turnkey Interior Architecture">Turnkey Interior Architecture</option>
              <option value="Farmhouse & Estate Master Plan">Farmhouse & Estate Master Plan</option>
              <option value="Institutional & Medical Facility">Institutional & Medical Facility</option>
              <option value="Hospitality & Retail">Hospitality & Retail</option>
            </select>
          </div>

          {/* Built-up Area */}
          <div>
            <label
              htmlFor="builtUpArea"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Approx. Built-up / Plot Area
            </label>
            <input
              id="builtUpArea"
              name="builtUpArea"
              placeholder="e.g. 500 sq. yds / 4,500 sq.ft"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            />
          </div>

          {/* Timeline */}
          <div>
            <label
              htmlFor="timeline"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Desired Commencement Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              defaultValue="Immediate (Within 15 Days)"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            >
              <option value="Immediate (Within 15 Days)">Immediate (Within 15 Days)</option>
              <option value="1 to 3 Months">1 to 3 Months</option>
              <option value="3 to 6 Months">3 to 6 Months</option>
              <option value="Preliminary Feasibility / Future Project">Preliminary Feasibility / Future Project</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
            >
              Construction / Fitout Budget Zone
            </label>
            <select
              id="budget"
              name="budget"
              defaultValue="₹50L – ₹1.5 Cr"
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
            >
              <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
              <option value="₹50L – ₹1.5 Cr">₹50L – ₹1.5 Cr</option>
              <option value="₹1.5 Cr – ₹3 Cr">₹1.5 Cr – ₹3 Cr</option>
              <option value="₹3 Cr – ₹5 Cr">₹3 Cr – ₹5 Cr</option>
              <option value="₹5 Cr+ Luxury Commission">₹5 Cr+ Luxury Commission</option>
            </select>
          </div>
        </div>

        {/* Message / Brief */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] font-medium"
          >
            Project Brief, Elevation Vision & Specific Requirements
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about the site layout, number of levels, Vastu considerations, statutory sanction needs, aesthetic preferences (e.g. brutalist, modern tropical, classical), or contractor coordination needs..."
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent p-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] transition-colors"
          />
        </div>

        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-600">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
          <p className="text-xs text-[var(--muted-2)]">
            Submission securely logs directly to Arc 11 Architectural Ledger under Business ID <code className="text-xs font-mono">6ab5e485</code>.
          </p>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="button-primary w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting Work Request...</span>
              </>
            ) : (
              <span>Submit & Create Work Request</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
