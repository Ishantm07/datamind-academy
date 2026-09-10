import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SUBJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { PlayCircle, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Curriculum Data for display purposes
const MOCK_CURRICULUM = [
  {
    title: "Module 1: The Absolute Basics",
    lessons: [
      { title: "What is this subject?", type: "video", duration: "5 min", status: "completed" },
      { title: "Setting up your mental model", type: "article", duration: "8 min", status: "completed" },
      { title: "Your first line of code", type: "exercise", duration: "15 min", status: "current" },
      { title: "Knowledge Check", type: "quiz", duration: "10 min", status: "locked" },
    ]
  },
  {
    title: "Module 2: Core Concepts",
    lessons: [
      { title: "Understanding Data Types", type: "video", duration: "12 min", status: "locked" },
      { title: "Variables and Memory", type: "exercise", duration: "20 min", status: "locked" },
      { title: "Logic and Control Flow", type: "exercise", duration: "25 min", status: "locked" },
      { title: "Mini-Project: Calculator", type: "project", duration: "45 min", status: "locked" },
    ]
  }
];

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Subject Header Banner */}
        <div className={cn("py-20 border-b", subject.color, subject.borderColor)}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-6xl mb-6">{subject.icon}</div>
            <h1 className={cn("text-4xl md:text-5xl font-extrabold mb-6", subject.textColor)}>
              {subject.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {subject.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/learn/\${subject.id}/m1/lesson-1`}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg hover:-translate-y-0.5"
              >
                Start Learning — Free
              </Link>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-background border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition">
                Take Placement Test
              </button>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">Curriculum Syllabus</h2>
          <p className="text-muted-foreground mb-10">
            {subject.topicsCount} lessons • {subject.estimatedHours} hours of content
          </p>

          <div className="space-y-8">
            {MOCK_CURRICULUM.map((module, mIdx) => (
              <div key={mIdx} className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="bg-muted/50 px-6 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">{module.title}</h3>
                </div>
                <div className="divide-y divide-border">
                  {module.lessons.map((lesson, lIdx) => (
                    <div key={lIdx} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Status Icon */}
                        {lesson.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {lesson.status === "current" && <PlayCircle className="w-5 h-5 text-primary" />}
                        {lesson.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                        
                        <div>
                          <p className={cn(
                            "font-medium", 
                            lesson.status === "locked" ? "text-muted-foreground" : "text-foreground"
                          )}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                            {lesson.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
