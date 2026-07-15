import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/features/context/auth-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useAddCommentToPostMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostMutation,
} from "@/features/apis/post-apis";
import type { Comment } from "@/lib/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MarkdownCommentField } from "./markdown-comment-field";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import CommentItem from "./comment-item";

export default function CommentsSection({ postId }: { postId: any }) {
  const { isAuthenticated: isSignedIn, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>(() => {
    return [].map((comment: any) => ({
      ...comment,
      _id: comment.id,
      replies:
        comment.replies?.map((reply: any) => ({
          ...reply,
          createdAt: new Date(reply.createdAt).toISOString(),
          // authorName: reply?.author?.firstName + " " + reply?.author?.lastName,
          // authorAvatar: reply?.author?.picture,
          _id: reply.id,
        })) ?? [],
    }));
  });

  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

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

        replies:
          c?.replies?.map((r: any) => ({
            ...r,
            createdAt: new Date(r.createdAt).toISOString(),
            authorName: r?.author?.firstName + " " + r?.author?.lastName,
            authorAvatar: r?.author?.picture,
          })) ?? [],
      }));

      setComments(comments);
    }
  }, [commentsData, commentsSuccess]);

  let nextId = 1000;

  function submitComment(values: { content: string }) {
    if (!values.content.trim()) return;
    const c: Comment = {
      _id: nextId++,
      postId,
      content: values.content,
      authorName: user?.name ?? "You",
      authorAvatar: user?.picture,
      authorId: user?._id,
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
      _id: nextId++,
      postId,
      content: text,
      authorName: user?.name ?? "You",
      authorAvatar: user?.picture,
      authorId: user?._id,
      createdAt: new Date().toISOString(),
      parentId,
      replies: [],
    };
    setComments((prev) =>
      prev.map((c) =>
        c._id === parentId ? { ...c, replies: [...c.replies, reply] } : c,
      ),
    );
    toast({ title: "Reply posted!" });
  }

  const findComment = useCallback(
    (commentId: string | number, commentsList: Comment[]): Comment | null => {
      for (const comment of commentsList) {
        if (comment._id === commentId) {
          return comment;
        }
        if (comment.replies && comment.replies.length > 0) {
          const foundInReply = findComment(commentId, comment.replies);
          if (foundInReply) {
            return foundInReply;
          }
        }
      }
      return null;
    },
    [],
  );

  const handleDelete = useCallback(
    (commentId: string | number) => {
      const toDelete = findComment(commentId, comments);
      if (toDelete) {
        setCommentToDelete(toDelete);
        setIsDeleteModalOpen(true);
      }
    },
    [comments, findComment],
  );

  async function handleConfirmDelete() {
    if (!commentToDelete) return;

    try {
      await deleteComment(commentToDelete._id).unwrap();
      // Refetch comments to get the latest state from the server
      getCommentsByPost(postId);
      toast({ title: "Comment deleted successfully" });
    } catch (error) {
      toast({
        title: "Failed to delete comment",
        variant: "destructive",
      });
    } finally {
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    }
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
          <Link
            href="/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>{" "}
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
              key={comment._id}
              comment={comment}
              postId={postId}
              onDelete={handleDelete}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
      {commentToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Comment"
          description={
            <>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </>
          }
          confirmText="sudo delete"
          isPending={isDeleting}
        />
      )}
    </div>
  );
}
