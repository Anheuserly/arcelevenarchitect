// src/app/partners/page.tsx

import PartnerRegistrationPage from "./partner-registration/page";

export const metadata = {
  title: "Our Partners - AMCMEP | Shree Ganesh Enterprises",
  description:
    "Explore the trusted partners and collaborators of Shree Ganesh Enterprises (AMCMEP) who help us deliver quality fire safety and AMC services.",
  alternates: { canonical: "https://www.amcmep.in/partners" },
};

export default function PartnersPage() {
  return <PartnerRegistrationPage />;
}