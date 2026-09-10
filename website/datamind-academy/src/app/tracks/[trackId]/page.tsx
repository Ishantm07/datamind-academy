"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TRACKS, SUBJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock roadmap for each track
const TRACK_ROADMAP: Record<string, { subject: string; modules: { title: string; lessons: number; status: string }[] }[]> = {
  "data-analyst": [
    {
      subject: "sql",
      modules: [
        { title: "Database Fundamentals", lessons: 6, status: "completed" },
        { title: "Querying & Filtering", lessons: 6, status: "completed" },
        { title: "Aggregate Functions", lessons: 6, status: "current" },
        { title: "JOINs & Subqueries", lessons: 8, status: "locked" },
        { title: "Window Functions", lessons: 6, status: "locked" },
        { title: "Database Design & Optimization", lessons: 8, status: "locked" },
      ],
    },
    {
      subject: "powerbi",
      modules: [
        { title: "Power BI Essentials", lessons: 6, status: "locked" },
        { title: "Data Modeling & DAX", lessons: 8, status: "locked" },
        { title: "Advanced Visuals & RLS", lessons: 6, status: "locked" },
      ],
    },
    {
      subject: "python",
      modules: [
        { title: "Python for Data Analysis", lessons: 8, status: "locked" },
        { title: "Pandas & Visualization", lessons: 6, status: "locked" },
      ],
    },
  ],
  "data-scientist": [
    {
      subject: "python",
      modules: [
        { title: "Python Fundamentals", lessons: 7, status: "completed" },
        { title: "OOP & Modules", lessons: 6, status: "current" },
        { title: "Data Analysis Stack", lessons: 8, status: "locked" },
      ],
    },
    {
      subject: "ml",
      modules: [
        { title: "ML Foundations", lessons: 7, status: "locked" },
        { title: "Classical Algorithms", lessons: 8, status: "locked" },
        { title: "Model Evaluation & Tuning", lessons: 6, status: "locked" },
        { title: "Production ML", lessons: 6, status: "locked" },
      ],
    },
    {
      subject: "ai",
      modules: [
        { title: "Neural Networks & Deep Learning", lessons: 6, status: "locked" },
        { title: "NLP & Transformers", lessons: 6, status: "locked" },
      ],
    },
  ],
};

export default function TrackDetailPage({ params }: { params: { trackId: string } }) {
  const track = TRACKS.find((t) => t.id === params.trackId);
  if (!track) notFound();

  const roadmap = TRACK_ROADMAP[params.trackId] || TRACK_ROADMAP["data-analyst"];

  const totalModules = roadmap.reduce((acc, s) => acc + s.modules.length, 0);
  const completedModules = roadmap.reduce(
    (acc, s) => acc + s.modules.filter((m) => m.status === "completed").length,
    0
  );
  const progressPct = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent" />
          <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/20 -top-20 -right-20" />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="text-6xl mb-5">{track.icon}</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {track.title} Track
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              {track.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <span>⏱ ~{track.durationMonths} months</span>
              <span>📚 {totalModules} modules</span>
              <span>🎯 {track.goal}</span>
            </div>

            {/* Overall progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Track Progress</span>
                <span className="text-indigo-400 font-bold">{progressPct}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Track Roadmap</h2>

          <div className="space-y-10">
            {roadmap.map((section, sIdx) => {
              const subject = SUBJECTS.find((s) => s.id === section.subject)!;
              return (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.1 }}
                >
                  {/* Subject header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{subject.icon}</span>
                    <h3 className="text-lg font-bold text-white">{subject.title}</h3>
                  </div>

                  {/* Modules list */}
                  <div className="space-y-2 ml-5 border-l-2 border-white/5 pl-6">
                    {section.modules.map((mod, mIdx) => (
                      <div
                        key={mIdx}
                        className={cn(
                          "glass-card rounded-xl p-4 flex items-center justify-between",
                          mod.status === "current" && "border-indigo-500/30 bg-indigo-500/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {mod.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {mod.status === "current" && <PlayCircle className="w-5 h-5 text-indigo-400" />}
                          {mod.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                          <div>
                            <span className={cn(
                              "text-sm font-medium",
                              mod.status === "locked" ? "text-muted-foreground" : "text-white"
                            )}>
                              {mod.title}
                            </span>
                            <p className="text-xs text-muted-foreground mt-0.5">{mod.lessons} lessons</p>
                          </div>
                        </div>
                        {mod.status === "current" && (
                          <Link
                            href={`/learn/${section.subject}/m1/lesson-1`}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            Continue →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
