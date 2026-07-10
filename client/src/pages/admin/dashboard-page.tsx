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
import { useState } from "react";
import { POSTS } from "@/lib/mock-data";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-card-border rounded-xl p-5 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">
          {value.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState(POSTS);

  const totalViews = posts.reduce((s, p) => s + p.viewCount, 0);
  const totalComments = posts.reduce((s, p) => s + p.commentCount, 0);
  const totalReactions = posts.reduce((s, p) => s + p.reactionCount, 0);
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post deleted" });
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
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
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
            value={published}
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
              <span>{published} published</span>
              <span>·</span>
              <span>
                {drafts} draft{drafts !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {posts.length === 0 ? (
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
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors group"
                  data-testid={`row-post-${post.id}`}
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-foreground truncate">
                        {post.title}
                      </span>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                        className="text-xs flex-shrink-0"
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.commentCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.reactionCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/write/${post.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1"
                        data-testid={`button-edit-post-${post.id}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post.id, post.title)}
                      data-testid={`button-delete-post-${post.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
