import { useState } from "react";
import { motion } from "framer-motion";
import { REACTIONS_DATA } from "@/lib/mock-data";

import { useToast } from "@/hooks/use-toast";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "clap", emoji: "👏", label: "Clap" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "wow", emoji: "😮", label: "Wow" },
];

export default function ReactionsPanel({
  postId,
  userSignedIn,
}: {
  postId: number;
  userSignedIn: boolean;
}) {
  const [reactions, setReactions] = useState(() => ({
    ...REACTIONS_DATA[postId],
  }));
  const { toast } = useToast();

  function handleReact(type: string) {
    if (!userSignedIn) {
      toast({ title: "Sign in to react" });
      return;
    }
    setReactions((prev) => {
      const wasActive = prev.userReaction === type;
      const counts = { ...prev.counts };
      if (wasActive) {
        counts[type] = Math.max(0, (counts[type] || 0) - 1);
        return { counts, userReaction: null };
      } else {
        if (prev.userReaction)
          counts[prev.userReaction] = Math.max(
            0,
            (counts[prev.userReaction] || 0) - 1,
          );
        counts[type] = (counts[type] || 0) + 1;
        return { counts, userReaction: type };
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 my-8 p-4 bg-card border border-card-border rounded-xl"
    >
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Reactions
      </span>
      {REACTIONS.map(({ type, emoji, label }) => {
        const count = reactions.counts?.[type] ?? 0;
        const isActive = reactions.userReaction === type;
        return (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleReact(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all border ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40 text-foreground"}`}
            data-testid={`button-react-${type}`}
          >
            <span>{emoji}</span>
            <span className="font-medium">{count > 0 ? count : label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
