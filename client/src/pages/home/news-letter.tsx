import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Stay in the loop
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the best stories delivered to your inbox, every week.
          </p>
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
