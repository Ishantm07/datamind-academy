"use client";

import { useEffect, useState } from "react";
import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";
import ModuleTheoryReader from "@/components/learn/ModuleTheoryReader";
import ModuleCompletionModal from "@/components/learn/ModuleCompletionModal";
import {
  getOrCreateModuleSession,
  refreshModuleSession,
  getOrCreateGrandFinalSession,
  refreshGrandFinalSession,
  UniversalChallengeSession,
} from "@/lib/universalShuffleEngine";
import { getModuleTheory } from "@/lib/curriculumModules";
import { getChallenge } from "@/lib/curriculumData";
import { markModuleChallengeCompleted } from "@/lib/progressStore";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const subjectId = (params.subjectId || "sql").toLowerCase();
  const moduleId = (params.moduleId || "m1").toLowerCase();
  const lessonId = (params.lessonId || "theory").toLowerCase();

  const isTheoryView = lessonId === "theory";
  const isFinalExam = moduleId === "final-exam" || moduleId === "final-challenge" || moduleId === "final";
  const totalQuestions = isFinalExam ? 40 : 10;
  const lessonNum = parseInt(lessonId.replace(/\D/g, "") || "1", 10);

  const [session, setSession] = useState<UniversalChallengeSession | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Load session when in challenge mode
  useEffect(() => {
    if (!isTheoryView) {
      if (isFinalExam) {
        const sess = getOrCreateGrandFinalSession(subjectId);
        setSession(sess);
      } else {
        const sess = getOrCreateModuleSession(subjectId, moduleId);
        setSession(sess);
      }
    }
  }, [subjectId, moduleId, isTheoryView, isFinalExam]);

  // If in dedicated theory reading view, render ModuleTheoryReader
  if (isTheoryView) {
    const theoryModule = getModuleTheory(subjectId, moduleId);
    if (theoryModule) {
      return (
        <ModuleTheoryReader
          subjectId={subjectId}
          module={theoryModule}
        />
      );
    }
  }

  const handleShuffleSession = () => {
    if (isFinalExam) {
      const fresh = refreshGrandFinalSession(subjectId);
      setSession(fresh);
    } else {
      const fresh = refreshModuleSession(subjectId, moduleId);
      setSession(fresh);
    }
  };

  const handleModuleCompleted = () => {
    markModuleChallengeCompleted(subjectId, moduleId, 250);
    setShowCompletionModal(true);
  };

  // Determine language
  const getLanguage = (sid: string) => {
    switch (sid) {
      case "sql":
        return "sql";
      case "powerbi":
        return "dax";
      default:
        return "python";
    }
  };

  // Pick current question from session
  let currentQuestion: any = null;
  if (session && session.questions.length > 0) {
    const qIndex = (Math.max(1, lessonNum) - 1) % session.questions.length;
    currentQuestion = session.questions[qIndex];
  } else {
    currentQuestion = getChallenge(subjectId, moduleId, lessonId);
  }

  const moduleNum = parseInt(moduleId.replace(/\D/g, "") || "1", 10);

  return (
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      {/* Left Pane: Question Description, Schemas, Hints, Back/Theory navigation */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <TheoryPanel
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          lessonTitle={currentQuestion?.title || `${subjectId.toUpperCase()} Challenge ${lessonNum}`}
          difficulty={currentQuestion?.difficulty || "MEDIUM"}
          points={currentQuestion?.points || 25}
          problemStatement={currentQuestion?.problemStatement}
          sampleInput={currentQuestion?.sampleInput}
          sampleOutput={currentQuestion?.sampleOutput}
          constraints={currentQuestion?.constraints}
          tableSchema={currentQuestion?.tableSchema}
          hints={currentQuestion?.hints}
          questionIndex={Math.min(lessonNum, totalQuestions)}
          totalQuestions={totalQuestions}
          onShuffleNewSession={handleShuffleSession}
        />
      </div>

      {/* Right Pane: Monaco Code Editor & Test Case Evaluation */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={currentQuestion?.language || getLanguage(subjectId)}
          initialCode={
            currentQuestion?.initialCode ||
            (subjectId === "python" ? "# Write your solution here\n" : "-- Write your solution here\n")
          }
          solutionCode={currentQuestion?.solutionCode}
          sampleInput={currentQuestion?.sampleInput}
          sampleOutput={currentQuestion?.sampleOutput}
          constraints={currentQuestion?.constraints}
          tableSchema={currentQuestion?.tableSchema}
          points={currentQuestion?.points || 25}
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          questionId={currentQuestion?.id || `${subjectId}-${moduleId}-${lessonNum}`}
          questionIndex={Math.min(lessonNum, totalQuestions)}
          totalQuestions={totalQuestions}
          isFinalExam={isFinalExam}
          onModuleCompleted={handleModuleCompleted}
        />
      </div>

      {/* Module Completion Modal (pops up on passing 10th question of a module challenge) */}
      {showCompletionModal && (
        <ModuleCompletionModal
          subjectId={subjectId}
          moduleId={moduleId}
          moduleNumber={moduleNum}
          totalScore={250}
          onRetakeShuffled={() => {
            handleShuffleSession();
            setShowCompletionModal(false);
          }}
          onClose={() => setShowCompletionModal(false)}
        />
      )}
    </main>
  );
}
