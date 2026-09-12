"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TRACKS, SUBJECTS } from "@/lib/data";
import { getAllModulesForSubject, SubjectCourseModule } from "@/lib/curriculumModules";
import {
  getSubjectProgress,
  isModuleUnlocked,
  isTheoryCompleted,
  isModuleChallengeCompleted,
  isFinalChallengeUnlocked,
  completeSpecializationForDemo,
  resetTrackProgress,
  UserProgressState,
} from "@/lib/progressStore";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  BookOpen,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  RotateCcw,
  FileText,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackDetailPage({ params }: { params: { trackId: string } }) {
  const track = TRACKS.find((t) => t.id === params.trackId);
  if (!track) notFound();

  // Client-side progress state to avoid SSR hydration mismatches
  const [progressMap, setProgressMap] = useState<Record<string, UserProgressState>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProgress = () => {
    const map: Record<string, UserProgressState> = {};
    track.subjects.forEach((subId) => {
      map[subId] = getSubjectProgress(subId);
    });
    setProgressMap(map);
  };

  useEffect(() => {
    // For demo purposes, auto-complete bi-developer if user arrives here so demo is immediately live!
    if (track.id === "bi-developer") {
      const p1 = getSubjectProgress("sql");
      const p2 = getSubjectProgress("powerbi");
      if (!p1.finalChallengePassed || !p2.finalChallengePassed) {
        completeSpecializationForDemo("bi-developer");
      }
    }
    refreshProgress();
    setIsLoaded(true);
  }, [track]);

  const handleDemoComplete = () => {
    completeSpecializationForDemo(track.id);
    refreshProgress();
  };

  const handleDemoReset = () => {
    resetTrackProgress(track.id);
    refreshProgress();
  };

  // Constituent subjects metadata
  const trackSubjects = track.subjects
    .map((subId) => SUBJECTS.find((s) => s.id === subId))
    .filter(Boolean) as (typeof SUBJECTS)[number][];

  // Modules per subject map
  const subjectModulesMap: Record<string, SubjectCourseModule[]> = {};
  trackSubjects.forEach((sub) => {
    subjectModulesMap[sub.id] = getAllModulesForSubject(sub.id);
  });

  // Calculate milestones: each subject has 4 theory/challenge modules + 1 capstone = 5 milestones
  const milestonesPerSubject = 5;
  const totalMilestones = trackSubjects.length * milestonesPerSubject;

  let completedMilestones = 0;
  let totalEstimatedHours = 0;

  trackSubjects.forEach((sub) => {
    totalEstimatedHours += sub.estimatedHours;
    const progress = progressMap[sub.id];
    if (progress) {
      // Completed module challenges
      const challengesPassed = Math.min(4, progress.completedModuleChallenges?.length || 0);
      completedMilestones += challengesPassed;

      // Completed final capstone
      if (progress.finalChallengePassed || progress.isCompleted) {
        completedMilestones += 1;
      }
    }
  });

  const progressPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Determine next active step to continue
  let nextAction: {
    title: string;
    label: string;
    href: string;
    subjectTitle: string;
  } | null = null;

  for (const sub of trackSubjects) {
    const modules = subjectModulesMap[sub.id] || [];
    const progress = progressMap[sub.id];
    const completedChallenges = progress?.completedModuleChallenges || [];
    const completedTheory = progress?.completedTheoryModules || [];

    // Check modules 1 to 4
    for (const mod of modules) {
      const isChallengePassed = completedChallenges.includes(mod.id);
      if (!isChallengePassed) {
        const isUnlocked = isModuleUnlocked(sub.id, mod.id);
        if (isUnlocked) {
          const hasReadTheory = completedTheory.includes(mod.id);
          if (!hasReadTheory) {
            nextAction = {
              subjectTitle: sub.title,
              title: `${mod.title} (Theory)`,
              label: "Read Theory",
              href: `/learn/${sub.id}/${mod.id}/theory`,
            };
          } else {
            nextAction = {
              subjectTitle: sub.title,
              title: `${mod.title} (10 Qs)`,
              label: "Start Challenge",
              href: `/learn/${sub.id}/${mod.id}/1`,
            };
          }
          break;
        }
      }
    }

    if (nextAction) break;

    // Check capstone
    const capstonePassed = progress?.finalChallengePassed || progress?.isCompleted;
    if (!capstonePassed && isFinalChallengeUnlocked(sub.id)) {
      nextAction = {
        subjectTitle: sub.title,
        title: `${sub.title} 40-Question Capstone Exam`,
        label: "Take Capstone Exam",
        href: `/learn/${sub.id}/final/1`,
      };
      break;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-purple-950/10 to-transparent" />
          <div className="glow-orb w-[500px] h-[500px] bg-indigo-500/10 -top-32 -right-32 blur-3xl pointer-events-none" />
          <div className="glow-orb w-[400px] h-[400px] bg-purple-500/10 -bottom-20 -left-20 blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/tracks" className="hover:text-white transition-colors">
                Career Tracks
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="text-white font-medium">{track.title}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl p-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
                    {track.icon}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      Curated Career Specialisation
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-1">
                      {track.title} Track
                    </h1>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  {track.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-foreground">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~{track.durationMonths} months (~{totalEstimatedHours} hrs)
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-foreground">
                    <Layers className="w-3.5 h-3.5 text-purple-400" /> {trackSubjects.length * 4} Modules + {trackSubjects.length} Capstones
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-foreground">
                    🎯 {track.goal}
                  </span>
                </div>
              </div>

              {/* Progress & Next CTA Card */}
              <div className="w-full md:w-80 glass-card rounded-2xl p-6 border border-white/10 shadow-xl bg-white/[0.02]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground font-medium">Track Completion</span>
                  <span className="text-indigo-400 font-bold">{progressPct}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-5">
                  <span>{completedMilestones} of {totalMilestones} milestones</span>
                  <span>{trackSubjects.length} diplomas</span>
                </div>

                {/* Continue CTA */}
                {nextAction ? (
                  <Link
                    href={nextAction.href}
                    className="group relative flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25"
                  >
                    <span>{nextAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : progressPct === 100 ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
                      <GraduationCap className="w-4 h-4" />
                      <span>Specialization Mastered!</span>
                    </div>
                    <Link
                      href={`/certificate/specialization/${track.id}`}
                      className="group relative flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-xl shadow-amber-500/25"
                    >
                      <Award className="w-4 h-4 text-slate-950" />
                      <span>View Specialization Certificate →</span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/learn/${track.subjects[0]}/m1/theory`}
                    className="group flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  >
                    <span>Start Track</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}

                {/* Interactive Demo Simulation Controls */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={handleDemoComplete}
                    className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    title="Simulate 100% completion of this specialization and view certificate"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Demo 100% Complete</span>
                  </button>
                  {progressPct > 0 && (
                    <button
                      onClick={handleDemoReset}
                      className="py-1.5 px-2.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:text-rose-400 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1"
                      title="Reset progress for this track"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {nextAction && (
                  <p className="text-[11px] text-muted-foreground text-center mt-2.5 truncate">
                    Next: <span className="text-white font-medium">{nextAction.title}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Learning Pipeline Flow */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="glass-card rounded-2xl p-5 border border-white/5 mb-12">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Track Specialisation Sequence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {trackSubjects.map((sub, idx) => {
                const progress = progressMap[sub.id];
                const isSubCompleted = progress?.finalChallengePassed || progress?.isCompleted;
                const passedCount = progress?.completedModuleChallenges?.length || 0;

                return (
                  <div
                    key={sub.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all",
                      isSubCompleted
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : passedCount > 0
                        ? "bg-indigo-500/5 border-indigo-500/30"
                        : "bg-white/[0.02] border-white/5"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
                      {sub.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {idx + 1}. {sub.title}
                        </span>
                        {isSubCompleted ? (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">
                            {passedCount}/4 Mods
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {sub.topicsCount} Topics • ~{sub.estimatedHours}h
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Subject Roadmaps */}
          <div className="space-y-16">
            {trackSubjects.map((subject, sIdx) => {
              const modules = subjectModulesMap[subject.id] || [];
              const progress = progressMap[subject.id];
              const completedChallenges = progress?.completedModuleChallenges || [];
              const completedTheories = progress?.completedTheoryModules || [];
              const capstonePassed = progress?.finalChallengePassed || progress?.isCompleted;
              const capstoneUnlocked = isFinalChallengeUnlocked(subject.id);

              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                  className="relative"
                >
                  {/* Subject Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                        {subject.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            Phase {sIdx + 1}
                          </span>
                          {capstonePassed && (
                            <span className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Award className="w-3 h-3" /> Certified
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl font-black text-white">{subject.title}</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {subject.topicsCount} Topics • ~{subject.estimatedHours} hours • 4 Theory Modules + Capstone
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/subjects/${subject.id}`}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
                    >
                      <span>View Full Subject Syllabus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Modules Timeline */}
                  <div className="space-y-4 ml-2 sm:ml-4 border-l-2 border-white/10 pl-4 sm:pl-8">
                    {modules.map((mod) => {
                      const isChallengeDone = completedChallenges.includes(mod.id);
                      const isTheoryDone = completedTheories.includes(mod.id);
                      const isUnlocked = isModuleUnlocked(subject.id, mod.id);

                      let status: "completed" | "current" | "locked" = "locked";
                      if (isChallengeDone) {
                        status = "completed";
                      } else if (isUnlocked) {
                        status = "current";
                      }

                      return (
                        <div
                          key={mod.id}
                          className={cn(
                            "glass-card rounded-2xl p-5 border transition-all",
                            status === "completed" && "border-emerald-500/20 bg-emerald-500/[0.02]",
                            status === "current" && "border-indigo-500/40 bg-indigo-500/[0.03] shadow-lg shadow-indigo-500/5",
                            status === "locked" && "border-white/5 opacity-60 bg-white/[0.01]"
                          )}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              {/* Icon status */}
                              <div className="mt-0.5">
                                {status === "completed" && (
                                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                  </div>
                                )}
                                {status === "current" && (
                                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <PlayCircle className="w-4 h-4" />
                                  </div>
                                )}
                                {status === "locked" && (
                                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground">
                                    <Lock className="w-4 h-4" />
                                  </div>
                                )}
                              </div>

                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                                    Module {mod.number}
                                  </span>
                                  <span className="text-white/20">•</span>
                                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {mod.duration}
                                  </span>
                                  <span className="text-white/20">•</span>
                                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> 10 Questions
                                  </span>
                                  {isTheoryDone && (
                                    <span className="text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.2 rounded">
                                      Theory Read ✓
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-base font-bold text-white">{mod.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                                  {mod.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              {status === "completed" && (
                                <>
                                  <Link
                                    href={`/learn/${subject.id}/${mod.id}/theory`}
                                    className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors flex items-center gap-1.5"
                                  >
                                    <BookOpen className="w-3 h-3" /> Theory
                                  </Link>
                                  <Link
                                    href={`/learn/${subject.id}/${mod.id}/1`}
                                    className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors flex items-center gap-1.5"
                                    title="Retake test with newly shuffled questions"
                                  >
                                    <RotateCcw className="w-3 h-3" /> Retake
                                  </Link>
                                </>
                              )}

                              {status === "current" && (
                                <>
                                  <Link
                                    href={`/learn/${subject.id}/${mod.id}/theory`}
                                    className="px-3.5 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
                                  >
                                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Read Theory
                                  </Link>
                                  <Link
                                    href={`/learn/${subject.id}/${mod.id}/1`}
                                    className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                                  >
                                    <PlayCircle className="w-3.5 h-3.5" /> Start Challenge
                                  </Link>
                                </>
                              )}

                              {status === "locked" && (
                                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02]">
                                  <Lock className="w-3 h-3" /> Locked
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Subject Capstone Final Milestone Card */}
                    <div
                      className={cn(
                        "glass-card rounded-2xl p-5 border transition-all mt-6",
                        capstonePassed
                          ? "border-amber-500/30 bg-amber-500/[0.03]"
                          : capstoneUnlocked
                          ? "border-amber-500/40 bg-gradient-to-r from-amber-500/5 to-purple-500/5 shadow-lg shadow-amber-500/5"
                          : "border-white/5 opacity-50 bg-white/[0.01]"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">
                                Subject Capstone Exam
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                40 Comprehensive Questions
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white">
                              {subject.title} Certification & Diploma Exam
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                              Synthesizes all 4 modules. Score ≥70% to graduate, unlock your verifiable credential, and advance your career track.
                            </p>
                          </div>
                        </div>

                        <div className="self-end sm:self-center shrink-0">
                          {capstonePassed ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5" /> Diploma Earned
                              </span>
                              <Link
                                href={`/learn/${subject.id}/final/1`}
                                className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-white bg-white/5 rounded-lg transition-colors flex items-center gap-1"
                                title="Retake with fresh questions"
                              >
                                <RotateCcw className="w-3 h-3" /> Retake
                              </Link>
                            </div>
                          ) : capstoneUnlocked ? (
                            <Link
                              href={`/learn/${subject.id}/final/1`}
                              className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 rounded-xl transition-all shadow-lg shadow-amber-600/20 flex items-center gap-2"
                            >
                              <Sparkles className="w-3.5 h-3.5" /> Take Capstone Exam (40 Qs)
                            </Link>
                          ) : (
                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02]">
                              <Lock className="w-3 h-3" /> Complete Modules 1-4 to Unlock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Grand Specialization Credential Showcase Banner */}
          {progressPct === 100 && (
            <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-indigo-500/10 shadow-2xl shadow-amber-500/10 mt-16 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30 text-3xl">
                🎓
              </div>
              <span className="text-[11px] font-cinzel font-black uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full">
                Verified Executive Credential
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3.5 mb-2">
                {track.title} Professional Specialization Diploma
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
                Congratulations! You have satisfied all multi-disciplinary curriculum modules and passed all comprehensive capstone examinations. Your official specialization credential is cryptographically secured.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/certificate/specialization/${track.id}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all"
                >
                  <Award className="w-4 h-4" /> Open Official Specialization Certificate
                </Link>
                <Link
                  href="/profile?tab=certificates"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 flex items-center gap-2 transition-all"
                >
                  <span>View in Profile Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
