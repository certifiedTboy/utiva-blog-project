import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";

import HomePage from "@/pages/home";
import BlogPage from "@/pages/blog";
import PostDetailPage from "@/pages/post-detail";
import WritePage from "@/pages/write";
import DashboardPage from "@/pages/dashboard";
import AdminDashboard from "@/pages/admin/index";
import AdminPostsPage from "@/pages/admin/posts";
import AdminUsersPage from "@/pages/admin/users";
import AdminCommentsPage from "@/pages/admin/comments";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import NotFound from "@/pages/not-found";

function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-serif font-semibold text-foreground">
            Inkwell
          </span>
          <span>· A place for thoughtful writing</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </a>
          <a
            href="/sign-up"
            className="hover:text-foreground transition-colors"
          >
            Get Started
          </a>
        </div>
        <p>© {new Date().getFullYear()} Inkwell</p>
      </div>
    </footer>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={PostDetailPage} />
          <Route path="/write" component={WritePage} />
          <Route path="/write/:id" component={WritePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/posts" component={AdminPostsPage} />
          <Route path="/admin/users" component={AdminUsersPage} />
          <Route path="/admin/comments" component={AdminCommentsPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-in/:rest*" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-up/:rest*" component={SignUpPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
