// app/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // TODO: Replace with your Appwrite API or CMS fetch
        const dummyPosts: BlogPost[] = [
          {
            id: "1",
            title: "Modern Residential Architecture Trends",
            excerpt: "Explore the latest trends in modern residential architecture for 2025.",
            slug: "/blog/modern-residential-architecture",
            date: "2025-09-01",
            image: "/blog1.jpg",
          },
          {
            id: "2",
            title: "Creative Interior Design Ideas",
            excerpt: "Learn how to transform your interiors with modern and functional designs.",
            slug: "/blog/creative-interior-design",
            date: "2025-08-25",
            image: "/blog2.jpg",
          },
          {
            id: "3",
            title: "Sustainable Architecture Practices",
            excerpt: "Tips and examples of eco-friendly and sustainable architecture solutions.",
            slug: "/blog/sustainable-architecture",
            date: "2025-08-20",
            image: "/blog3.jpg",
          },
        ];

        setPosts(dummyPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Blog</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and inspiration on modern architecture, interior design, and construction.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h2>
                <p className="mt-3 text-gray-600">{post.excerpt}</p>
                <Link
                  href={post.slug}
                  className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-300">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
