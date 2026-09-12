"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { SUBJECTS, TRACKS } from "@/lib/data";
import { SPECIALIZATION_CERT_DETAILS } from "@/lib/progressStore";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Hero */}
        <section className="relative py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Institutional Accreditation Standards
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Official DataMind Certifications
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every diploma awarded by DataMind Academy represents verifiable, hands-on engineering capability. Our dual-tiered accreditation framework is recognized by industry employers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link
                href="/verify"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify a Credential in Public Registry</span>
              </Link>
              <Link
                href="/profile?tab=certificates"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                View Your Diplomas
              </Link>
            </div>
          </div>
        </section>

        {/* Credential Hierarchy Comparison */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dual-Tiered Accreditation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Choose single-discipline foundational mastery or complete multi-pillar executive career specializations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier 1: Single-Discipline Foundation Diploma */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#121424] via-[#0f101d] to-[#0a0b14] border border-indigo-500/30 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    TIER I ACCREDITATION
                  </span>
                  <span className="text-xs font-bold text-emerald-400">Foundation Diploma</span>
                </div>

                <h3 className="text-xl font-bold text-white">Discipline Foundation Diplomas</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Conferred upon learners who conquer all 4 modules and the rigorous 40-question capstone exam in a single engineering discipline.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>4 Graded Module Challenges (10 questions each)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>1 Comprehensive 40-Question Capstone Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>High-Resolution 1920x1357 PNG Canvas Download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Unique SHA-256 Ledger Cryptographic Hash</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-gray-400 block mb-2">Available Disciplines:</span>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => (
                      <Link
                        key={s.id}
                        href={`/subjects/${s.id}`}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-gray-200 transition-colors"
                      >
                        {s.icon} {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <Link
                  href="/subjects"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Foundation Subjects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tier 2: Career Specialization Master Diploma */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#1c1834] via-[#121124] to-[#0c0d18] border border-amber-500/50 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                    TIER II EXECUTIVE CREDENTIAL
                  </span>
                  <span className="text-xs font-bold text-amber-400">Master Diploma</span>
                </div>

                <h3 className="text-xl font-bold text-white">Career Specialization Master Diplomas</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Conferred upon completing all multi-pillar constituent engineering curricula across an entire curated career track roadmap.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Multi-Pillar Dual Accreditation (e.g. SQL + Power BI)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>80+ Cumulative Engineering Challenges Passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dual Executive Signatures: Academic Director & Industry Dean</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Grand Imperial Medallion with Dual Silk Ribbon Tails</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-gray-400 block mb-2">Available Career Specializations:</span>
                  <div className="flex flex-wrap gap-2">
                    {TRACKS.map((t) => (
                      <Link
                        key={t.id}
                        href={`/tracks/${t.id}`}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-[11px] text-amber-300 transition-colors"
                      >
                        {t.icon} {t.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 relative z-10">
                <Link
                  href="/certificate/specialization/bi-developer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Preview Master Specialization Diploma</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Architecture Section */}
        <section className="border-t border-white/5 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Cryptographic Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                How Verification Works
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                We believe credentials should be instantaneously auditable without paying third-party verification middlemen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#0e0f1d] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Earn & Complete</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every challenge score and capstone submission is calculated and permanently registered.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0e0f1d] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h3 className="text-base font-bold text-white">SHA-256 Ledger Hash</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A unique cryptographic ledger fingerprint is computed from your completion record, student profile, and issue timestamp.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0e0f1d] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  03
                </div>
                <h3 className="text-base font-bold text-white">Instant Public Audit</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Anyone can enter your Credential ID at <Link href="/verify" className="text-indigo-400 underline">datamind.academy/verify</Link> to inspect your verified standing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
