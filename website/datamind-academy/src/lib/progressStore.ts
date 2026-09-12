export interface UserProgressState {
  subjectId: string;
  completedQuestionIds: string[];
  totalScore: number;
  isCompleted: boolean;
  certificateId?: string;
  issuedAt?: string;
}

export interface StoredCertificate {
  certificateId: string;
  recipientName: string;
  recipientEmail: string;
  subjectId: string;
  subjectTitle: string;
  score: number;
  totalQuestions: number;
  issuedAt: string;
  verificationHash: string;
}

const STORAGE_PREFIX = "datamind_progress_";
const CERTS_KEY = "datamind_certificates";

export function getSubjectProgress(subjectId: string): UserProgressState {
  if (typeof window === "undefined") {
    return { subjectId, completedQuestionIds: [], totalScore: 0, isCompleted: false };
  }

  const data = localStorage.getItem(`${STORAGE_PREFIX}${subjectId}`);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse progress", e);
    }
  }

  return { subjectId, completedQuestionIds: [], totalScore: 0, isCompleted: false };
}

export function recordQuestionCompletion(
  subjectId: string,
  questionId: string,
  points: number,
  userName?: string,
  userEmail?: string
): { progress: UserProgressState; justCompleted: boolean; certificateId?: string } {
  if (typeof window === "undefined") {
    return {
      progress: { subjectId, completedQuestionIds: [], totalScore: 0, isCompleted: false },
      justCompleted: false,
    };
  }

  const current = getSubjectProgress(subjectId);

  // Add question if not already completed
  if (!current.completedQuestionIds.includes(questionId)) {
    current.completedQuestionIds.push(questionId);
    current.totalScore += points;
  }

  let justCompleted = false;
  let certificateId = current.certificateId;

  // If user has solved 40 questions or reached 40 and not yet completed
  if (current.completedQuestionIds.length >= 40 && !current.isCompleted) {
    current.isCompleted = true;
    justCompleted = true;

    // Generate unique certificate ID
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    certificateId = `DM-${subjectId.toUpperCase()}-${randomHash}`;
    const issuedAt = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    current.certificateId = certificateId;
    current.issuedAt = issuedAt;

    // Save certificate in certificates repository
    const storedCertsStr = localStorage.getItem(CERTS_KEY);
    const certs: StoredCertificate[] = storedCertsStr ? JSON.parse(storedCertsStr) : [];

    const subjectTitles: Record<string, string> = {
      sql: "SQL Mastery & Relational Database Engineering",
      python: "Python Core Programming & Data Engineering",
      powerbi: "Power BI & Business Intelligence Architecture",
      ml: "Machine Learning & Predictive Modeling",
      ai: "Artificial Intelligence & Deep Learning",
    };

    const newCert: StoredCertificate = {
      certificateId,
      recipientName: userName || "DataMind Learner",
      recipientEmail: userEmail || "student@datamind.academy",
      subjectId,
      subjectTitle: subjectTitles[subjectId] || `${subjectId.toUpperCase()} Professional`,
      score: current.totalScore,
      totalQuestions: 40,
      issuedAt,
      verificationHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
    };

    certs.push(newCert);
    localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
  }

  localStorage.setItem(`${STORAGE_PREFIX}${subjectId}`, JSON.stringify(current));

  // Also award global XP to user profile
  try {
    const userStr = localStorage.getItem("datamind_user");
    if (userStr) {
      const u = JSON.parse(userStr);
      u.xp = (u.xp || 0) + points;
      localStorage.setItem("datamind_user", JSON.stringify(u));
    }
  } catch (e) {
    console.error("Failed to update user XP", e);
  }

  return { progress: current, justCompleted, certificateId };
}

export function getCertificateById(certId: string): StoredCertificate | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CERTS_KEY);
  if (!stored) return null;

  try {
    const certs: StoredCertificate[] = JSON.parse(stored);
    return certs.find((c) => c.certificateId.toLowerCase() === certId.toLowerCase()) || null;
  } catch (e) {
    return null;
  }
}
