type JsonLd = Record<string, unknown>;

function baseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://arcelevenarchitect.com";
}

export default function SeoJsonLd() {
  const siteUrl = baseUrl();
  const brand = "Arc 11 Architect";
  const altBrand = "Arc 11 Architect";
  const logo = `${siteUrl}/brand/geometry-study.jpeg`;
  const headOfficeMap =
    "https://www.google.com/maps/place/ARC+11+ARCHITECT/@28.5068683,77.1821208,17z/data=!3m1!4b1!4m6!3m5!1s0x8b99e39acef87ea3:0x6f5f84cfaba72863!8m2!3d28.5068683!4d77.1846957!16s%2Fg%2F11x60035f9";
  const branchOfficeMap =
    "https://www.google.com/maps/place/Arc+11+Architect/@28.537786,77.1305869,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1d9dea5dc7e9:0x4595ec7be90d05d7!8m2!3d28.537786!4d77.1331618!16s%2Fg%2F11yxg50dsz";

  const sameAs = [
    "https://www.instagram.com/arc11studio_/",
    "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
    "https://www.facebook.com/profile.php?id=61578009358525",
    "https://koloapp.in/delhi/architects/shashank-saini--delhi",
    "https://www.sge.org.in/",
    "https://www.ssengineers.in/",
    "https://www.amcmep.in/",
    "https://www.notshubham.com/",
  ];

  const websiteSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand,
    alternateName: [altBrand, "ARC 11 ARCHITECT"],
    url: siteUrl,
    inLanguage: "en-IN",
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
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    sameAs,
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
    hasMap: headOfficeMap,
    telephone: "+91-85273-78555",
    email: "arcelevenarchitect@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "D-21, Chhatarpur Hills, II Floor, Ambedkar Colony",
      addressLocality: "New Delhi",
      postalCode: "110074",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5068683,
      longitude: 77.1846957,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Delhi NCR" },
    ],
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
    sameAs,
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
    hasMap: branchOfficeMap,
    telephone: "+91-85273-78555",
    email: "arcelevenarchitect@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "E1, DDA Flats, A2/04, Rangpuri Pahari, Vasant Kunj",
      addressLocality: "New Delhi",
      postalCode: "110070",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.537786,
      longitude: 77.1331618,
    },
    areaServed: [{ "@type": "Country", name: "India" }],
    sameAs,
  };

  const serviceSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Architecture, Interior Design and Turnkey Solutions",
    serviceType: "Architecture, Interior Design, 3D Visualization, Renovation, Turnkey Execution",
    provider: {
      "@id": `${siteUrl}/#head-office`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
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
