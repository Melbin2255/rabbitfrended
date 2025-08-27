"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedditPosts = async () => {
      try {
        const response = await fetch("/api/reddit");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-neutral-950 to-neutral-900">
        <h2 className="text-2xl font-semibold text-gray-300 animate-pulse">
          Loading feed....
        </h2>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-neutral-950 to-neutral-900">
        <h2 className="text-2xl font-semibold text-red-400">
          Error loading Reddit feed. Please check your backend or Vercel deployment.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 p-10">
      {/* Header */}
      <motion.h1
        className="text-5xl font-bold mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 tracking-tight"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Reddit — <span className="font-light text-gray-400">r/reactjs</span>
      </motion.h1>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 flex flex-col justify-between hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-gray-600 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Title */}
            <h2 className="text-lg font-semibold mb-3 text-gray-200 group-hover:text-gray-50 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>

            {/* Post Body */}
            {post.selftext && (
              <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                {post.selftext}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors"
              >
                View Post <ExternalLink size={16} />
              </a>
              <span className="ml-4 bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                Score: {post.score}
              </span>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.link_flair_text && (
                <span className="bg-gradient-to-r from-teal-500/20 to-teal-400/10 text-teal-300 px-3 py-1 rounded-full text-xs font-medium">
                  {post.link_flair_text}
                </span>
              )}
              {post.author && (
                <span className="bg-white/10 text-gray-400 px-3 py-1 rounded-full text-xs font-medium">
                  By {post.author}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
