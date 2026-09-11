"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, HelpCircle, FileText, Database, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TheoryPanelProps {
  subjectId?: string;
  lessonTitle?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  points?: number;
}

export default function TheoryPanel({
  subjectId = "sql",
  lessonTitle = "Occupations & Salary Analysis",
  difficulty = "MEDIUM",
  points = 30,
}: TheoryPanelProps) {
  const [activeTab, setActiveTab] = useState<"problem" | "input_schema" | "hints">("problem");

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto border-r border-white/5">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            href={`/subjects/${subjectId}`}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to Syllabus
          </Link>
        </div>
        
        {/* Difficulty & XP Badge */}
        <div className="flex items-center gap-2">
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
          { id: "input_schema", label: "Input Schema", icon: Database },
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
                Challenge 04 • Data Aggregations
              </span>
              <h1 className="text-2xl font-black text-white">{lessonTitle}</h1>
            </div>

            {/* Narrative Problem Description */}
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>
                Generate an alphabetically ordered list of all names in the <code className="text-indigo-300">EMPLOYEES</code> table,
                followed by the first letter of each profession in parentheses (e.g., <code className="text-amber-300">Name(P)</code>).
              </p>
              <p>
                Next, query the count of occurrences of each occupation and output them formatted as:
                <br />
                <code className="text-emerald-300">There are a total of [count] [occupation]s.</code>
              </p>
            </div>

            {/* Sample Input Preview */}
            <div className="glass-card rounded-xl p-4 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sample Input:</h4>
              <pre className="bg-black/40 p-3 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
{`+-----------+------------+--------+
| Name      | Occupation | Salary |
+-----------+------------+--------+
| Samantha  | Doctor     | 95000  |
| Julia     | Actor      | 82000  |
| Maria     | Actor      | 88000  |
| Meera     | Singer     | 72000  |
| Ashely    | Professor  | 91000  |
+-----------+------------+--------+`}
              </pre>
            </div>

            {/* Sample Output Preview */}
            <div className="glass-card rounded-xl p-4 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sample Output:</h4>
              <pre className="bg-black/40 p-3 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
{`Ashely(P)
Julia(A)
Maria(A)
Meera(S)
Samantha(D)
There are a total of 2 actors.
There are a total of 1 doctor.
There are a total of 1 professor.
There are a total of 1 singer.`}
              </pre>
            </div>

            {/* Constraints */}
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4 space-y-1">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚠️</span> Constraints:
              </h4>
              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                <li>Occupation names in the summary must be in lowercase.</li>
                <li>Results must be sorted alphabetically by occupation count ascending, then by occupation name.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "input_schema" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Database Table Schemas</h3>
            <p className="text-xs text-muted-foreground">
              The following schema defines the tables available in the current database environment:
            </p>

            <div className="glass-card rounded-xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-mono text-sm font-bold text-indigo-400">EMPLOYEES Table</span>
                <span className="text-[10px] text-muted-foreground uppercase font-mono">5 Rows</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-muted-foreground border-b border-white/5 pb-1">
                  <span>Column Name</span>
                  <span>Data Type</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>ID</span>
                  <span className="text-amber-400">INTEGER (PK)</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Name</span>
                  <span className="text-blue-400">VARCHAR(50)</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Occupation</span>
                  <span className="text-blue-400">VARCHAR(50)</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Salary</span>
                  <span className="text-emerald-400">INTEGER</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hints" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Need a Nudge?</h3>
            <div className="glass-card rounded-xl p-4 border border-indigo-500/20 bg-indigo-500/5">
              <h4 className="text-xs font-bold text-indigo-400 mb-1">💡 Hint 1: Concatenation</h4>
              <p className="text-xs text-muted-foreground">
                Use <code className="text-indigo-300">CONCAT(Name, &apos;(&apos;, SUBSTR(Occupation, 1, 1), &apos;)&apos;)</code> in SQL to format strings.
              </p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-indigo-500/20 bg-indigo-500/5">
              <h4 className="text-xs font-bold text-indigo-400 mb-1">💡 Hint 2: Lowercase & Count</h4>
              <p className="text-xs text-muted-foreground">
                Use <code className="text-indigo-300">LOWER(Occupation)</code> combined with <code className="text-indigo-300">COUNT(*)</code> and <code className="text-indigo-300">GROUP BY Occupation</code>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div className="sticky bottom-0 p-4 border-t border-white/5 bg-background/95 backdrop-blur flex justify-between items-center">
        <button className="text-xs font-medium text-muted-foreground hover:text-white transition-colors">
          ← Previous Problem
        </button>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
          Next Challenge →
        </button>
      </div>
    </div>
  );
}
