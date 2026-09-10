"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { value: "5", label: "Subjects", icon: "📚" },
  { value: "250+", label: "Lessons", icon: "🎓" },
  { value: "50K+", label: "Learners", icon: "👥" },
  { value: "Free", label: "To Start", icon: "✨" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/30 -top-32 -left-32" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-600/20 top-1/3 -right-20" style={{ animationDelay: "2s" }} />
      <div className="glow-orb w-[300px] h-[300px] bg-blue-600/15 bottom-0 left-1/3" style={{ animationDelay: "4s" }} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center w-full">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300 mb-10 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
          </span>
          Free · Structured · Project-Based Learning
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.95]"
        >
          From Zero to
          <br />
          <span className="text-gradient">Data Pro</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed"
        >
          Master{" "}
          <span className="text-indigo-300 font-semibold">SQL</span>,{" "}
          <span className="text-yellow-300 font-semibold">Power BI</span>,{" "}
          <span className="text-green-300 font-semibold">Python</span>,{" "}
          <span className="text-purple-300 font-semibold">Machine Learning</span>, and{" "}
          <span className="text-rose-300 font-semibold">AI</span>{" "}
          — through structured courses, hands-on projects, and a supportive community.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Primary CTA — Glowing button */}
          <Link
            href="/tracks"
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-2xl hover:shadow-indigo-500/25 transition-all">
              Find My Learning Path →
            </div>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/subjects"
            className="w-full sm:w-auto glass-card rounded-xl px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-white/10"
          >
            Browse Courses
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
