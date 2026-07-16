import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Interweave } from "interweave";
import { marked } from "marked";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "@/features/context/auth-context";
import { Button } from "@/components/ui/button";
import { transform } from "./transform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MarkdownCommentField } from "./markdown-comment-field";
import { CommentReply } from "./comment-reply";
import { useComments } from "@/features/context/comment-context";
import type { Comment } from "@/lib/types";

export default function CommentItem({
  comment,
  postId,
  depth = 0,
}: {
  comment: Comment;
  postId: any;
  depth?: number;
}) {
  const [replying, setReplying] = useState(false);
  const { isAuthenticated: isSignedIn, user } = useAuth();

  const { addReply, setCommentToDelete } = useComments();

  const form = useForm({
    resolver: zodResolver(z.object({ content: z.string().min(1) })),
    defaultValues: {
      content: "",
    },
  });

  function submitReply(values: { content: string }) {
    if (!values.content.trim()) return;

    if (user) {
      addReply(
        values.content,
        user?.name,
        user?.picture,
        postId,
        comment._id,
        user?._id,
      );
      form.reset();
      setReplying(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={depth > 0 ? "ml-8 border-l-2 border-border pl-4" : ""}
    >
      <div className="flex gap-3 py-4">
        <div className="flex-shrink-0">
          {comment?.authorAvatar ? (
            <img
              src={comment?.authorAvatar}
              alt={comment?.authorName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {comment?.authorName?.[0]}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">
              {comment?.authorName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            {isSignedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-auto cursor-pointer p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    Report comment
                  </DropdownMenuItem>
                  {/* @ts-ignore */}
                  {user && user?._id === comment?.authorId && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() =>
                          setCommentToDelete(comment, "delete-comment")
                        }
                        data-testid={`button-delete-comment-${comment?._id}`}
                      >
                        Delete comment
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <Interweave
              content={marked.parse(comment?.content || "") as string}
              transform={transform}
            />
          </div>
          {isSignedIn && depth === 0 && (
            <button
              className="mt-2 cursor-pointer text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setReplying((r) => !r)}
              data-testid={`button-reply-${comment?._id}`}
            >
              Reply
            </button>
          )}
          {replying && (
            <div className="mt-3 space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submitReply)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MarkdownCommentField
                            field={field}
                            placeholder="Write a reply... Use ``` for code blocks."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      data-testid="button-submit-reply"
                    >
                      Reply
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplying(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>

      {comment?.replies &&
        comment?.replies?.length > 0 &&
        comment?.replies?.map((reply: any, index: number) => (
          <CommentReply
            key={index}
            _id={reply._id}
            postId={postId}
            depth={depth + 1}
            content={reply?.content}
            authorId={reply?.authorId}
            parentId={comment?._id}
            authorName={
              reply.author
                ? `${reply.author.firstName} ${reply.author.lastName}`
                : reply.authorName
            }
            authorAvatar={reply?.author?.picture || reply?.authorAvatar}
            createdAt={reply?.createdAt}
          />
        ))}
    </motion.div>
  );
}
