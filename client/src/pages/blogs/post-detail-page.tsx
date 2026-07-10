import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import { POSTS, COMMENTS, REACTIONS_DATA } from "@/lib/mock-data";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "clap", emoji: "👏", label: "Clap" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "wow", emoji: "😮", label: "Wow" },
];

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-16 left-0 right-0 h-0.5 bg-primary z-40 origin-left" style={{ scaleX }} />;
}

function ReactionsPanel({ postId, userSignedIn }: { postId: number; userSignedIn: boolean }) {
  const [reactions, setReactions] = useState(() => ({ ...REACTIONS_DATA[postId] }));
  const { toast } = useToast();

  function handleReact(type: string) {
    if (!userSignedIn) { toast({ title: "Sign in to react" }); return; }
    setReactions(prev => {
      const wasActive = prev.userReaction === type;
      const counts = { ...prev.counts };
      if (wasActive) {
        counts[type] = Math.max(0, (counts[type] || 0) - 1);
        return { counts, userReaction: null };
      } else {
        if (prev.userReaction) counts[prev.userReaction] = Math.max(0, (counts[prev.userReaction] || 0) - 1);
        counts[type] = (counts[type] || 0) + 1;
        return { counts, userReaction: type };
      }
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 my-8 p-4 bg-card border border-card-border rounded-xl">
      <span className="text-sm font-medium text-muted-foreground mr-2">Reactions</span>
      {REACTIONS.map(({ type, emoji, label }) => {
        const count = reactions.counts?.[type] ?? 0;
        const isActive = reactions.userReaction === type;
        return (
          <motion.button key={type} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => handleReact(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all border ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40 text-foreground"}`}
            data-testid={`button-react-${type}`}>
            <span>{emoji}</span>
            <span className="font-medium">{count > 0 ? count : label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

type Comment = {
  id: number; postId: number; content: string;
  authorName: string; authorAvatar?: string;
  createdAt: string; parentId?: number;
  replies: Comment[];
};

function CommentItem({ comment, onReply, depth = 0 }: { comment: Comment; onReply: (parentId: number, text: string) => void; depth?: number }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { isSignedIn } = useAuth();

  function submitReply() {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText(""); setReplying(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={depth > 0 ? "ml-8 border-l-2 border-border pl-4" : ""}>
      <div className="flex gap-3 py-4">
        <div className="flex-shrink-0">
          {comment.authorAvatar
            ? <img src={comment.authorAvatar} alt={comment.authorName} className="w-8 h-8 rounded-full" />
            : <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">{comment.authorName?.[0]}</div>}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">{comment.authorName}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
          {isSignedIn && depth === 0 && (
            <button className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setReplying(r => !r)} data-testid={`button-reply-${comment.id}`}>Reply</button>
          )}
          {replying && (
            <div className="mt-3 space-y-2">
              <Textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply..." className="text-sm resize-none" rows={2} data-testid="input-reply-text" />
              <div className="flex gap-2">
                <Button size="sm" onClick={submitReply} data-testid="button-submit-reply">Reply</Button>
                <Button size="sm" variant="ghost" onClick={() => setReplying(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map(r => <CommentItem key={r.id} comment={r} onReply={onReply} depth={depth + 1} />)}
    </motion.div>
  );
}

function CommentsSection({ postId }: { postId: number }) {
  const { isSignedIn, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(() => COMMENTS[postId] ?? []);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  let nextId = 1000;

  function submitComment() {
    if (!newComment.trim()) return;
    const c: Comment = {
      id: nextId++,
      postId,
      content: newComment,
      authorName: user?.fullName ?? "You",
      authorAvatar: user?.imageUrl,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setComments(prev => [c, ...prev]);
    setNewComment("");
    toast({ title: "Comment posted!" });
  }

  function handleReply(parentId: number, text: string) {
    const reply: Comment = {
      id: nextId++,
      postId,
      content: text,
      authorName: user?.fullName ?? "You",
      authorAvatar: user?.imageUrl,
      createdAt: new Date().toISOString(),
      parentId,
      replies: [],
    };
    setComments(prev => prev.map(c => c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c));
    toast({ title: "Reply posted!" });
  }

  return (
    <div className="mt-12">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-primary" />
        Comments <span className="text-muted-foreground text-base font-normal">({comments.length})</span>
      </h3>
      {isSignedIn ? (
        <div className="mb-8 space-y-3">
          <Textarea value={newComment} onChange={e => setNewComment(e.target.value)}
            placeholder="Share your thoughts..." className="resize-none" rows={3} data-testid="input-comment" />
          <Button onClick={submitComment} disabled={!newComment.trim()} data-testid="button-submit-comment">
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-muted rounded-xl text-sm text-muted-foreground text-center">
          <a href="/sign-in" className="text-primary hover:underline font-medium">Sign in</a> to leave a comment
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
      ) : (
        <div className="divide-y divide-border">
          {comments.map(comment => <CommentItem key={comment.id} comment={comment} onReply={handleReply} />)}
        </div>
      )}
    </div>
  );
}

export default function PostDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();
  const { isSignedIn } = useAuth();
  const slug = params?.slug ?? "";

  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-semibold mb-2">Article not found</h2>
          <Button onClick={() => navigate("/blog")} data-testid="button-back-to-blog">Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <ReadingProgress />
      {post.coverImage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-h-[500px] overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" style={{ aspectRatio: "21/9" }} />
        </motion.div>
      )}
      <div className="max-w-3xl mx-auto px-4 mt-10">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-testid="button-back">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </motion.button>

        {post.categoryName && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
            {post.categoryName}
          </motion.span>
        )}

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
          {post.title}
        </motion.h1>

        {post.excerpt && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-6 leading-relaxed italic border-l-4 border-primary pl-4">
            {post.excerpt}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 py-4 border-y border-border mb-8">
          <div className="flex items-center gap-2">
            {post.authorAvatar
              ? <img src={post.authorAvatar} alt={post.authorName} className="w-9 h-9 rounded-full" />
              : <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{post.authorName?.[0]}</div>}
            <div>
              <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground ml-auto">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readingTime} min</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.viewCount.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-a:text-primary">
          {post.content?.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
            if (line.startsWith("# ")) return <h1 key={i}>{line.slice(2)}</h1>;
            if (line.startsWith("```")) return null;
            if (!line.trim()) return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </motion.div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <a key={tag} href={`/blog?tag=${tag}`} className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                #{tag}
              </a>
            ))}
          </div>
        )}

        <ReactionsPanel postId={post.id} userSignedIn={!!isSignedIn} />
        <CommentsSection postId={post.id} />
      </div>
    </div>
  );
}
