import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TheoryPanel() {
  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Top Navbar inside the left pane */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4">
          <Link
            href="/subjects/python"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Python
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-muted-foreground">Progress:</span>
          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[45%]" />
          </div>
          <span className="text-primary">45%</span>
        </div>
      </div>

      {/* Main Content (Markdown rendering will go here later) */}
      <div className="flex-1 p-8 max-w-3xl mx-auto w-full prose dark:prose-invert">
        <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-wider">
          Module 3 • Lesson 2
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-foreground">
          Writing Your First Python Function
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Functions allow you to write a block of code once and reuse it multiple
          times. They are the building blocks of clean, modular programming.
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-8">
          <h3 className="text-primary font-bold mb-2 mt-0">💡 The Concept</h3>
          <p className="text-sm mb-0">
            Think of a function like a recipe. You give it ingredients
            (<strong>arguments</strong>), it follows the steps you defined, and
            then hands you back the finished cake (<strong>return value</strong>).
          </p>
        </div>

        <h3>Syntax</h3>
        <p>In Python, you define a function using the <code>def</code> keyword:</p>
        
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-8">
          <code className="text-foreground">
{`def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Output: Hello, Alice!`}
          </code>
        </pre>

        <hr className="my-8 border-border" />

        {/* Exercise Prompt */}
        <div className="mb-10">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="text-2xl">💻</span> Your Turn
          </h2>
          <p>
            In the editor on the right, write a function called <code>multiply</code>{" "}
            that takes two parameters (<code>a</code> and <code>b</code>) and returns
            their product.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Define the function correctly using <code>def</code>.</li>
            <li>Make sure to use the <code>return</code> keyword.</li>
            <li>Run the code to see if it passes the hidden tests!</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer (Next Lesson CTA) */}
      <div className="sticky bottom-0 p-4 border-t border-border bg-card flex justify-between items-center">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Previous: Variables
        </button>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
          Next Lesson →
        </button>
      </div>
    </div>
  );
}
