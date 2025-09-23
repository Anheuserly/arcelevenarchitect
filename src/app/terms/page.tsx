import React from "react";

export const metadata = {
  title: "Terms of Service | amcmep.in",
  description: "Review the terms and conditions for using amcmep.in services.",
};

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to <strong>amcmep.in</strong>. By accessing or using our
        services, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Services</h2>
      <p className="mb-4">
        Our AMC and fire safety services are provided under contractual
        agreements. Unauthorized use or misuse of services may lead to
        termination.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Responsibilities</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>You must provide accurate details for service requests.</li>
        <li>You agree not to misuse or disrupt our services.</li>
        <li>You are responsible for maintaining confidentiality of login info (if applicable).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        amcmep.in will not be held liable for indirect, incidental, or
        consequential damages arising from the use of our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms of Service at any time. We
        encourage you to review them periodically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        For any questions regarding these terms, please reach out at{" "}
        <strong>info@amcmep.in</strong>.
      </p>
    </main>
  );
}
