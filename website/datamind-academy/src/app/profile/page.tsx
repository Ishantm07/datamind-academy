"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  ShieldCheck,
  Download,
  Settings,
  Share2,
  ExternalLink,
  Check,
  ArrowLeft,
  Sparkles,
  Lock,
  Unlock,
  RefreshCw,
  LogOut,
  Trophy,
} from "lucide-react";
import {
  getActiveUser,
  getSubjectProgress,
  StoredCertificate,
  ensureAllCompletedCertificatesExist,
  forceRestoreSubjectCertificate,
  SUBJECT_CERT_DETAILS,
  SPECIALIZATION_CERT_DETAILS,
} from "@/lib/progressStore";
import { SUBJECTS } from "@/lib/data";

interface UserProfile {
  name: string;
  email: string;
  xp: number;
  streak: number;
  level: number;
  joinedAt?: string;
  headline?: string;
  goal?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  total: number;
  category: "streak" | "challenges" | "mastery" | "xp";
}

function ProfileContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"accomplishments" | "certificates" | "settings">("accomplishments");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [certificates, setCertificates] = useState<StoredCertificate[]>([]);
  const [totalSolved, setTotalSolved] = useState(0);
  const [subjectProgresses, setSubjectProgresses] = useState<Record<string, number>>({});

  // Settings form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editHeadline, setEditHeadline] = useState("");
  const [editGoal, setEditGoal] = useState("Data Scientist");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reset confirmation modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSubject, setResetSubject] = useState("all");

  useEffect(() => {
    // 0. Read query tab if present (e.g. /profile?tab=certificates)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "certificates" || tab === "settings" || tab === "accomplishments") {
        setActiveTab(tab);
      }
    }

    // 1. Load User Data
    const active = getActiveUser();
    const rawUser = localStorage.getItem("datamind_user");
    let userData: UserProfile = {
      name: active?.name || "DataMind Learner",
      email: active?.email || "student@datamind.academy",
      xp: 0,
      streak: 1,
      level: 1,
      joinedAt: "September 2026",
      headline: "Aspiring Data & AI Engineer",
      goal: "Data Scientist",
    };

    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        userData = { ...userData, ...parsed };
      } catch (e) {}
    }

    setUser(userData);
    setEditName(userData.name);
    setEditEmail(userData.email);
    setEditHeadline(userData.headline || "Aspiring Data & AI Engineer");
    setEditGoal(userData.goal || "Data Scientist");

    // 2. Load & Auto-Heal All Completed Certificates (restores SQL, Python, etc.)
    const verifiedCerts = ensureAllCompletedCertificatesExist(userData.name, userData.email);
    setCertificates(verifiedCerts);

    // 3. Calculate Subject Progress & Total Questions Solved
    const subjectIds = ["sql", "python", "powerbi", "ml", "ai"];
    let solvedCount = 0;
    const pMap: Record<string, number> = {};

    subjectIds.forEach((sid) => {
      const p = getSubjectProgress(sid);
      const count = p.completedQuestionIds?.length || 0;
      pMap[sid] = count;
      solvedCount += count;
    });

    setTotalSolved(solvedCount);
    setSubjectProgresses(pMap);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSyncCertificates = () => {
    const refreshed = ensureAllCompletedCertificatesExist(user?.name, user?.email);
    setCertificates(refreshed);
    showToast("Official academic credentials synchronized and verified successfully!");
  };

  const handleRestoreSubject = (sid: string) => {
    forceRestoreSubjectCertificate(sid, user?.name, user?.email);
    const refreshed = ensureAllCompletedCertificatesExist(user?.name, user?.email);
    setCertificates(refreshed);
    showToast(`Official ${sid.toUpperCase()} Diploma verified and restored to your profile!`);
  };

  // Save updated profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    setIsSaving(true);
    const cleanName = editName.trim();
    const cleanEmail = editEmail.trim();

    // 1. Save to datamind_user
    const updatedUser: UserProfile = {
      ...user!,
      name: cleanName,
      email: cleanEmail,
      headline: editHeadline.trim(),
      goal: editGoal,
    };
    localStorage.setItem("datamind_user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // 2. Synchronize all certificates with new full legal name
    const updatedCerts = ensureAllCompletedCertificatesExist(cleanName, cleanEmail);
    setCertificates(updatedCerts);

    setIsSaving(false);
    showToast("Profile & legal certificate name updated and synced across all credentials!");
  };

  // Export User Data Backup (JSON)
  const handleExportData = () => {
    const backup = {
      user,
      certificates,
      progress: {
        sql: getSubjectProgress("sql"),
        python: getSubjectProgress("python"),
        powerbi: getSubjectProgress("powerbi"),
        ml: getSubjectProgress("ml"),
        ai: getSubjectProgress("ai"),
      },
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DataMind-Portfolio-${user?.name?.replace(/\s+/g, "_") || "User"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Learning portfolio data exported successfully!");
  };

  // Handle Progress Reset
  const handleResetProgress = () => {
    if (resetSubject === "all") {
      ["sql", "python", "powerbi", "ml", "ai"].forEach((sid) => {
        localStorage.removeItem(`datamind_progress_${sid}`);
      });
      localStorage.removeItem("datamind_certificates");
      setCertificates([]);
      setTotalSolved(0);
      setSubjectProgresses({ sql: 0, python: 0, powerbi: 0, ml: 0, ai: 0 });
      showToast("All subject progress and certificates reset.");
    } else {
      localStorage.removeItem(`datamind_progress_${resetSubject}`);
      setSubjectProgresses((prev) => ({ ...prev, [resetSubject]: 0 }));
      showToast(`Progress for ${resetSubject.toUpperCase()} reset.`);
    }
    setShowResetModal(false);
  };

  // Handle Sign out
  const handleLogout = () => {
    localStorage.removeItem("datamind_user");
    router.push("/login");
  };

  // Dynamic Achievements computation
  const achievements: Achievement[] = [
    {
      id: "first_code",
      title: "First Code Executed",
      description: "Successfully solve and submit your first programming challenge",
      icon: "💻",
      isUnlocked: totalSolved >= 1,
      progress: Math.min(totalSolved, 1),
      total: 1,
      category: "challenges",
    },
    {
      id: "ten_solved",
      title: "Problem Solver",
      description: "Complete 10 comprehensive coding challenges",
      icon: "🎯",
      isUnlocked: totalSolved >= 10,
      progress: Math.min(totalSolved, 10),
      total: 10,
      category: "challenges",
    },
    {
      id: "halfway",
      title: "Halfway Master",
      description: "Complete 20 challenges across the curriculum",
      icon: "⚡",
      isUnlocked: totalSolved >= 20,
      progress: Math.min(totalSolved, 20),
      total: 20,
      category: "challenges",
    },
    {
      id: "centurion",
      title: "Centurion Architect",
      description: "Complete 40 comprehensive challenges across any discipline",
      icon: "🛡️",
      isUnlocked: totalSolved >= 40,
      progress: Math.min(totalSolved, 40),
      total: 40,
      category: "challenges",
    },
    {
      id: "subject_champion",
      title: "Subject Champion",
      description: "Earn your first official verified credential and diploma",
      icon: "🏆",
      isUnlocked: certificates.length >= 1,
      progress: Math.min(certificates.length, 1),
      total: 1,
      category: "mastery",
    },
    {
      id: "dual_master",
      title: "Dual Discipline Master",
      description: "Earn 2 or more verified academy diplomas (e.g. SQL + Python)",
      icon: "🎖️",
      isUnlocked: certificates.length >= 2,
      progress: Math.min(certificates.length, 2),
      total: 2,
      category: "mastery",
    },
    {
      id: "polyglot",
      title: "Polyglot Engineer",
      description: "Solve challenges across 2 or more distinct technologies",
      icon: "🌐",
      isUnlocked: Object.values(subjectProgresses).filter((c) => c > 0).length >= 2,
      progress: Math.min(Object.values(subjectProgresses).filter((c) => c > 0).length, 2),
      total: 2,
      category: "mastery",
    },
    {
      id: "streak_7",
      title: "Consistency Master",
      description: "Maintain a learning streak of active daily development",
      icon: "🔥",
      isUnlocked: (user?.streak || 0) >= 1,
      progress: Math.min(user?.streak || 1, 7),
      total: 7,
      category: "streak",
    },
    {
      id: "xp_1000",
      title: "Grand Master",
      description: "Accumulate 1,000+ experience points in the academy",
      icon: "👑",
      isUnlocked: (user?.xp || 0) >= 1000,
      progress: Math.min(user?.xp || 0, 1000),
      total: 1000,
      category: "xp",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-[#07070d] text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Back Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-2xl text-xs text-center font-semibold animate-in fade-in slide-in-from-top-2">
            ✓ {toastMessage}
          </div>
        )}

        {/* =================================================================== */}
        {/* Profile Header Card */}
        {/* =================================================================== */}
        <div className="relative rounded-3xl bg-[#10101c] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 justify-between">
            {/* Left: Avatar & User Identity */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-amber-500 p-1 shadow-xl shadow-indigo-500/20">
                <div className="w-full h-full rounded-2xl bg-[#161626] flex items-center justify-center text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" /> Verified Member
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name}</h1>
                <p className="text-xs sm:text-sm text-gray-400">{user?.headline || "Aspiring Data & AI Engineer"}</p>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span>📧 {user?.email}</span>
                  <span>•</span>
                  <span>🎯 Goal: {user?.goal || "Data Scientist"}</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Stats Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl mb-0.5">⚡</div>
                <div className="text-lg font-black text-white">{user?.xp || 0}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Total XP</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl mb-0.5">🔥</div>
                <div className="text-lg font-black text-white">{user?.streak || 1}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Day Streak</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl mb-0.5">🏆</div>
                <div className="text-lg font-black text-amber-400">{certificates.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Diplomas</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl mb-0.5">🎯</div>
                <div className="text-lg font-black text-emerald-400">{totalSolved}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Challenges</div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* Navigation Tabs */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab("accomplishments")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "accomplishments"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <Trophy className="w-4 h-4" /> Accomplishments & Badges ({unlockedCount}/{achievements.length})
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "certificates"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <Award className="w-4 h-4" /> Diplomas & Credentials ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "settings"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-4 h-4" /> Profile Options & Settings
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: ACCOMPLISHMENTS & BADGES */}
        {/* =================================================================== */}
        {activeTab === "accomplishments" && (
          <div className="space-y-8">
            {/* Accomplishments Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#10101c] p-5 rounded-3xl border border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" /> Your Earned Accomplishments & Diplomas
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Official verified course diplomas, engineering credentials, and learning mastery badges.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncCertificates}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition-all"
                  title="Sync and verify all earned credentials"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Sync Credentials
                </button>
                <span className="text-xs text-amber-400 font-mono font-semibold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap">
                  {certificates.length} Diplomas • {unlockedCount}/{achievements.length} Badges
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* PRIMARY ACCOMPLISHMENTS: EARNED SUBJECT DIPLOMAS              */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Official Subject Diplomas ({certificates.length})
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Accredited diplomas earned upon completing curriculum tracks.
                  </p>
                </div>
                {certificates.length > 0 && (
                  <button
                    onClick={() => setActiveTab("certificates")}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    View All Credentials →
                  </button>
                )}
              </div>

              {certificates.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-[#0d0e18] p-8 text-center space-y-3">
                  <div className="text-4xl">🎓</div>
                  <h4 className="text-sm font-bold text-white">No Subject Diplomas Earned Yet</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                    Complete all 40 challenges in SQL or Python to unlock your official verified certificate!
                  </p>
                  <Link
                    href="/subjects"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg hover:opacity-95 transition-all"
                  >
                    Explore Subject Tracks →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((c) => {
                    const isSpec = c.isSpecialization || c.certificateId.includes("SPEC");
                    const specMeta = isSpec ? SPECIALIZATION_CERT_DETAILS[c.trackId || c.subjectId || "bi-developer"] : null;
                    const meta = isSpec && specMeta
                      ? { icon: specMeta.icon, title: specMeta.title, school: specMeta.faculty }
                      : (SUBJECT_CERT_DETAILS[c.subjectId?.toLowerCase()] || SUBJECT_CERT_DETAILS.python);
                    const certUrl = isSpec
                      ? `/certificate/specialization/${c.trackId || c.subjectId || "bi-developer"}`
                      : `/certificate/${c.certificateId}`;

                    return (
                      <div
                        key={c.certificateId}
                        className={`relative rounded-2xl p-5 flex flex-col justify-between shadow-xl overflow-hidden transition-all group border ${
                          isSpec
                            ? "bg-gradient-to-br from-[#18152e] via-[#121124] to-[#0c0d18] border-amber-500/50 hover:border-amber-400/80 shadow-amber-500/10"
                            : "bg-gradient-to-br from-[#121324] via-[#10111f] to-[#0c0d18] border-amber-500/30 hover:border-amber-500/60"
                        }`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                {meta.icon}
                              </div>
                              <div>
                                {isSpec ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                                    <Award className="w-2.5 h-2.5 text-amber-400" /> SPECIALIZATION MASTER CREDENTIAL
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    <ShieldCheck className="w-2.5 h-2.5" /> VERIFIED DIPLOMA
                                  </span>
                                )}
                                <h4 className="text-sm font-bold text-white mt-1 leading-snug">{c.subjectTitle}</h4>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs text-gray-400 mb-4 bg-white/5 p-3.5 rounded-xl border border-white/5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground">Certified Recipient</span>
                              <span className="font-semibold text-white">{c.recipientName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground">Credential ID</span>
                              <span className="font-mono text-[11px] text-indigo-400 font-semibold">{c.certificateId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground">Issued Date</span>
                              <span className="text-gray-300">{c.issuedAt}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground">Curriculum Score</span>
                              <span className="font-mono font-bold text-amber-400">{c.score} PTS (100% Mastery)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                          <Link
                            href={certUrl}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> {isSpec ? "View Specialization Diploma" : "View Full Diploma"}
                          </Link>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/certificate/${c.certificateId}`);
                              showToast(`Diploma link copied to clipboard!`);
                            }}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
                            title="Copy Verification Link"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECONDARY ACCOMPLISHMENTS: MILESTONES & BADGES                */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> Milestone Badges & Achievements ({unlockedCount}/{achievements.length})
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Engineering milestones unlocked across your learning progression.
                  </p>
                </div>
                <span className="text-xs text-amber-400 font-mono font-semibold">
                  {Math.round((unlockedCount / achievements.length) * 100)}% Complete
                </span>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    item.isUnlocked
                      ? "bg-[#131422] border-amber-500/30 shadow-lg shadow-amber-500/5 hover:border-amber-500/60"
                      : "bg-[#0b0c14] border-white/5 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      {item.isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <Unlock className="w-2.5 h-2.5" /> UNLOCKED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                          <Lock className="w-2.5 h-2.5" /> LOCKED
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{item.description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>Progress</span>
                      <span>
                        {item.progress}/{item.total}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          item.isUnlocked ? "bg-gradient-to-r from-amber-400 to-yellow-500" : "bg-white/20"
                        }`}
                        style={{ width: `${Math.min((item.progress / item.total) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: DIPLOMAS & CREDENTIALS */}
        {/* =================================================================== */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Your Official Credentials</h2>
              <p className="text-xs text-muted-foreground">
                Official verified certificates awarded upon completing 40 challenges in any subject track.
              </p>
            </div>

            {certificates.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#10101c] p-10 text-center space-y-4">
                <div className="text-5xl">🎓</div>
                <h3 className="text-base font-bold text-white">No Diplomas Earned Yet</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Complete all 40 challenges in Python, SQL, Power BI, ML, or AI to unlock your official verified certificate!
                </p>
                <Link
                  href="/subjects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-all"
                >
                  Explore Subjects →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certificates.map((c) => {
                  const isSpec = c.isSpecialization || c.certificateId.startsWith("DM-SPEC");
                  const specMeta = c.trackId ? SPECIALIZATION_CERT_DETAILS[c.trackId] : undefined;
                  const meta = isSpec
                    ? {
                        title: c.subjectTitle || specMeta?.title || "Career Specialization",
                        faculty: specMeta?.faculty || "Career Specialization Board",
                        icon: specMeta?.badge || "🏆",
                        grade: "A+ (Executive Honors)",
                      }
                    : SUBJECT_CERT_DETAILS[c.subjectId?.toLowerCase()] || SUBJECT_CERT_DETAILS.python;
                  const certUrl = isSpec
                    ? `/certificate/specialization/${c.trackId || "bi-developer"}`
                    : `/certificate/${c.certificateId}`;

                  return (
                    <div
                      key={c.certificateId}
                      className={`rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden transition-all border ${
                        isSpec
                          ? "bg-gradient-to-br from-[#191630] via-[#121222] to-[#0c0d18] border-amber-500/50 shadow-amber-500/10"
                          : "bg-gradient-to-br from-[#121320] via-[#10101c] to-[#0c0d16] border-amber-500/30"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                            {meta.icon}
                          </div>
                          <div>
                            {isSpec ? (
                              <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 mb-1">
                                <Award className="w-3 h-3 text-amber-400" /> SPECIALIZATION MASTER DIPLOMA
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3" /> VERIFIED DIPLOMA
                              </div>
                            )}
                            <h3 className="text-base font-bold text-white">{c.subjectTitle}</h3>
                            <div className="text-[11px] font-mono text-indigo-400">ID: {c.certificateId}</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-300 space-y-1.5 pt-2 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Recipient Name:</span>
                          <strong className="text-white font-semibold">{c.recipientName}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Issue Date:</span>
                          <strong className="text-white font-semibold">{c.issuedAt}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{isSpec ? "Accreditation Type:" : "Curriculum Score:"}</span>
                          <span className="font-mono text-amber-400 font-bold">
                            {isSpec ? "Full Dual-Pillar Track Mastery" : `${c.score} PTS (100%)`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Verification Hash:</span>
                          <span className="font-mono text-muted-foreground text-[10px]">
                            {c.verificationHash?.slice(0, 14)}...
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Link
                          href={certUrl}
                          className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> {isSpec ? "View Specialization Diploma" : "View Full Diploma"}
                        </Link>
                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(`${window.location.origin}${certUrl}`);
                              showToast("Certificate verification URL copied!");
                            }
                          }}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs transition-all"
                          title="Share Certificate URL"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Subject Track Progress Overview */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Track Progress Across Disciplines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {SUBJECTS.map((s) => {
                  const solved = subjectProgresses[s.id] || 0;
                  const pct = Math.min(Math.round((solved / 40) * 100), 100);
                  const isFinished = solved >= 40;
                  return (
                    <div key={s.id} className="p-4 rounded-2xl bg-[#0f101a] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{s.icon}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isFinished ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {isFinished ? "COMPLETED" : `${solved}/40`}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{s.title}</div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFinished ? "bg-emerald-500" : "bg-indigo-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {(() => {
                        const modIdx = Math.min(Math.floor(solved / 10) + 1, 4);
                        const qInMod = (solved % 10) + 1;
                        const linkUrl = isFinished
                          ? `/learn/${s.id}/final-exam/1`
                          : solved === 0
                          ? `/learn/${s.id}/m1/theory`
                          : `/learn/${s.id}/m${modIdx}/${qInMod}`;
                        return (
                          <Link
                            href={linkUrl}
                            className="block text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold pt-1 text-right"
                          >
                            {isFinished ? "Review Track →" : "Continue Track →"}
                          </Link>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: PROFILE OPTIONS & SETTINGS */}
        {/* =================================================================== */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-white">Profile Options & Account Settings</h2>
              <p className="text-xs text-muted-foreground">
                Manage your legal credential name, learning career goals, and portfolio data.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="rounded-3xl bg-[#10101c] border border-white/10 p-6 space-y-5">
              {/* Full Legal Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  Full Legal Name (Displayed on Certificates)
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Ishant Mishra"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181828] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
                <p className="text-[11px] text-muted-foreground">
                  This official legal name will automatically appear on all diplomas, verification links, and PDF prints.
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="student@datamind.academy"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181828] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>

              {/* Career Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Primary Learning Goal
                </label>
                <select
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181828] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                >
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Data Engineer">Data Engineer</option>
                </select>
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Professional Bio / Headline
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="e.g. Python Developer & Data Science Enthusiast"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181828] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Profile & Sync Credentials"}
                </button>
              </div>
            </form>

            {/* Credential Recovery & Verification Tools */}
            <div className="rounded-3xl bg-[#10101c] border border-amber-500/20 p-6 space-y-4 shadow-lg shadow-amber-500/5">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Academic Credentials & Diploma Recovery
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Synchronize or restore any earned subject diplomas to your profile accomplishments.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-amber-300">Auto-Scan & Restore All Diplomas</div>
                    <div className="text-[11px] text-gray-400">
                      Checks all subject tracks (SQL, Python, Power BI, ML, AI) and restores any missing certificates.
                    </div>
                  </div>
                  <button
                    onClick={handleSyncCertificates}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow whitespace-nowrap"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-Sync Diplomas
                  </button>
                </div>

                <div className="pt-2 border-t border-amber-500/10 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRestoreSubject("sql")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 border border-amber-500/30 transition-all font-semibold"
                  >
                    🐬 Restore SQL Diploma
                  </button>
                  <button
                    onClick={() => handleRestoreSubject("python")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 border border-amber-500/30 transition-all font-semibold"
                  >
                    🐍 Restore Python Diploma
                  </button>
                </div>
              </div>
            </div>

            {/* Data Export & Reset Options */}
            <div className="rounded-3xl bg-[#10101c] border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Portfolio Data & Safety Controls</h3>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Export Learning Portfolio (JSON)</div>
                  <div className="text-[11px] text-muted-foreground">
                    Download a secure backup of all your earned credentials, XP, and question history.
                  </div>
                </div>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" /> Export Data
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <div>
                  <div className="text-xs font-bold text-rose-300">Reset Subject Curriculum Progress</div>
                  <div className="text-[11px] text-muted-foreground">
                    Clear answers for a subject track if you wish to retake challenges from question 1.
                  </div>
                </div>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/20 transition-all whitespace-nowrap"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Options
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* Reset Confirmation Modal */}
      {/* =================================================================== */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#161726] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-400" /> Reset Subject Progress
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Select which subject progress you want to reset. This allows you to retake questions from the beginning.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-semibold">Choose Subject to Reset:</label>
              <select
                value={resetSubject}
                onChange={(e) => setResetSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#202138] border border-white/10 text-white text-xs focus:outline-none"
              >
                <option value="all">All Subjects & Certificates</option>
                <option value="python">Python Track Only</option>
                <option value="sql">SQL Track Only</option>
                <option value="powerbi">Power BI Track Only</option>
                <option value="ml">Machine Learning Track Only</option>
                <option value="ai">Artificial Intelligence Track Only</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleResetProgress}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-semibold text-xs transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#07070d] text-white">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
