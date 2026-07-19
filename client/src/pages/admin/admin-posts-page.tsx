import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/features/context/admin-context";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { ADMIN_TABS } from "@/lib/mock-data";
import type { IPost } from "@/lib/types";

export default function AdminPostsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null);

  const { posts, onDeletePost } = useAdminContext();

  const { toast } = useToast();

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

  const filtered = posts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p?.author?.firstName.toLowerCase().includes(search.toLowerCase()) ||
      p?.author?.lastName.toLowerCase().includes(search.toLowerCase()),
  );
  const PAGE_SIZE = 15;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pagePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Manage Posts
          </h1>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {ADMIN_TABS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button
                className={`px-4 py-2 cursor-pointer text-sm font-medium border-b-2 transition-colors ${typeof window !== "undefined" && window.location.pathname === href ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            data-testid="input-search-posts"
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {filtered.length} posts total
            </span>
          </div>
          {pagePosts.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">
              No posts found
            </p>
          ) : (
            <div className="divide-y divide-border">
              {pagePosts.map((post, i) => (
                <motion.div
                  key={post?._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="px-5 py-3 flex items-center gap-4 hover:bg-muted/30 transition-colors group"
                  data-testid={`row-admin-post-${post?._id}`}
                >
                  {post.coverImage && (
                    <img
                      src={post?.coverImage}
                      alt={post?.title}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {post?.title}
                      </span>
                      <Badge
                        variant={
                          post?.status === "published" ? "default" : "secondary"
                        }
                        className="text-xs flex-shrink-0"
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      by{" "}
                      {`${post?.author?.firstName} ${post?.author?.lastName}`} ·{" "}
                      <Eye className="w-3 h-3 inline" /> {post?.viewCount}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/blog/${post?.slug}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/write/${post?._id}`}>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(post)}
                      data-testid={`button-delete-post-${post._id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
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
  );
}
