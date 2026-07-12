import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { COMMENTS } from "@/lib/mock-data";
import { useAuth } from "@/features/context/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@/lib/types";
import CommentItem from "./comment-item";

export default function CommentsSection({ postId }: { postId: number }) {
  const { isAuthenticated: isSignedIn, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(
    () => COMMENTS[postId] ?? [],
  );
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  let nextId = 1000;

  function submitComment() {
    if (!newComment.trim()) return;
    const c: Comment = {
      id: nextId++,
      postId,
      content: newComment,
      authorName: user?.name ?? "You",
      authorAvatar: user?.picture,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setComments((prev) => [c, ...prev]);
    setNewComment("");
    toast({ title: "Comment posted!" });
  }

  function handleReply(parentId: number, text: string) {
    const reply: Comment = {
      id: nextId++,
      postId,
      content: text,
      authorName: user?.name ?? "You",
      authorAvatar: user?.picture,
      createdAt: new Date().toISOString(),
      parentId,
      replies: [],
    };
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c,
      ),
    );
    toast({ title: "Reply posted!" });
  }

  return (
    <div className="mt-12">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-primary" />
        Comments{" "}
        <span className="text-muted-foreground text-base font-normal">
          ({comments.length})
        </span>
      </h3>
      {isSignedIn ? (
        <div className="mb-8 space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="resize-none"
            rows={3}
            data-testid="input-comment"
          />
          <Button
            onClick={submitComment}
            disabled={!newComment.trim()}
            className="cursor-pointer"
            data-testid="button-submit-comment"
          >
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-muted rounded-xl text-sm text-muted-foreground text-center">
          <a
            href="/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </a>{" "}
          to leave a comment
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No comments yet. Be the first!
        </p>
      ) : (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
