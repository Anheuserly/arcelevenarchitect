"use client";
import React from "react";
import Script from "next/script";

export default function SEO() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ARC 11 ARCHITECT",
    url: "https://www.arcelevenarchitect.com",
    image: "https://www.arcelevenarchitect.com/amcmep-icon.png",
    logo: "https://www.arcelevenarchitect.com/amcmep-icon.png",
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
      contactType: "customer service",
      areaServed: ["IN"],
      availableLanguage: ["en", "hi"],
    },

    // -----------------------------------------
    //          PROFESSIONAL SERVICES
    // -----------------------------------------
    service: [
      "Architecture Design",
      "Interior Design",
      "3D Visualization & Rendering",
      "Building Elevation Design",
      "Landscape Architecture",
      "Renovation & Remodeling",
      "Turnkey Construction",
      "Vastu-Friendly Layout Planning",
      "Residential Architecture",
      "Commercial Architecture",
      "Office Interiors",
      "Retail & Showroom Interiors",
      "Café & Restaurant Interior Design",
      "Apartment Interior Design",
      "Space Planning",
      "Material Selection Consultancy",
      "Site Execution & Supervision",
      "Conceptual Design & Drafting",
      "AutoCAD & Working Drawings",
    ],

    hasPart: [
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/about", name: "About Us" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/contact", name: "Contact Us" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/portfolio", name: "Portfolio" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/blog", name: "Blog" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/journal", name: "Journal" },
      { "@type": "WebPage", url: "https://www.arcelevenarchitect.com/services", name: "Services" },
    ],

    // =============================================================================
    //                              SAME AS (ALL LINKS)
    // =============================================================================
    sameAs: [
      // ARC ELEVEN (Main)
      "https://www.instagram.com/arc11studio_/",
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
      "https://www.facebook.com/profile.php?id=61578009358525",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",

      // Owner business ecosystem
      "https://www.sge.org.in/",
      "https://www.ssengineers.in/",
      "https://www.amcmep.in/",
      "https://www.notshubham.com/",

      // SGE Profiles
      "https://www.instagram.com/_sgemep/",
      "https://www.facebook.com/profile.php?id=61566464961902",
      "https://www.linkedin.com/in/shree-ganesh-enterprises-1385b5271/",
      "https://www.youtube.com/@sgemep",
      "https://x.com/_sgemep",

      // AMC-MEP profiles
      "https://x.com/amcmep24x7",
      "https://instagram.com/amcmep247",
      "https://www.linkedin.com/in/amc-mep-b53b68391",
      "https://www.facebook.com/profile.php?id=61583370617483",

      // Apps
      "https://play.google.com/store/apps/details?id=com.mepsge.amcsge",
      "https://play.google.com/store/apps/details?id=com.mepsge.amcsgepartner.amcsgepartner",

      // Communication
      "https://wa.me/919871936847",
      "https://t.me/+HJbJBvfbGyMxMzI1",
      "https://discord.gg/hp5Z6ddTNy",

      // Owner Social (Business Coach)
      "https://www.youtube.com/@anilsainibusinesscoach",
      "https://www.youtube.com/@COACHANILSAINI",
      "https://www.instagram.com/coachanilsaini.official",
      "https://www.instagram.com/coachanilsaininlp",

      // Google Maps
      "https://www.google.com/maps/place/Shree+Ganesh+Enterprises/"
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does ARC 11 ARCHITECT provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ARC 11 ARCHITECT provides premium architectural design, interior design, 3D visualization, landscaping, renovation, and turnkey construction services across Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide full turnkey solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, ARC 11 ARCHITECT offers complete design-to-execution turnkey solutions including planning, construction, interiors, and finishing.",
        },
      },
      {
        "@type": "Question",
        name: "Do you serve clients outside Delhi NCR?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, we serve clients across PAN India for architecture, interior and renovation projects.",
        },
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ARC 11 ARCHITECT",
    url: "https://www.arcelevenarchitect.com",
    logo: "https://www.arcelevenarchitect.com/amcmep-icon.png",

    sameAs: [
      "https://www.instagram.com/arc11studio_/",
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
      "https://www.facebook.com/profile.php?id=61578009358525",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",

      "https://www.sge.org.in/",
      "https://www.ssengineers.in/",
      "https://www.amcmep.in/",
      "https://www.notshubham.com/",

      // Owner
      "https://www.youtube.com/@anilsainibusinesscoach",
      "https://www.youtube.com/@COACHANILSAINI",
      "https://www.instagram.com/coachanilsaini.official",
      "https://www.instagram.com/coachanilsaininlp"
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.arcelevenarchitect.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.arcelevenarchitect.com/about" },
      { "@type": "ListItem", position: 3, name: "Contact", item: "https://www.arcelevenarchitect.com/contact" },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Architecture, Interior Design & Turnkey Solutions",
    provider: {
      "@type": "LocalBusiness",
      name: "ARC 11 ARCHITECT",
      url: "https://www.arcelevenarchitect.com",
    },
    areaServed: {
      "@type": "Place",
      name: "PAN India",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.arcelevenarchitect.com/services",
      priceCurrency: "INR",
      price: "Consultation-based",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script id="ld-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}
