"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import type { ArchitecturalProduct } from "@/lib/products";
import { BUSINESS_PHONE_PRIMARY } from "@/lib/seo";

interface ProductDetailViewProps {
  product: ArchitecturalProduct;
  allProducts?: ArchitecturalProduct[];
}

export default function ProductDetailView({ product, allProducts = [] }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.heroImage);

  const cleanPhone = BUSINESS_PHONE_PRIMARY.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Arc 11 Architect, I am inquiring regarding "${product.title}" (SKU: ${product.sku}). Please share details.`
  )}`;

  return (
    <div className="space-y-12">
      {/* Product Hero Card */}
      <div className="card p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Gallery Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[#171614] shadow-2xl">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-cover transition-all duration-500 ease-out"
                priority
                unoptimized
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[var(--accent)] border border-[var(--line)]">
                  {product.category}
                </span>
                <span className="rounded-full bg-emerald-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-emerald-300 border border-emerald-800/40">
                  In Stock • Commission Ready
                </span>
              </div>
            </div>

            {/* Thumbnail Selector */}
            {product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {product.gallery.map((img, idx) => {
                  const isSelected = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border transition-all ${
                        isSelected
                          ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/40 scale-[1.02]"
                          : "border-[var(--line)] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Meta Catalog Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--line)] text-xs text-[var(--muted-2)]">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[var(--foreground)]/50">SKU / Item ID</span>
                <span className="font-mono font-medium text-[var(--foreground)]">{product.sku}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[var(--foreground)]/50">Brand</span>
                <span className="font-medium text-[var(--foreground)]">{product.brand}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[var(--foreground)]/50">Condition</span>
                <span className="font-medium text-[var(--foreground)]">Certified New</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[var(--foreground)]/50">Availability</span>
                <span className="text-emerald-400 font-medium">In Stock</span>
              </div>
            </div>
          </div>

          {/* Details Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <p className="kicker">Official Studio Catalog Item</p>
              <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--foreground)] leading-tight">
                {product.title}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif text-[var(--accent)]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs uppercase tracking-widest text-[var(--muted-2)]">
                  Inclusive of Preliminary Spatial Dossier & GFC Sets
                </span>
              </div>

              <p className="mt-5 text-sm sm:text-base text-[var(--foreground)]/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[var(--line)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StartProjectTrigger
                  className="button-primary justify-center text-center w-full py-3.5 text-sm"
                  source={`product_page_${product.slug}`}
                >
                  Book Commission
                </StartProjectTrigger>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-600/40 bg-emerald-950/30 px-5 py-3.5 text-sm font-medium text-emerald-300 hover:bg-emerald-900/40 transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824z" />
                  </svg>
                  Direct WhatsApp
                </a>
              </div>

              <Link
                href="/estimator"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-xs uppercase tracking-wider text-[var(--foreground)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                Launch Instant Cost Estimator
              </Link>
            </div>

            {/* Quick Delivery & Compliance Notice */}
            <div className="rounded-lg bg-[var(--surface)] p-4 border border-[var(--line)] text-xs text-[var(--muted-2)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--foreground)] font-medium">
                <svg className="h-4 w-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Tracked Hardcopy Drawing Book Courier</span>
              </div>
              <p>
                Each commission includes hardbound archival A1/A3 drawing sets couriered directly to the project site, plus an encrypted digital BIM cloud repository.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Deliverables & Specifications Breakdown */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Deliverables */}
        <div className="card p-8">
          <p className="kicker">Scope & Milestones</p>
          <h2 className="mt-2 text-2xl font-serif">Comprehensive Deliverables</h2>
          <ul className="mt-6 space-y-3.5">
            {product.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--foreground)]/85">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specifications */}
        <div className="card p-8">
          <p className="kicker">Standard of Excellence</p>
          <h2 className="mt-2 text-2xl font-serif">Technical Specifications</h2>
          <div className="mt-6 divide-y divide-[var(--line)]">
            {Object.entries(product.specifications).map(([key, val], i) => (
              <div key={i} className="py-2.5 flex justify-between gap-4 text-xs sm:text-sm">
                <span className="text-[var(--muted-2)] font-medium">{key}</span>
                <span className="text-[var(--foreground)] text-right font-serif">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping & Return Policy Section (Critical for Meta Commerce Compliance) */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-base text-[var(--foreground)]">Shipping & Transit Protocol</h3>
              <p className="text-xs text-[var(--muted-2)]">{product.shippingDetails.areaServed}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--foreground)]/80 leading-relaxed">
            {product.shippingDetails.description}. Dispatch within {product.shippingDetails.handlingDays}, transit delivery within {product.shippingDetails.transitDays}. Shipping fee: {product.shippingDetails.rate}.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-base text-[var(--foreground)]">Consultation & Revision Assurance</h3>
              <p className="text-xs text-[var(--muted-2)]">{product.returnPolicy.returnDays} Days Review Window</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--foreground)]/80 leading-relaxed">
            {product.returnPolicy.description} Official Architectural GST Invoice (SAC 998717) provided with full Input Tax Credit (ITC) eligibility.
          </p>
        </div>
      </div>

      {/* Catalog Carousel / Related Packages */}
      {allProducts.length > 1 && (
        <div className="pt-8 border-t border-[var(--line)]">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="kicker">Studio Collection</p>
              <h2 className="mt-1 text-2xl font-serif">Explore Architectural Packages</h2>
            </div>
            <Link
              href="/product"
              className="text-xs uppercase tracking-widest text-[var(--accent)] hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="card p-5 group hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4 bg-black/40">
                      <Image
                        src={item.heroImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-medium">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-serif text-base text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between">
                    <span className="text-sm font-serif text-[var(--foreground)]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[var(--muted-2)] group-hover:text-[var(--foreground)] transition-colors">
                      Details →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
