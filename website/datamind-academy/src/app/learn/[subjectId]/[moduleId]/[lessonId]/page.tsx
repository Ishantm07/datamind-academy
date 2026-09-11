"use client";

import { useEffect, useState } from "react";
import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";
import { getOrSession40Questions, generate40QuestionSession, ShuffledChallengeSession } from "@/lib/sqlShuffleEngine";
import { getChallenge } from "@/lib/curriculumData";
import { INTEGRATED_SQL_MODULES } from "@/lib/integratedCurriculum";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const subjectId = params.subjectId || "sql";
  const moduleId = params.moduleId || "m1";
  const lessonId = params.lessonId || "lesson-1";

  const lessonNum = parseInt(lessonId.replace(/\D/g, "") || "1", 10);
  const [session, setSession] = useState<ShuffledChallengeSession | null>(null);

  useEffect(() => {
    if (subjectId === "sql") {
      const sess = getOrSession40Questions();
      setSession(sess);
    }
  }, [subjectId]);

  const handleShuffleNewSession = () => {
    const freshSession = generate40QuestionSession();
    localStorage.setItem("datamind_sql_40_session", JSON.stringify(freshSession));
    setSession(freshSession);
  };

  // Check integrated module curriculum
  const targetModule = INTEGRATED_SQL_MODULES.find((m) => m.id === moduleId);
  const targetLesson = targetModule?.lessons.find((l) => l.id === lessonId);

  let currentQuestion: any = null;

  if (targetLesson) {
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
      initialCode: targetLesson.initialCode || "-- Write solution here\n",
      language: targetLesson.language || "sql",
    };
  } else if (subjectId === "sql" && session && session.questions.length > 0) {
    const qIndex = (lessonNum - 1) % session.questions.length;
    currentQuestion = session.questions[qIndex];
  } else {
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
          lessonTitle={currentQuestion?.title || "SQL Challenge"}
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
          onShuffleNewSession={subjectId === "sql" ? handleShuffleNewSession : undefined}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={currentQuestion?.language || "sql"}
          initialCode={currentQuestion?.initialCode || "-- Write your solution here\n"}
          points={currentQuestion?.points || 30}
        />
      </div>
    </main>
  );
}
