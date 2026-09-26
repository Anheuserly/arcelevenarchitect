/**
 * Schema.org generator for Arc Eleven Architects.
 * Adheres strictly to Google Search Console rich results guidelines for:
 * - ProfessionalService / ArchitecturalStudio
 * - Product / Service with offers
 * - Non-empty image array
 * - shippingDetails (drawing courier & digital delivery)
 * - hasMerchantReturnPolicy (revision & milestone approval protocol)
 */

export interface ArchitecturalListingItem {
  id: string;
  business_id?: string;
  title: string;
  description?: string;
  category?: string;
  type?: string;
  price?: string | number;
  currency?: string;
  availability?: string;
  media_url?: string | null;
  specifications?: Record<string, any>;
  shipping_details?: Record<string, any>;
  merchant_return_policy?: Record<string, any>;
  business_name?: string;
  [key: string]: unknown;
}

export function createArchitecturalJsonLd(listing: ArchitecturalListingItem) {
  const fallbackLogo = "https://arcelevenarchitect.com/geometry-study.jpeg";
  const primaryImage = (listing.media_url && typeof listing.media_url === "string" && listing.media_url.trim())
    ? listing.media_url.trim()
    : fallbackLogo;

  const imageList = [primaryImage];
  if (primaryImage !== fallbackLogo) {
    imageList.push(fallbackLogo);
  }

  const rawPrice = Number(listing.price);
  const formattedPrice = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice.toFixed(2) : "0.00";
  const sku = listing.specifications?.sku || `ARC11-${listing.id.substring(0, 8).toUpperCase()}`;
  const mpn = listing.specifications?.modelNumber || sku;
  const studioName = listing.specifications?.brand || listing.business_name || "ARC 11 ARCHITECT";

  const dbShipping = listing.shipping_details;
  const dbReturn = listing.merchant_return_policy;

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": listing.title,
    "description": listing.description || "Bespoke architectural design, BIM documentation, and turnkey spatial planning by Arc 11 Architect.",
    "image": imageList,
    "sku": sku,
    "mpn": mpn,
    "category": listing.category || "Architectural Services",
    "brand": {
      "@type": "Brand",
      "name": studioName,
    },
    "offers": {
      "@type": "Offer",
      "url": `https://arcelevenarchitect.com/services/${listing.id}`,
      "priceCurrency": listing.currency || "INR",
      "price": formattedPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": studioName,
        "url": "https://arcelevenarchitect.com",
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": String(dbShipping?.shippingRate?.value ?? 0),
          "currency": dbShipping?.shippingRate?.currency || listing.currency || "INR",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": dbShipping?.shippingDestination?.addressCountry || "IN",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": dbShipping?.deliveryTime?.handlingTime?.minValue ?? 0,
            "maxValue": dbShipping?.deliveryTime?.handlingTime?.maxValue ?? 2,
            "unitCode": "DAY",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": dbShipping?.deliveryTime?.transitTime?.minValue ?? 1,
            "maxValue": dbShipping?.deliveryTime?.transitTime?.maxValue ?? 4,
            "unitCode": "DAY",
          },
        },
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": dbReturn?.applicableCountry || "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": dbReturn?.merchantReturnDays ?? 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
    },
  };
}
