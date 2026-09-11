import { SQL_QUESTION_POOL, SQLQuestion } from "./sqlQuestionBank";

export interface ShuffledChallengeSession {
  sessionId: string;
  totalQuestions: number;
  questions: SQLQuestion[];
  createdAt: string;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generate40QuestionSession(): ShuffledChallengeSession {
  const easyQuestions = SQL_QUESTION_POOL.filter((q) => q.difficulty === "EASY");
  const mediumQuestions = SQL_QUESTION_POOL.filter((q) => q.difficulty === "MEDIUM");
  const hardQuestions = SQL_QUESTION_POOL.filter((q) => q.difficulty === "HARD");

  // Pick 15 Easy, 15 Medium, 10 Hard (cycling if needed to guarantee 40 total)
  const selectedEasy: SQLQuestion[] = [];
  const selectedMed: SQLQuestion[] = [];
  const selectedHard: SQLQuestion[] = [];

  for (let i = 0; i < 15; i++) {
    selectedEasy.push(easyQuestions[i % easyQuestions.length]);
    selectedMed.push(mediumQuestions[i % mediumQuestions.length]);
  }
  for (let i = 0; i < 10; i++) {
    selectedHard.push(hardQuestions[i % hardQuestions.length]);
  }

  // Interleave & shuffle
  const finalPool = shuffleArray([...selectedEasy, ...selectedMed, ...selectedHard]);

  return {
    sessionId: `session_${Date.now()}`,
    totalQuestions: 40,
    questions: finalPool,
    createdAt: new Date().toISOString(),
  };
}

export function getOrSession40Questions(): ShuffledChallengeSession {
  if (typeof window === "undefined") {
    return generate40QuestionSession();
  }

  const stored = localStorage.getItem("datamind_sql_40_session");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored 40-question session", e);
    }
  }

  const newSession = generate40QuestionSession();
  localStorage.setItem("datamind_sql_40_session", JSON.stringify(newSession));
  return newSession;
}
