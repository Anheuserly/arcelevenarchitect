import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductDetailView from "@/components/ProductDetailView";
import {
  ARC11_PRODUCTS,
  getProducts,
  getProductByIdOrSlug,
  generateFacebookProductJsonLd,
} from "@/lib/products";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ARC11_PRODUCTS.flatMap((p) => [
    { id: p.slug },
    { id: p.id },
  ]);
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    return {
      title: `Product Not Found | ${SITE_NAME}`,
      description: "The requested architectural package could not be found.",
    };
  }

  const pageTitle = `${product.title} | ${SITE_NAME}`;
  const pageDescription = product.description;
  const pageUrl = `${SITE_URL}/product/${product.slug}`;
  const shareImage = absoluteUrl(product.heroImage);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/product/${product.slug}`,
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
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [shareImage],
    },
    // Meta / Facebook Commerce Catalog scraper microdata tags
    other: {
      "product:brand": product.brand,
      "product:availability": "in stock",
      "product:condition": "new",
      "product:price:amount": product.price.toFixed(2),
      "product:price:currency": product.currency,
      "product:retailer_item_id": product.sku,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const jsonLd = generateFacebookProductJsonLd(product);

  return (
    <div className="bg-[var(--background)] min-h-screen flex flex-col">
      <SiteHeader />

      {/* Meta Commerce & Google Rich Results Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <Link href="/product" className="hover:text-[var(--foreground)] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="truncate max-w-[280px] text-[var(--foreground)] font-medium">
              {product.title}
            </span>
          </nav>

          {/* Product Detail Showcase */}
          <ProductDetailView product={product} allProducts={allProducts} />

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
