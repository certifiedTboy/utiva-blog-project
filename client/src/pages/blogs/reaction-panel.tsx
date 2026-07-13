import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useReactToPostsMutation,
  useGetReactionsToPostMutation,
} from "@/features/apis/post-apis";
import { REACTIONS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/features/context/auth-context";

export default function ReactionsPanel({
  postId,
  userSignedIn,
}: {
  postId: any;
  userSignedIn: boolean;
}) {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<{
    counts: Record<string, number>;
    userReaction: string | null;
  }>({
    counts: {},
    userReaction: null,
  });
  const { toast } = useToast();

  const [reactToPosts] = useReactToPostsMutation();
  const [getReactions, { data, isSuccess }] = useGetReactionsToPostMutation();

  useEffect(() => {
    if (postId) {
      getReactions(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (isSuccess && data) {
      const reactionData: any[] = data?.data || [];
      const newCounts: Record<string, number> = {};
      let newUserReaction: string | null = null;

      for (const reaction of reactionData) {
        newCounts[reaction.type] = (newCounts[reaction.type] || 0) + 1;
        if (user && reaction.author === user.id) {
          newUserReaction = reaction.type;
        }
      }

      setReactions({
        counts: newCounts,
        userReaction: newUserReaction,
      });
    }
  }, [isSuccess, data, user]);

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

    reactToPosts({ postId, type });
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
