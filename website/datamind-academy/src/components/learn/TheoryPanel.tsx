"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, HelpCircle, FileText, Database, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TheoryPanelProps {
  subjectId?: string;
  moduleId?: string;
  lessonId?: string;
  lessonTitle?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  points?: number;
  problemStatement?: string;
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string[];
  tableSchema?: { tableName: string; columns: { name: string; type: string }[] };
  hints?: string[];
  questionIndex?: number;
  totalQuestions?: number;
  onShuffleNewSession?: () => void;
}

export default function TheoryPanel({
  subjectId = "sql",
  moduleId = "m1",
  lessonId = "lesson-1",
  lessonTitle = "The Occupations PADS Challenge",
  difficulty = "MEDIUM",
  points = 30,
  problemStatement,
  sampleInput,
  sampleOutput,
  constraints,
  tableSchema,
  hints,
  questionIndex = 1,
  totalQuestions = 40,
  onShuffleNewSession,
}: TheoryPanelProps) {
  const [activeTab, setActiveTab] = useState<"problem" | "input_schema" | "hints">("problem");

  // Extract numeric lesson number from string like "lesson-1"
  const currentNum = parseInt(lessonId.replace(/\D/g, "") || "1", 10);
  const prevLessonNum = Math.max(1, currentNum - 1);
  const nextLessonNum = currentNum + 1;

  const prevHref = `/learn/${subjectId}/${moduleId}/lesson-${prevLessonNum}`;
  const nextHref = `/learn/${subjectId}/${moduleId}/lesson-${nextLessonNum}`;

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto border-r border-white/5">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/subjects/${subjectId}`}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Syllabus
          </Link>
          {moduleId && !moduleId.includes("final") && (
            <Link
              href={`/learn/${subjectId}/${moduleId}/theory`}
              className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20"
              title="Review Module Theory"
            >
              <FileText className="w-3 h-3" /> Theory
            </Link>
          )}
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-mono">
            Q {questionIndex} / {totalQuestions}
          </span>
        </div>
        
        {/* Difficulty, XP Badge & Shuffle New Pool */}
        <div className="flex items-center gap-2">
          {onShuffleNewSession && (
            <button
              onClick={onShuffleNewSession}
              className="text-[10px] font-bold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/20 transition-all flex items-center gap-1"
              title={`Generate a fresh randomized set of ${totalQuestions} questions`}
            >
              <span>🔀</span> Reshuffle
            </button>
          )}
          <span
            className={cn(
              "text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider",
              difficulty === "EASY" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
              difficulty === "MEDIUM" && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
              difficulty === "HARD" && "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            )}
          >
            {difficulty}
          </span>
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            +{points} XP
          </span>
        </div>
      </div>

      {/* Tab Selector (HackerRank Style) */}
      <div className="flex border-b border-white/5 bg-white/[0.02] px-4">
        {[
          { id: "problem", label: "Problem Statement", icon: FileText },
          { id: "input_schema", label: subjectId === "python" ? "Signature & Params" : "Input Schema", icon: Database },
          { id: "hints", label: "Hints & Discussion", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all",
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        {activeTab === "problem" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
                Challenge 0{currentNum} • {subjectId.toUpperCase()} Track
              </span>
              <h1 className="text-2xl font-black text-white">{lessonTitle}</h1>
            </div>

            {/* Narrative Problem Description */}
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-4">
              <p className="whitespace-pre-wrap">{problemStatement || "Solve the challenge using the code editor on the right."}</p>
            </div>

            {/* Sample Input Preview */}
            {sampleInput && (
              <div className="glass-card rounded-xl p-4 border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sample Input:</h4>
                <pre className="bg-black/40 p-3 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
                  {sampleInput}
                </pre>
              </div>
            )}

            {/* Sample Output Preview */}
            {sampleOutput && (
              <div className="glass-card rounded-xl p-4 border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sample Output:</h4>
                <pre className="bg-black/40 p-3 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                  {sampleOutput}
                </pre>
              </div>
            )}

            {/* Constraints */}
            {constraints && constraints.length > 0 && (
              <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4 space-y-1">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> Constraints:
                </h4>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                  {constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "input_schema" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">
              {subjectId === "python" ? "Function & Parameter Specification" : "Database Table Schemas"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {subjectId === "python"
                ? "The signature and input/return data types required for this challenge:"
                : "The following schema defines the tables available in the current database environment:"}
            </p>

            {tableSchema ? (
              <div className="glass-card rounded-xl p-5 border border-white/5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-sm font-bold text-indigo-400">
                    {subjectId === "python" ? tableSchema.tableName : `${tableSchema.tableName} Table`}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono">
                    {subjectId === "python" ? `${tableSchema.columns.length} Parameters / Returns` : `${tableSchema.columns.length} Columns`}
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-muted-foreground border-b border-white/5 pb-1">
                    <span>{subjectId === "python" ? "Parameter / Return" : "Column Name"}</span>
                    <span>Type Definition</span>
                  </div>
                  {tableSchema.columns.map((col, i) => (
                    <div key={i} className="flex justify-between text-white">
                      <span>{col.name}</span>
                      <span className="text-amber-400">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic">Standard environment schema active.</div>
            )}
          </div>
        )}

        {activeTab === "hints" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Need a Nudge?</h3>
            {hints && hints.length > 0 ? (
              hints.map((h, i) => (
                <div key={i} className="glass-card rounded-xl p-4 border border-indigo-500/20 bg-indigo-500/5">
                  <h4 className="text-xs font-bold text-indigo-400 mb-1">💡 Hint {i + 1}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{h}</p>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted-foreground italic">No hints available for this challenge.</div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions Bar with Working Navigation Links */}
      <div className="sticky bottom-0 p-4 border-t border-white/5 bg-background/95 backdrop-blur flex justify-between items-center">
        {currentNum > 1 ? (
          <Link
            href={prevHref}
            className="text-xs font-semibold text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
          >
            ← Previous Problem
          </Link>
        ) : (
          <span className="text-xs font-semibold text-muted-foreground/30 cursor-not-allowed">
            ← First Problem
          </span>
        )}

        <Link
          href={nextHref}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
        >
          Next Challenge →
        </Link>
      </div>
    </div>
  );
}
