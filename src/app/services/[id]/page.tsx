import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import ServiceWorkRequestForm from "@/components/ServiceWorkRequestForm";
import { createArchitecturalJsonLd } from "@/lib/architectural-schema";
import type { Metadata } from "next";

async function getListing(id: string) {
  try {
    const res = await fetch("https://storage.amcmep.in/v1/listings", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.rows?.find((l: any) => l.id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const listing = await getListing(params.id);
  if (!listing) return { title: "Package Not Found | Arc 11 Architect" };

  return {
    title: `${listing.title} | Arc 11 Architect`,
    description: listing.description || "Bespoke architectural planning, BIM coordination, and detail-led design deliverables.",
  };
}

export default async function ServicePackagePage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);

  if (!listing) {
    notFound();
  }

  const jsonLd = createArchitecturalJsonLd(listing);
  const specs = listing.specifications || {};
  const shipping = listing.shipping_details || {};
  const returnPolicy = listing.merchant_return_policy || {};

  const formattedPrice = listing.price
    ? `₹${Number(listing.price).toLocaleString("en-IN")}`
    : "Bespoke Scope on Consultation";

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            <Link href="/services" className="hover:text-[var(--foreground)] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)]">{listing.category || "Architecture"}</span>
            <span>/</span>
            <span className="truncate max-w-[240px] text-[var(--foreground)] font-medium">
              {listing.title}
            </span>
          </nav>

          {/* Master Package Showcase Card */}
          <div className="card p-8 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
              
              {/* Left Column: Architectural Drawing / Elevation Study */}
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[#171614]">
                  {listing.media_url ? (
                    <Image
                      src={listing.media_url}
                      alt={listing.title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center text-[var(--muted-2)]">
                      <div className="mb-4 h-12 w-12 rounded-full border border-[var(--line-strong)] flex items-center justify-center">
                        <span className="text-lg font-serif">11</span>
                      </div>
                      <p className="font-serif text-lg text-[#faf7f1]">Architectural Design Dossier</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em]">Arc 11 Spatial Studies</p>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 rounded-md border border-[rgba(255,255,255,0.2)] bg-[#171614]/80 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-[#faf7f1] uppercase backdrop-blur-sm">
                    {specs.typology || listing.category || "Design Package"}
                  </div>
                </div>

                {/* Key Studio Metric Highlights */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="subtle-card p-4">
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                      Turnaround SLA
                    </span>
                    <span className="mt-1 block font-serif text-lg text-[var(--foreground)]">
                      {specs.leadTime || "7–10 Working Days"}
                    </span>
                  </div>
                  <div className="subtle-card p-4">
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                      Compliance Code
                    </span>
                    <span className="mt-1 block font-serif text-lg text-[#2e7d32]">
                      NBC 2016 / DCR Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative, Retainer & Action */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Active Studio Commission
                  </span>
                  <span className="text-xs text-[var(--muted-2)]">
                    REF: {specs.sku || `ARC11-${listing.id.substring(0, 6).toUpperCase()}`}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif text-[var(--foreground)] leading-[1.1]">
                  {listing.title}
                </h1>

                <div className="mt-6 flex items-baseline gap-3 border-b border-[var(--line)] pb-6">
                  <span className="text-3xl sm:text-4xl font-serif text-[var(--foreground)] font-semibold">
                    {formattedPrice}
                  </span>
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
                    ({specs.unit || "Milestone Retainer"})
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--muted-2)] font-semibold mb-2">
                    Scope of Work
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]">
                    {listing.description || "Holistic architectural planning, spatial orientation, and technical execution documentation coordinated directly with principal architects."}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <a href="#commission-request-form" className="button-primary">
                    Create Work Request
                  </a>
                  <a href="tel:+919871936847" className="button-secondary">
                    Direct Architect Line (+91 98719 36847)
                  </a>
                  <Link href="/services" className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)] hover:text-[var(--foreground)] transition-colors ml-2">
                    &larr; All Services
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Tables Section: Specifications & Studio Terms */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">

            {/* Table 1: Architectural Drawing & BIM Specifications */}
            <div className="card p-8">
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
                <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <h2 className="font-serif text-2xl text-[var(--foreground)]">
                  Drawing & BIM Specifications
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium w-[40%]">
                        Package SKU
                      </th>
                      <td className="py-3.5 pl-4 font-mono font-semibold text-[var(--foreground)]">
                        {specs.sku || `ARC11-${listing.id.substring(0, 8).toUpperCase()}`}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Model / Code
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {specs.modelNumber || specs.sku || "ARC11-STD"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Atelier / Practice
                      </th>
                      <td className="py-3.5 pl-4 font-serif font-bold text-[var(--foreground)]">
                        {specs.brand || "ARC 11 ARCHITECT"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Typology Focus
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {specs.typology || "Residential, Commercial & Institutional"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Drawing Scales
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {specs.scales || "1:100 Master Layout, 1:50 Plans, 1:20 Details"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Digital Formats
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {specs.deliverableFormats || "Autodesk Revit (.RVT), AutoCAD (.DWG), Archival PDF"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Compliance Norms
                      </th>
                      <td className="py-3.5 pl-4 text-[#2e7d32] font-semibold">
                        {specs.compliance || "NBC 2016, Local Municipal DCR & Fire Safety"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Revisions Allowed
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {specs.revisions || "Structured Iterative Concept Review Rounds"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Commission Status
                      </th>
                      <td className="py-3.5 pl-4 text-[#2e7d32] font-semibold">
                        Active Studio Availability
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Consultation Delivery, Milestone SLAs & Studio Terms */}
            <div className="card p-8">
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
                <div className="h-2 w-2 rounded-full bg-[#2e7d32]" />
                <h2 className="font-serif text-2xl text-[var(--foreground)]">
                  Consultation & Deliverable Terms
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium w-[40%]">
                        Digital Dossier
                      </th>
                      <td className="py-3.5 pl-4 text-[#2e7d32] font-semibold">
                        {shipping.dispatchTimeLabel || "Digital Cloud Repository Handover in 48 Hours"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Hardcopy Courier
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {shipping.shippingRateLabel || "Complimentary Bonded A1/A3 Master Drawing Book (₹0.00)"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Service Territory
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {shipping.areaServed || specs.location || "Delhi NCR, Pan-India & Global Digital Delivery"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Revision Protocol
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)] font-semibold">
                        {returnPolicy.policyLabel || "Milestone Consultation & Design Iteration Protocol"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Scope Assurance
                      </th>
                      <td className="py-3.5 pl-4 text-[#2e7d32] font-semibold">
                        {returnPolicy.returnFeesLabel || "Full Preliminary Consultation Review Guarantee"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Consultation Mode
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {returnPolicy.returnMethodLabel || "In-Studio & Digital Cloud Review Sessions"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Drawing Standard
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {returnPolicy.itemConditionLabel || "Certified Bespoke Architectural Deliverables (NewCondition)"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Tax Invoice
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">
                        {returnPolicy.taxInvoiceLabel || "Official Architectural GST Invoice (SAC 998717) with ITC"}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 pr-4 text-xs uppercase tracking-[0.15em] text-[var(--muted-2)] font-medium">
                        Practice Leadership
                      </th>
                      <td className="py-3.5 pl-4 text-[var(--foreground)] font-serif font-bold">
                        {shipping.fulfillmentBy || "ARC 11 ARCHITECT Direct Studio Operations"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Interactive Work Request / Atelier Commission Desk */}
          <div className="mt-16">
            <ServiceWorkRequestForm listing={listing} />
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
