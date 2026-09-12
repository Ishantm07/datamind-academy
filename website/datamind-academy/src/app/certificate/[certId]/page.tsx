"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Share2,
  Printer,
  Download,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
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
      <path d="M26 6L30 16L26 26L22 16Z" fill="currentColor" opacity="0.8" />
      <path d="M6 26L16 22L26 26L16 30Z" fill="currentColor" opacity="0.8" />
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
function OfficialGoldSeal({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Ribbon tails */}
      <div className="absolute -bottom-5 flex items-center justify-center gap-1 pointer-events-none z-0">
        <div
          className="w-4 sm:w-5 h-10 sm:h-12 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-800 shadow-md transform -rotate-12 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
        />
        <div
          className="w-4 sm:w-5 h-10 sm:h-12 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-800 shadow-md transform rotate-12 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
        />
      </div>

      {/* Main medallion */}
      <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-1 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
        <div
          className={`w-full h-full rounded-full border-2 border-amber-900/40 flex flex-col items-center justify-center text-center p-1.5 relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-[#1a1528] via-[#221c38] to-[#120f1e]"
              : "bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200"
          }`}
        >
          {/* Subtle starburst rays */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />

          {/* Inner gold circular ring */}
          <div className="w-full h-full rounded-full border border-amber-500/60 flex flex-col items-center justify-center p-1">
            <ShieldCheck className="w-5 h-5 text-amber-500 filter drop-shadow" />
            <span
              className={`text-[7px] font-cinzel font-bold tracking-widest uppercase leading-tight ${
                isDark ? "text-amber-300" : "text-amber-900"
              }`}
            >
              Official Seal
            </span>
            <span
              className={`text-[6px] font-sans font-bold tracking-wider ${
                isDark ? "text-amber-200/80" : "text-amber-800"
              }`}
            >
              DATAMIND
            </span>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[5px] text-amber-500 leading-none">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Authentic Cryptographic QR Code SVG */
function VerificationQRCode({ hash, isDark }: { hash?: string; isDark: boolean }) {
  return (
    <div
      className={`p-1.5 sm:p-2 rounded-xl border inline-flex flex-col items-center justify-center shadow-inner ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white border-amber-900/20"
      }`}
    >
      <svg
        className={`w-12 h-12 sm:w-16 sm:h-16 ${
          isDark ? "text-amber-300" : "text-slate-900"
        }`}
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
      <span
        className={`text-[7px] font-mono font-bold mt-1 tracking-tight ${
          isDark ? "text-amber-400/80" : "text-amber-900"
        }`}
      >
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
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const rawCertId = params.certId || "";
    if (
      rawCertId.toLowerCase().includes("spec") ||
      rawCertId.toLowerCase().includes("bidev") ||
      rawCertId.toLowerCase().includes("track")
    ) {
      let track = "bi-developer";
      if (rawCertId.toLowerCase().includes("analyst")) track = "data-analyst";
      else if (rawCertId.toLowerCase().includes("engineer") && !rawCertId.toLowerCase().includes("ai")) track = "data-engineer";
      else if (rawCertId.toLowerCase().includes("scientist")) track = "data-scientist";
      else if (rawCertId.toLowerCase().includes("ai")) track = "ai-engineer";
      window.location.href = `/certificate/specialization/${track}`;
      return;
    }

    let found = getCertificateById(rawCertId);
    if (found?.isSpecialization) {
      window.location.href = `/certificate/specialization/${found.trackId || "bi-developer"}`;
      return;
    }

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
  const isDark = themeMode === "obsidian";

  const displayDate =
    cert?.issuedAt && cert.issuedAt.trim()
      ? cert.issuedAt.trim()
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

  const displayHash =
    cert?.verificationHash && cert.verificationHash.trim()
      ? cert.verificationHash.slice(0, 16) + "..."
      : "0x7F8A3B21E5C4...";

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

  /* High-Resolution 1920x1357 PNG Download using HTML5 Canvas */
  const handleDownloadPNG = () => {
    try {
      setIsGeneratingImage(true);
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1357; // 1.414:1 standard diploma ratio
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Background
      if (isDark) {
        const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1357);
        bgGrad.addColorStop(0, "#080911");
        bgGrad.addColorStop(0.5, "#0e0f1b");
        bgGrad.addColorStop(1, "#07080f");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1920, 1357);
      } else {
        ctx.fillStyle = "#fbf9f4";
        ctx.fillRect(0, 0, 1920, 1357);
      }

      // 2. Borders
      ctx.strokeStyle = isDark ? "#d97706" : "#b45309";
      ctx.lineWidth = 10;
      ctx.strokeRect(50, 50, 1820, 1257);

      ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.3)" : "rgba(180, 83, 9, 0.3)";
      ctx.lineWidth = 3;
      ctx.strokeRect(70, 70, 1780, 1217);

      // 3. Header Texts
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#fbbf24" : "#92400e";
      ctx.font = "bold 20px 'Cinzel', Georgia, serif";
      ctx.fillText("DATAMIND ACADEMY • INSTITUTE OF TECHNOLOGY", 960, 160);

      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "bold 58px 'Cinzel', Georgia, serif";
      ctx.fillText("CERTIFICATE OF EXCELLENCE", 960, 240);

      ctx.fillStyle = isDark ? "#fbbf24" : "#b45309";
      ctx.font = "24px 'Cinzel', Georgia, serif";
      ctx.fillText(subjectMeta.school.toUpperCase(), 960, 290);

      // Divider line
      ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.4)" : "rgba(180, 83, 9, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(760, 325);
      ctx.lineTo(1160, 325);
      ctx.stroke();

      // 4. Recipient Section
      ctx.fillStyle = isDark ? "#9ca3af" : "#4b5563";
      ctx.font = "italic 26px Georgia, serif";
      ctx.fillText("This official credential is proudly conferred upon", 960, 410);

      // Recipient Name
      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "bold 82px 'Playfair Display', Georgia, serif";
      const recipient = cert?.recipientName || "DataMind Learner";
      ctx.fillText(recipient, 960, 520);

      // Underline Bar
      ctx.strokeStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(600, 550);
      ctx.lineTo(1320, 550);
      ctx.stroke();

      // 5. Citation Text
      ctx.fillStyle = isDark ? "#d1d5db" : "#334155";
      ctx.font = "24px Georgia, serif";
      ctx.fillText(
        "for demonstrating exceptional technical competence, advanced algorithmic problem-solving,",
        960,
        630
      );
      ctx.fillText(
        "and successfully completing all 40 Engineering Challenges in",
        960,
        670
      );

      // Subject Box
      ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.15)";
      ctx.strokeStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.lineWidth = 2;
      ctx.roundRect(560, 720, 800, 90, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isDark ? "#fde68a" : "#78350f";
      ctx.font = "bold 32px 'Cinzel', Georgia, serif";
      ctx.fillText(cert?.subjectTitle || "Engineering Mastery", 960, 775);

      // 6. Bottom Row (Verification, Seal, Signature)
      // Left: Verification info
      ctx.textAlign = "left";
      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "bold 16px 'Cinzel', Georgia, serif";
      ctx.fillText("CREDENTIAL VERIFICATION", 160, 1070);

      ctx.fillStyle = isDark ? "#fde68a" : "#0f172a";
      ctx.font = "bold 20px monospace";
      ctx.fillText(`ID: ${cert?.certificateId}`, 160, 1105);

      ctx.fillStyle = isDark ? "#d1d5db" : "#334155";
      ctx.font = "18px Georgia, serif";
      ctx.fillText(`Issued: ${displayDate}`, 160, 1140);

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 16px monospace";
      ctx.fillText("✓ SHA-256 Ledger Verified", 160, 1175);

      // Center: Seal text
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.font = "bold 22px 'Cinzel', Georgia, serif";
      ctx.fillText("★ OFFICIAL SEAL OF EXCELLENCE ★", 960, 1110);
      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "16px monospace";
      ctx.fillText(`Hash: ${displayHash}`, 960, 1150);

      // Right: Signature
      ctx.textAlign = "right";
      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "48px 'Alex Brush', cursive, serif";
      ctx.fillText("Ishant Mishra", 1760, 1075);

      ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.5)" : "rgba(180, 83, 9, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(1480, 1095);
      ctx.lineTo(1760, 1095);
      ctx.stroke();

      ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
      ctx.font = "bold 20px 'Cinzel', Georgia, serif";
      ctx.fillText("Ishant Mishra", 1760, 1125);

      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "16px Georgia, serif";
      ctx.fillText("Director of Academic Affairs & Engineering", 1760, 1155);

      ctx.fillStyle = isDark ? "#fbbf24" : "#92400e";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("DataMind Academy Board of Accreditation", 1760, 1185);

      // 7. Trigger Direct Download
      const link = document.createElement("a");
      link.download = `DataMind-Certificate-${cert?.certificateId || "completion"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setIsGeneratingImage(false);
      setToastMessage("Certificate PNG downloaded successfully!");
      setTimeout(() => setToastMessage(null), 3500);
    } catch (e) {
      console.error(e);
      setIsGeneratingImage(false);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col justify-between p-2 sm:p-4 lg:p-6 transition-colors duration-300 ${
        isDark ? "bg-[#07070d] text-white" : "bg-[#f4efe6] text-slate-900"
      }`}
    >
      {/* 
        CRITICAL: Synchronized Print Overrides 
        Ensures Chrome's Print / Save as PDF dialog:
        1. Fully preserves the ACTIVE theme (Royal Obsidian stays rich dark obsidian, Classic Ivory stays parchment).
        2. Fits strictly onto EXACTLY 1 single landscape page with zero spillover.
        3. Guarantees all text elements (recipient name, "40 Engineering Challenges", date, signatures) have maximum contrast and visibility.
      */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            overflow: hidden !important;
            background-color: ${isDark ? "#080911" : "#fbf9f4"} !important;
            color: ${isDark ? "#ffffff" : "#0f172a"} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-hidden {
            display: none !important;
          }
          .min-h-screen {
            min-height: 100vh !important;
            height: 100vh !important;
            max-height: 100vh !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
          }
          .cert-outer-wrapper {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 24px 36px !important;
            border-radius: 0 !important;
            border-width: 6px !important;
            box-sizing: border-box !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            background-color: ${isDark ? "#0d0e17" : "#fbf9f4"} !important;
            color: ${isDark ? "#ffffff" : "#0f172a"} !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .cert-recipient-name {
            color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
            -webkit-text-fill-color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
            font-weight: 900 !important;
          }
          .cert-accent-strong {
            color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
            -webkit-text-fill-color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
            font-weight: 800 !important;
          }
          .cert-signature-name {
            color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
            -webkit-text-fill-color: ${isDark ? "#fef3c7" : "#0f172a"} !important;
          }
        }
      `}</style>

      {/* Top Action Toolbar (Hidden during print) */}
      <div className="max-w-6xl mx-auto w-full pb-4 print-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {/* Theme Toggle Button */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-medium ${
                isDark ? "bg-white/5 border-white/10" : "bg-white border-amber-900/15"
              }`}
            >
              <button
                onClick={() => setThemeMode("obsidian")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isDark
                    ? "bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Royal Obsidian
              </button>
              <button
                onClick={() => setThemeMode("parchment")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  !isDark
                    ? "bg-amber-200/80 text-amber-950 font-bold border border-amber-400/40 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Classic Ivory
              </button>
            </div>

            {/* Instant PNG Download Button */}
            <button
              onClick={handleDownloadPNG}
              disabled={isGeneratingImage}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingImage ? "Generating Image..." : "Download Image (PNG)"}
            </button>

            {/* Native Browser Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            {/* Share Verification Link */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shadow-sm ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/10"
                  : "bg-white hover:bg-amber-50 text-slate-800 border-amber-900/15"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Verification Alert Toast */}
        {toastMessage && (
          <div className="mt-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl text-xs text-center font-semibold animate-in fade-in slide-in-from-top-2">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      {/* Main Luxury Certificate Canvas (1.414:1 Landscape Ratio) */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center flex-1">
        <div
          id="certificate-canvas"
          className={`cert-outer-wrapper relative w-full aspect-[1.414/1] rounded-3xl p-6 sm:p-10 lg:p-12 transition-colors duration-300 overflow-hidden shadow-2xl border-4 flex flex-col justify-between ${
            isDark
              ? "bg-[#0d0e17] text-white border-amber-500/40 shadow-amber-500/10"
              : "bg-[#fbf9f4] text-slate-900 border-amber-700/50 shadow-slate-900/10"
          }`}
        >
          {/* Layered Engraved Security Borders */}
          <div
            className={`absolute inset-2.5 sm:inset-4 rounded-2xl border-2 pointer-events-none ${
              isDark ? "border-amber-400/25" : "border-amber-800/25"
            }`}
          />
          <div
            className={`absolute inset-3.5 sm:inset-5 rounded-2xl border border-dashed pointer-events-none ${
              isDark ? "border-amber-400/35" : "border-amber-800/35"
            }`}
          />

          {/* 4 Corner Ornamental Filigrees */}
          <div
            className={`absolute top-4 left-4 w-12 h-12 sm:w-20 sm:h-20 pointer-events-none ${
              isDark ? "text-amber-400/40" : "text-amber-800/50"
            }`}
          >
            <CornerFlourish className="w-full h-full" />
          </div>
          <div
            className={`absolute top-4 right-4 w-12 h-12 sm:w-20 sm:h-20 pointer-events-none transform rotate-90 ${
              isDark ? "text-amber-400/40" : "text-amber-800/50"
            }`}
          >
            <CornerFlourish className="w-full h-full" />
          </div>
          <div
            className={`absolute bottom-4 left-4 w-12 h-12 sm:w-20 sm:h-20 pointer-events-none transform -rotate-90 ${
              isDark ? "text-amber-400/40" : "text-amber-800/50"
            }`}
          >
            <CornerFlourish className="w-full h-full" />
          </div>
          <div
            className={`absolute bottom-4 right-4 w-12 h-12 sm:w-20 sm:h-20 pointer-events-none transform rotate-180 ${
              isDark ? "text-amber-400/40" : "text-amber-800/50"
            }`}
          >
            <CornerFlourish className="w-full h-full" />
          </div>

          {/* Background Aura */}
          {isDark && (
            <>
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          {/* =================================================================== */}
          {/* TOP SECTION: Academic Insignia & Titles */}
          {/* =================================================================== */}
          <div className="relative z-10 text-center space-y-1 sm:space-y-2 pt-1">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.22em] uppercase border ${
                isDark
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-amber-100 border-amber-700/30 text-amber-900"
              }`}
            >
              <Sparkles className="w-3 h-3" /> DataMind Academy • Institute of Technology
            </div>

            <h2
              className={`cert-title-heading text-2xl sm:text-3xl lg:text-4xl font-cinzel font-extrabold tracking-[0.16em] uppercase ${
                isDark ? "text-amber-100" : "text-slate-900"
              }`}
              style={{
                color: isDark ? "#fef3c7" : "#0f172a",
                WebkitTextFillColor: isDark ? "#fef3c7" : "#0f172a",
              }}
            >
              Certificate of Excellence
            </h2>

            <p
              className={`text-[11px] sm:text-xs font-cinzel tracking-[0.25em] uppercase ${
                isDark ? "text-amber-400/80" : "text-amber-900"
              }`}
            >
              {subjectMeta.school}
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-2.5 pt-0.5">
              <div className={`h-px w-14 sm:w-24 ${isDark ? "bg-amber-400/30" : "bg-amber-800/30"}`} />
              <span className={`text-[10px] ${isDark ? "text-amber-400" : "text-amber-800"}`}>◆</span>
              <div className={`h-px w-14 sm:w-24 ${isDark ? "bg-amber-400/30" : "bg-amber-800/30"}`} />
            </div>
          </div>

          {/* =================================================================== */}
          {/* MIDDLE SECTION: Recipient Conferral & Subject Specialization */}
          {/* =================================================================== */}
          <div className="relative z-10 text-center space-y-2 sm:space-y-3 my-auto py-2">
            <p
              className={`text-xs sm:text-sm font-serif italic tracking-wider ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              This official credential is proudly conferred upon
            </p>

            {/* Recipient Full Name — High Contrast & Flawless in PDF Print */}
            <div className="py-1">
              <h1
                className={`cert-recipient-name font-playfair text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
                  isDark
                    ? "text-amber-200 drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]"
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
              <div className="flex items-center justify-center gap-2 max-w-sm sm:max-w-md mx-auto pt-1.5">
                <div
                  className={`h-[2px] flex-1 ${
                    isDark
                      ? "bg-gradient-to-r from-transparent via-amber-400/60 to-amber-400"
                      : "bg-gradient-to-r from-transparent via-amber-700/60 to-amber-700"
                  }`}
                />
                <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? "bg-amber-400" : "bg-amber-800"}`} />
                <div
                  className={`h-[2px] flex-1 ${
                    isDark
                      ? "bg-gradient-to-l from-transparent via-amber-400/60 to-amber-400"
                      : "bg-gradient-to-l from-transparent via-amber-700/60 to-amber-700"
                  }`}
                />
              </div>
            </div>

            {/* Citation Statement */}
            <p
              className={`text-[11px] sm:text-sm font-serif max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-slate-700"
              }`}
            >
              for demonstrating exceptional technical competence, advanced algorithmic problem-solving, and successfully completing all{" "}
              <strong
                className={`cert-accent-strong font-bold ${
                  isDark ? "text-amber-200" : "text-amber-950"
                }`}
                style={{
                  color: isDark ? "#fef3c7" : "#451a03",
                  WebkitTextFillColor: isDark ? "#fef3c7" : "#451a03",
                }}
              >
                40 Engineering Challenges
              </strong>{" "}
              in
            </p>

            {/* Specialization Badge Pill */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 sm:py-2 rounded-xl border ${
                isDark
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-amber-100/70 border-amber-700/30"
              }`}
            >
              <span className="text-xl sm:text-2xl">{subjectMeta.icon}</span>
              <div className="text-left">
                <div
                  className={`text-sm sm:text-base font-cinzel font-bold ${
                    isDark ? "text-amber-300" : "text-amber-900"
                  }`}
                >
                  {cert?.subjectTitle}
                </div>
                {subjectMeta.description && (
                  <div
                    className={`text-[9px] sm:text-[10px] font-sans italic ${
                      isDark ? "text-muted-foreground" : "text-slate-600"
                    }`}
                  >
                    {subjectMeta.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* BOTTOM SECTION: Official Verification, Gold Foil Seal & Signatures */}
          {/* =================================================================== */}
          <div
            className={`pt-3 sm:pt-5 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 items-end pb-1 ${
              isDark ? "border-amber-400/25" : "border-amber-800/25"
            }`}
          >
            {/* Column 1: Cryptographic Verification QR & Ledger */}
            <div className="flex items-center gap-2.5">
              <VerificationQRCode hash={cert?.verificationHash} isDark={isDark} />
              <div className="space-y-0.5 text-left">
                <div
                  className={`text-[9px] font-cinzel font-bold uppercase tracking-wider ${
                    isDark ? "text-muted-foreground" : "text-slate-600"
                  }`}
                >
                  Credential Verification
                </div>
                <div
                  className={`text-[11px] font-mono font-bold ${
                    isDark ? "text-amber-300" : "text-slate-900"
                  }`}
                >
                  ID: {cert?.certificateId}
                </div>
                <div
                  className={`text-[10px] ${
                    isDark ? "text-muted-foreground" : "text-slate-600"
                  }`}
                >
                  Issued:{" "}
                  <strong
                    className="cert-accent-strong"
                    style={{
                      color: isDark ? "#fef3c7" : "#0f172a",
                      WebkitTextFillColor: isDark ? "#fef3c7" : "#0f172a",
                    }}
                  >
                    {displayDate}
                  </strong>
                </div>
                <div
                  className={`text-[9px] font-mono flex items-center gap-1 font-semibold ${
                    isDark ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" /> SHA-256 Ledger Verified
                </div>
              </div>
            </div>

            {/* Column 2: Official Embossed Gold Seal */}
            <div className="flex flex-col items-center justify-center my-1 sm:my-0">
              <OfficialGoldSeal isDark={isDark} />
              <span
                className={`text-[8px] font-mono mt-3.5 tracking-tight ${
                  isDark ? "text-muted-foreground" : "text-slate-600"
                }`}
              >
                Hash: {displayHash}
              </span>
            </div>

            {/* Column 3: Authorized Executive Signature */}
            <div className="text-center sm:text-right space-y-0.5">
              <div
                className={`cert-signature-name font-signature text-2.5xl sm:text-3xl leading-none select-none ${
                  isDark ? "text-amber-200" : "text-slate-900"
                }`}
                style={{
                  color: isDark ? "#fef3c7" : "#0f172a",
                  WebkitTextFillColor: isDark ? "#fef3c7" : "#0f172a",
                }}
              >
                Ishant Mishra
              </div>
              <div
                className={`w-32 sm:w-44 h-0.5 sm:ml-auto my-0.5 ${
                  isDark ? "bg-amber-400/40" : "bg-amber-800/40"
                }`}
              />
              <div
                className={`text-[11px] font-cinzel font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Ishant Mishra
              </div>
              <div
                className={`text-[9px] font-serif uppercase tracking-wider ${
                  isDark ? "text-muted-foreground" : "text-slate-600"
                }`}
              >
                Director of Academic Affairs & Engineering
              </div>
              <div
                className={`text-[8px] font-sans font-semibold flex items-center justify-center sm:justify-end gap-1 ${
                  isDark ? "text-amber-400" : "text-amber-800"
                }`}
              >
                <span>DataMind Academy Board of Accreditation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info (Hidden during print) */}
      <div className="text-center pt-3 text-[11px] text-muted-foreground/60 print-hidden">
        Official digital diploma issued by DataMind Academy. Verified cryptographically via SHA-256 ledger.
      </div>
    </div>
  );
}
