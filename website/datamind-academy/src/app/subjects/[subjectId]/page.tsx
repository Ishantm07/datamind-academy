import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SUBJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { PlayCircle, BookOpen, Trophy, Zap, FileText, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllModulesForSubject } from "@/lib/curriculumModules";

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  const modules = getAllModulesForSubject(params.subjectId);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070d] text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Subject Header Banner */}
        <div className={cn("py-16 md:py-24 border-b relative overflow-hidden", subject.color, subject.borderColor)}>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="text-6xl mb-6 filter drop-shadow-md">{subject.icon}</div>
            <h1 className={cn("text-4xl md:text-5xl font-black mb-4", subject.textColor)}>
              {subject.title}
            </h1>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-6 leading-relaxed">
              {subject.description}
            </p>

            {/* Curriculum Structure Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-8">
              <span>✨ 4 In-Depth Theory Modules • 40 Assessment Questions • Verified Diploma</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/learn/${subject.id}/m1/theory`}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-2xl hover:brightness-110 transition shadow-xl text-sm flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Start Module 1 Theory →
              </Link>
              <Link
                href={`/learn/${subject.id}/m1/1`}
                className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition text-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" /> Jump to Module 1 Challenge (10 Qs)
              </Link>
            </div>
          </div>
        </div>

        {/* Curriculum Modules Syllabus */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Full Course Syllabus & Progression</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Read the comprehensive theory module, then conquer the 10-question challenge to advance!
              </p>
            </div>
            <div className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap">
              4 Modules • 40 Questions
            </div>
          </div>

          <div className="space-y-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-[#0e0f1c] shadow-lg"
              >
                {/* Module Header */}
                <div className="bg-white/[0.03] px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Module {module.number} of 4
                    </span>
                    <h3 className="font-bold text-white text-lg mt-1">{module.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    UNLOCKED
                  </span>
                </div>

                {/* Sub-steps: 1. Theory, 2. 10-Question Challenge */}
                <div className="divide-y divide-white/5">
                  {/* Step A: Theory Reading */}
                  <Link
                    href={`/learn/${subject.id}/${module.id}/theory`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                          <span>{module.number}.1 Theory & Concepts</span>
                          <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                            Reading
                          </span>
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          Comprehensive theoretical guide • {module.duration}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Theory →
                    </span>
                  </Link>

                  {/* Step B: 10-Question Module Challenge */}
                  <Link
                    href={`/learn/${subject.id}/${module.id}/1`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                          <span>{module.number}.2 Module {module.number} Challenge</span>
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            10 Questions
                          </span>
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          Easy, Medium & Hard coding challenges • Dynamic shuffle on retake
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Start 10 Qs →
                    </span>
                  </Link>
                </div>
              </div>
            ))}

            {/* Final Assessment Gate: Grand Final Challenge (40 Questions) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#18182c] via-[#131422] to-[#0c0d16] border border-amber-500/40 p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      CURRICULUM CAPSTONE GATE
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      DIPLOMA AWARDED
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Grand Final Challenge (40 Questions)
                  </h3>
                  <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                    A comprehensive exam combining 10 questions across each of the 4 modules. Pass all 40 questions to earn your verified course diploma! Every retake dynamically reshuffles questions.
                  </p>
                </div>

                <Link
                  href={`/learn/${subject.id}/final-exam/1`}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Award className="w-4 h-4" /> Start Final Challenge →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
