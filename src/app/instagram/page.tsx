import Link from "next/link";
import InstagramEmbedWall from "@/components/InstagramEmbedWall";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartProjectTrigger from "@/components/StartProjectTrigger";
import {
  INSTAGRAM_PROFILE_URL,
  getInstagramFeed,
} from "@/lib/instagram";
import { SITE_URL, buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Instagram Feed, Posts and Reels",
  description:
    "Explore Arc 11 Architect's Instagram feed through integrated post and reel embeds, social updates, and live visual content from the studio.",
  path: "/instagram",
  images: [
    {
      url: "/brand/geometry-study.jpeg",
      alt: "Arc 11 Architect Instagram feed",
    },
  ],
  keywords: [
    "Arc 11 Architect Instagram",
    "architecture instagram feed",
    "interior design social posts",
    "architecture reels India",
    "design studio instagram wall",
  ],
});

export default async function InstagramPage() {
  const feed = await getInstagramFeed();

  const socialSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Arc 11 Architect Instagram Feed",
    description:
      "Instagram posts and reels by Arc 11 Architect, visible inside the studio website.",
    url: `${SITE_URL}/instagram`,
    sameAs: [INSTAGRAM_PROFILE_URL],
    mainEntity: {
      "@type": "ProfilePage",
      name: "@arc11architect on Instagram",
      url: INSTAGRAM_PROFILE_URL,
    },
    hasPart: feed.items.map((item, index) => ({
      "@type": "SocialMediaPosting",
      position: index + 1,
      url: item.permalink,
    })),
  };

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(socialSchema) }}
          />

          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="card p-8 lg:p-10">
              <p className="kicker">Social Channel</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl">
                Studio posts, reels, and visual updates from Instagram.
              </h1>
              <p className="mt-5 max-w-2xl text-base">
                This page brings Arc 11 Architect&apos;s Instagram presence into the website so
                visitors can browse the studio&apos;s social imagery, short videos, and visual
                studies without leaving the site.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  className="button-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Instagram Profile
                </a>
                <Link href="/journal" className="button-secondary">
                  Visit Journal
                </Link>
                <StartProjectTrigger className="button-secondary" source="instagram_page">
                  Start a Project
                </StartProjectTrigger>
              </div>
            </div>

            <div className="subtle-card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                Channel Notes
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="border-b border-[var(--line)] pb-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Handle
                  </p>
                  <p className="mt-2">@{feed.handle}</p>
                </div>
                <div className="border-b border-[var(--line)] pb-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Visible Items
                  </p>
                  <p className="mt-2">{feed.items.length || 1}</p>
                </div>
                <div className="border-b border-[var(--line)] pb-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Feed Source
                  </p>
                  <p className="mt-2">{feed.sourceLabel}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                    Format
                  </p>
                  <p className="mt-2">Official Instagram embeds for posts, reels, and profile view.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <InstagramEmbedWall
              handle={feed.handle}
              items={feed.items}
              profileUrl={feed.profileUrl}
              sourceLabel={feed.sourceLabel}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
