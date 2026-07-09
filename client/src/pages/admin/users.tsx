import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Users } from "lucide-react";
import { ADMIN_USERS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ADMIN_TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/comments", label: "Comments" },
];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(ADMIN_USERS.length / PAGE_SIZE);
  const users = ADMIN_USERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Manage Users</h1>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {ADMIN_TABS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${(typeof window !== "undefined" && window.location.pathname === href) ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</button>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-sm text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4" />{ADMIN_USERS.length} users</span>
          </div>
          <div className="divide-y divide-border">
            {users.map((user, i) => (
              <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                className="px-5 py-3 flex items-center gap-3" data-testid={`row-user-${user.id}`}>
                {user.avatarUrl
                  ? <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
                  : <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">{user.name?.[0] || "?"}</div>}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{user.postCount} posts</span>
                  {user.role === "admin" && <Badge variant="default" className="text-xs">Admin</Badge>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
            <span className="self-center text-sm text-muted-foreground">{page} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        )}
      </div>
    </div>
  );
}
