import React from "react";
import Script from "next/script";

export default function SEO() {
  /* =====================================================
     BRAND CONSTANT (VERY IMPORTANT)
  ===================================================== */
  const BRAND = "Arc 11 Architect";
  const SITE_URL = "https://www.arcelevenarchitect.com";
  const LOGO = `${SITE_URL}/arc-11-architect.svg`;

  /* =====================================================
     WEBSITE SCHEMA (THIS FIXES GOOGLE SMALL NAME)
  ===================================================== */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    alternateName: "ARC 11 ARCHITECT",
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: {
        "@type": "ImageObject",
        url: LOGO,
      },
    },
  };

  /* =====================================================
     LOCAL BUSINESS SCHEMA
  ===================================================== */
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND,
    url: SITE_URL,
    image: LOGO,
    logo: LOGO,
    telephone: "+91-85273-78555",
    email: "arcelevenarchitect@gmail.com",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "House No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi",
      addressLocality: "New Delhi",
      postalCode: "110074",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5068707,
      longitude: 77.1847125,
    },

    founder: {
      "@type": "Person",
      name: "Shashank Saini",
      sameAs: [
        "https://www.instagram.com/arc11studio_/",
        "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
        "https://koloapp.in/delhi/architects/shashank-saini--delhi",
        "https://www.facebook.com/profile.php?id=61578009358525",
      ],
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-85273-78555",
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },

    sameAs: [
      "https://www.instagram.com/arc11studio_/",
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
      "https://www.facebook.com/profile.php?id=61578009358525",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",
      "https://www.sge.org.in/",
      "https://www.ssengineers.in/",
      "https://www.amcmep.in/",
      "https://www.notshubham.com/",
    ],
  };

  /* =====================================================
     ORGANIZATION SCHEMA
  ===================================================== */
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: SITE_URL,
    logo: LOGO,
    sameAs: localBusiness.sameAs,
  };

  /* =====================================================
     SERVICE SCHEMA
  ===================================================== */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Architecture, Interior Design & Turnkey Solutions",
    provider: {
      "@type": "LocalBusiness",
      name: BRAND,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "India",
    },
  };

  /* =====================================================
     FAQ SCHEMA
  ===================================================== */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Arc 11 Architect provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Arc 11 Architect provides architecture, interior design, 3D visualization, renovation, and turnkey construction services across Delhi NCR and PAN India.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide turnkey solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, Arc 11 Architect offers complete design-to-execution turnkey solutions.",
        },
      },
    ],
  };

  /* =====================================================
     BREADCRUMB SCHEMA
  ===================================================== */
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      { "@type": "ListItem", position: 3, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  };

  return (
    <>
      <Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Script id="ld-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="ld-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
    </>
  );
}
