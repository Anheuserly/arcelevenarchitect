"use client";

import { useState } from "react";
import { createDocument, uploadFile } from "@/lib/appwriteClient";
import { trackEvent } from "@/lib/analytics";

const applicationsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_CAREER_APPLICATIONS_COLLECTION_ID ||
  "career_applications";
const uploadsBucketId =
  process.env.NEXT_PUBLIC_APPWRITE_CAREER_UPLOADS_BUCKET_ID ||
  process.env.NEXT_PUBLIC_APPWRITE_ESTIMATOR_ATTACHMENTS_BUCKET_ID;
const publicDocumentPermissions = [
  'read("any")',
  'update("any")',
  'delete("any")',
];

type CareerApplyFormProps = {
  jobTitle: string;
  jobSlug: string;
};

export default function CareerApplyForm({
  jobTitle,
  jobSlug,
}: CareerApplyFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setError(null);

    if (!applicationsCollectionId) {
      setStatus("error");
      setError("Career applications collection is not configured.");
      return;
    }

    const formData = new FormData(form);
    const resumeFile = formData.get("resume") as File | null;
    const portfolioFile = formData.get("portfolio") as File | null;

    let resumeFileId = "";
    let portfolioFileId = "";

    try {
      if (uploadsBucketId && resumeFile && resumeFile.size > 0) {
        const uploaded = await uploadFile({ bucketId: uploadsBucketId, file: resumeFile });
        resumeFileId = uploaded.$id;
      }

      if (uploadsBucketId && portfolioFile && portfolioFile.size > 0) {
        const uploaded = await uploadFile({
          bucketId: uploadsBucketId,
          file: portfolioFile,
        });
        portfolioFileId = uploaded.$id;
      }

      const payload = {
        jobTitle,
        jobSlug,
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        experience: String(formData.get("experience") || ""),
        portfolioLink: String(formData.get("portfolioLink") || ""),
        resumeLink: String(formData.get("resumeLink") || ""),
        message: String(formData.get("message") || ""),
        resumeFileId,
        portfolioFileId,
        status: "new",
        createdAt: new Date().toISOString(),
      };

      await createDocument({
        collectionId: applicationsCollectionId,
        data: payload,
        permissions: publicDocumentPermissions,
      });
      trackEvent("career_apply", {
        job_slug: jobSlug,
        job_title: jobTitle,
      });

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
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
          type="email"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="you@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="+91"
        />
      </div>
      <div>
        <label
          htmlFor="experience"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Experience
        </label>
        <input
          id="experience"
          name="experience"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="0-3 years"
        />
      </div>
      <div>
        <label
          htmlFor="portfolioLink"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Portfolio Link (optional)
        </label>
        <input
          id="portfolioLink"
          name="portfolioLink"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="https://"
        />
      </div>
      <div>
        <label
          htmlFor="resumeLink"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Resume Link (optional)
        </label>
        <input
          id="resumeLink"
          name="resumeLink"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="https://"
        />
      </div>
      <div>
        <label
          htmlFor="resume"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Upload Resume (Any format)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="portfolio"
          className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]"
        >
          Upload Portfolio (Any format)
        </label>
        <input
          id="portfolio"
          name="portfolio"
          type="file"
          className="mt-2 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm"
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
          className="mt-2 min-h-[120px] w-full rounded-3xl border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
          placeholder="Tell us about yourself"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Apply Now"}
      </button>
      {status === "success" ? (
        <p className="text-xs text-[var(--muted-2)]">
          Thanks for applying. We will review and respond soon.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : null}
    </form>
  );
}
