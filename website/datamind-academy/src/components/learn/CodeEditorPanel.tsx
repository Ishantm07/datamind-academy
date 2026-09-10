"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle2, XCircle } from "lucide-react";

export default function CodeEditorPanel({
  initialCode = "",
  language = "python",
}: {
  initialCode?: string;
  language?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Mock code execution delay to simulate WASM/Backend running
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Execution successful!\n> Hello, World!\n> Output: 42");
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-border/10">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] text-gray-300 text-sm border-b border-black/40">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2 py-1 bg-black/30 rounded text-blue-400">
            main.{language === "python" ? "py" : "sql"}
          </span>
        </div>
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-[300px]">
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
          }}
        />
      </div>

      {/* Terminal / Output Console */}
      <div className="h-1/3 min-h-[150px] bg-[#1e1e1e] border-t border-black/40 flex flex-col">
        <div className="px-4 py-1.5 bg-[#252526] text-xs font-medium text-gray-400 uppercase tracking-wider">
          Terminal Output
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto text-gray-300 bg-black/20">
          {output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <span className="text-gray-600 italic">
              Click &quot;Run Code&quot; to see output here...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
