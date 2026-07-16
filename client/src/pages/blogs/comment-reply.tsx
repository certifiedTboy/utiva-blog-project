import { motion } from "framer-motion";
import { Interweave } from "interweave";
import { marked } from "marked";
import { transform } from "./transform";
import { useAuth } from "@/features/context/auth-context";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useComments } from "@/features/context/comment-context";
import type { Replies } from "@/lib/types";

export function CommentReply(replies: Replies) {
  const { user, isAuthenticated: isSignedIn } = useAuth();

  const { setCommentToDelete } = useComments();

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
                  {user && user?._id === replies?.authorId && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() =>
                          setCommentToDelete(replies, "delete-reply")
                        }
                        data-testid={`button-delete-comment-${replies?._id}`}
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
              content={marked.parse(replies?.content || "") as string}
              transform={transform}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
