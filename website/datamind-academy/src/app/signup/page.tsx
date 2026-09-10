"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left side — Visual (desktop only) */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-transparent" />
        <div className="glow-orb w-[400px] h-[400px] bg-purple-600/30 top-1/3 right-1/4" />
        <div className="glow-orb w-[300px] h-[300px] bg-indigo-600/20 bottom-1/3 left-1/4" style={{ animationDelay: "2s" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <div className="text-7xl mb-6">🚀</div>
          <h2 className="text-3xl font-black text-white mb-4">
            Your Data Career
            <br />
            <span className="text-gradient">Starts Here</span>
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            Join 50,000+ learners mastering the skills that top employers demand.
          </p>

          {/* What you get */}
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {[
              "✅ Full access to beginner & intermediate content",
              "✅ In-browser Python & SQL code editor",
              "✅ Progress tracking & learning streaks",
              "✅ Community forums & peer support",
              "✅ Verifiable completion certificates",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-sm text-muted-foreground"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right side — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white text-lg font-bold">D</span>
            </div>
            <span className="font-bold text-xl">
              DataMind <span className="text-gradient">Academy</span>
            </span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            Start learning for free — no credit card required.
          </p>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 glass-card rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/[0.08] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 glass-card rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/[0.08] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground uppercase">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">First name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Last name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
              <input type="password" placeholder="Min 8 characters" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 text-sm">
              Create Account →
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-muted-foreground">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-muted-foreground">Privacy Policy</Link>.
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300">
              Log in →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
