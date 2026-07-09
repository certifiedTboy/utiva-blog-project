import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, Eye, MessageCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  authorName: string;
  authorAvatar?: string | null;
  categoryName?: string | null;
  tags: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  readingTime: number;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
}

export default function PostCard({ post, index = 0, variant = "default" }: PostCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex gap-3 group"
        data-testid={`card-post-${post.id}`}
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 cursor-pointer leading-tight">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{post.authorName} · {post.readingTime} min read</p>
        </div>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-lg transition-all duration-300"
        data-testid={`card-post-${post.id}`}
      >
        {post.coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.categoryName && (
              <Badge variant="secondary" className="text-xs font-medium">{post.categoryName}</Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readingTime} min read
            </span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-2 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.authorName} className="w-7 h-7 rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {post.authorName[0]}
                </div>
              )}
              <span className="text-xs font-medium text-foreground">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.viewCount.toLocaleString()}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.commentCount}</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="group bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
      data-testid={`card-post-${post.id}`}
    >
      {post.coverImage && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.categoryName && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.categoryName}</span>
          )}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-1 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.authorName} className="w-6 h-6 rounded-full" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                {post.authorName[0]}
              </div>
            )}
            <span className="text-xs text-muted-foreground">{post.authorName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}m</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.createdAt).split(",")[0]}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
