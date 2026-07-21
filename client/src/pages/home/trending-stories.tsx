import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { usePosts } from "@/features/context/post-context";
import PostCard from "@/pages/blogs/post-card";
import PostCardSkeleton from "./post-card-skeleton";

export default function TrendingStories() {
  const { trendingPosts, isLoading } = usePosts();
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} variant="compact" />
              ))
            : trendingPosts.map((post, i) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={i}
                  variant="compact"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
