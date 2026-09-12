"use client";

import Link from "next/link";
import { Trophy, RefreshCw, BookOpen, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface ModuleCompletionModalProps {
  subjectId: string;
  moduleId: string;
  moduleNumber: number;
  totalScore: number;
  onRetakeShuffled: () => void;
  onClose: () => void;
}

export default function ModuleCompletionModal({
  subjectId,
  moduleId,
  moduleNumber,
  totalScore,
  onRetakeShuffled,
  onClose,
}: ModuleCompletionModalProps) {
  const isLastModule = moduleNumber >= 4;
  const nextModuleNum = moduleNumber + 1;
  const nextTheoryHref = isLastModule
    ? `/learn/${subjectId}/final-exam/1`
    : `/learn/${subjectId}/m${nextModuleNum}/theory`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#18182c] via-[#121320] to-[#0c0d16] border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 mx-auto shadow-xl shadow-amber-500/20 animate-bounce">
          <div className="w-full h-full rounded-[22px] bg-[#121320] flex items-center justify-center text-3xl">
            {isLastModule ? "👑" : "🎉"}
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Module {moduleNumber} Challenge Passed!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isLastModule ? "All 4 Modules Completed!" : `Module ${moduleNumber} Mastered`}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
            {isLastModule
              ? "Incredible work! You've conquered all 4 module challenges. The Grand Final Challenge (40 Questions) is now unlocked!"
              : `You passed all 10 challenges for Module ${moduleNumber}. You are ready for Module ${nextModuleNum} Theory!`}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Challenges Passed</div>
            <div className="text-lg font-black text-white mt-0.5">10 / 10 (100%)</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Points Earned</div>
            <div className="text-lg font-black text-amber-400 mt-0.5">+{totalScore || 250} XP</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Link
            href={nextTheoryHref}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>
              {isLastModule ? "Launch Grand Final Challenge (40 Qs) →" : `Start Module ${nextModuleNum} Theory →`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={onRetakeShuffled}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-purple-400" /> Retake Shuffled
            </button>
            <Link
              href={`/learn/${subjectId}/${moduleId}/theory`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Review Theory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
