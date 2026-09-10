export type Subject = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;        // Tailwind bg color class
  textColor: string;    // Tailwind text color class
  borderColor: string;  // Tailwind border color class
  levels: string[];
  topicsCount: number;
  estimatedHours: number;
  prerequisites: string[];
};

export type Track = {
  id: string;
  title: string;
  description: string;
  subjects: string[];   // subject IDs in order
  durationMonths: number;
  goal: string;
  icon: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: number;     // minutes
  type: "video" | "article" | "exercise" | "quiz" | "project";
  completed?: boolean;
};

export type Module = {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: Lesson[];
};
