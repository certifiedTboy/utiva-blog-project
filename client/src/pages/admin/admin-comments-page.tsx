import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/features/context/admin-context";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import type { Comment } from "@/lib/types";
import { ADMIN_TABS } from "@/lib/mock-data";

export default function AdminCommentsPage() {
  const [page, setPage] = useState(1);
  const { comments, onDeleteComment } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  const { toast } = useToast();
  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const pageComments = comments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleConfirmDelete() {
    if (!commentToDelete) return;

    onDeleteComment(commentToDelete._id);
    toast({ title: "Comment deleted" });
    setIsModalOpen(false);
    setCommentToDelete(null);
  }

  function handleDeleteClick(comment: Comment) {
    setCommentToDelete(comment);
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Manage Comments
          </h1>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {ADMIN_TABS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button
                className={`px-4 py-2 text-sm cursor-pointer font-medium border-b-2 transition-colors ${typeof window !== "undefined" && window.location.pathname === href ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              {comments?.length} comments
            </span>
          </div>
          {pageComments.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">
              No comments found
            </p>
          ) : (
            <div className="divide-y divide-border">
              {pageComments?.map((comment, i) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="px-5 py-4 flex gap-3 group hover:bg-muted/20 transition-colors"
                  data-testid={`row-comment-${comment._id}`}
                >
                  {comment?.authorAvatar ? (
                    <img
                      src={comment?.authorAvatar}
                      alt={comment?.authorName}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                      {comment?.authorName?.[0] || "?"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {comment?.authorName}
                      </span>

                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(comment?.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      {comment?.content}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={() => handleDeleteClick(comment)}
                    data-testid={`button-delete-comment-${comment._id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="self-center text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      {commentToDelete && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Post"
          description={
            <>
              Are you sure you want to delete this comment "
              <strong className="truncate">{commentToDelete?.content}</strong>"?
              This action cannot be undone.
            </>
          }
          confirmText="sudo delete"
        />
      )}
    </div>
  );
}
