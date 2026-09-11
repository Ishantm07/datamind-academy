"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle2, XCircle, Terminal, Check, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorPanelProps {
  initialCode?: string;
  language?: string;
  points?: number;
}

export default function CodeEditorPanel({
  initialCode = "",
  language = "sql",
  points = 30,
}: CodeEditorPanelProps) {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<"output" | "testcases">("output");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    submitted: boolean;
    allPassed: boolean;
    cases: { name: string; status: "PASSED" | "FAILED"; message: string }[];
  } | null>(null);

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults(null);

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
    }, 900);
  };

  return (
    <div className="flex flex-col h-full bg-[#181824] border-l border-white/5">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12121a] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-1 bg-white/5 rounded-md text-indigo-400 border border-white/5 font-semibold">
            solution.{language === "python" ? "py" : "sql"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? "Running Tests..." : "Submit Code"}
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
{`Executing SQL Query against sandbox database...
Query completed in 12ms. 
9 rows returned.`}
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
                  {/* Congratulations Banner */}
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
