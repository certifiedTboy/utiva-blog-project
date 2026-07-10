import { motion } from "framer-motion";
import { Link } from "wouter";
import { CATEGORIES } from "@/lib/mock-data";

export default function Categories() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">
          Browse by Topic
        </h2>
        <p className="text-muted-foreground">
          Find the stories that matter to you
        </p>
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
                <div className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {cat.postCount} articles
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
