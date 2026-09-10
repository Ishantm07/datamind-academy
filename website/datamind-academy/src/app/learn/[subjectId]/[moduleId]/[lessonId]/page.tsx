import CodeEditorPanel from "@/components/learn/CodeEditorPanel";
import TheoryPanel from "@/components/learn/TheoryPanel";

export default function CoursePlayerPage() {
  const initialPythonCode = `def multiply(a, b):
    # Write your code here
    pass
    
# You can test your function here:
# print(multiply(5, 4))
`;

  return (
    // We remove the default Navbar/Footer from this specific layout
    // by using absolute positioning to take over the whole screen
    <main className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background">
      
      {/* Left Pane: Theory & Instructions (50% on desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-border">
        <TheoryPanel />
      </div>

      {/* Right Pane: Code Editor & Terminal (50% on desktop) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditorPanel 
          language="python" 
          initialCode={initialPythonCode} 
        />
      </div>

    </main>
  );
}
