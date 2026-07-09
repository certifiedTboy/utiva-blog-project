import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { POSTS, CATEGORIES } from "@/lib/mock-data";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";

const featuredPosts = POSTS.filter(p => p.featured);
const trendingPosts = [...POSTS].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-amber-50/30 dark:to-amber-950/10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-3 h-3" /> A place for thoughtful writing
          </motion.span>

          <motion.h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Ideas worth
            <br />
            <span className="text-primary italic">reading</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Inkwell is where thoughtful writers share ideas with curious readers.
            Discover essays, tutorials, and stories that make you think.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/blog">
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-explore-blog">
                <BookOpen className="w-5 h-5" /> Explore Blog
              </Button>
            </Link>
            <Link href="/write">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8" data-testid="button-start-writing">
                Start Writing <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-8">
            {[["5+", "Articles"], ["4+", "Authors"], ["5+", "Topics"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-2xl font-semibold text-foreground">{num}</div>
                <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h2 className="font-serif text-3xl font-semibold text-foreground">Featured Stories</h2>
          <p className="text-muted-foreground mt-1">Handpicked articles from our editors</p>
        </div>
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 hidden sm:flex" data-testid="link-view-all-featured">
            View all <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} variant="featured" />
        ))}
      </div>
    </section>
  );
}

function TrendingSection() {
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
          <h2 className="font-serif text-2xl font-semibold text-foreground">Trending Now</h2>
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

function CategoriesSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">Browse by Topic</h2>
        <p className="text-muted-foreground">Find the stories that matter to you</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/blog?category=${cat.name}`}>
              <div
                className="group p-6 bg-card border border-card-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                data-testid={`card-category-${cat.id}`}
              >
                <div className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{cat.postCount} articles</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">Stay in the loop</h2>
          <p className="text-muted-foreground mb-8">Get the best stories delivered to your inbox, every week.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="input-newsletter-email"
            />
            <Button data-testid="button-newsletter-subscribe">Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TrendingSection />
      <CategoriesSection />
      <NewsletterSection />
    </div>
  );
}
