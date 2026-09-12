/**
 * Universal Shuffle Engine — works for ALL subjects (SQL, Python, Power BI, ML, AI).
 * Generates a 40-question session with balanced difficulty (15 Easy, 15 Medium, 10 Hard).
 * Persists sessions in localStorage keyed by subject.
 */

import { SQL_QUESTION_POOL } from "./sqlQuestionBank";
import { PYTHON_QUESTION_POOL } from "./pythonQuestionBank";
import { POWERBI_QUESTION_POOL } from "./powerbiQuestionBank";
import { ML_QUESTION_POOL } from "./mlQuestionBank";
import { AI_QUESTION_POOL } from "./aiQuestionBank";

export interface GenericQuestion {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  points: number;
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  tableSchema?: {
    tableName: string;
    columns: { name: string; type: string }[];
  };
  hints: string[];
  initialCode: string;
  solutionCode: string;
  language?: string;
}

export interface UniversalChallengeSession {
  sessionId: string;
  subjectId: string;
  totalQuestions: number;
  questions: GenericQuestion[];
  createdAt: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getPoolForSubject(subjectId: string): GenericQuestion[] {
  switch (subjectId) {
    case "sql":
      return SQL_QUESTION_POOL as GenericQuestion[];
    case "python":
      return PYTHON_QUESTION_POOL as GenericQuestion[];
    case "powerbi":
      return POWERBI_QUESTION_POOL as GenericQuestion[];
    case "ml":
      return ML_QUESTION_POOL as GenericQuestion[];
    case "ai":
      return AI_QUESTION_POOL as GenericQuestion[];
    default:
      return SQL_QUESTION_POOL as GenericQuestion[];
  }
}

function getStorageKey(subjectId: string): string {
  return `datamind_${subjectId}_40_session`;
}

export function generateSession(subjectId: string): UniversalChallengeSession {
  const pool = getPoolForSubject(subjectId);

  const easyPool = pool.filter((q) => q.difficulty === "EASY");
  const medPool = pool.filter((q) => q.difficulty === "MEDIUM");
  const hardPool = pool.filter((q) => q.difficulty === "HARD");

  const selectedEasy: GenericQuestion[] = [];
  const selectedMed: GenericQuestion[] = [];
  const selectedHard: GenericQuestion[] = [];

  // Pick 15 Easy, 15 Medium, 10 Hard (cycling if pool is smaller)
  for (let i = 0; i < 15; i++) {
    if (easyPool.length > 0) selectedEasy.push(easyPool[i % easyPool.length]);
    if (medPool.length > 0) selectedMed.push(medPool[i % medPool.length]);
  }
  for (let i = 0; i < 10; i++) {
    if (hardPool.length > 0) selectedHard.push(hardPool[i % hardPool.length]);
  }

  const finalPool = shuffleArray([...selectedEasy, ...selectedMed, ...selectedHard]);

  return {
    sessionId: `session_${subjectId}_${Date.now()}`,
    subjectId,
    totalQuestions: 40,
    questions: finalPool,
    createdAt: new Date().toISOString(),
  };
}

export function generateModuleSession(
  subjectId: string,
  moduleId: string,
  count: number = 10
): UniversalChallengeSession {
  const pool = getPoolForSubject(subjectId);
  const modNum = parseInt(moduleId.replace(/\D/g, "") || "1", 10);

  // Divide the pool into 4 module segments if available, or partition by difficulty
  const easyPool = pool.filter((q) => q.difficulty === "EASY");
  const medPool = pool.filter((q) => q.difficulty === "MEDIUM");
  const hardPool = pool.filter((q) => q.difficulty === "HARD");

  // Select 4 Easy, 4 Medium, 2 Hard for a 10-question module challenge
  const selected: GenericQuestion[] = [];

  // Offset index by module number so different modules get different primary questions
  const offset = (modNum - 1) * 2;

  for (let i = 0; i < 4; i++) {
    if (easyPool.length > 0) {
      selected.push(easyPool[(i + offset) % easyPool.length]);
    }
  }
  for (let i = 0; i < 4; i++) {
    if (medPool.length > 0) {
      selected.push(medPool[(i + offset) % medPool.length]);
    }
  }
  for (let i = 0; i < 2; i++) {
    if (hardPool.length > 0) {
      selected.push(hardPool[(i + offset) % hardPool.length]);
    }
  }

  // Fallback to fill up to 10 questions if any sub-pool was empty
  while (selected.length < count && pool.length > 0) {
    selected.push(pool[selected.length % pool.length]);
  }

  // Shuffle the 10 questions using Fisher-Yates
  const shuffledQuestions = shuffleArray(selected).slice(0, count);

  return {
    sessionId: `session_${subjectId}_${moduleId}_${Date.now()}`,
    subjectId,
    totalQuestions: count,
    questions: shuffledQuestions,
    createdAt: new Date().toISOString(),
  };
}

export function getOrCreateModuleSession(
  subjectId: string,
  moduleId: string,
  forceNew: boolean = false
): UniversalChallengeSession {
  const normSubject = (subjectId || "sql").toLowerCase();
  const key = `datamind_${normSubject}_${moduleId}_session`;

  if (typeof window === "undefined") {
    return generateModuleSession(normSubject, moduleId, 10);
  }

  if (!forceNew) {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse module session", e);
      }
    }
  }

  const fresh = generateModuleSession(normSubject, moduleId, 10);
  localStorage.setItem(key, JSON.stringify(fresh));
  return fresh;
}

export function refreshModuleSession(
  subjectId: string,
  moduleId: string
): UniversalChallengeSession {
  return getOrCreateModuleSession(subjectId, moduleId, true);
}

export function getOrCreateGrandFinalSession(
  subjectId: string,
  forceNew: boolean = false
): UniversalChallengeSession {
  const normSubject = (subjectId || "sql").toLowerCase();
  const key = `datamind_${normSubject}_final_session`;

  if (typeof window === "undefined") {
    return generateSession(normSubject);
  }

  if (!forceNew) {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse final challenge session", e);
      }
    }
  }

  const fresh = generateSession(normSubject);
  localStorage.setItem(key, JSON.stringify(fresh));
  return fresh;
}

export function refreshGrandFinalSession(
  subjectId: string
): UniversalChallengeSession {
  return getOrCreateGrandFinalSession(subjectId, true);
}

export function getOrCreateSession(subjectId: string): UniversalChallengeSession {
  if (typeof window === "undefined") {
    return generateSession(subjectId);
  }

  const key = getStorageKey(subjectId);
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(`Failed to parse stored ${subjectId} session`, e);
    }
  }

  const newSession = generateSession(subjectId);
  localStorage.setItem(key, JSON.stringify(newSession));
  return newSession;
}

export function refreshSession(subjectId: string): UniversalChallengeSession {
  const newSession = generateSession(subjectId);
  if (typeof window !== "undefined") {
    localStorage.setItem(getStorageKey(subjectId), JSON.stringify(newSession));
  }
  return newSession;
}

