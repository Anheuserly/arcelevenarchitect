import {
  BRANCH_OFFICE_ADDRESS,
  BRANCH_OFFICE_GEO,
  BRANCH_OFFICE_MAP_URL,
  BUSINESS_EMAIL,
  BUSINESS_OPENING_HOURS,
  BUSINESS_PHONE_PRIMARY,
  BUSINESS_PHONE_SECONDARY,
  BUSINESS_SAME_AS,
  HEAD_OFFICE_ADDRESS,
  HEAD_OFFICE_GEO,
  HEAD_OFFICE_MAP_URL,
  SERVICE_AREAS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

type JsonLd = Record<string, unknown>;

export default function SeoJsonLd() {
  const siteUrl = SITE_URL;
  const brand = SITE_NAME;
  const altBrand = "ARC 11 ARCHITECT";
  const logo = absoluteUrl("/brand/proportion-study.png");
  const countryAreas = new Set([
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Switzerland",
    "Qatar",
    "United Arab Emirates",
    "Saudi Arabia",
    "Bahrain",
    "Oman",
    "Kuwait",
    "Singapore",
    "Malaysia",
    "Thailand",
    "Indonesia",
    "Australia",
    "New Zealand",
    "South Africa",
  ]);
  const openingHoursSpecification = BUSINESS_OPENING_HOURS.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${slot.dayOfWeek}`,
    opens: slot.opens,
    closes: slot.closes,
  }));
  const serviceArea = SERVICE_AREAS.map((area) => ({
    "@type": countryAreas.has(area) ? "Country" : "Place",
    name: area,
  }));

  const websiteSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand,
    alternateName: [altBrand, "ARC 11 ARCHITECT"],
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "ViewAction",
      target: `${siteUrl}/work`,
      name: "Explore Arc 11 Architect projects",
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  const organizationSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand,
    alternateName: [altBrand, "ARC 11 ARCHITECT"],
    url: siteUrl,
    description: SITE_DESCRIPTION,
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE_PRIMARY,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    image: logo,
    address: { "@type": "PostalAddress", ...HEAD_OFFICE_ADDRESS },
    areaServed: serviceArea,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE_PRIMARY,
        email: BUSINESS_EMAIL,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE_SECONDARY,
        email: BUSINESS_EMAIL,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    knowsAbout: [
      "Architectural design",
      "Interior design",
      "Construction coordination",
      "Turnkey execution",
      "Residential architecture",
      "Commercial interiors",
      "Institutional design",
      "3D visualization",
    ],
    sameAs: BUSINESS_SAME_AS,
  };

  const localBusinessSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "ArchitecturalService"],
    "@id": `${siteUrl}/#local-business`,
    name: brand,
    image: logo,
    logo,
    url: siteUrl,
    description:
      "Arc 11 Architect is a Delhi NCR architecture, interiors, and end-to-end project delivery practice serving residential, commercial, and institutional clients.",
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE_PRIMARY,
    address: { "@type": "PostalAddress", ...HEAD_OFFICE_ADDRESS },
    geo: {
      "@type": "GeoCoordinates",
      ...HEAD_OFFICE_GEO,
    },
    hasMap: HEAD_OFFICE_MAP_URL,
    openingHoursSpecification,
    areaServed: serviceArea,
    availableLanguage: ["English", "Hindi"],
    currenciesAccepted: "INR",
    serviceArea,
    sameAs: BUSINESS_SAME_AS,
  };

  const headOfficeSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalService",
    "@id": `${siteUrl}/#head-office`,
    name: brand,
    branchCode: "Head Office",
    url: siteUrl,
    image: logo,
    logo,
    hasMap: HEAD_OFFICE_MAP_URL,
    telephone: BUSINESS_PHONE_PRIMARY,
    email: BUSINESS_EMAIL,
    description:
      "Head office of Arc 11 Architect, serving residential, commercial, institutional, and interior architecture projects.",
    parentOrganization: {
      "@id": `${siteUrl}/#organization`,
    },
    address: { "@type": "PostalAddress", ...HEAD_OFFICE_ADDRESS },
    geo: {
      "@type": "GeoCoordinates",
      ...HEAD_OFFICE_GEO,
    },
    openingHoursSpecification,
    areaServed: serviceArea,
    founder: {
      "@type": "Person",
      name: "Shashank Saini",
      jobTitle: "Principal Architect and Proprietor Director",
      sameAs: [
        "https://www.instagram.com/shashaankk/",
        "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
        "https://koloapp.in/delhi/architects/shashank-saini--delhi",
        "https://www.facebook.com/shashank.saini.161",
      ],
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE_PRIMARY,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE_SECONDARY,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: BUSINESS_SAME_AS,
  };

  const branchOfficeSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalService",
    "@id": `${siteUrl}/#branch-office`,
    name: `${brand} - Branch Office`,
    branchCode: "Branch Office",
    parentOrganization: {
      "@id": `${siteUrl}/#organization`,
    },
    url: siteUrl,
    image: logo,
    logo,
    hasMap: BRANCH_OFFICE_MAP_URL,
    telephone: BUSINESS_PHONE_PRIMARY,
    email: BUSINESS_EMAIL,
    description: "Branch office supporting site coordination and studio engagement in New Delhi.",
    address: { "@type": "PostalAddress", ...BRANCH_OFFICE_ADDRESS },
    geo: {
      "@type": "GeoCoordinates",
      ...BRANCH_OFFICE_GEO,
    },
    openingHoursSpecification,
    areaServed: serviceArea,
    sameAs: BUSINESS_SAME_AS,
  };

  const serviceSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Architecture, Interior Design and Turnkey Solutions",
    serviceType: "Architecture, Interior Design, 3D Visualization, Renovation, Turnkey Execution",
    description:
      "Architecture, interior design, visualization, renovation, BIM coordination, and project delivery services by Arc 11 Architect.",
    provider: {
      "@id": `${siteUrl}/#head-office`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceOutput: "Pan India and selected international architecture and interiors delivery",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Studio Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Visualization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "BIM and Coordination" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Delivery" } },
      ],
    },
  };

  const faqSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Arc 11 Architect provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide architecture, interior design, 3D visualization, renovation, and turnkey project execution.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide turnkey solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer full design-to-execution turnkey solutions.",
        },
      },
      {
        "@type": "Question",
        name: "Which locations do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve Delhi NCR, Pan India, and selected international projects.",
        },
      },
    ],
  };

  const schemas = [
    websiteSchema,
    organizationSchema,
    localBusinessSchema,
    headOfficeSchema,
    branchOfficeSchema,
    serviceSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`seo-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
