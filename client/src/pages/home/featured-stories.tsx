import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { usePosts } from "@/features/context/post-context";
import PostCard from "@/pages/blogs/post-card";
import { Button } from "@/components/ui/button";

export default function FeaturedStories() {
  const { featuredPosts } = usePosts();
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            Featured Stories
          </h2>
          <p className="text-muted-foreground mt-1">
            Handpicked articles from our editors
          </p>
        </div>
        <Link href="/blogs">
          <Button
            variant="ghost"
            className="gap-2 hidden sm:flex"
            data-testid="link-view-all-featured"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} variant="featured" />
        ))}
      </div>
    </section>
  );
}
