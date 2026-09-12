import { PYTHON_QUESTION_POOL, PythonQuestion } from "./pythonQuestionBank";

export interface PythonChallengeSession {
  sessionId: string;
  totalQuestions: number;
  questions: PythonQuestion[];
  createdAt: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePython40QuestionSession(): PythonChallengeSession {
  const easyQuestions = PYTHON_QUESTION_POOL.filter((q) => q.difficulty === "EASY");
  const mediumQuestions = PYTHON_QUESTION_POOL.filter((q) => q.difficulty === "MEDIUM");
  const hardQuestions = PYTHON_QUESTION_POOL.filter((q) => q.difficulty === "HARD");

  // Pick 15 Easy, 15 Medium, 10 Hard (cycling to guarantee 40 total)
  const selectedEasy: PythonQuestion[] = [];
  const selectedMed: PythonQuestion[] = [];
  const selectedHard: PythonQuestion[] = [];

  for (let i = 0; i < 15; i++) {
    selectedEasy.push(easyQuestions[i % easyQuestions.length]);
    selectedMed.push(mediumQuestions[i % mediumQuestions.length]);
  }
  for (let i = 0; i < 10; i++) {
    selectedHard.push(hardQuestions[i % hardQuestions.length]);
  }

  const finalPool = shuffleArray([...selectedEasy, ...selectedMed, ...selectedHard]);

  return {
    sessionId: `py_session_${Date.now()}`,
    totalQuestions: 40,
    questions: finalPool,
    createdAt: new Date().toISOString(),
  };
}

export function getOrSessionPython40Questions(): PythonChallengeSession {
  if (typeof window === "undefined") {
    return generatePython40QuestionSession();
  }

  const stored = localStorage.getItem("datamind_python_40_session");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored python 40-question session", e);
    }
  }

  const newSession = generatePython40QuestionSession();
  localStorage.setItem("datamind_python_40_session", JSON.stringify(newSession));
  return newSession;
}

// Aliases for convenient importing
export type ShuffledPythonChallengeSession = PythonChallengeSession;
export const getOrSession40PythonQuestions = getOrSessionPython40Questions;
export const generate40PythonQuestionSession = generatePython40QuestionSession;

