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

export const SUBJECT_CERT_TITLES: Record<string, string> = {
  sql: "SQL Mastery & Relational Database Engineering",
  python: "Python Core Programming & Data Engineering",
  powerbi: "Power BI & Business Intelligence Architecture",
  ml: "Machine Learning & Predictive Modeling",
  ai: "Artificial Intelligence & Deep Learning",
};

export const SUBJECT_CERT_DETAILS: Record<
  string,
  {
    title: string;
    icon: string;
    school: string;
    color: string;
    border: string;
    gradient: string;
    description: string;
  }
> = {
  python: {
    title: "Python Core Programming & Data Engineering",
    icon: "🐍",
    school: "School of Python Engineering & Computational Systems",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    gradient: "from-emerald-500/20 to-teal-500/5",
    description: "Advanced Python Algorithms, Object-Oriented Architecture, Data Pipelines & Scripting Mastery",
  },
  sql: {
    title: "SQL Mastery & Relational Database Engineering",
    icon: "🗄️",
    school: "School of Relational Database Systems & Query Engineering",
    color: "text-blue-400",
    border: "border-blue-500/30",
    gradient: "from-blue-500/20 to-cyan-500/5",
    description: "Complex Relational Joins, Window Functions, Schema Design & High-Performance Indexing",
  },
  powerbi: {
    title: "Power BI & Business Intelligence Architecture",
    icon: "📊",
    school: "School of Business Intelligence & Enterprise Analytics",
    color: "text-amber-400",
    border: "border-amber-500/30",
    gradient: "from-yellow-500/20 to-orange-500/5",
    description: "DAX Formulations, Tabular Data Modeling, Enterprise KPI Dashboards & Analytics",
  },
  ml: {
    title: "Machine Learning & Predictive Modeling",
    icon: "🤖",
    school: "School of Machine Learning & Applied Data Science",
    color: "text-purple-400",
    border: "border-purple-500/30",
    gradient: "from-purple-500/20 to-violet-500/5",
    description: "Supervised & Unsupervised Learning, Feature Engineering, Pipeline Deployment & Model Evaluation",
  },
  ai: {
    title: "Artificial Intelligence & Deep Learning",
    icon: "🧠",
    school: "School of Artificial Intelligence & Neural Networks",
    color: "text-rose-400",
    border: "border-rose-500/30",
    gradient: "from-rose-500/20 to-pink-500/5",
    description: "Deep Neural Architectures, Transformers, Large Language Models & Autonomous Agents",
  },
};

export function issueCertificate(
  subjectId: string,
  userName?: string,
  userEmail?: string,
  score?: number,
  customCertId?: string
): StoredCertificate {
  const normSubject = (subjectId || "python").toLowerCase();
  const title = SUBJECT_CERT_TITLES[normSubject] || `${normSubject.toUpperCase()} Professional`;

  if (typeof window === "undefined") {
    return {
      certificateId: customCertId || `DM-${normSubject.toUpperCase()}-TEMP`,
      recipientName: userName || "DataMind Learner",
      recipientEmail: userEmail || "student@datamind.academy",
      subjectId: normSubject,
      subjectTitle: title,
      score: score || 1200,
      totalQuestions: 40,
      issuedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      verificationHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
    };
  }

  const current = getSubjectProgress(normSubject);
  const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
  const certificateId = customCertId || current.certificateId || `DM-${normSubject.toUpperCase()}-${randomHash}`;
  const issuedAt = current.issuedAt || new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  current.isCompleted = true;
  current.certificateId = certificateId;
  current.issuedAt = issuedAt;

  // Retrieve user info if not provided
  let resolvedName = userName;
  let resolvedEmail = userEmail;
  if (!resolvedName || !resolvedEmail) {
    try {
      const userStr = localStorage.getItem("datamind_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.name && !resolvedName) resolvedName = u.name;
        if (u.email && !resolvedEmail) resolvedEmail = u.email;
      }
    } catch (e) {}
  }

  const storedCertsStr = localStorage.getItem(CERTS_KEY);
  let certs: StoredCertificate[] = [];
  if (storedCertsStr) {
    try {
      certs = JSON.parse(storedCertsStr);
    } catch (e) {
      certs = [];
    }
  }

  // Check if this certificate already exists in certs
  const existingIndex = certs.findIndex(
    (c) =>
      c.certificateId.toLowerCase() === certificateId.toLowerCase() ||
      c.certificateId.toLowerCase().includes(certificateId.toLowerCase()) ||
      certificateId.toLowerCase().includes(c.certificateId.toLowerCase())
  );

  const newCert: StoredCertificate = {
    certificateId,
    recipientName: resolvedName || "DataMind Learner",
    recipientEmail: resolvedEmail || "student@datamind.academy",
    subjectId: normSubject,
    subjectTitle: title,
    score: score || current.totalScore || 1200,
    totalQuestions: 40,
    issuedAt,
    verificationHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
  };

  if (existingIndex >= 0) {
    certs[existingIndex] = {
      ...certs[existingIndex],
      certificateId,
      subjectId: normSubject,
      subjectTitle: title,
      recipientName: resolvedName || certs[existingIndex].recipientName,
      issuedAt: certs[existingIndex].issuedAt || issuedAt,
    };
    localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
    localStorage.setItem(`${STORAGE_PREFIX}${normSubject}`, JSON.stringify(current));
    return certs[existingIndex];
  }

  certs.push(newCert);
  localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
  localStorage.setItem(`${STORAGE_PREFIX}${normSubject}`, JSON.stringify(current));

  return newCert;
}

export function recordQuestionCompletion(
  subjectId: string,
  questionId: string,
  points: number,
  userName?: string,
  userEmail?: string,
  questionIndex?: number
): { progress: UserProgressState; justCompleted: boolean; certificateId?: string } {
  if (typeof window === "undefined") {
    return {
      progress: { subjectId, completedQuestionIds: [], totalScore: 0, isCompleted: false },
      justCompleted: false,
    };
  }

  const normSubject = (subjectId || "python").toLowerCase();
  const current = getSubjectProgress(normSubject);

  // Add question if not already completed
  if (!current.completedQuestionIds.includes(questionId)) {
    current.completedQuestionIds.push(questionId);
    current.totalScore += points;
  }

  let justCompleted = false;

  // Check completion: either user solved 40 questions OR reached/submitted the 40th question
  const isFinished = current.completedQuestionIds.length >= 40 || (questionIndex !== undefined && questionIndex >= 40);

  if (isFinished && !current.isCompleted) {
    const cert = issueCertificate(normSubject, userName, userEmail, current.totalScore);
    current.isCompleted = true;
    current.certificateId = cert.certificateId;
    current.issuedAt = cert.issuedAt;
    justCompleted = true;
  } else if (isFinished && !current.certificateId) {
    const cert = issueCertificate(normSubject, userName, userEmail, current.totalScore);
    current.certificateId = cert.certificateId;
    current.issuedAt = cert.issuedAt;
  }

  localStorage.setItem(`${STORAGE_PREFIX}${normSubject}`, JSON.stringify(current));

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

  return { progress: current, justCompleted, certificateId: current.certificateId };
}

export function getCertificateById(certId: string): StoredCertificate | null {
  if (typeof window === "undefined" || !certId) return null;

  const stored = localStorage.getItem(CERTS_KEY);
  if (!stored) return null;

  try {
    const certs: StoredCertificate[] = JSON.parse(stored);
    const target = certId.toLowerCase();

    // 1. Exact match
    let match = certs.find((c) => c.certificateId.toLowerCase() === target);

    // 2. Partial match (e.g. certId contains or is contained in certificateId)
    if (!match) {
      match = certs.find(
        (c) =>
          c.certificateId.toLowerCase().includes(target) ||
          target.includes(c.certificateId.toLowerCase())
      );
    }

    if (match) {
      // Auto-correct subject title and subjectId if mismatched (e.g. previous bugs saved SQL for Python)
      let correctSubject = match.subjectId?.toLowerCase();
      if (match.certificateId.toLowerCase().includes("python")) correctSubject = "python";
      else if (match.certificateId.toLowerCase().includes("powerbi")) correctSubject = "powerbi";
      else if (match.certificateId.toLowerCase().includes("ml")) correctSubject = "ml";
      else if (match.certificateId.toLowerCase().includes("ai")) correctSubject = "ai";
      else if (match.certificateId.toLowerCase().includes("sql")) correctSubject = "sql";

      const expectedTitle = correctSubject ? SUBJECT_CERT_TITLES[correctSubject] : null;
      if (correctSubject && expectedTitle && (match.subjectTitle !== expectedTitle || match.subjectId !== correctSubject)) {
        match.subjectId = correctSubject;
        match.subjectTitle = expectedTitle;
        localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
      }
      return match;
    }

    return null;
  } catch (e) {
    return null;
  }
}
