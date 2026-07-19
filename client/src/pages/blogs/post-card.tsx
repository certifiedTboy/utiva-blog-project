import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import type { IPost } from "@/lib/types";

interface PostCardProps {
  post: IPost;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({
  post,
  index = 0,
  variant = "default",
}: PostCardProps) {
  return (
    <Link href={`/blogs/${post?.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -3 }}
        className="group bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
        data-testid={`card-post-${post?._id}`}
      >
        {post?.coverImage && (
          <div className="aspect-[3/2] overflow-hidden">
            <img
              src={post?.coverImage}
              alt={post?.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 mb-2">
            {post?.categoryName && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {post.categoryName}
              </span>
            )}

            <div className="flex items-center gap-2">
              {variant && variant !== "compact" && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post?.readingTime} min read
                </span>
              )}

              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {post?.viewCount?.toLocaleString()}
              </span>

              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" /> {post?.commentCount}
              </span>
            </div>
          </div>

          <h3 className="font-serif truncate text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer mb-1">
            {post?.title}
          </h3>

          {post.excerpt && (
            <p className="text-sm text-muted-foreground mb-4 truncate">
              {post?.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              {post?.author?.picture ? (
                <img
                  src={post?.author?.picture}
                  alt={`${post?.author?.firstName} ${post?.author?.lastName}`}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {post?.author?.firstName[0]}
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                {post?.author?.firstName} {post?.author?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post?.createdAt).split(",")[0]}
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
