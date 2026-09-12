"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

const ARTICLES = [
  {
    slug: "sql-window-functions-deep-dive",
    title: "The Anatomy of High-Performance SQL Window Functions",
    excerpt: "Why PARTITION BY and moving frame windows (ROWS BETWEEN) out-perform correlated subqueries by orders of magnitude on modern columnar engines.",
    date: "Sep 8, 2026",
    readTime: "6 min read",
    tag: "SQL Engineering",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    author: "Ishant Mishra",
  },
  {
    slug: "dax-calculate-context-transition",
    title: "Demystifying DAX Context Transition in Power BI",
    excerpt: "Understand how row context morphs into filter context under the hood when referencing measures or invoking CALCULATE in enterprise models.",
    date: "Aug 29, 2026",
    readTime: "8 min read",
    tag: "Power BI & DAX",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    author: "Dr. Sophia Vance",
  },
  {
    slug: "pedagogy-question-shuffling-retention",
    title: "Why Question Permutations & Shuffling Guarantee True Mastery",
    excerpt: "The cognitive science behind DataMind's 40-question capstone engine: how active recall and dynamic query variants defeat rote memorization.",
    date: "Aug 15, 2026",
    readTime: "5 min read",
    tag: "Pedagogy",
    tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    author: "DataMind Research",
  },
  {
    slug: "bi-developer-career-roadmap",
    title: "From SQL Analyst to Full-Stack BI Developer",
    excerpt: "A structured breakdown of why pairing relational database systems with enterprise tabular DAX creates the highest-leverage skill set in modern analytics.",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    tag: "Career Tracks",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    author: "Marcus Sterling",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Hero */}
        <section className="relative py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Engineering Insights & Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              The DataMind Blog
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              In-depth architectural guides, SQL optimization benchmarks, DAX modeling techniques, and data science perspectives from our faculty.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="p-7 rounded-3xl bg-[#0e0f1d] border border-white/10 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${article.tagColor}`}
                    >
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="text-muted-foreground">
                    By <strong className="text-white font-semibold">{article.author}</strong> • {article.date}
                  </div>
                  <Link
                    href={`/resources?tab=cheatsheets`}
                    className="text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
