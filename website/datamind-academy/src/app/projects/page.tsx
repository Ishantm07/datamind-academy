"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Code2,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Database,
  Award,
  ExternalLink,
} from "lucide-react";
import { PROJECTS, getProjectMilestones, PortfolioProject } from "@/lib/projectsData";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [milestonesMap, setMilestonesMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Read user's completed milestones for each project
    const map: Record<string, string[]> = {};
    PROJECTS.forEach((p) => {
      map[p.id] = getProjectMilestones(p.id);
    });
    setMilestonesMap(map);
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.trackName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || p.subjects.includes(selectedSubject);

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Hero */}
        <section className="relative py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              Resume-Ready Portfolio Projects
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Hands-On Engineering Projects
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Step beyond isolated quizzes. Build end-to-end data pipelines, executive DAX dashboards, and machine learning models with real-world business scenarios and clean starter datasets.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real Datasets (50K+ Rows)
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Step-by-Step 5 Milestones
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Copyable GitHub READMEs
              </span>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#0e0f1d] border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name or skill..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Subject Filters */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: "all", label: "All Disciplines" },
                { id: "sql", label: "SQL" },
                { id: "powerbi", label: "Power BI" },
                { id: "python", label: "Python" },
                { id: "ml", label: "Machine Learning" },
                { id: "ai", label: "AI & RAG" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSubject === sub.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/5"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-[11px] text-muted-foreground">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all" className="bg-[#0e0f1d] text-white">All Levels</option>
                <option value="intermediate" className="bg-[#0e0f1d] text-white">Intermediate</option>
                <option value="advanced" className="bg-[#0e0f1d] text-white">Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const completedCount = milestonesMap[project.id]?.length || 0;
              const totalMilestones = project.milestones.length;
              const progressPct = Math.round((completedCount / totalMilestones) * 100);
              const isFinished = completedCount === totalMilestones;

              return (
                <div
                  key={project.id}
                  className="rounded-3xl p-6 bg-gradient-to-br from-[#121324] via-[#0f101d] to-[#0a0b14] border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-xl space-y-4 group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {project.icon}
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          project.difficulty === "Advanced"
                            ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                            : "text-indigo-400 bg-indigo-500/10 border-indigo-500/25"
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    </div>

                    {/* Track Affiliation */}
                    <span className="text-[10px] font-mono font-semibold text-indigo-400 uppercase tracking-wider block">
                      {project.trackName}
                    </span>

                    {/* Title & Subtitle */}
                    <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {project.title}
                    </h2>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Meta Specs */}
                    <div className="flex items-center gap-3 pt-2 text-[11px] text-muted-foreground border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~{project.estimatedHours} Hours
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Database className="w-3.5 h-3.5 text-emerald-400" /> {project.datasetInfo.rows}
                      </span>
                    </div>

                    {/* Milestone Progress Bar */}
                    <div className="pt-1 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-muted-foreground">Milestones</span>
                        <span className={isFinished ? "text-emerald-400 font-bold" : "text-white font-semibold"}>
                          {completedCount}/{totalMilestones} Completed
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFinished
                              ? "bg-gradient-to-r from-emerald-400 to-green-500"
                              : "bg-gradient-to-r from-indigo-500 to-purple-500"
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-3 border-t border-white/5">
                    <Link
                      href={`/projects/${project.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 group-hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span>{completedCount > 0 ? "Continue Project" : "Start Project"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Tracks Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-900/30 via-[#101124] to-purple-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                RECOMMENDED LEARNING PATH
              </span>
              <h3 className="text-xl font-bold text-white">Want to earn official accreditation for these skills?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Take our structured career tracks. Complete modules, pass the 40-question capstones, and unlock your official Specialization Master Diploma.
              </p>
            </div>
            <Link
              href="/tracks"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0 flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Explore Career Tracks</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
