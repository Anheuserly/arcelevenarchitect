import "server-only";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "PROFILE";

export type InstagramFeedItem = {
  caption?: string;
  id: string;
  mediaType: InstagramMediaType;
  permalink: string;
  timestamp?: string;
};

export type InstagramFeedResult = {
  handle: string;
  items: InstagramFeedItem[];
  mode: "graph" | "manual" | "scraped" | "profile-only";
  profileUrl: string;
  sourceLabel: string;
};

export const INSTAGRAM_HANDLE = "arc11architect";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const GRAPH_VERSION = process.env.INSTAGRAM_GRAPH_VERSION || "v23.0";
const GRAPH_ACCESS_TOKEN =
  process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || process.env.META_INSTAGRAM_ACCESS_TOKEN || "";
const GRAPH_USER_ID =
  process.env.INSTAGRAM_USER_ID || process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "";
const MANUAL_FEED_URLS =
  process.env.INSTAGRAM_FEED_URLS || process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URLS || "";
const FEED_LIMIT = 24;

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function normalizePermalink(raw: string) {
  const trimmed = raw.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    const pathname = url.pathname.replace(/\/+$/, "");

    if (!/^\/(p|reel|tv)\//.test(pathname)) {
      return null;
    }

    return `https://www.instagram.com${pathname}/`;
  } catch {
    const path = trimmed.replace(/^https?:\/\/www\.instagram\.com/i, "");

    if (!/^\/?(p|reel|tv)\//.test(path)) {
      return null;
    }

    return `https://www.instagram.com/${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  }
}

function createFeedItems(urls: string[], mode: InstagramFeedResult["mode"], label: string) {
  const items = Array.from(new Set(urls.map(normalizePermalink).filter(isDefined))).map(
    (permalink, index) => {
      const mediaType: InstagramMediaType =
        permalink.includes("/reel/") || permalink.includes("/tv/") ? "VIDEO" : "IMAGE";

      return {
        id: `${mode}-${index + 1}`,
        mediaType,
        permalink,
      };
    },
  );

  return {
    handle: INSTAGRAM_HANDLE,
    items,
    mode,
    profileUrl: INSTAGRAM_PROFILE_URL,
    sourceLabel: label,
  } satisfies InstagramFeedResult;
}

function parseManualUrls() {
  if (!MANUAL_FEED_URLS.trim()) {
    return [];
  }

  return MANUAL_FEED_URLS
    .split(/[\n,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function extractPermalinksFromHtml(html: string) {
  const matches = new Set<string>();

  const hrefPattern = /href="\/((?:p|reel|tv)\/[^"\/?#]+)\/?"/g;
  for (const match of html.matchAll(hrefPattern)) {
    matches.add(`https://www.instagram.com/${match[1].replace(/\/+$/, "")}/`);
  }

  const escapedPattern = /https:\\\/\\\/www\.instagram\.com\\\/((?:p|reel|tv)\\\/[^"\\\/?#]+)\\\/?/g;
  for (const match of html.matchAll(escapedPattern)) {
    matches.add(`https://www.instagram.com/${match[1].replace(/\\\/+/g, "/")}/`);
  }

  return Array.from(matches).slice(0, FEED_LIMIT);
}

async function getGraphFeed(): Promise<InstagramFeedResult | null> {
  if (!GRAPH_ACCESS_TOKEN || !GRAPH_USER_ID) {
    return null;
  }

  const params = new URLSearchParams({
    access_token: GRAPH_ACCESS_TOKEN,
    fields: "id,caption,media_type,permalink,timestamp",
    limit: String(FEED_LIMIT),
  });

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${GRAPH_USER_ID}/media?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      data?: Array<{
        caption?: string;
        id: string;
        media_type?: InstagramMediaType;
        permalink?: string;
        timestamp?: string;
      }>;
    };

    const items = (payload.data || [])
      .filter((item) => item.permalink)
      .map((item) => ({
        caption: item.caption,
        id: item.id,
        mediaType: item.media_type || "IMAGE",
        permalink: item.permalink || "",
        timestamp: item.timestamp,
      }))
      .filter((item) => Boolean(item.permalink));

    if (!items.length) {
      return null;
    }

    return {
      handle: INSTAGRAM_HANDLE,
      items,
      mode: "graph",
      profileUrl: INSTAGRAM_PROFILE_URL,
      sourceLabel: "Connected Instagram feed",
    };
  } catch {
    return null;
  }
}

async function getScrapedFeed(): Promise<InstagramFeedResult | null> {
  try {
    const response = await fetch(INSTAGRAM_PROFILE_URL, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const urls = extractPermalinksFromHtml(html);

    if (!urls.length) {
      return null;
    }

    return createFeedItems(urls, "scraped", "Public Instagram sync");
  } catch {
    return null;
  }
}

export async function getInstagramFeed(): Promise<InstagramFeedResult> {
  const graphFeed = await getGraphFeed();
  if (graphFeed) {
    return graphFeed;
  }

  const manualUrls = parseManualUrls();
  if (manualUrls.length) {
    return createFeedItems(manualUrls, "manual", "Curated Instagram embeds");
  }

  const scrapedFeed = await getScrapedFeed();
  if (scrapedFeed) {
    return scrapedFeed;
  }

  return {
    handle: INSTAGRAM_HANDLE,
    items: [],
    mode: "profile-only",
    profileUrl: INSTAGRAM_PROFILE_URL,
    sourceLabel: "Instagram profile",
  };
}
