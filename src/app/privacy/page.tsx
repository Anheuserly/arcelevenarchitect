import React from "react";

export const metadata = {
  title: "Privacy Policy | amcmep.in",
  description: "Read the privacy policy of amcmep.in regarding data handling, cookies, and security.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>amcmep.in</strong>, we value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how
        we collect, use, and safeguard your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal details such as name, phone number, email
        address, and location when you use our services or contact us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>To provide fire safety and AMC services.</li>
        <li>To communicate updates, offers, and service alerts.</li>
        <li>To improve our customer support and operations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-4">
        We may use cookies to enhance user experience, track analytics, and
        improve our website functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions regarding this Privacy Policy, please contact
        us at <strong>info@amcmep.in</strong>.
      </p>
    </main>
  );
}
