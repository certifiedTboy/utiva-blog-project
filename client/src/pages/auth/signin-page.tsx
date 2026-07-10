import { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { GoogleIcon } from "@/components/ui/google-icon";

export default function SignInPage() {
  const [, navigate] = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleGoogleSignIn, authData } = useGoogleAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn();
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-amber-50/30 dark:to-amber-950/10 px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-2 cursor-pointer mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <PenLine className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">
                Ade's Notes
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm">
            Welcome back. Sign in to continue.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
            Sign in
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              data-testid="button-sign-in"
            >
              Sign in
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </Button>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up">
              <span className="text-primary hover:underline font-medium cursor-pointer">
                Create one
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
