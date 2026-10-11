import { SITE_URL, absoluteUrl } from "@/lib/seo";

export interface ArchitecturalProduct {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  sku: string;
  mpn: string;
  brand: string;
  availability: "in_stock" | "preorder" | "out_of_stock";
  condition: "new";
  description: string;
  heroImage: string;
  gallery: string[];
  deliverables: string[];
  specifications: Record<string, string>;
  shippingDetails: {
    areaServed: string;
    handlingDays: string;
    transitDays: string;
    rate: string;
    description: string;
  };
  returnPolicy: {
    policyLabel: string;
    returnDays: number;
    description: string;
  };
}

export const ARC11_PRODUCTS: ArchitecturalProduct[] = [
  {
    id: "87a1cefe-25bc-42c0-b81a-38b3c3bd8ed4",
    slug: "residential-architecture",
    title: "Bespoke Luxury Residential Architecture & Master Planning",
    category: "Architecture & Spatial Planning",
    price: 150000,
    currency: "INR",
    sku: "ARC11-RES-ARCH-01",
    mpn: "ARC11-RES-01",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "Comprehensive architectural design for luxury residences and villas. Includes site reading, orientation analysis, space planning, structural and MEP coordination, massing studies, and complete Good-For-Construction (GFC) drawing packages.",
    heroImage: "/portfolio/residential/mr-tushar-faridabad/gallery/exterior.png",
    gallery: [
      "/portfolio/residential/mr-tushar-faridabad/gallery/exterior.png",
      "/portfolio/residential/mr-tushar-faridabad/gallery/front-elevation.png",
      "/portfolio/residential/mr-tushar-faridabad/gallery/master-bedroom-main.png",
      "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-01.jpeg",
    ],
    deliverables: [
      "Site orientation reading & daylight massing optimization",
      "Comprehensive Good-For-Construction (GFC) architectural drawings",
      "Statutory municipal sanction drawings & DCR compliance sets",
      "Structural engineering & multi-disciplinary MEP alignment",
      "Bonded archival A1/A3 master drawing book couriered to site",
      "3 Structured architectural design milestone reviews",
    ],
    specifications: {
      "Typology": "Luxury Residential, Villas & Penthouses",
      "Drawing Scales": "1:100 Site Masterplan, 1:50 Floor Plans, 1:20 Construction Details",
      "BIM LOD": "Autodesk Revit LOD 300 / 350",
      "Lead Time": "Initial Spatial Dossier in 7-10 Business Days",
      "Compliance": "NBC 2016, Local Municipal By-Laws (DCR), Fire Safety Codes",
      "Deliverable Formats": "Autodesk Revit (RVT), Vector DWG, Archival PDF",
      "Scope Coverage": "Pan India & Select International Jurisdictions",
    },
    shippingDetails: {
      areaServed: "Pan India & Global Digital Delivery",
      handlingDays: "0-2 Days",
      transitDays: "1-4 Business Days",
      rate: "Free (₹0.00)",
      description: "Complimentary Tracked Master Drawing Book Courier & 48h Digital Cloud Dossier",
    },
    returnPolicy: {
      policyLabel: "Milestone Consultation & Design Iteration Protocol",
      returnDays: 14,
      description: "Comprehensive 14-day preliminary consultation and review assurance.",
    },
  },
  {
    id: "aaa06976-98c6-444d-a6f8-58a8046d9e33",
    slug: "interior-architecture",
    title: "Turnkey Interior Architecture, Lighting & Joinery Detailing",
    category: "Interior Architecture",
    price: 120000,
    currency: "INR",
    sku: "ARC11-INT-ARCH-02",
    mpn: "ARC11-INT-02",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "High-craft interior architecture, lighting schedules, custom joinery, material selection, and sanitaryware detailing for residences, hospitality, and executive suites.",
    heroImage: "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-02.jpeg",
    gallery: [
      "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-02.jpeg",
      "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-03.jpeg",
      "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-04.jpeg",
      "/portfolio/residential/mr-tushar-faridabad/gallery/kitchen-main.png",
    ],
    deliverables: [
      "Custom millwork, joinery, and wardrobe detail sheets",
      "Architectural lighting schedules & lux level layouts",
      "Flooring pattern layout & stone cutting schedules",
      "Bath fixture, CP sanitaryware & plumbing coordination",
      "Physical material palette selection & vendor specs",
      "Color temperature, mood, and acoustic harmony study",
    ],
    specifications: {
      "Typology": "Residences, Hospitality & Executive Suites",
      "Joinery Detailing": "1:10 & 1:5 High-Precision Millwork Sections",
      "Lighting Logic": "Layered Ambient, Task & Accent Lighting Layouts",
      "Material Spec": "Italian Marble, Fluted Timber, Brushed Metals, Microcement",
      "Lead Time": "Initial Concept & Moodboard in 5-7 Business Days",
      "Deliverable Formats": "CAD DWG, Detailed Finish Schedules (XLS/PDF)",
      "Scope Coverage": "Delhi NCR, Pan India & International",
    },
    shippingDetails: {
      areaServed: "Pan India & Global Digital Delivery",
      handlingDays: "0-2 Days",
      transitDays: "1-4 Business Days",
      rate: "Free (₹0.00)",
      description: "Complimentary Tracked Interior Dossier Courier & Digital Cloud Delivery",
    },
    returnPolicy: {
      policyLabel: "Material & Spatial Iteration Protocol",
      returnDays: 14,
      description: "Full preliminary moodboard and finish iteration review guarantee.",
    },
  },
  {
    id: "c0d1771e-52c2-41cb-8210-5caf69f059f1",
    slug: "bim-coordination",
    title: "BIM LOD 350 Coordination & Statutory Sanction Documentation",
    category: "BIM & Technical Documentation",
    price: 95000,
    currency: "INR",
    sku: "ARC11-BIM-LOD350-03",
    mpn: "ARC11-BIM-03",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "Autodesk Revit BIM modeling (LOD 350), multi-disciplinary MEP and structural clash detection, municipal drawing sanction compliance sets, and statutory approvals documentation.",
    heroImage: "/brand/geometry-study.jpeg",
    gallery: [
      "/brand/geometry-study.jpeg",
      "/brand/proportion-study.png",
    ],
    deliverables: [
      "Multi-disciplinary Autodesk Revit LOD 350 building models",
      "Navisworks clash detection reports & resolution matrices",
      "Statutory municipal sanction sets aligned with local by-laws",
      "Integrated structural & MEP service routing coordination",
      "Quantity take-off (QTO) data schedules & BOQ extraction",
      "Exported IFC, RVT, and NWD coordination packages",
    ],
    specifications: {
      "Software Stack": "Autodesk Revit 2024+, Navisworks Manage, AutoCAD",
      "BIM Standard": "LOD 350 (Geometry, Location, Orientation & Service Penetrations)",
      "Clash Detection": "Hard & Soft Clash Matrix with Priority Categorization",
      "Statutory Code": "DCR & National Building Code (NBC 2016) Compliance",
      "Lead Time": "Initial Model Setup & Sanction Set in 7 Business Days",
      "Deliverable Formats": "RVT, NWD, IFC 2x3/4, DWG, High-Res Vector PDF",
      "Scope Coverage": "Pan India & International BIM Outsource",
    },
    shippingDetails: {
      areaServed: "Global Cloud Delivery & Physical Courier across India",
      handlingDays: "0-1 Days",
      transitDays: "Immediate Cloud Access (0 Days) / 2-3 Days Hardcopy",
      rate: "Free (₹0.00)",
      description: "Encrypted Secure Cloud BIM Access & High-Resolution A1 Bonded Drawings",
    },
    returnPolicy: {
      policyLabel: "Technical Validation & Clash Resolution Guarantee",
      returnDays: 14,
      description: "Guaranteed clash resolution cycles until zero high-priority clashes remain.",
    },
  },
  {
    id: "186a13c1-a4ea-498d-8de4-6a6d0afde510",
    slug: "3d-visualization",
    title: "Photorealistic Architectural 3D Visualization & VR Immersion",
    category: "Architectural Visualization",
    price: 75000,
    currency: "INR",
    sku: "ARC11-VIS-3D-04",
    mpn: "ARC11-VIS-04",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "CGI atmospheric renders, walkthrough animations, spatial daylight analysis, and immersive VR experiences conveying spatial poetry and material truth.",
    heroImage: "/portfolio/residential/mr-tushar-faridabad/gallery/front-elevation.png",
    gallery: [
      "/portfolio/residential/mr-tushar-faridabad/gallery/front-elevation.png",
      "/portfolio/residential/mr-tushar-faridabad/gallery/exterior.png",
      "/portfolio/residential/mr-tushar-faridabad/gallery/master-bedroom-main.png",
      "/portfolio/residential/mr-tushar-faridabad/gallery/kitchen-main.png",
    ],
    deliverables: [
      "Ultra-high resolution 4K/8K exterior & interior CGI stills",
      "Daylight, golden hour, and dusk architectural illumination studies",
      "Photorealistic texture mapping with authentic physical shaders",
      "Cinematic 60fps walkthrough video render",
      "Interactive 360-degree panoramic VR spatial tour",
      "Post-production grading and landscape context integration",
    ],
    specifications: {
      "Resolution": "Up to 8K Stills (7680x4320) & 4K 60fps Video",
      "Engine Pipeline": "3ds Max, Corona / V-Ray, Unreal Engine 5, Photoshop",
      "Lighting Realism": "Accurate Geographic Sun & HDRI Sky Simulation",
      "Material Accuracy": "PBR Multi-Layered Material Calibrated Shaders",
      "Lead Time": "First Draft Renderings in 4-6 Business Days",
      "Deliverable Formats": "TIFF, PNG (Uncompressed), MP4 (ProRes/H.265), Web-Embed 360",
      "Scope Coverage": "Worldwide Digital Delivery",
    },
    shippingDetails: {
      areaServed: "Worldwide Digital Cloud Delivery",
      handlingDays: "0 Days",
      transitDays: "Instant Digital Delivery (0 Days)",
      rate: "Free (₹0.00)",
      description: "Direct High-Speed Cloud Asset Download with Full Commercial Rights",
    },
    returnPolicy: {
      policyLabel: "Visual Aesthetics Review Guarantee",
      returnDays: 14,
      description: "2 Dedicated camera angle & material adjustment revision rounds included.",
    },
  },
  {
    id: "b3b54072-873f-4adc-951b-07308912e044",
    slug: "workspace-architecture",
    title: "Corporate Workspace Architecture & Adaptive Commercial Planning",
    category: "Commercial Architecture",
    price: 250000,
    currency: "INR",
    sku: "ARC11-COM-WORK-05",
    mpn: "ARC11-COM-05",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "End-to-end spatial planning, zoning, acoustic coordination, and high-performance workplace interiors for studios, offices, and commercial establishments.",
    heroImage: "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
    gallery: [
      "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
      "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-02.jpg",
      "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-03.jpg",
    ],
    deliverables: [
      "Occupancy capacity modeling & departmental zoning layouts",
      "Acoustic isolation zoning, reverberation and baffle planning",
      "HVAC, fire-fighting, server room & network cable trunking coordination",
      "Executive boardrooms, collaborative town halls & focus pods",
      "Compliance with commercial fire codes, NBC, and ADA accessibility",
      "Turnkey tender documents, BOQ estimates & material vendor schedules",
    ],
    specifications: {
      "Typology": "Commercial Offices, Tech Campuses & High-End Retail",
      "Density Planning": "Optimized Ergonomic Seat-to-Circulation Ratios",
      "Acoustic Standard": "Target NRC 0.75+ for Meeting Spaces & Open Bays",
      "Building Services": "Integrated HVAC VRV/Chiller & Low-Voltage Cable Trays",
      "Lead Time": "Preliminary Concept & Zoning in 8-12 Business Days",
      "Deliverable Formats": "Revit BIM, CAD DWG, Tender BOQ (Excel), Presentation Deck",
      "Scope Coverage": "Delhi NCR, Pan India & International",
    },
    shippingDetails: {
      areaServed: "Pan India & Global Digital Delivery",
      handlingDays: "0-2 Days",
      transitDays: "1-4 Business Days",
      rate: "Free (₹0.00)",
      description: "Complimentary Tracked Architectural Drawing Dossier & Cloud BIM Repository",
    },
    returnPolicy: {
      policyLabel: "Commercial Zoning Validation Protocol",
      returnDays: 14,
      description: "Milestone-based stakeholder alignment and zoning review guarantee.",
    },
  },
  {
    id: "aba2d00c-42a0-4aa1-be4f-f6b28a21ad30",
    slug: "site-quality-oversight",
    title: "Architectural Site Quality Oversight & Contractor Coordination Retainer",
    category: "Project Delivery & Oversight",
    price: 180000,
    currency: "INR",
    sku: "ARC11-SITE-OVERSIGHT-06",
    mpn: "ARC11-SITE-06",
    brand: "Arc 11 Architect",
    availability: "in_stock",
    condition: "new",
    description:
      "Scheduled milestone architectural audits, mock-up review, contractor coordination, structural alignment checks, and finish quality control.",
    heroImage: "/brand/geometry-study.jpeg",
    gallery: [
      "/brand/geometry-study.jpeg",
      "/brand/proportion-study.png",
      "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-01.jpeg",
    ],
    deliverables: [
      "Scheduled site milestone architectural inspections by senior architects",
      "Dimensional verification and structural alignment audits",
      "Material sample mock-up evaluation & approval sign-offs",
      "Contractor RFI (Request For Information) resolution logs",
      "Site defect snag lists with photographic documentation",
      "Compliance audit against approved Good-For-Construction drawings",
    ],
    specifications: {
      "Frequency": "Bi-Weekly or Key Milestone On-Site Architect Audits",
      "Inspection Scope": "Civil Structure, Brickwork, MEP Conduit, Wet Finishes, Joinery",
      "Reporting": "Digital Snag List & Progress Audit PDF within 24 Hours of Visit",
      "Coordination": "Direct Interface with General Contractor & Sub-Vendors",
      "Coverage Area": "Delhi NCR (Physical Visits) / Pan-India by Travel Schedule",
      "Deliverable Formats": "Site Inspection Audit Report (PDF with Geo-Tagged Photos)",
    },
    shippingDetails: {
      areaServed: "Delhi NCR On-Site & Pan India Hybrid",
      handlingDays: "Immediate Dispatch",
      transitDays: "Direct Site Architect Deployment",
      rate: "Free (₹0.00)",
      description: "Direct Site Visit Audit Reports Dispatched within 24h via Digital Portal",
    },
    returnPolicy: {
      policyLabel: "Site Quality Assurance Guarantee",
      returnDays: 14,
      description: "Audit reports verified by registered Council of Architecture (CoA) members.",
    },
  },
];

export async function getProducts(): Promise<ArchitecturalProduct[]> {
  const dataHubUrl = process.env.NEXT_PUBLIC_DATA_HUB_API_URL || "https://storage.amcmep.in/v1";
  try {
    const res = await fetch(`${dataHubUrl}/listings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return ARC11_PRODUCTS;
    const data = await res.json();
    const rows = data.rows || [];
    const arcRows = rows.filter(
      (r: any) =>
        r.business_name?.toLowerCase().includes("arc") ||
        r.business_id === "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687"
    );

    if (!arcRows.length) return ARC11_PRODUCTS;

    // Merge live prices / descriptions if available
    return ARC11_PRODUCTS.map((local) => {
      const match = arcRows.find((r: any) => r.id === local.id);
      if (!match) return local;
      return {
        ...local,
        title: match.title || local.title,
        description: match.description || local.description,
        price: match.price ? Number(match.price) : local.price,
        category: match.category || local.category,
      };
    });
  } catch {
    return ARC11_PRODUCTS;
  }
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<ArchitecturalProduct | null> {
  const products = await getProducts();
  const normalized = idOrSlug.trim().toLowerCase();
  return (
    products.find(
      (p) =>
        p.id.toLowerCase() === normalized ||
        p.slug.toLowerCase() === normalized ||
        p.sku.toLowerCase() === normalized
    ) || null
  );
}

export function generateFacebookProductJsonLd(product: ArchitecturalProduct) {
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const images = product.gallery.map((img) => absoluteUrl(img));

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": images,
    "sku": product.sku,
    "mpn": product.mpn,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": product.brand,
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": product.currency,
      "price": product.price.toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": product.brand,
        "url": SITE_URL,
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": product.currency,
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 2,
            "unitCode": "DAY",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 4,
            "unitCode": "DAY",
          },
        },
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": product.returnPolicy.returnDays,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
    },
  };
}
