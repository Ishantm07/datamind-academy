"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X } from "lucide-react";
import {
  getSubjectProgress,
  UserProgressState,
  StoredCertificate,
  issueCertificate,
  updateCertificateRecipientName,
  SUBJECT_CERT_TITLES,
} from "@/lib/progressStore";

type UserData = { name: string; email: string; xp: number; streak: number; level: number };

function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("datamind_user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      router.push("/login");
    }
  }, [router]);

  return user;
}

const DEFAULT_USER = { name: "Learner", xp: 0, streak: 0, level: 1 };

const SUBJECT_ICONS: Record<string, string> = {
  sql: "🗄️",
  python: "🐍",
  powerbi: "📊",
  ml: "🤖",
  ai: "🧠",
};

const SUBJECT_COLORS: Record<string, { gradient: string; border: string }> = {
  sql: { gradient: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/20" },
  python: { gradient: "from-green-500/20 to-emerald-500/5", border: "border-green-500/20" },
  powerbi: { gradient: "from-yellow-500/20 to-orange-500/5", border: "border-yellow-500/20" },
  ml: { gradient: "from-purple-500/20 to-violet-500/5", border: "border-purple-500/20" },
  ai: { gradient: "from-red-500/20 to-rose-500/5", border: "border-red-500/20" },
};

const ACHIEVEMENTS = [
  { icon: "🔥", title: "7-Day Streak", description: "Learning every day for a week" },
  { icon: "⚡", title: "Speed Learner", description: "Completed 5 lessons in one day" },
  { icon: "🎯", title: "Perfect Score", description: "100% on SQL JOINs quiz" },
  { icon: "🗄️", title: "SQL Explorer", description: "Completed SQL Beginner" },
];

export default function DashboardPage() {
  const user = useUser();
  const USER = user || DEFAULT_USER;

  // Read real progress from localStorage for all subjects
  const [subjectProgress, setSubjectProgress] = useState<Record<string, UserProgressState>>({});
  const [certificates, setCertificates] = useState<StoredCertificate[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    if (USER.name) {
      setCurrentName(USER.name);
      setEditedName(USER.name);
    }
  }, [USER.name]);

  const handleSaveName = () => {
    const trimmed = editedName.trim();
    if (!trimmed) return;

    setCurrentName(trimmed);
    setIsEditingName(false);

    // Update in localStorage datamind_user
    try {
      const stored = localStorage.getItem("datamind_user");
      if (stored) {
        const u = JSON.parse(stored);
        u.name = trimmed;
        localStorage.setItem("datamind_user", JSON.stringify(u));
      }
    } catch (e) {}

    // Update all certificates and synchronize
    try {
      const certsStr = localStorage.getItem("datamind_certificates");
      if (certsStr) {
        const parsed: StoredCertificate[] = JSON.parse(certsStr);
        const updated = parsed.map((c) => ({ ...c, recipientName: trimmed }));
        localStorage.setItem("datamind_certificates", JSON.stringify(updated));
        setCertificates(updated);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const progress: Record<string, UserProgressState> = {};
    const subjectIds = ["sql", "python", "powerbi", "ml", "ai"];
    let total = 0;

    subjectIds.forEach((sid) => {
      const p = getSubjectProgress(sid);
      progress[sid] = p;
      total += p.completedQuestionIds.length;
      if ((p.isCompleted || p.completedQuestionIds.length >= 40) && !p.certificateId) {
        issueCertificate(sid, USER.name, (USER as any).email);
      }
    });

    setSubjectProgress(progress);
    setTotalLessons(total);

    // Load certificates and auto-correct any mislabeled certificates (e.g. from previous sessions)
    try {
      const certsStr = localStorage.getItem("datamind_certificates");
      if (certsStr) {
        const parsed: StoredCertificate[] = JSON.parse(certsStr);
        let hasChanges = false;
        const cleaned = parsed.map((c) => {
          let sid = c.subjectId?.toLowerCase();
          const certIdLower = c.certificateId.toLowerCase();
          if (certIdLower.includes("python")) sid = "python";
          else if (certIdLower.includes("powerbi")) sid = "powerbi";
          else if (certIdLower.includes("ml")) sid = "ml";
          else if (certIdLower.includes("ai")) sid = "ai";
          else if (certIdLower.includes("sql")) sid = "sql";

          let updated = { ...c };
          const expectedTitle = sid ? SUBJECT_CERT_TITLES[sid] : null;
          if (sid && expectedTitle && (c.subjectId !== sid || c.subjectTitle !== expectedTitle)) {
            hasChanges = true;
            updated.subjectId = sid;
            updated.subjectTitle = expectedTitle;
          }

          // Sync recipient name with logged-in user profile name
          if (USER.name && USER.name !== "Learner" && USER.name !== "DataMind Learner" && c.recipientName !== USER.name) {
            hasChanges = true;
            updated.recipientName = USER.name;
          }

          return updated;
        });

        if (hasChanges) {
          localStorage.setItem("datamind_certificates", JSON.stringify(cleaned));
        }
        setCertificates(cleaned);
      }
    } catch (e) {}
  }, [USER.name, (USER as any).email]);

  // Build active courses from real progress
  const activeCourses = SUBJECTS.map((subject) => {
    const prog = subjectProgress[subject.id];
    const completed = prog?.completedQuestionIds?.length || 0;
    const progressPct = Math.min(Math.round((completed / 40) * 100), 100);
    return {
      subjectId: subject.id,
      title: subject.title,
      icon: SUBJECT_ICONS[subject.id] || "📚",
      progress: progressPct,
      completed,
      isCompleted: prog?.isCompleted || false,
    };
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🧠</div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="font-bold text-sm">DataMind <span className="text-gradient">Academy</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass-card rounded-full px-4 py-1.5">
              <span className="text-amber-400 text-sm">⚡</span>
              <span className="text-sm font-bold text-white">{USER.xp} XP</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {USER.name[0]}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") setIsEditingName(false);
                }}
                className="px-3 py-1.5 bg-white/10 border border-indigo-500 rounded-xl text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your name"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={() => {
                  setEditedName(currentName || USER.name);
                  setIsEditingName(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-semibold transition-all"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white">
                Welcome back, {currentName || USER.name} 👋
              </h1>
              <button
                onClick={() => {
                  setEditedName(currentName || USER.name);
                  setIsEditingName(true);
                }}
                title="Edit your display name"
                className="text-xs text-muted-foreground hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                <span>Edit Name</span>
              </button>
            </div>
          )}
          <p className="text-muted-foreground">
            You&apos;ve completed <span className="text-indigo-400 font-bold">{totalLessons} questions</span> across all subjects. Keep pushing!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Total XP", value: `${USER.xp}`, icon: "⚡", gradient: "from-amber-500/20 to-orange-500/5" },
            { label: "Day Streak", value: `${USER.streak}`, icon: "🔥", gradient: "from-red-500/20 to-rose-500/5" },
            { label: "Certificates", value: `${certificates.length}`, icon: "🏆", gradient: "from-emerald-500/20 to-green-500/5" },
            { label: "Questions Done", value: `${totalLessons}`, icon: "✅", gradient: "from-blue-500/20 to-cyan-500/5" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${stat.gradient}`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active Courses (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning — Real Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Continue Learning</h2>
              <div className="space-y-3">
                {activeCourses.map((course) => {
                  const colors = SUBJECT_COLORS[course.subjectId] || SUBJECT_COLORS.sql;
                  // Determine which lesson to resume from
                  const nextLesson = Math.min(course.completed + 1, 40);
                  return (
                    <Link
                      key={course.subjectId}
                      href={`/learn/${course.subjectId}/m1/lesson-${nextLesson}`}
                      className={`glass-card rounded-2xl p-5 flex items-center gap-5 group hover:bg-white/[0.06] transition-all ${colors.border} border`}
                    >
                      <div className="text-4xl">{course.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white mb-1">{course.title}</div>
                        <div className="text-xs text-muted-foreground mb-3 truncate">
                          {course.isCompleted
                            ? "✅ All 40 questions completed — Certificate earned!"
                            : `${course.completed}/40 questions completed`}
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              course.isCompleted
                                ? "bg-gradient-to-r from-emerald-500 to-green-400"
                                : "bg-gradient-to-r from-indigo-500 to-purple-500"
                            )}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "text-sm font-bold",
                          course.isCompleted ? "text-emerald-400" : "text-indigo-400"
                        )}>
                          {course.progress}%
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase mt-1">
                          {course.isCompleted ? "done" : "complete"}
                        </div>
                      </div>
                      <span className="text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((badge) => (
                  <div key={badge.title} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-xs font-bold text-white mb-1">{badge.title}</div>
                    <div className="text-[10px] text-muted-foreground">{badge.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Earned Certificates — Dynamic from localStorage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Earned Certificates</h2>
                <span className="text-xs text-indigo-400 font-semibold">Verified Credentials</span>
              </div>

              {certificates.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <div className="text-sm font-bold text-white mb-1">No Certificates Yet</div>
                  <div className="text-xs text-muted-foreground">
                    Complete 40 questions in any subject to earn your certificate!
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certificates.map((cert) => {
                    const colors = SUBJECT_COLORS[cert.subjectId] || SUBJECT_COLORS.sql;
                    const icon = SUBJECT_ICONS[cert.subjectId] || "🏆";
                    return (
                      <Link
                        key={cert.certificateId}
                        href={`/certificate/${cert.certificateId}`}
                        className={`glass-card rounded-2xl p-5 ${colors.border} border bg-gradient-to-br ${colors.gradient} hover:opacity-90 transition-all group`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl ${colors.border} border bg-white/5 flex items-center justify-center text-xl`}>
                            {icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {cert.subjectTitle}
                            </div>
                            <div className="text-[11px] text-muted-foreground font-mono">
                              {cert.totalQuestions}/{cert.totalQuestions} Questions • {cert.score} XP
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span>✓</span> Issued {cert.issuedAt}
                          </span>
                          <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                            View →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Subject Progress Summary (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-bold text-white mb-4">Subject Progress</h2>
            <div className="glass-card rounded-2xl p-5 space-y-4">
              {activeCourses.map((course, i) => {
                const colors = SUBJECT_COLORS[course.subjectId] || SUBJECT_COLORS.sql;
                return (
                  <div
                    key={course.subjectId}
                    className={cn(
                      "flex items-center gap-3",
                      i < activeCourses.length - 1 && "pb-4 border-b border-white/5"
                    )}
                  >
                    <span className="text-2xl">{course.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-semibold text-white">{course.title}</div>
                        <div className={cn(
                          "text-[10px] font-bold",
                          course.isCompleted ? "text-emerald-400" : "text-muted-foreground"
                        )}>
                          {course.completed}/40
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            course.isCompleted
                              ? "bg-emerald-500"
                              : course.progress > 0
                              ? "bg-indigo-500"
                              : "bg-white/10"
                          )}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
