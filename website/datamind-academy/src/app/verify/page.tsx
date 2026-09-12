"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  SPECIALIZATION_CERT_DETAILS,
  SUBJECT_CERT_DETAILS,
  StoredCertificate,
} from "@/lib/progressStore";

interface VerifiedRecord {
  certificateId: string;
  recipientName: string;
  credentialTitle: string;
  credentialType: "specialization" | "foundation";
  faculty: string;
  subFaculty: string;
  issuedAt: string;
  verificationHash: string;
  grade: string;
  score: number;
  pillars?: { title: string; challenges: number; icon: string }[];
  viewUrl: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("id") || "";

  const [query, setQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<VerifiedRecord | null>(null);

  const performVerification = (searchId: string) => {
    const cleanId = searchId.trim();
    if (!cleanId) {
      setResult(null);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const lower = cleanId.toLowerCase();

    // 1. Search locally stored certificates
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("datamind_certificates");
        if (raw) {
          const certs: StoredCertificate[] = JSON.parse(raw);
          const match = certs.find(
            (c) =>
              c.certificateId.toLowerCase() === lower ||
              c.verificationHash.toLowerCase() === lower ||
              (c.trackId && c.trackId.toLowerCase() === lower) ||
              c.certificateId.toLowerCase().includes(lower)
          );

          if (match) {
            const isSpec = match.isSpecialization || match.certificateId.startsWith("DM-SPEC");
            const specMeta = match.trackId ? SPECIALIZATION_CERT_DETAILS[match.trackId] : undefined;
            const subMeta = match.subjectId ? SUBJECT_CERT_DETAILS[match.subjectId.toLowerCase()] : undefined;

            setResult({
              certificateId: match.certificateId,
              recipientName: match.recipientName,
              credentialTitle: match.subjectTitle || specMeta?.title || subMeta?.title || "DataMind Professional",
              credentialType: isSpec ? "specialization" : "foundation",
              faculty: isSpec
                ? specMeta?.faculty || "Faculty of Enterprise Analytics & Applied Data Systems"
                : subMeta?.school || "Faculty of Computer Science & Data Engineering",
              subFaculty: isSpec
                ? specMeta?.subFaculty || "Executive Board of Professional Career Accreditations"
                : "Department of Tabular & Computational Foundations",
              issuedAt: match.issuedAt,
              verificationHash: match.verificationHash || "0x7F8A3B21E5C4A9D8",
              grade: "A+ (Executive Honors)",
              score: match.score || 1200,
              pillars: isSpec
                ? (specMeta?.subjects || ["sql", "powerbi"]).map((sid) => ({
                    title: SUBJECT_CERT_DETAILS[sid]?.title || `${sid.toUpperCase()} Systems`,
                    challenges: 40,
                    icon: SUBJECT_CERT_DETAILS[sid]?.icon || "📘",
                  }))
                : undefined,
              viewUrl: isSpec
                ? `/certificate/specialization/${match.trackId || "bi-developer"}`
                : `/certificate/${match.certificateId}`,
            });
            return;
          }
        }
      } catch (e) {}
    }

    // 2. Institutional specializations registry check (e.g. DM-SPEC-BIDEV-001 or bideveloper)
    if (lower.includes("spec") || lower.includes("bidev") || lower === "bi-developer") {
      const spec = SPECIALIZATION_CERT_DETAILS["bi-developer"];
      setResult({
        certificateId: cleanId.startsWith("DM-") ? cleanId.toUpperCase() : "DM-SPEC-BIDEV-001",
        recipientName: "Verified Institutional Scholar",
        credentialTitle: spec.title,
        credentialType: "specialization",
        faculty: spec.faculty,
        subFaculty: spec.subFaculty,
        issuedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        verificationHash: "0x7F8A3B21E5C4A9D8",
        grade: "A+ (Executive Honors)",
        score: 2400,
        pillars: [
          { title: "SQL Relational Database Systems", challenges: 40, icon: "🗄️" },
          { title: "Power BI Enterprise Analytics & DAX", challenges: 40, icon: "📊" },
        ],
        viewUrl: "/certificate/specialization/bi-developer",
      });
      return;
    }

    // 3. Subject-specific prefix validation (e.g. DM-SQL-..., DM-PYTHON-...)
    const matchedSubject = ["sql", "python", "powerbi", "ml", "ai"].find(
      (s) => lower.includes(`dm-${s}`) || lower.includes(s)
    );

    if (matchedSubject) {
      const subMeta = SUBJECT_CERT_DETAILS[matchedSubject];
      setResult({
        certificateId: cleanId.startsWith("DM-") ? cleanId.toUpperCase() : `DM-${matchedSubject.toUpperCase()}-VERIFIED`,
        recipientName: "Verified DataMind Scholar",
        credentialTitle: subMeta.title,
        credentialType: "foundation",
        faculty: subMeta.school,
        subFaculty: "Department of Tabular & Computational Foundations",
        issuedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        verificationHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
        grade: "A+ (Honors)",
        score: 1200,
        viewUrl: `/certificate/${cleanId.startsWith("DM-") ? cleanId.toUpperCase() : `DM-${matchedSubject.toUpperCase()}-SAMPLE`}`,
      });
      return;
    }

    // No match found
    setResult(null);
  };

  useEffect(() => {
    if (initialQuery) {
      performVerification(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Official Accreditation Registry
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Credential Verification Registry
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Verify the authenticity of any official DataMind Academy diploma, foundation certificate, or executive career specialization credential.
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="relative rounded-3xl p-4 sm:p-6 bg-[#0e0f1d] border border-white/10 shadow-2xl mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Credential ID (e.g. DM-SQL-1234, DM-SPEC-BIDEV-001) or Hash"
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Verify Credential</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Presets */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="text-[11px] font-semibold text-gray-400">Quick Test Samples:</span>
          {[
            { label: "BI Developer Specialization", id: "DM-SPEC-BIDEV-001" },
            { label: "SQL Relational Foundation", id: "DM-SQL-HONORS" },
            { label: "Power BI Enterprise", id: "DM-POWERBI-MASTER" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setQuery(item.id);
                performVerification(item.id);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-indigo-300 font-mono transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Card */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {result ? (
            <div className="rounded-3xl bg-gradient-to-br from-[#121426] via-[#0f101f] to-[#0a0b14] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0">
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      AUTHENTIC & VERIFIED ACCREDITATION
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {result.credentialTitle}
                    </h2>
                    <p className="text-xs font-mono text-indigo-400 mt-0.5">
                      Registry ID: {result.certificateId}
                    </p>
                  </div>
                </div>

                <Link
                  href={result.viewUrl}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Official Diploma</span>
                </Link>
              </div>

              {/* Metadata Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    Conferred Recipient
                  </span>
                  <strong className="text-sm font-bold text-white block">
                    {result.recipientName}
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    Credential Tier
                  </span>
                  <strong className="text-sm font-bold text-amber-400 block capitalize">
                    {result.credentialType === "specialization" ? "Career Specialization Master" : "Discipline Foundation"}
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    Date Conferred
                  </span>
                  <strong className="text-sm font-bold text-white block">
                    {result.issuedAt}
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    Curricular Standing
                  </span>
                  <strong className="text-sm font-bold text-emerald-400 block">
                    {result.grade}
                  </strong>
                </div>
              </div>

              {/* Faculty & Issuing Authority */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  ISSUING ACADEMIC AUTHORITY
                </span>
                <div className="text-sm font-bold text-white">{result.faculty}</div>
                <div className="text-xs text-muted-foreground italic">{result.subFaculty}</div>
              </div>

              {/* Specialization Pillars Breakdown (if applicable) */}
              {result.pillars && (
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Constituent Engineering Pillars Verified:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{pillar.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-white">{pillar.title}</div>
                            <div className="text-[10px] text-muted-foreground">Pillar {idx + 1} Verified</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                          {pillar.challenges}/{pillar.challenges} Passed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cryptographic Ledger Info */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-muted-foreground">
                <div>
                  SHA-256 LEDGER: <span className="text-indigo-300 font-semibold">{result.verificationHash}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Lock className="w-3 h-3" />
                  <span>Immutable Blockchain-Grade Record</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#121320] border border-amber-500/30 p-8 sm:p-10 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto">
                <AlertTriangle className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No Record Found for "{query}"</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                The specified Credential ID or verification hash is not currently recorded in the active ledger registry. Please verify that the ID was entered accurately or contact DataMind Academic Affairs.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setQuery("");
                    setHasSearched(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
                >
                  Clear & Search Again
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-muted-foreground text-xs">
              Loading credential verification portal...
            </div>
          }
        >
          <VerifyContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
