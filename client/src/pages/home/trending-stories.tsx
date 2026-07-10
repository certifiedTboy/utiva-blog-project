import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { POSTS } from "@/lib/mock-data";
import PostCard from "@/pages/blogs/post-card";

const trendingPosts = [...POSTS]
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 5);

export default function TrendingStories() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Trending Now
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
