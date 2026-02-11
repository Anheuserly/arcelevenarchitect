import type { Metadata } from "next";
import JournalFeed from "@/components/journal/JournalFeed";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { listDocumentsServer } from "@/lib/appwriteServer";

type JournalPost = {
  title: string;
  tag: string;
  date: string;
  excerpt: string;
};

const fallbackPosts: JournalPost[] = [
  {
    title: "Materiality: limestone, lime plaster, and warm metals",
    tag: "Materiality",
    date: "Jan 2026",
    excerpt:
      "How to build depth without excess—layering tactile finishes and subtle light.",
  },
  {
    title: "Designing for monsoon climates",
    tag: "Climate",
    date: "Dec 2025",
    excerpt: "Shading, drainage, and ventilation strategies for resilient homes.",
  },
  {
    title: "Small homes, generous living",
    tag: "Residential",
    date: "Nov 2025",
    excerpt: "Layout techniques that make 2BHK spaces feel open and calm.",
  },
  {
    title: "The quiet power of daylight",
    tag: "Lighting",
    date: "Oct 2025",
    excerpt: "Daylight choreography that shapes mood and reduces energy loads.",
  },
  {
    title: "Crafting modern classical",
    tag: "Design",
    date: "Sep 2025",
    excerpt: "Balancing timeless proportion with contemporary detailing.",
  },
  {
    title: "Studio tools: CAD to BIM",
    tag: "Process",
    date: "Aug 2025",
    excerpt: "How we coordinate design intent across disciplines and vendors.",
  },
];

export default async function JournalPage() {
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID;
  let posts = fallbackPosts;

  if (collectionId) {
    try {
      const documents = await listDocumentsServer<JournalPost>({
        collectionId,
        limit: 9,
      });
      if (documents.length > 0) {
        posts = documents;
      }
    } catch {
      posts = fallbackPosts;
    }
  }

  return (
    <div className="bg-[var(--background)]">
      <SiteHeader />
      <main className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker">Journal</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">Studio notes and social posts.</h1>
          <p className="mt-6 max-w-2xl text-lg">
            A curated archive of design thinking, material studies, and project insights.
          </p>
          <div className="mt-12">
            <JournalFeed posts={posts} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Journal | Arc 11 Architect",
  description:
    "Studio journal featuring architecture notes, design thinking, project insights, and material studies.",
  keywords: [
    "architecture journal",
    "arc 11 architect blog",
    "design insights",
    "interior architecture articles",
    "studio notes",
  ],
};
