import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  PenLine,
  Eye,
  MessageCircle,
  Heart,
  Edit,
  Trash2,
  Plus,
  FileText,
  Clock,
} from "lucide-react";
import StatCard from "./stat-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { useAdminContext } from "@/features/context/admin-context";
import type { IPost } from "@/lib/types";

export default function DashboardPage() {
  const {
    totalComments,
    totalDraftPosts,
    totalPublishedPosts,
    totalReactions,
    totalViews,
    posts,
    onDeletePost,
  } = useAdminContext();

  const { user } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null);

  function handleDeleteClick(post: IPost) {
    setPostToDelete(post);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    if (!postToDelete) return;

    onDeletePost(postToDelete._id);
    toast({ title: "Post deleted" });
    setIsModalOpen(false);
    setPostToDelete(null);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your posts and track your impact
            </p>
          </div>
          <Link href="/write">
            <Button className="gap-2" data-testid="button-new-post">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Total Views"
            value={totalViews}
            icon={Eye}
            color="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
          />
          <StatCard
            label="Comments"
            value={totalComments}
            icon={MessageCircle}
            color="bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
          />
          <StatCard
            label="Reactions"
            value={totalReactions}
            icon={Heart}
            color="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
          />
          <StatCard
            label="Published"
            value={totalPublishedPosts}
            icon={PenLine}
            color="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
          />
        </div>

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Your Posts
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{totalPublishedPosts} published</span>
              <span>·</span>
              <span>
                {totalDraftPosts} draft{totalDraftPosts !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {posts && posts?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No posts yet</p>
              <p className="text-sm mt-1">Start writing your first article</p>
              <Link href="/write">
                <Button className="mt-4 gap-2" data-testid="button-write-first">
                  <Plus className="w-4 h-4" /> Write Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {posts &&
                posts?.length > 0 &&
                posts.map((post, i) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors group"
                    data-testid={`row-post-${post._id}`}
                  >
                    {post.coverImage && (
                      <img
                        src={post?.coverImage}
                        alt={post?.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-foreground truncate">
                          {post?.title}
                        </span>
                        <Badge
                          variant={
                            post?.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs flex-shrink-0"
                        >
                          {post?.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post?.viewCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post?.commentCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post?.reactionCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post?.readingTime} min read
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/write/${post?._id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1"
                          data-testid={`button-edit-post-${post?._id}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(post)}
                        data-testid={`button-delete-post-${post?._id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
        {postToDelete && (
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Post"
            description={
              <>
                Are you sure you want to delete the post "
                <strong>{postToDelete.title}</strong>"? This action cannot be
                undone.
              </>
            }
            confirmText="sudo delete"
          />
        )}
      </div>
    </div>
  );
}
