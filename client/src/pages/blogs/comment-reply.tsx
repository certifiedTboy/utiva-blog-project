import { motion } from "framer-motion";
import { Interweave } from "interweave";
import { marked } from "marked";
import { transform } from "./transform";

type Replies = {
  _id: number | string;
  content: string;
  authorAvatar?: string;
  authorName: string;
  createdAt: string;
  depth?: number;
};

export default function CommentReply(replies: Replies) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        replies?.depth && replies?.depth > 0
          ? "ml-8 border-l-2 border-border pl-4"
          : ""
      }
    >
      <div className="flex gap-3 py-4">
        <div className="flex-shrink-0">
          {replies?.authorAvatar ? (
            <img
              src={replies?.authorAvatar}
              alt={replies?.authorName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {replies?.authorName?.[0]}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">
              {replies?.authorName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(replies?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <Interweave
              content={marked.parse(replies?.content || "") as string}
              transform={transform}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
