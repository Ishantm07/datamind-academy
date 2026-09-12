"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TRACKS, SUBJECTS } from "@/lib/data";
import { getSubjectProgress } from "@/lib/progressStore";
import { ArrowRight, Clock, Award, CheckCircle2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Tracks() {
  const [trackProgress, setTrackProgress] = useState<Record<string, { pct: number; completed: number; total: number }>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const progressObj: Record<string, { pct: number; completed: number; total: number }> = {};

    TRACKS.forEach((track) => {
      const totalMilestones = track.subjects.length * 5; // 4 module challenges + 1 capstone per subject
      let completedMilestones = 0;

      track.subjects.forEach((subId) => {
        const prog = getSubjectProgress(subId);
        if (prog) {
          completedMilestones += Math.min(4, prog.completedModuleChallenges?.length || 0);
          if (prog.finalChallengePassed || prog.isCompleted) {
            completedMilestones += 1;
          }
        }
      });

      const pct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
      progressObj[track.id] = { pct, completed: completedMilestones, total: totalMilestones };
    });

    setTrackProgress(progressObj);
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 block">
            Career Specialisations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Curated Learning Tracks
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Follow a structured career specialization designed around high-demand industry roles. Master fundamentals, pass module challenges, and earn verified credentials.
          </p>
        </motion.div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track, i) => {
            const trackSubjects = track.subjects.map(
              (id) => SUBJECTS.find((s) => s.id === id)!
            ).filter(Boolean);

            const totalHours = trackSubjects.reduce((acc, s) => acc + (s?.estimatedHours || 0), 0);
            const totalModules = trackSubjects.length * 4;
            const progress = trackProgress[track.id] || { pct: 0, completed: 0, total: trackSubjects.length * 5 };

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="gradient-border flex flex-col h-full"
              >
                <div className="glass-card rounded-2xl p-7 flex flex-col justify-between h-full border border-white/5 hover:border-white/15 transition-all">
                  <div>
                    {/* Top Row: Icon + Title */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        {track.icon}
                      </div>
                      {isLoaded && progress.pct > 0 && (
                        <span className={cn(
                          "text-[11px] font-bold px-2.5 py-1 rounded-full border",
                          progress.pct === 100
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                        )}>
                          {progress.pct === 100 ? "Completed ✓" : `${progress.pct}% Progress`}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {track.title} Track
                    </h3>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~{track.durationMonths} mos (~{totalHours}h)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-purple-400" /> {totalModules} Mods + {trackSubjects.length} Capstones
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Subject Flow Pipeline */}
                    <div className="mb-6">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                        Prerequisite Sequence
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {trackSubjects.map((subject, j) => (
                          <span key={subject.id} className="flex items-center gap-1">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground flex items-center gap-1.5">
                              <span>{subject.icon}</span>
                              <span>{subject.title}</span>
                            </span>
                            {j < trackSubjects.length - 1 && (
                              <span className="text-muted-foreground/40 text-xs">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Live Progress Bar (if started) */}
                    {isLoaded && progress.pct > 0 && (
                      <div className="mb-5 pt-3 border-t border-white/5">
                        <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                          <span>Progress</span>
                          <span className="text-indigo-400 font-semibold">{progress.completed}/{progress.total} milestones</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${progress.pct}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Goal & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-muted-foreground truncate max-w-[170px]" title={track.goal}>
                        🎯 {track.goal}
                      </span>
                      <Link
                        href={`/tracks/${track.id}`}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn transition-colors shrink-0"
                      >
                        <span>{isLoaded && progress.pct > 0 ? "Continue" : "View Track"}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
