import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { COMMENTS } from "@/lib/mock-data";
import { useAuth } from "@/features/context/auth-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useAddCommentToPostMutation,
  useGetCommentsByPostMutation,
} from "@/features/apis/post-apis";
import type { Comment } from "@/lib/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MarkdownCommentField } from "./markdown-comment-field";
import CommentItem from "./comment-item";

export default function CommentsSection({ postId }: { postId: any }) {
  const { isAuthenticated: isSignedIn, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(
    () => COMMENTS[postId] ?? [],
  );
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(z.object({ content: z.string().min(1) })),
    defaultValues: {
      content: "",
    },
  });

  const [addCommentToPost] = useAddCommentToPostMutation();
  const [
    getCommentsByPost,
    { data: commentsData, isSuccess: commentsSuccess },
  ] = useGetCommentsByPostMutation();

  useEffect(() => {
    if (postId) {
      getCommentsByPost(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (commentsData && commentsSuccess) {
      const comments = commentsData?.data?.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt).toISOString(),
        authorName: c?.author?.firstName + " " + c?.author?.lastName,
        authorAvatar: c?.author?.picture,

        replies: [],
      }));

      setComments(comments);
    }
  }, [commentsData, commentsSuccess]);

  let nextId = 1000;

  function submitComment(values: { content: string }) {
    if (!values.content.trim()) return;
    const c: Comment = {
      id: nextId++,
      postId,
      content: values.content,
      authorName: user?.name ?? "You",
      authorAvatar: user?.picture,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setComments((prev) => [c, ...prev]);
    addCommentToPost({ postId, content: values.content });
    form.reset();
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitComment)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MarkdownCommentField
                        field={field}
                        placeholder="Share your thoughts... Use ``` for code blocks."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!form.watch("content")?.trim()}
                className="cursor-pointer"
                data-testid="button-submit-comment"
              >
                Post Comment
              </Button>
            </form>
          </Form>
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
