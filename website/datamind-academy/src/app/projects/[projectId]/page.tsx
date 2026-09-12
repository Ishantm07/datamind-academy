"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Code2,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Award,
  FileText,
  Terminal,
  ExternalLink,
} from "lucide-react";
import {
  PROJECTS,
  getProjectMilestones,
  toggleProjectMilestone,
  PortfolioProject,
} from "@/lib/projectsData";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = typeof params?.projectId === "string" ? params.projectId : "";
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [copiedReadme, setCopiedReadme] = useState(false);

  useEffect(() => {
    setCompletedMilestones(getProjectMilestones(project.id));
  }, [project.id]);

  const handleToggleMilestone = (milestoneId: string) => {
    const updated = toggleProjectMilestone(project.id, milestoneId);
    setCompletedMilestones(updated);
  };

  const handleCopySnippet = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedSnippet(code);
      setTimeout(() => setCopiedSnippet(null), 2500);
    }
  };

  const handleCopyReadme = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(project.readmeTemplate);
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 3000);
    }
  };

  const totalMilestones = project.milestones.length;
  const progressPct = Math.round((completedMilestones.length / totalMilestones) * 100);
  const isFullyCompleted = completedMilestones.length === totalMilestones;

  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Top Control Bar & Breadcrumbs */}
        <section className="border-b border-white/10 bg-[#0c0d18]/80 backdrop-blur-md sticky top-16 z-30 py-3">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Link href="/projects" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                All Projects
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                {project.title}
              </span>
            </div>

            {/* Progress Pill */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono">
                <span className="text-muted-foreground">Progress: </span>
                <span className={isFullyCompleted ? "text-emerald-400 font-bold" : "text-indigo-400 font-semibold"}>
                  {completedMilestones.length}/{totalMilestones} Milestones ({progressPct}%)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Header */}
        <section className="relative py-12 md:py-16 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {project.trackName}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  project.difficulty === "Advanced"
                    ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                    : "text-indigo-400 bg-indigo-500/10 border-indigo-500/25"
                }`}
              >
                {project.difficulty} Level
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~{project.estimatedHours} Hours
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2.5 bg-white/5 rounded-2xl border border-white/10">
                  {project.icon}
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {project.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-300 font-medium">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Problem & Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  THE BUSINESS PROBLEM
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  DELIVERABLE & IMPACT
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dataset Download Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121426] to-[#0c0d18] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Starter Dataset Assets</h3>
              </div>
              <p className="text-xs text-gray-400">
                {project.datasetInfo.name} ({project.datasetInfo.rows} • {project.datasetInfo.columns})
              </p>
              <p className="text-[11px] text-muted-foreground">
                {project.datasetInfo.description}
              </p>
            </div>

            <button
              onClick={() => {
                alert(`Starting clean download package for ${project.datasetInfo.name}...`);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-colors flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Starter CSV Package</span>
            </button>
          </div>
        </section>

        {/* Milestones Roadmap */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                STEP-BY-STEP WORKSPACE
              </span>
              <h2 className="text-xl font-black text-white">Project Milestones</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Click checkboxes to mark progress
            </span>
          </div>

          <div className="space-y-6">
            {project.milestones.map((milestone, idx) => {
              const isChecked = completedMilestones.includes(milestone.id);

              return (
                <div
                  key={milestone.id}
                  className={`rounded-3xl p-6 sm:p-7 border transition-all ${
                    isChecked
                      ? "bg-[#0b1218] border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                      : "bg-[#0e0f1d] border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleMilestone(milestone.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
                        isChecked
                          ? "bg-emerald-500 border-emerald-400 text-slate-950"
                          : "bg-white/5 border-white/20 text-transparent hover:border-white/40"
                      }`}
                      title={isChecked ? "Mark milestone incomplete" : "Mark milestone complete"}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Milestone Content */}
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                            Milestone {idx + 1} of 5
                          </span>
                          <h3 className="text-base font-bold text-white mt-0.5">
                            {milestone.title}
                          </h3>
                        </div>
                        {isChecked && (
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                            ✓ Completed
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
                        <span className="font-semibold text-gray-300 text-[11px] block">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-gray-400">
                          {milestone.deliverables.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="text-indigo-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Code Recipe / Boilerplate */}
                      {milestone.codeSnippet && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-[11px] text-indigo-300 font-semibold">
                              {milestone.codeSnippet.label}
                            </span>
                            <button
                              onClick={() => handleCopySnippet(milestone.codeSnippet!.code)}
                              className="text-muted-foreground hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                            >
                              {copiedSnippet === milestone.codeSnippet.code ? (
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Copied!
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Copy className="w-3.5 h-3.5" /> Copy Code
                                </span>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs font-mono text-indigo-200 bg-black/70 p-4 rounded-2xl border border-white/5 overflow-x-auto leading-relaxed">
                            {milestone.codeSnippet.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Completion Celebration & GitHub README Exporter */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#121324] via-[#0f101d] to-[#0a0b14] border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Portfolio Documentation Packager
                </div>
                <h3 className="text-xl font-bold text-white">
                  Ready to Showcase on GitHub & LinkedIn?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                  Copy our curated, recruiter-optimized README.md template complete with problem statements, architectural decisions, and metric outcomes.
                </p>
              </div>

              <button
                onClick={handleCopyReadme}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                {copiedReadme ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>README Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy GitHub README.md</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-xs font-mono text-gray-300 bg-black/60 p-5 rounded-2xl border border-white/5 overflow-x-auto max-h-60 leading-relaxed">
              {project.readmeTemplate}
            </pre>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
