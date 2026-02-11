"use client";

import { useMemo, useState } from "react";

type JournalPost = {
  title: string;
  tag: string;
  date: string;
  excerpt: string;
};

type JournalFeedProps = {
  posts: JournalPost[];
};

export default function JournalFeed({ posts }: JournalFeedProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    const unique = new Set(posts.map((post) => post.tag).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const tagMatch = activeTag === "All" || post.tag === activeTag;
      const q = query.trim().toLowerCase();
      const queryMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tag.toLowerCase().includes(q);
      return tagMatch && queryMatch;
    });
  }, [posts, query, activeTag]);

  const featured = filtered[0];
  const gridPosts = filtered.slice(1);

  return (
    <div>
      <div className="card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journal posts"
            className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none lg:max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${
                  activeTag === tag
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                    : "border-[var(--line)]"
                }`}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {featured ? (
        <article className="card mt-6 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Featured</p>
          <h2 className="mt-3 text-3xl">{featured.title}</h2>
          <p className="mt-3 text-sm">{featured.excerpt}</p>
          <div className="mt-4 flex gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
            <span>{featured.tag}</span>
            <span>•</span>
            <span>{featured.date}</span>
          </div>
        </article>
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gridPosts.map((post) => (
          <article key={`${post.title}-${post.date}`} className="card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">{post.tag}</p>
            <h3 className="mt-3 text-xl">{post.title}</h3>
            <p className="mt-3 text-sm">{post.excerpt}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">{post.date}</p>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-6 p-6 text-sm text-[var(--muted)]">No posts match this filter.</div>
      ) : null}
    </div>
  );
}
