"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type InstagramEmbedItem = {
  id: string;
  mediaType: string;
  permalink: string;
  timestamp?: string;
};

type InstagramEmbedWallProps = {
  handle: string;
  items: InstagramEmbedItem[];
  profileUrl: string;
  sourceLabel: string;
};

function formatDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function InstagramEmbedWall({
  handle,
  items,
  profileUrl,
  sourceLabel,
}: InstagramEmbedWallProps) {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, [items, profileUrl]);

  return (
    <div className="instagram-feed-shell">
      <Script
        id="instagram-embed-script"
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => window.instgrm?.Embeds?.process()}
      />

      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="card p-8 lg:p-10">
          <p className="kicker">Instagram Feed</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">@{handle}</h2>
          <p className="mt-4 max-w-xl text-sm">
            A live social wall for Arc 11 Architect, bringing recent posts, reels, and visual
            studies into one place inside the website.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="tag-pill">{items.length || 1} visible embeds</span>
            <span className="tag-pill">{sourceLabel}</span>
            <span className="tag-pill">Posts + reels</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profileUrl}
              className="button-primary"
              target="_blank"
              rel="noreferrer"
            >
              Open Instagram
            </a>
            <a
              href={`${profileUrl}?utm_source=website`}
              className="button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Follow Profile
            </a>
          </div>
        </div>

        <div className="card p-4 sm:p-5">
          <div className="instagram-profile-shell">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={profileUrl}
              data-instgrm-version="14"
            >
              <a href={profileUrl} target="_blank" rel="noreferrer">
                View @{handle} on Instagram
              </a>
            </blockquote>
          </div>
        </div>
      </div>

      {items.length ? (
        <div className="instagram-wall-grid mt-8">
          {items.map((item) => {
            const dateLabel = formatDate(item.timestamp);

            return (
              <article key={item.id} className="instagram-embed-card">
                <div className="instagram-embed-topline">
                  <span>{item.mediaType === "VIDEO" ? "Reel" : "Post"}</span>
                  {dateLabel ? <span>{dateLabel}</span> : null}
                </div>
                <div className="instagram-embed-shell">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={item.permalink}
                    data-instgrm-version="14"
                  >
                    <a href={item.permalink} target="_blank" rel="noreferrer">
                      View this {item.mediaType === "VIDEO" ? "reel" : "post"} on Instagram
                    </a>
                  </blockquote>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card mt-8 p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            Feed Connection
          </p>
          <h3 className="mt-4 text-3xl">Profile view is ready. Full post wall is prepared.</h3>
          <p className="mt-4 max-w-3xl text-sm">
            The page is set up to show official Instagram post and reel embeds as soon as the
            feed is available through public profile sync, a connected Meta feed, or curated
            public post links. Until then, the profile preview above stays visible.
          </p>
        </div>
      )}
    </div>
  );
}
