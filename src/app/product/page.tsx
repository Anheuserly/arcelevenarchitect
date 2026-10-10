import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductDetailView from "@/components/ProductDetailView";
import {
  getProducts,
  getProductByIdOrSlug,
  generateFacebookProductJsonLd,
  type ArchitecturalProduct,
} from "@/lib/products";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

type ProductPageProps = {
  searchParams: Promise<{ id?: string; sku?: string; slug?: string }>;
};

export async function generateMetadata({ searchParams }: ProductPageProps): Promise<Metadata> {
  const { id, sku, slug } = await searchParams;
  const targetId = id || sku || slug;
  const products = await getProducts();
  const product = targetId ? await getProductByIdOrSlug(targetId) : products[0];

  const currentProduct = product || products[0];
  const pageTitle = `${currentProduct.title} | ${SITE_NAME}`;
  const pageDescription = currentProduct.description;
  const pageUrl = `${SITE_URL}/product${currentProduct.slug ? `?slug=${currentProduct.slug}` : ""}`;
  const shareImage = absoluteUrl(currentProduct.heroImage);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "/product",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: currentProduct.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [shareImage],
    },
    // Meta / Facebook Commerce Scraper microdata tags
    other: {
      "product:brand": currentProduct.brand,
      "product:availability": "in stock",
      "product:condition": "new",
      "product:price:amount": currentProduct.price.toFixed(2),
      "product:price:currency": currentProduct.currency,
      "product:retailer_item_id": currentProduct.sku,
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { id, sku, slug } = await searchParams;
  const targetKey = id || sku || slug;
  const products = await getProducts();

  let activeProduct: ArchitecturalProduct = products[0];
  if (targetKey) {
    const found = await getProductByIdOrSlug(targetKey);
    if (found) {
      activeProduct = found;
    }
  }

  const jsonLd = generateFacebookProductJsonLd(activeProduct);
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Arc 11 Architect Products & Architectural Packages",
    "description": "Exclusive architectural design packages, interior detailing, and BIM coordination services by Arc 11 Architect.",
    "itemListElement": products.map((prod, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateFacebookProductJsonLd(prod),
    })),
  };

  return (
    <div className="bg-[var(--background)] min-h-screen flex flex-col">
      <SiteHeader />

      {/* Meta Commerce & Google Search Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />

      <main className="section-padding flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
              Studio
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[var(--foreground)] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)]">Product</span>
            <span>/</span>
            <span className="truncate max-w-[280px] text-[var(--foreground)] font-medium">
              {activeProduct.title}
            </span>
          </nav>

          {/* Product Detail Showcase */}
          <ProductDetailView product={activeProduct} allProducts={products} />

          {/* Full Catalog Grid */}
          <section className="mt-20 pt-16 border-t border-[var(--line)]">
            <div className="max-w-3xl mb-10">
              <p className="kicker">Catalog & Commissions</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif">
                Complete Architectural Product Portfolio
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--foreground)]/80 leading-relaxed">
                Explore our full suite of residential architecture, luxury interiors, BIM coordination, and site oversight packages. Every commission is governed by strict drawing compliance, clear revision cycles, and complimentary physical master drawing courier to site.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((item) => {
                const isSelected = item.id === activeProduct.id;
                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className={`card p-6 flex flex-col justify-between transition-all group ${
                      isSelected
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/40 bg-[var(--surface-hover)]"
                        : "hover:border-[var(--line-strong)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[var(--muted-2)] mb-3">
                        <span className="font-mono text-[11px]">{item.sku}</span>
                        <span className="text-emerald-400 font-medium">In Stock</span>
                      </div>
                      <h3 className="font-serif text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-xs text-[var(--foreground)]/70 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[var(--muted-2)]">
                          Retainer / Package
                        </span>
                        <span className="text-lg font-serif text-[var(--accent)]">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-wider font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        View Item →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
