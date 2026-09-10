"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

// Default fallback while loading
const DEFAULT_USER = { name: "Learner", xp: 0, streak: 0, level: 1 };

const ACTIVE_COURSES = [
  { subjectId: "python", progress: 45, currentLesson: "Writing Your First Function", moduleNum: 3, lessonNum: 2 },
  { subjectId: "sql", progress: 72, currentLesson: "Window Functions: LAG & LEAD", moduleNum: 5, lessonNum: 3 },
  { subjectId: "ml", progress: 12, currentLesson: "What is Machine Learning?", moduleNum: 1, lessonNum: 2 },
];

const RECENT_ACTIVITY = [
  { action: "Completed", item: "SQL: Aggregate Functions", time: "2 hours ago", icon: "✅" },
  { action: "Started", item: "Python: Functions Module", time: "5 hours ago", icon: "▶️" },
  { action: "Earned Badge", item: "SQL Streak Master (7 days)", time: "1 day ago", icon: "🏆" },
  { action: "Scored 95%", item: "SQL: JOINs Quiz", time: "1 day ago", icon: "📝" },
  { action: "Completed Project", item: "E-Commerce Database Queries", time: "2 days ago", icon: "🚀" },
];

const ACHIEVEMENTS = [
  { icon: "🔥", title: "7-Day Streak", description: "Learning every day for a week" },
  { icon: "⚡", title: "Speed Learner", description: "Completed 5 lessons in one day" },
  { icon: "🎯", title: "Perfect Score", description: "100% on SQL JOINs quiz" },
  { icon: "🗄️", title: "SQL Explorer", description: "Completed SQL Beginner" },
];

export default function DashboardPage() {
  const user = useUser();
  const USER = user || DEFAULT_USER;

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
          <h1 className="text-3xl font-black text-white mb-2">
            Welcome back, {USER.name} 👋
          </h1>
          <p className="text-muted-foreground">
            You&apos;re on a <span className="text-amber-400 font-bold">🔥 {USER.streak}-day streak</span>! Keep going to unlock the Streak Master badge.
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
            { label: "Level", value: `${USER.level}`, icon: "📈", gradient: "from-emerald-500/20 to-green-500/5" },
            { label: "Lessons Done", value: "34", icon: "✅", gradient: "from-blue-500/20 to-cyan-500/5" },
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
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Continue Learning</h2>
              <div className="space-y-3">
                {ACTIVE_COURSES.map((course) => {
                  const subject = SUBJECTS.find((s) => s.id === course.subjectId)!;
                  return (
                    <Link
                      key={course.subjectId}
                      href={`/learn/${course.subjectId}/m${course.moduleNum}/lesson-${course.lessonNum}`}
                      className="glass-card rounded-2xl p-5 flex items-center gap-5 group hover:bg-white/[0.06] transition-all"
                    >
                      <div className="text-4xl">{subject.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white mb-1">{subject.title}</div>
                        <div className="text-xs text-muted-foreground mb-3 truncate">
                          Next: {course.currentLesson}
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-indigo-400">{course.progress}%</div>
                        <div className="text-[10px] text-muted-foreground uppercase mt-1">complete</div>
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
          </div>

          {/* Right: Activity Feed (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div className="glass-card rounded-2xl p-5 space-y-4">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className={cn("flex items-start gap-3", i < RECENT_ACTIVITY.length - 1 && "pb-4 border-b border-white/5")}>
                  <span className="text-lg mt-0.5">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">{activity.action}</div>
                    <div className="text-xs text-muted-foreground truncate">{activity.item}</div>
                    <div className="text-[10px] text-muted-foreground/60 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
