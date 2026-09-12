"use client";

import { useEffect, useState } from "react";
import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";
import { getOrCreateSession, refreshSession, UniversalChallengeSession } from "@/lib/universalShuffleEngine";
import { getChallenge } from "@/lib/curriculumData";
import { INTEGRATED_SQL_MODULES, INTEGRATED_PYTHON_MODULES } from "@/lib/integratedCurriculum";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const subjectId = params.subjectId || "sql";
  const moduleId = params.moduleId || "m1";
  const lessonId = params.lessonId || "lesson-1";

  const lessonNum = parseInt(lessonId.replace(/\D/g, "") || "1", 10);
  const [session, setSession] = useState<UniversalChallengeSession | null>(null);

  useEffect(() => {
    // Load or create a 40-question session for any subject
    const sess = getOrCreateSession(subjectId);
    setSession(sess);
  }, [subjectId]);

  const handleShuffleNewSession = () => {
    const freshSession = refreshSession(subjectId);
    setSession(freshSession);
  };

  // Check integrated module curriculum (SQL and Python have detailed lessons)
  const moduleList =
    subjectId === "python"
      ? INTEGRATED_PYTHON_MODULES
      : subjectId === "sql"
      ? INTEGRATED_SQL_MODULES
      : [];
  const targetModule = moduleList.find((m) => m.id === moduleId);
  const targetLesson = targetModule?.lessons.find((l) => l.id === lessonId);

  // Determine the language for this subject
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

  let currentQuestion: any = null;

  if (targetLesson) {
    // Priority 1: Integrated curriculum lesson (SQL/Python theory + exercises)
    currentQuestion = {
      title: targetLesson.title,
      difficulty: targetLesson.difficulty || "EASY",
      points: targetLesson.points || 20,
      problemStatement: targetLesson.type === "THEORY" ? targetLesson.theoryMarkdown : targetLesson.problemStatement,
      sampleInput: targetLesson.sampleInput,
      sampleOutput: targetLesson.sampleOutput,
      constraints: targetLesson.constraints,
      tableSchema: targetLesson.tableSchema,
      hints: targetLesson.hints,
      initialCode: targetLesson.initialCode || (subjectId === "python" ? "# Write your solution here\n" : "-- Write solution here\n"),
      solutionCode: targetLesson.solutionCode,
      language: targetLesson.language || getLanguage(subjectId),
    };
  } else if (session && session.questions.length > 0) {
    // Priority 2: Shuffled session question (works for ALL subjects)
    const qIndex = (lessonNum - 1) % session.questions.length;
    currentQuestion = session.questions[qIndex];
  } else {
    // Priority 3: Fallback to curriculumData static challenges
    currentQuestion = getChallenge(subjectId, moduleId, lessonId);
  }

  return (
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      {/* Left Pane: Problem Statement / Theory, Schema, Hints, Navigation (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <TheoryPanel
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          lessonTitle={currentQuestion?.title || `${subjectId.toUpperCase()} Challenge`}
          difficulty={currentQuestion?.difficulty || "MEDIUM"}
          points={currentQuestion?.points || 30}
          problemStatement={currentQuestion?.problemStatement}
          sampleInput={currentQuestion?.sampleInput}
          sampleOutput={currentQuestion?.sampleOutput}
          constraints={currentQuestion?.constraints}
          tableSchema={currentQuestion?.tableSchema}
          hints={currentQuestion?.hints}
          questionIndex={Math.min(lessonNum, 40)}
          totalQuestions={40}
          onShuffleNewSession={handleShuffleNewSession}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={currentQuestion?.language || getLanguage(subjectId)}
          initialCode={currentQuestion?.initialCode || (subjectId === "python" ? "# Write your solution here\n" : "-- Write your solution here\n")}
          solutionCode={currentQuestion?.solutionCode}
          sampleInput={currentQuestion?.sampleInput}
          sampleOutput={currentQuestion?.sampleOutput}
          constraints={currentQuestion?.constraints}
          tableSchema={currentQuestion?.tableSchema}
          points={currentQuestion?.points || 30}
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          questionId={currentQuestion?.id || lessonId}
          questionIndex={Math.min(lessonNum, 40)}
          totalQuestions={40}
        />
      </div>
    </main>
  );
}
