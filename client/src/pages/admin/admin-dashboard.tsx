import { Link } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, Users, FileText, MessageCircle, Eye, Heart, TrendingUp, Shield } from "lucide-react";
import { ADMIN_STATS } from "@/lib/mock-data";

function StatCard({ label, value, icon: Icon, sub, color }: { label: string; value: string | number; icon: any; sub?: string; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }}
      className="bg-card border border-card-border rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{typeof value === "number" ? value.toLocaleString() : value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

const ADMIN_TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/comments", label: "Comments" },
];

export default function AdminDashboard() {
  const stats = ADMIN_STATS;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Platform overview and management</p>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-8 border-b border-border">
          {ADMIN_TABS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                (typeof window !== "undefined" && window.location.pathname === href)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`} data-testid={`tab-admin-${label.toLowerCase()}`}>{label}</button>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Posts" value={stats.totalPosts} icon={FileText} sub={`${stats.publishedPosts} published`} color="bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400" />
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} color="bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400" />
          <StatCard label="Total Views" value={stats.totalViews} icon={Eye} color="bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400" />
          <StatCard label="Reactions" value={stats.totalReactions} icon={Heart} color="bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400" />
          <StatCard label="Comments" value={stats.totalComments} icon={MessageCircle} color="bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400" />
          <StatCard label="Draft Posts" value={stats.draftPosts} icon={FileText} color="bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400" />
          <StatCard label="Published" value={stats.publishedPosts} icon={BarChart3} color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" />
          <StatCard label="Engagement" value={`${((stats.totalReactions / Math.max(1, stats.totalViews)) * 100).toFixed(1)}%`} icon={TrendingUp} color="bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">Top Posts</h3>
            </div>
            <div className="divide-y divide-border">
              {stats.topPosts.map((post, i) => (
                <div key={post.id} className="px-5 py-3 flex items-center gap-3" data-testid={`row-top-post-${post.id}`}>
                  <span className="w-6 text-center text-sm font-bold text-muted-foreground">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.viewCount.toLocaleString()} views · {post.reactionCount} reactions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="divide-y divide-border">
              {stats.recentActivity.map((act, i) => (
                <div key={i} className="px-5 py-3">
                  <p className="text-sm text-foreground">{act.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(act.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
