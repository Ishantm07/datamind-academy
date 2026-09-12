"use client";

import { useEffect, useState } from "react";
import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";
import { getOrSession40Questions, generate40QuestionSession, ShuffledChallengeSession } from "@/lib/sqlShuffleEngine";
import { getOrSession40PythonQuestions, generate40PythonQuestionSession, ShuffledPythonChallengeSession } from "@/lib/pythonShuffleEngine";
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
  const [session, setSession] = useState<ShuffledChallengeSession | ShuffledPythonChallengeSession | null>(null);

  useEffect(() => {
    if (subjectId === "sql") {
      const sess = getOrSession40Questions();
      setSession(sess);
    } else if (subjectId === "python") {
      const sess = getOrSession40PythonQuestions();
      setSession(sess);
    }
  }, [subjectId]);

  const handleShuffleNewSession = () => {
    if (subjectId === "sql") {
      const freshSession = generate40QuestionSession();
      localStorage.setItem("datamind_sql_40_session", JSON.stringify(freshSession));
      setSession(freshSession);
    } else if (subjectId === "python") {
      const freshSession = generate40PythonQuestionSession();
      localStorage.setItem("datamind_python_40_session", JSON.stringify(freshSession));
      setSession(freshSession);
    }
  };

  // Check integrated module curriculum
  const moduleList = subjectId === "python" ? INTEGRATED_PYTHON_MODULES : INTEGRATED_SQL_MODULES;
  const targetModule = moduleList.find((m) => m.id === moduleId);
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
      initialCode: targetLesson.initialCode || (subjectId === "python" ? "# Write your solution here\n" : "-- Write solution here\n"),
      language: targetLesson.language || (subjectId === "python" ? "python" : "sql"),
    };
  } else if ((subjectId === "sql" || subjectId === "python") && session && session.questions.length > 0) {
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
          onShuffleNewSession={subjectId === "sql" || subjectId === "python" ? handleShuffleNewSession : undefined}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={currentQuestion?.language || (subjectId === "python" ? "python" : "sql")}
          initialCode={currentQuestion?.initialCode || (subjectId === "python" ? "# Write your solution here\n" : "-- Write your solution here\n")}
          points={currentQuestion?.points || 30}
          subjectId={subjectId}
          questionId={currentQuestion?.id || lessonId}
          questionIndex={Math.min(lessonNum, 40)}
          totalQuestions={40}
        />
      </div>
    </main>
  );
}
