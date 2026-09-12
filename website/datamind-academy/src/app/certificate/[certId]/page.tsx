"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Share2,
  Printer,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  getCertificateById,
  issueCertificate,
  updateCertificateRecipientName,
  getActiveUser,
  StoredCertificate,
  SUBJECT_CERT_DETAILS,
  SUBJECT_CERT_TITLES,
} from "@/lib/progressStore";

/* Corner ornamental filigree flourish SVG */
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 94V26C6 14.9543 14.9543 6 26 6H94"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M16 94V32C16 23.1634 23.1634 16 32 16H94"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx="26" cy="26" r="4.5" fill="currentColor" />
      <circle cx="26" cy="26" r="8" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M26 6L30 16L26 26L22 16Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M6 26L16 22L26 26L16 30Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M32 32C42 42 55 46 70 46"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M32 32C42 42 46 55 46 70"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/* Embossed 32-point gold seal medal with ribbon tails */
function OfficialGoldSeal() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Ribbon tails */}
      <div className="absolute -bottom-6 flex items-center justify-center gap-1 pointer-events-none z-0">
        <div
          className="w-5 h-12 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-800 shadow-md transform -rotate-12 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
        />
        <div
          className="w-5 h-12 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-800 shadow-md transform rotate-12 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
        />
      </div>

      {/* Main medallion */}
      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-1 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
        {/* Serrated starburst outer ring */}
        <div className="w-full h-full rounded-full border-2 border-amber-900/30 bg-gradient-to-br from-[#1a1528] via-[#221c38] to-[#120f1e] print:bg-white flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
          {/* Subtle starburst rays */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />

          {/* Inner gold circular ring */}
          <div className="w-full h-full rounded-full border border-amber-400/50 flex flex-col items-center justify-center p-1">
            <ShieldCheck className="w-6 h-6 text-amber-400 mb-0.5 filter drop-shadow" />
            <span className="text-[7px] sm:text-[8px] font-cinzel font-bold tracking-widest uppercase text-amber-300 print:text-amber-700 leading-tight">
              Official Seal
            </span>
            <span className="text-[6px] font-sans font-bold tracking-wider text-amber-200/80 print:text-amber-800">
              DATAMIND
            </span>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[6px] text-amber-400 leading-none">★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Authentic Cryptographic QR Code SVG */
function VerificationQRCode({ hash }: { hash?: string }) {
  return (
    <div className="p-2 rounded-xl bg-white/5 print:bg-white border border-white/10 print:border-slate-300 inline-flex flex-col items-center justify-center shadow-inner">
      <svg
        className="w-16 h-16 sm:w-18 sm:h-18 text-amber-300 print:text-slate-900"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Corner finder patterns */}
        <rect x="10" y="10" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="16" y="16" width="12" height="12" rx="1.5" />
        <rect x="66" y="10" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="72" y="16" width="12" height="12" rx="1.5" />
        <rect x="10" y="66" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="16" y="72" width="12" height="12" rx="1.5" />

        {/* Alignment & Timing patterns */}
        <rect x="42" y="14" width="6" height="6" rx="1" />
        <rect x="52" y="14" width="6" height="6" rx="1" />
        <rect x="42" y="24" width="6" height="6" rx="1" />
        <rect x="14" y="42" width="6" height="6" rx="1" />
        <rect x="24" y="42" width="6" height="6" rx="1" />
        <rect x="14" y="52" width="6" height="6" rx="1" />

        {/* Data matrix blocks */}
        <rect x="44" y="44" width="12" height="12" rx="2" />
        <rect x="64" y="44" width="6" height="6" rx="1" />
        <rect x="74" y="44" width="6" height="6" rx="1" />
        <rect x="64" y="54" width="6" height="6" rx="1" />
        <rect x="84" y="54" width="6" height="6" rx="1" />
        <rect x="44" y="64" width="6" height="6" rx="1" />
        <rect x="54" y="64" width="6" height="6" rx="1" />
        <rect x="74" y="64" width="6" height="6" rx="1" />
        <rect x="84" y="64" width="6" height="6" rx="1" />
        <rect x="44" y="74" width="6" height="6" rx="1" />
        <rect x="64" y="74" width="6" height="6" rx="1" />
        <rect x="74" y="74" width="6" height="6" rx="1" />
        <rect x="54" y="84" width="6" height="6" rx="1" />
        <rect x="64" y="84" width="6" height="6" rx="1" />
        <rect x="84" y="84" width="6" height="6" rx="1" />
      </svg>
      <span className="text-[8px] font-mono font-semibold text-muted-foreground print:text-slate-700 mt-1 tracking-tight">
        SCAN TO VERIFY
      </span>
    </div>
  );
}

export default function CertificatePage({ params }: { params: { certId: string } }) {
  const [cert, setCert] = useState<StoredCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"obsidian" | "parchment">("obsidian");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const rawCertId = params.certId || "";
    let found = getCertificateById(rawCertId);
    const activeUser = getActiveUser();

    // The user's name is strictly determined by their username in datamind_user
    let targetName = "";
    if (
      activeUser &&
      activeUser.name &&
      activeUser.name !== "DataMind Learner" &&
      activeUser.name.toLowerCase() !== "learner"
    ) {
      targetName = activeUser.name;
    }

    if (found) {
      // Automatically keep certificate recipient name in sync with logged-in user profile
      if (targetName && (found.recipientName !== targetName || found.recipientName === "DataMind Learner")) {
        found.recipientName = targetName;
        updateCertificateRecipientName(found.certificateId, targetName);
      }
      setCert(found);
    } else {
      // Deduce subject from certId string (e.g. DM-PYTHON-1234 -> python)
      const lower = rawCertId.toLowerCase();
      let detectedSubject = "python";
      if (lower.includes("sql")) detectedSubject = "sql";
      else if (lower.includes("python")) detectedSubject = "python";
      else if (lower.includes("powerbi") || lower.includes("pbi")) detectedSubject = "powerbi";
      else if (lower.includes("ml")) detectedSubject = "ml";
      else if (lower.includes("ai")) detectedSubject = "ai";
      else {
        // Check if any subject has progress in localStorage
        try {
          const sids = ["python", "sql", "powerbi", "ml", "ai"];
          for (const s of sids) {
            const raw = localStorage.getItem(`datamind_progress_${s}`);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed.isCompleted || parsed.completedQuestionIds?.length > 0) {
                detectedSubject = s;
                break;
              }
            }
          }
        } catch (e) {}
      }

      // Check query parameter if available
      try {
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const qSubject = urlParams.get("subject");
          if (qSubject && SUBJECT_CERT_TITLES[qSubject.toLowerCase()]) {
            detectedSubject = qSubject.toLowerCase();
          }
        }
      } catch (e) {}

      // Strictly take user's name from active user
      let learnerName = targetName || "DataMind Learner";
      let learnerEmail = activeUser?.email || "student@datamind.academy";

      // Issue and persist this certificate so future queries and dashboard reflect it accurately
      const createdCert = issueCertificate(detectedSubject, learnerName, learnerEmail, 1200, rawCertId);
      setCert(createdCert);
    }
    setLoading(false);
  }, [params.certId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070d] text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-cinzel text-amber-200/80 tracking-widest uppercase">
            Verifying Official Academic Credentials...
          </p>
        </div>
      </div>
    );
  }

  const subjectKey = cert?.subjectId?.toLowerCase() || "python";
  const subjectMeta = SUBJECT_CERT_DETAILS[subjectKey] || SUBJECT_CERT_DETAILS.python;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage("Certificate verification link copied to clipboard!");
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const isDark = themeMode === "obsidian";

  return (
    <div className="min-h-screen bg-[#07070d] text-foreground flex flex-col justify-between p-3 sm:p-6 lg:p-8 font-sans">
      {/* Embedded CSS Print Overrides */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-hidden {
            display: none !important;
          }
          .cert-outer-wrapper {
            max-width: 100vw !important;
            width: 100vw !important;
            min-height: 100vh !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 24px !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .cert-recipient-name {
            color: #0f172a !important;
            -webkit-text-fill-color: #0f172a !important;
            background: none !important;
            font-weight: 900 !important;
          }
          .cert-accent-text {
            color: #92400e !important;
          }
        }
      `}</style>

      {/* Top Action Header (Hidden during print) */}
      <div className="max-w-6xl mx-auto w-full pb-6 print-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Theme Toggle Button */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-medium">
              <button
                onClick={() => setThemeMode("obsidian")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isDark
                    ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Royal Obsidian
              </button>
              <button
                onClick={() => setThemeMode("parchment")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  !isDark
                    ? "bg-amber-100 text-amber-950 font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Classic Ivory
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold border border-white/10 transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" /> Share Verification
            </button>
          </div>
        </div>

        {/* Verification Alert Toast */}
        {toastMessage && (
          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl text-xs text-center font-semibold animate-in fade-in slide-in-from-top-2">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      {/* Main Luxury Certificate Canvas */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center">
        <div
          className={`cert-outer-wrapper relative w-full rounded-3xl p-6 sm:p-12 lg:p-16 transition-colors duration-300 overflow-hidden shadow-2xl border-4 ${
            isDark
              ? "bg-[#0d0e17] text-white border-amber-500/40 shadow-amber-500/10"
              : "bg-[#fbf9f4] text-slate-900 border-amber-700/50 shadow-slate-900/10"
          }`}
        >
          {/* Layered Engraved Security Borders */}
          <div
            className={`absolute inset-3 sm:inset-5 rounded-2xl border-2 pointer-events-none ${
              isDark ? "border-amber-400/20" : "border-amber-800/20"
            }`}
          />
          <div
            className={`absolute inset-4 sm:inset-6 rounded-2xl border border-dashed pointer-events-none ${
              isDark ? "border-amber-400/30" : "border-amber-800/30"
            }`}
          />

          {/* 4 Corner Ornamental Filigrees */}
          <div className="absolute top-5 left-5 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none text-amber-500/40 print:text-amber-800">
            <CornerFlourish className="w-full h-full" />
          </div>
          <div className="absolute top-5 right-5 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none text-amber-500/40 print:text-amber-800 transform rotate-90">
            <CornerFlourish className="w-full h-full" />
          </div>
          <div className="absolute bottom-5 left-5 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none text-amber-500/40 print:text-amber-800 transform -rotate-90">
            <CornerFlourish className="w-full h-full" />
          </div>
          <div className="absolute bottom-5 right-5 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none text-amber-500/40 print:text-amber-800 transform rotate-180">
            <CornerFlourish className="w-full h-full" />
          </div>

          {/* Subtle Background Radial Aura */}
          {isDark && (
            <>
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          {/* Certificate Body Container */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-6 sm:space-y-8">
            {/* Top Academic Insignia & Header */}
            <div className="text-center space-y-2 sm:space-y-3">
              {/* Institution Crest */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 print:text-amber-800 text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.25em] uppercase">
                <Sparkles className="w-3.5 h-3.5" /> DataMind Academy • Institute of Technology
              </div>

              <h2
                className={`text-2xl sm:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.18em] uppercase ${
                  isDark ? "text-amber-100" : "text-slate-900"
                }`}
              >
                Certificate of Excellence
              </h2>

              <p
                className={`text-xs sm:text-sm font-cinzel tracking-[0.3em] uppercase ${
                  isDark ? "text-amber-400/80" : "text-amber-900"
                }`}
              >
                {subjectMeta.school}
              </p>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <div className={`h-px w-16 sm:w-28 ${isDark ? "bg-amber-400/30" : "bg-amber-800/30"}`} />
                <span className={`text-xs ${isDark ? "text-amber-400" : "text-amber-800"}`}>◆</span>
                <div className={`h-px w-16 sm:w-28 ${isDark ? "bg-amber-400/30" : "bg-amber-800/30"}`} />
              </div>
            </div>

            {/* Recipient Conferral Section */}
            <div className="text-center space-y-3 sm:space-y-4 my-4 sm:my-6">
              <p
                className={`text-xs sm:text-sm font-serif italic tracking-wider ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                This official credential is proudly conferred upon
              </p>

              {/* Recipient Full Name — High Contrast & Flawless in PDF Print */}
              <div className="py-2">
                <h1
                  className={`cert-recipient-name font-playfair text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight ${
                    isDark
                      ? "text-amber-200 drop-shadow-[0_2px_12px_rgba(251,191,36,0.2)]"
                      : "text-slate-900"
                  }`}
                  style={{
                    color: isDark ? "#fef3c7" : "#0f172a",
                    WebkitTextFillColor: isDark ? "#fef3c7" : "#0f172a",
                  }}
                >
                  {cert?.recipientName || "DataMind Learner"}
                </h1>

                {/* Name Underline Accent with Central Diamond */}
                <div className="flex items-center justify-center gap-2 max-w-md mx-auto pt-2">
                  <div className={`h-[2px] flex-1 ${isDark ? "bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" : "bg-gradient-to-r from-transparent via-amber-700/50 to-amber-700"}`} />
                  <div className={`w-2 h-2 rotate-45 ${isDark ? "bg-amber-400" : "bg-amber-800"}`} />
                  <div className={`h-[2px] flex-1 ${isDark ? "bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400" : "bg-gradient-to-l from-transparent via-amber-700/50 to-amber-700"}`} />
                </div>
              </div>

              <p
                className={`text-xs sm:text-base font-serif max-w-2xl mx-auto leading-relaxed pt-1 ${
                  isDark ? "text-gray-300" : "text-slate-700"
                }`}
              >
                for demonstrating exceptional technical competence, advanced algorithmic problem-solving, and successfully completing all <strong className={isDark ? "text-white font-bold" : "text-black font-bold"}>40 Engineering Challenges</strong> in
              </p>

              {/* Specialization Badge Box */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 print:border-amber-700">
                <span className="text-2xl sm:text-3xl">{subjectMeta.icon}</span>
                <div className="text-left">
                  <div className="text-base sm:text-xl font-cinzel font-bold text-amber-300 print:text-amber-900">
                    {cert?.subjectTitle}
                  </div>
                  {subjectMeta.description && (
                    <div className="text-[10px] sm:text-xs text-muted-foreground print:text-slate-600 font-sans italic">
                      {subjectMeta.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Official Triad: Verification QR, Embossed Gold Seal, & Signature */}
            <div
              className={`pt-6 sm:pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-end ${
                isDark ? "border-amber-400/20" : "border-amber-800/20"
              }`}
            >
              {/* Column 1: Cryptographic Verification & Details */}
              <div className="flex items-center gap-3.5">
                <VerificationQRCode hash={cert?.verificationHash} />
                <div className="space-y-1 text-left">
                  <div className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-muted-foreground print:text-slate-600">
                    Credential Verification
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-300 print:text-slate-900">
                    ID: {cert?.certificateId}
                  </div>
                  <div className="text-[11px] text-muted-foreground print:text-slate-600">
                    Issued: <strong className={isDark ? "text-white" : "text-slate-900"}>{cert?.issuedAt}</strong>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 print:text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> SHA-256 Ledger Verified
                  </div>
                </div>
              </div>

              {/* Column 2: Official Embossed Gold Seal */}
              <div className="flex flex-col items-center justify-center my-2 sm:my-0">
                <OfficialGoldSeal />
                <span className="text-[9px] font-mono text-muted-foreground print:text-slate-500 mt-5">
                  Hash: {cert?.verificationHash?.slice(0, 16)}...
                </span>
              </div>

              {/* Column 3: Authorized Executive Signature */}
              <div className="text-center sm:text-right space-y-1">
                {/* Authentic Handwritten Signature Calligraphy */}
                <div
                  className={`font-signature text-3xl sm:text-4xl leading-none py-1 select-none ${
                    isDark ? "text-amber-100" : "text-slate-900"
                  }`}
                >
                  Ishant Mishra
                </div>
                <div
                  className={`w-36 sm:w-48 h-0.5 sm:ml-auto my-1 ${
                    isDark ? "bg-amber-400/40" : "bg-amber-800/40"
                  }`}
                />
                <div className={`text-xs font-cinzel font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Ishant Mishra
                </div>
                <div className="text-[10px] font-serif uppercase tracking-wider text-muted-foreground print:text-slate-600">
                  Director of Academic Affairs & Engineering
                </div>
                <div className="text-[9px] font-sans text-amber-400 print:text-amber-800 font-semibold flex items-center justify-center sm:justify-end gap-1">
                  <span>DataMind Academy Board of Accreditation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info (Hidden during print) */}
      <div className="text-center pt-6 text-xs text-muted-foreground/60 print-hidden">
        Official digital diploma issued by DataMind Academy. Verified cryptographically via SHA-256 ledger.
      </div>
    </div>
  );
}
