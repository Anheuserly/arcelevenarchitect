import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

export default function SeoJsonLd() {
  const siteUrl = SITE_URL;
  const brand = SITE_NAME;
  const altBrand = "ARC 11 ARCHITECT";
  const logo = absoluteUrl("/brand/proportion-study.png");
  const headOfficeMap =
    "https://www.google.com/maps/place/ARC+11+ARCHITECT/@28.5068683,77.1821208,17z/data=!3m1!4b1!4m6!3m5!1s0x8b99e39acef87ea3:0x6f5f84cfaba72863!8m2!3d28.5068683!4d77.1846957!16s%2Fg%2F11x60035f9";
  const branchOfficeMap =
    "https://www.google.com/maps/place/Arc+11+Architect/@28.537786,77.1305869,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1d9dea5dc7e9:0x4595ec7be90d05d7!8m2!3d28.537786!4d77.1331618!16s%2Fg%2F11yxg50dsz";

  const sameAs = [
    "https://www.instagram.com/arc11architect/",
    "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
    "https://www.facebook.com/profile.php?id=61578009358525",
    "https://koloapp.in/delhi/architects/shashank-saini--delhi",
  ];

  const websiteSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand,
    alternateName: [altBrand, "ARC 11 ARCHITECT"],
    url: siteUrl,
    description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    email: "arcelevenarchitect@gmail.com",
    telephone: "+91-85273-78555",
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    image: logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: "D-21, Chhatarpur Hills, II Floor, Ambedkar Colony",
      addressLocality: "New Delhi",
      postalCode: "110074",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Delhi NCR" },
      { "@type": "Place", name: "Pan India" },
    ],
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
    description:
      "Head office of Arc 11 Architect, serving residential, commercial, institutional, and interior architecture projects.",
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
        telephone: "+91-85273-78555",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-96500-58444",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
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
    description: "Branch office supporting site coordination and studio engagement in New Delhi.",
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
    description:
      "Architecture, interior design, visualization, renovation, BIM coordination, and project delivery services by Arc 11 Architect.",
    provider: {
      "@id": `${siteUrl}/#head-office`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
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
