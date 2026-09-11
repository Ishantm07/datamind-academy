import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";
import { getChallenge } from "@/lib/curriculumData";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const subjectId = params.subjectId || "sql";
  const moduleId = params.moduleId || "m1";
  const lessonId = params.lessonId || "lesson-1";

  const challenge = getChallenge(subjectId, moduleId, lessonId);

  return (
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      {/* Left Pane: Problem Statement, Schema, Hints, Navigation (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <TheoryPanel
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          lessonTitle={challenge.title}
          difficulty={challenge.difficulty}
          points={challenge.points}
          problemStatement={challenge.problemStatement}
          sampleInput={challenge.sampleInput}
          sampleOutput={challenge.sampleOutput}
          constraints={challenge.constraints}
          tableSchema={challenge.tableSchema}
          hints={challenge.hints}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={challenge.language}
          initialCode={challenge.initialCode}
          points={challenge.points}
        />
      </div>
    </main>
  );
}
