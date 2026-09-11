import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const subjectId = params.subjectId || "sql";
  const moduleId = params.moduleId || "m1";
  const lessonId = params.lessonId || "lesson-1";

  const initialSqlCode = `-- Write a query to format customer names and count occupations
SELECT 
  CONCAT(Name, '(', SUBSTR(Occupation, 1, 1), ')') AS formatted_name
FROM EMPLOYEES
ORDER BY Name ASC;
`;

  return (
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      {/* Left Pane: Problem Statement, Schema, Hints, Navigation (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <TheoryPanel
          subjectId={subjectId}
          moduleId={moduleId}
          lessonId={lessonId}
          lessonTitle={`The ${subjectId.toUpperCase()} Challenge (${lessonId})`}
          difficulty="MEDIUM"
          points={30}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={subjectId === "python" ? "python" : "sql"}
          initialCode={initialSqlCode}
          points={30}
        />
      </div>
    </main>
  );
}
