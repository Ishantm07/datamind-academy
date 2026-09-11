import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";

export default function CoursePlayerPage({
  params,
}: {
  params: { subjectId: string; moduleId: string; lessonId: string };
}) {
  const initialSqlCode = `-- Write a query to format customer names and count occupations
SELECT 
  CONCAT(Name, '(', SUBSTR(Occupation, 1, 1), ')') AS formatted_name
FROM EMPLOYEES
ORDER BY Name ASC;
`;

  return (
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      {/* Left Pane: Problem Statement, Schema, Hints (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <TheoryPanel
          subjectId={params.subjectId || "sql"}
          lessonTitle="The Occupations PADS Challenge"
          difficulty="MEDIUM"
          points={30}
        />
      </div>

      {/* Right Pane: Code Editor & HackerRank Test Cases (50% desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel
          language={params.subjectId === "python" ? "python" : "sql"}
          initialCode={initialSqlCode}
          points={30}
        />
      </div>
    </main>
  );
}
