"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Code2,
  Users,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Terminal,
  Layers,
  HeartHandshake,
} from "lucide-react";

const PILLARS = [
  {
    icon: <Terminal className="w-6 h-6 text-indigo-400" />,
    title: "100% Hands-On & Active",
    description:
      "No passive video bingeing. Learn theory through focused modules, followed immediately by algorithmic and practical code challenges with real-time test verification.",
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    title: "Decoupled Mastery Framework",
    description:
      "Our unique 4-module curriculum separates conceptual theory from graded module challenges, capped with a 40-question comprehensive capstone exam that shuffles upon retake.",
  },
  {
    icon: <Award className="w-6 h-6 text-amber-400" />,
    title: "Dual-Tiered Accreditation",
    description:
      "Earn single-discipline foundation diplomas or prestigious multi-pillar Career Specialization Master credentials, all cryptographically verifiable in our public registry.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "Public Cryptographic Ledger",
    description:
      "Every diploma issued includes a unique SHA-256 ledger fingerprint that employers and recruiters can audit instantly via our public verification portal.",
  },
];

const LEADERSHIP = [
  {
    name: "Ishant Mishra",
    role: "Founder & Director of Academic Affairs",
    bio: "Data architect and engineering educator passionate about democratizing enterprise-grade data intelligence, high-performance SQL, and modern AI pipelines.",
    avatar: "👨‍💻",
    badge: "Director",
  },
  {
    name: "Dr. Sophia Vance",
    role: "Dean of Specialized Industry Programs",
    bio: "Specialist in tabular data modeling, enterprise DAX formulations, and curriculum alignment with Fortune 500 business intelligence standards.",
    avatar: "👩‍🏫",
    badge: "Dean",
  },
  {
    name: "Marcus Sterling",
    role: "Head of Computational AI Curriculum",
    bio: "Machine learning engineer with focus on production model architectures, transformer fine-tuning, and scalable feature stores.",
    avatar: "🤖",
    badge: "Faculty Lead",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              About DataMind Academy
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Engineering the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300">
                Data & Applied Intelligence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              DataMind Academy was founded with a singular purpose: to replace passive video lectures with rigorous, hands-on engineering challenges, decoupled theory, and industry-recognized accreditations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/tracks"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <span>Explore Career Tracks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/certifications"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                Accreditation Standards
              </Link>
            </div>
          </div>
        </section>

        {/* The Problem & Our Mission */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Our Origin & Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Why Traditional Data Learning Is Broken
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Most online bootcamps and platforms trap learners in "tutorial hell": hours of watching someone else write code, trivial copy-paste quizzes, and certificates that hold zero weight with hiring managers.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                We rebuilt the learning experience from first principles:
                Every subject is broken into 4 modular milestones. Each milestone requires reading rich engineering theory, conquering 10 rigorous practical challenges, and surviving an intensive 40-question capstone exam where questions dynamically shuffle on every retake.
              </p>
            </div>

            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#121324] to-[#0c0d16] border border-white/10 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                The DataMind Standard
              </h3>
              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Decoupled Theory & Practice</strong>
                    Theory is concise, code-illustrated, and separated from graded evaluation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Dynamic Shuffling Architecture</strong>
                    Retaking an exam presents questions in fresh permutations to guarantee actual concept mastery.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Public SHA-256 Ledger Audit</strong>
                    Every certificate links to our open `/verify` registry with immutable verification hashes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="border-t border-white/5 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Our Educational Pillars
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
                Built for serious career transitioners, enterprise analysts, and software engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PILLARS.map((pillar, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-7 bg-[#0e0f1d] border border-white/5 hover:border-white/15 transition-all space-y-3 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Leadership */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Academic & Industry Leadership
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Curricula designed and signed by industry practitioners and accredited directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERSHIP.map((leader, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 bg-gradient-to-b from-[#111222] to-[#0a0b14] border border-white/10 shadow-xl space-y-4 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl mx-auto shadow-inner">
                  {leader.avatar}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    {leader.badge}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{leader.name}</h3>
                  <p className="text-[11px] text-amber-300/80 font-medium">{leader.role}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-amber-900/20 border border-indigo-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ready to Master Data & AI?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Join thousands of self-directed learners mastering SQL, Power BI, Python, and Machine Learning today.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/subjects"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-lg hover:bg-gray-100 transition-all"
              >
                Browse All Subjects
              </Link>
              <Link
                href="/verify"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all"
              >
                Verify a Credential
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
