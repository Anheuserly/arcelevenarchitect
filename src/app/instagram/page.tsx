// app/instagram/page.tsx
"use client";

import { useState, useEffect } from "react";

interface InstaPost {
  id: string;
  imageUrl: string;
  caption: string;
  link: string;
}

export default function InstagramPage() {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // TODO: Replace this with real Instagram API or backend fetch
        const dummyPosts: InstaPost[] = [
          {
            id: "1",
            imageUrl: "/insta1.jpg",
            caption: "Modern architecture design inspiration.",
            link: "https://www.instagram.com/p/1",
          },
          {
            id: "2",
            imageUrl: "/insta2.jpg",
            caption: "Creative interior ideas for your home.",
            link: "https://www.instagram.com/p/2",
          },
          {
            id: "3",
            imageUrl: "/insta3.jpg",
            caption: "Sustainable construction practices.",
            link: "https://www.instagram.com/p/3",
          },
          {
            id: "4",
            imageUrl: "/insta4.jpg",
            caption: "Innovative building solutions.",
            link: "https://www.instagram.com/p/4",
          },
          {
            id: "5",
            imageUrl: "/insta5.jpg",
            caption: "Architectural detailing and materials.",
            link: "https://www.instagram.com/p/5",
          },
        ];

        setPosts(dummyPosts);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Instagram Feed</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our latest architecture projects, interior designs, and creative inspirations.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/shashank_saini/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors duration-300"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
