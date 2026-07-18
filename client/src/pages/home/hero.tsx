import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
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
            <Sparkles className="w-3 h-3" /> Discover essays, tutorials, and
            stories that make you think.
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

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/blog" className="cursor-pointer">
              <Button
                size="lg"
                className="gap-2 text-base px-8 cursor-pointer"
                data-testid="button-explore-blog"
              >
                <BookOpen className="w-5 h-5" /> Explore Blog
              </Button>
            </Link>
            {/* <Link href="/write">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-8"
                data-testid="button-start-writing"
              >
                Start Writing <ArrowRight className="w-5 h-5" />
              </Button>
            </Link> */}
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="mt-20 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-8">
            {[
              ["5+", "Articles"],
              ["4+", "Authors"],
              ["5+", "Topics"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-2xl font-semibold text-foreground">
                  {num}
                </div>
                <div className="text-xs uppercase tracking-wider mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
