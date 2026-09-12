"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  Code2,
  Sparkles,
  Zap,
  Copy,
  Check,
  Award,
  ChevronRight,
} from "lucide-react";
import { SubjectCourseModule } from "@/lib/curriculumModules";
import { markTheoryCompleted, isTheoryCompleted, isModuleChallengeCompleted } from "@/lib/progressStore";

interface ModuleTheoryReaderProps {
  subjectId: string;
  module: SubjectCourseModule;
  onStartChallenge?: () => void;
}

export default function ModuleTheoryReader({
  subjectId,
  module,
  onStartChallenge,
}: ModuleTheoryReaderProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [hasCompletedTheory, setHasCompletedTheory] = useState<boolean>(() => {
    return isTheoryCompleted(subjectId, module.id);
  });

  const challengeCompleted = isModuleChallengeCompleted(subjectId, module.id);

  const handleMarkAsRead = () => {
    markTheoryCompleted(subjectId, module.id);
    setHasCompletedTheory(true);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-foreground flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0d16]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/subjects/${subjectId}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Syllabus
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            Module {module.number} Theory
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{module.duration}</span>
          </div>

          <Link
            href={`/learn/${subjectId}/${module.id}/1`}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> Start Challenge (10 Qs) →
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Module Hero Title Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#121324] via-[#10101c] to-[#0c0d16] border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              {subjectId.toUpperCase()} Track • Module {module.number} of 4
            </span>
            {hasCompletedTheory && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Theory Read
              </span>
            )}
            {challengeCompleted && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Award className="w-3.5 h-3.5" /> Challenge Passed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {module.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            {module.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-white/5">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-400" /> {module.readingMinutes} min estimated read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Code2 className="w-4 h-4 text-indigo-400" /> 10 Assessment Challenges
            </span>
          </div>
        </div>

        {/* Markdown Theory Article */}
        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-h3:text-base prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-code:text-amber-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children, ...props }) => (
                <div className="relative group my-4 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0e18]">
                  <pre {...props} className="p-4 overflow-x-auto text-xs font-mono text-gray-200 leading-relaxed">
                    {children}
                  </pre>
                </div>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-mono text-xs" {...props}>
                      {children}
                    </code>
                  );
                }
                const codeString = String(children).replace(/\n$/, "");
                return (
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(codeString)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all text-xs flex items-center gap-1"
                      title="Copy code"
                    >
                      {copiedCode === codeString ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </div>
                );
              },
              blockquote: ({ children }) => (
                <div className="my-4 p-4 rounded-2xl bg-indigo-500/10 border-l-4 border-indigo-400 text-indigo-200 text-sm">
                  {children}
                </div>
              ),
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-xs border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="bg-white/5 p-3 font-bold text-white border-b border-white/10">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-3 border-b border-white/5 text-gray-300">
                  {children}
                </td>
              ),
            }}
          >
            {module.theoryMarkdown}
          </ReactMarkdown>
        </article>

        {/* Key Takeaways Section */}
        {module.keyTakeaways && module.keyTakeaways.length > 0 && (
          <div className="rounded-3xl bg-[#10101c] border border-amber-500/20 p-6 sm:p-8 space-y-4 shadow-lg shadow-amber-500/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Module {module.number} Key Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {module.keyTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Gate to Module Challenge */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              PRACTICAL ASSESSMENT GATE
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to test Module {module.number} knowledge?
            </h3>
            <p className="text-xs text-gray-300 max-w-lg leading-relaxed">
              Complete the 10-question challenge (Easy, Medium & Hard) to prove mastery and unlock Module {module.number < 4 ? module.number + 1 : "Final Exam"}!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {!hasCompletedTheory && (
              <button
                onClick={handleMarkAsRead}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition-all text-center"
              >
                Mark as Read
              </button>
            )}

            <Link
              href={`/learn/${subjectId}/${module.id}/1`}
              onClick={handleMarkAsRead}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Start 10-Question Challenge</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar */}
      <footer className="sticky bottom-0 z-30 bg-[#0c0d16]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between text-xs">
        <Link
          href={`/subjects/${subjectId}`}
          className="text-muted-foreground hover:text-white transition-colors"
        >
          ← Course Overview
        </Link>

        <div className="flex items-center gap-3">
          {module.number > 1 && (
            <Link
              href={`/learn/${subjectId}/m${module.number - 1}/theory`}
              className="text-muted-foreground hover:text-white transition-colors"
            >
              ← Module {module.number - 1} Theory
            </Link>
          )}
          <Link
            href={`/learn/${subjectId}/${module.id}/1`}
            className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Launch Challenge →
          </Link>
        </div>
      </footer>
    </div>
  );
}
