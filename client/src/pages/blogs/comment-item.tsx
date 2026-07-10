import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Comment = {
  id: number;
  postId: number;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  parentId?: number;
  replies: Comment[];
};

export default function CommentItem({
  comment,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  onReply: (parentId: number, text: string) => void;
  depth?: number;
}) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { isSignedIn } = useAuth();

  function submitReply() {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setReplying(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={depth > 0 ? "ml-8 border-l-2 border-border pl-4" : ""}
    >
      <div className="flex gap-3 py-4">
        <div className="flex-shrink-0">
          {comment.authorAvatar ? (
            <img
              src={comment.authorAvatar}
              alt={comment.authorName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {comment.authorName?.[0]}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">
              {comment.authorName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comment.content}
          </p>
          {isSignedIn && depth === 0 && (
            <button
              className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setReplying((r) => !r)}
              data-testid={`button-reply-${comment.id}`}
            >
              Reply
            </button>
          )}
          {replying && (
            <div className="mt-3 space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="text-sm resize-none"
                rows={2}
                data-testid="input-reply-text"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={submitReply}
                  data-testid="button-submit-reply"
                >
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setReplying(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((r) => (
        <CommentItem
          key={r.id}
          comment={r}
          onReply={onReply}
          depth={depth + 1}
        />
      ))}
    </motion.div>
  );
}
