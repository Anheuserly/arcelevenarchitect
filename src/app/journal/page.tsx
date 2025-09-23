// app/journal/page.tsx
"use client";

import { useState, useEffect } from "react";
import { databases, COLLECTIONS, DATABASE_ID } from "../../lib/appwrite";
import Link from "next/link";

export default function JournalPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.JOURNAL
        );
        setEntries(response.documents);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Journal
        </h1>

        {entries.length === 0 ? (
          <p className="text-center text-gray-500">
            No journal entries available yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <div
                key={entry.$id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {entry.title}
                </h2>

                {/* optional summary/preview if you added that attribute */}
                {entry.summary && (
                  <p className="text-gray-600 mb-4">{entry.summary}</p>
                )}

                <p className="text-sm text-gray-400 mb-4">
                  {new Date(entry.$createdAt).toLocaleDateString()}
                </p>

                <Link
                  href={`/journal/${entry.$id}`}
                  className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Read More &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
