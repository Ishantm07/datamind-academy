"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Users,
  MessageSquare,
  Sparkles,
  Share2,
  ExternalLink,
  Code2,
  Award,
  Heart,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const STUDY_CIRCLES = [
  {
    title: "BI Developers & DAX Masters",
    members: "1,420 Members",
    topics: "CALCULATE patterns, dimensional schemas, executive dashboards",
    icon: "📊",
    activeNow: "48 online",
    link: "/tracks/bi-developer",
  },
  {
    title: "SQL Query Tuning & Schema Guild",
    members: "2,890 Members",
    topics: "Window functions, B-tree indexes, execution plans, CTEs",
    icon: "🗄️",
    activeNow: "112 online",
    link: "/subjects/sql",
  },
  {
    title: "Python Data Wrangling & Pipelines",
    members: "3,150 Members",
    topics: "Pandas vectorization, ETL pipelines, API extraction",
    icon: "🐍",
    activeNow: "95 online",
    link: "/subjects/python",
  },
  {
    title: "AI & Transformer Engineers",
    members: "1,870 Members",
    topics: "LoRA fine-tuning, RAG retrieval, autonomous agent loops",
    icon: "🤖",
    activeNow: "64 online",
    link: "/tracks/ai-engineer",
  },
];

const COMMUNITY_POSTS = [
  {
    author: "Alex Rivera",
    role: "BI Developer Cohort",
    title: "How I optimized a 40-million row DAX time-intelligence measure from 8s to 240ms",
    replies: 28,
    upvotes: 142,
    time: "3 hours ago",
    badge: "Case Study",
  },
  {
    author: "Sarah Chen",
    role: "Data Analyst Specialization",
    title: "Passed the SQL 40-question capstone on my second try! Here are my tips for window functions",
    replies: 34,
    upvotes: 189,
    time: "6 hours ago",
    badge: "Milestone",
  },
  {
    author: "Devin Vance",
    role: "Data Engineering Track",
    title: "Which is preferred in modern Lakehouse setups: Partition pruning vs Z-Order clustering?",
    replies: 19,
    upvotes: 76,
    time: "Yesterday",
    badge: "Architecture Q&A",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Hero */}
        <section className="relative py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Global Learner Network
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              The DataMind Community
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with fellow students, discuss complex query formulations, review portfolio projects, and celebrate earned diplomas with over 10,000 active data practitioners.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Join Student Discord Server</span>
              </a>
              <a
                href="https://github.com/Ishantm07/datamind-academy"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-gray-400" />
                <span>GitHub Discussions</span>
              </a>
            </div>
          </div>
        </section>

        {/* Active Study Circles */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">
              FOCUSED PEER GROUPS
            </span>
            <h2 className="text-2xl font-black text-white">Active Specialization Study Circles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDY_CIRCLES.map((circle, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#0e0f1d] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{circle.icon}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      ● {circle.activeNow}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{circle.title}</h3>
                  <p className="text-xs text-gray-400">{circle.topics}</p>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    {circle.members}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <Link
                    href={circle.link}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Curriculum & Cohort</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Discussion Feed */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                COMMUNITY SHOWCASE & INSIGHTS
              </span>
              <h2 className="text-2xl font-black text-white">Trending Peer Discussions</h2>
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              Your Dashboard →
            </Link>
          </div>

          <div className="space-y-4">
            {COMMUNITY_POSTS.map((post, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#111224] to-[#0c0d16] border border-white/5 hover:border-white/15 transition-all space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{post.author}</span>
                    <span>•</span>
                    <span className="text-indigo-300">{post.role}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/5 text-amber-300">
                    {post.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer">
                  {post.title}
                </h3>

                <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground border-t border-white/5">
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-400/20" /> {post.upvotes}
                  </span>
                  <span className="flex items-center gap-1 text-sky-400">
                    <MessageSquare className="w-3.5 h-3.5" /> {post.replies} responses
                  </span>
                  <span className="text-[11px] text-gray-500">{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
