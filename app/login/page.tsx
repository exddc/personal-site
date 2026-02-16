"use client";

import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/app/lib/auth-client";
import { container, item } from "@/lib/animations";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isResetSuccess = searchParams.get("reset") === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/admin",
      });

      if (result.error) {
        setError(result.error.message || "Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full p-0 selection:bg-[var(--accent)] selection:text-white xl:p-24">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-5xl flex-col gap-16 p-6 sm:p-12 lg:p-24 xl:gap-24"
      >
        <motion.nav
          variants={item}
          className="font-mono text-sm tracking-tight text-neutral-500"
        >
          <Link href="/" className="hover:text-accent transition-colors">
            back to site
          </Link>
        </motion.nav>

        <motion.section variants={item} className="flex max-w-xl flex-col gap-8">
          <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
            <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-5xl">
              Admin Login
            </h1>
          </div>
          <p className="text-lg tracking-tight text-neutral-500">
            Sign in to access the content manager.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {isResetSuccess && (
              <div className="border border-neutral-300 bg-neutral-200/40 px-4 py-3 text-sm text-foreground">
                Password updated successfully. You can now sign in.
              </div>
            )}

            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-xs tracking-wide text-neutral-500"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-foreground placeholder:text-neutral-500 transition-colors focus:border-accent focus:outline-none"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="font-mono text-xs tracking-wide text-neutral-500"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-foreground placeholder:text-neutral-500 transition-colors focus:border-accent focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-accent">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-foreground bg-foreground px-4 py-3 font-mono text-sm text-background transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="pt-1">
              <Link
                href="/forgot-password"
                className="font-mono text-sm text-neutral-500 transition-colors hover:text-accent"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
