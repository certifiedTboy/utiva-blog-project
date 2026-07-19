import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  FileText,
  MessageCircle,
  Eye,
  Heart,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useAdminContext } from "@/features/context/admin-context";
import StatCard from "./stat-card";
import { ADMIN_TABS } from "@/lib/mock-data";

export default function AdminDashboard() {
  const {
    totalPosts,
    totalPublishedPosts,
    totalViews,
    totalDraftPosts,
    totalComments,
    totalReactions,
    totalUsers,
  } = useAdminContext();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Platform overview and management
            </p>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-8 border-b border-border">
          {ADMIN_TABS.map(({ href, label }) => (
            <Link key={href} href={href} className="cursor-pointer">
              <button
                className={`px-4 py-2 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
                  typeof window !== "undefined" &&
                  window.location.pathname === href
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-admin-${label.toLowerCase()}`}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Posts"
            value={totalPosts}
            icon={FileText}
            sub={`${totalPublishedPosts} published`}
            color="bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
          />
          <StatCard
            label="Total Users"
            value={totalUsers}
            icon={Users}
            color="bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400"
          />
          <StatCard
            label="Total Views"
            value={totalViews}
            icon={Eye}
            color="bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
          />
          <StatCard
            label="Reactions"
            value={totalReactions}
            icon={Heart}
            color="bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
          />
          <StatCard
            label="Comments"
            value={totalComments}
            icon={MessageCircle}
            color="bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400"
          />
          <StatCard
            label="Draft Posts"
            value={totalDraftPosts}
            icon={FileText}
            color="bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400"
          />
          <StatCard
            label="Published"
            value={totalPublishedPosts}
            icon={BarChart3}
            color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          />
          <StatCard
            label="Engagement"
            value={`${((totalReactions / Math.max(1, totalViews)) * 100).toFixed(1)}%`}
            icon={TrendingUp}
            color="bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400"
          />
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Top Posts
              </h3>
            </div>
            <div className="divide-y divide-border">
              {stats.topPosts.map((post, i) => (
                <div
                  key={post.id}
                  className="px-5 py-3 flex items-center gap-3"
                  data-testid={`row-top-post-${post.id}`}
                >
                  <span className="w-6 text-center text-sm font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.viewCount.toLocaleString()} views ·{" "}
                      {post.reactionCount} reactions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-border">
              {stats.recentActivity.map((act, i) => (
                <div key={i} className="px-5 py-3">
                  <p className="text-sm text-foreground">{act.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(act.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
