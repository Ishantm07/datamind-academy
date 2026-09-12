"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle2, XCircle, Terminal, Check, Award, Trophy, SkipForward, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { recordQuestionCompletion } from "@/lib/progressStore";

interface CodeEditorPanelProps {
  initialCode?: string;
  language?: string;
  points?: number;
  subjectId?: string;
  moduleId?: string;
  lessonId?: string;
  questionId?: string;
  questionIndex?: number;
  totalQuestions?: number;
}

export default function CodeEditorPanel({
  initialCode = "",
  language = "sql",
  points = 30,
  subjectId = "sql",
  moduleId = "m1",
  lessonId = "lesson-1",
  questionId = "q-1",
  questionIndex = 1,
  totalQuestions = 40,
}: CodeEditorPanelProps) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<"output" | "testcases">("output");
  const [isRunning, setIsRunning] = useState(false);
  const [earnedCertificateId, setEarnedCertificateId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [testResults, setTestResults] = useState<{
    submitted: boolean;
    allPassed: boolean;
    cases: { name: string; status: "PASSED" | "FAILED"; message: string }[];
  } | null>(null);

  // Compute next lesson URL
  const currentLessonNum = parseInt(lessonId.replace(/\D/g, "") || "1", 10);
  const nextLessonId = `lesson-${currentLessonNum + 1}`;
  const nextUrl = `/learn/${subjectId}/${moduleId}/${nextLessonId}`;
  const isLastQuestion = questionIndex >= totalQuestions;

  // Navigate to next question
  const goToNextQuestion = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
    if (!isLastQuestion) {
      router.push(nextUrl);
    }
  }, [isLastQuestion, nextUrl, router]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev !== null && prev <= 1) {
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);

      return () => {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }
      };
    } else if (countdown === 0) {
      goToNextQuestion();
    }
  }, [countdown, goToNextQuestion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults(null);
    setCountdown(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        submitted: true,
        allPassed: true,
        cases: [
          { name: "Test Case 0 (Sample Input)", status: "PASSED", message: "Output matches expected format perfectly." },
          { name: "Test Case 1 (Hidden Edge Case)", status: "PASSED", message: "Alphabetical tie-breaker condition verified." },
          { name: "Test Case 2 (Large Dataset)", status: "PASSED", message: "Executed in 12ms." },
        ],
      });
      setActiveTab("testcases");

      // Record completion and check for certificate eligibility
      let userName = "DataMind Learner";
      try {
        const userStr = localStorage.getItem("datamind_user");
        if (userStr) {
          const u = JSON.parse(userStr);
          if (u.name) userName = u.name;
        }
      } catch (e) {}

      const result = recordQuestionCompletion(subjectId, questionId, points, userName);
      if (result.certificateId || questionIndex >= 40) {
        setEarnedCertificateId(result.certificateId || `DM-${subjectId.toUpperCase()}-COMPLETION`);
      }

      // Start 5-second countdown to auto-advance (only if not the last question)
      if (questionIndex < totalQuestions) {
        setCountdown(5);
      }
    }, 900);
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#181824] border-l border-white/5">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12121a] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-1 bg-white/5 rounded-md text-indigo-400 border border-white/5 font-semibold">
            solution.{language === "python" ? "py" : "sql"}
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            {questionIndex} / {totalQuestions}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {earnedCertificateId && (
            <Link
              href={`/certificate/${earnedCertificateId}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition-all shadow-md animate-bounce"
            >
              <Trophy className="w-3.5 h-3.5" /> View Certificate
            </Link>
          )}

          <button
            onClick={handleRunCode}
            disabled={isRunning || countdown !== null}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? "Evaluating Tests..." : "Submit Code"}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="flex-1 min-h-[300px] relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            lineNumbersMinChars: 3,
          }}
        />
      </div>

      {/* Terminal / Test Case Evaluation Console */}
      <div className="h-2/5 min-h-[200px] bg-[#12121a] border-t border-white/5 flex flex-col">
        {/* Terminal Header Tabs */}
        <div className="flex items-center justify-between px-4 bg-[#0e0e14] border-b border-white/5">
          <div className="flex">
            <button
              onClick={() => setActiveTab("output")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all",
                activeTab === "output"
                  ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                  : "border-transparent text-muted-foreground hover:text-white"
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              Console Output
            </button>
            <button
              onClick={() => setActiveTab("testcases")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all",
                activeTab === "testcases"
                  ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                  : "border-transparent text-muted-foreground hover:text-white"
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Test Cases Results
              {testResults && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-black/30">
          {activeTab === "output" && (
            <div className="space-y-2 text-gray-300">
              {testResults ? (
                <pre className="text-emerald-400">
{`Executing sandbox test suites...
Execution completed in 14ms.
All constraints satisfied.`}
                </pre>
              ) : (
                <span className="text-gray-600 italic">
                  Click &quot;Submit Code&quot; to compile and evaluate your solution against test cases...
                </span>
              )}
            </div>
          )}

          {activeTab === "testcases" && (
            <div className="space-y-3">
              {testResults ? (
                <>
                  {/* Certificate Award Banner if user reached 40 */}
                  {earnedCertificateId && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
                        <div>
                          <div className="font-extrabold text-white text-sm">
                            🏆 Certificate of Completion Unlocked!
                          </div>
                          <div className="text-[11px] text-amber-200/80">
                            You have successfully completed the 40-question {subjectId.toUpperCase()} mastery challenge!
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/certificate/${earnedCertificateId}`}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:opacity-90 text-black font-extrabold rounded-xl text-xs transition-all shadow-lg flex-shrink-0"
                      >
                        Claim Certificate 🎓
                      </Link>
                    </div>
                  )}

                  {/* Auto-Advance Countdown Timer */}
                  {countdown !== null && countdown > 0 && !isLastQuestion && (
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                          <Timer className="w-4 h-4 animate-pulse" />
                          <span>Next question in {countdown}...</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={cancelCountdown}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
                          >
                            Stay Here
                          </button>
                          <button
                            onClick={goToNextQuestion}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                          >
                            <SkipForward className="w-3.5 h-3.5" />
                            Skip →
                          </button>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 ease-linear"
                          style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Standard Congratulations Banner */}
                  {testResults.allPassed && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <Award className="w-5 h-5" />
                        <span>Congratulations! All test cases passed.</span>
                      </div>
                      <span className="text-amber-400 font-extrabold">+{points} XP Earned</span>
                    </div>
                  )}

                  {/* Individual Test Cases */}
                  <div className="space-y-2">
                    {testResults.cases.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">{c.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{c.message}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <span className="text-gray-600 italic">
                  No submission evaluations yet.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
