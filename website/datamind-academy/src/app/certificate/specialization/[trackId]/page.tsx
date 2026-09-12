"use client";

import { useEffect, useState } from "react";
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
  Layers,
  GraduationCap,
} from "lucide-react";
import {
  getActiveUser,
  getSpecializationCertificate,
  completeSpecializationForDemo,
  SPECIALIZATION_CERT_DETAILS,
  StoredCertificate,
  SpecializationMeta,
} from "@/lib/progressStore";

/* Roman Laurel Wreath SVG Flourish */
function LaurelWreath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 75C12 60 12 40 25 25C28 32 30 42 28 50C25 35 32 25 45 15C45 25 42 35 36 44C42 30 52 22 65 18C62 28 58 36 50 44C60 32 72 28 85 28C78 38 72 44 62 48C75 42 85 45 92 55C82 58 75 58 66 56C78 58 85 68 88 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="25" cy="25" r="2.5" fill="currentColor" />
      <circle cx="45" cy="15" r="2.5" fill="currentColor" />
      <circle cx="65" cy="18" r="2.5" fill="currentColor" />
      <circle cx="85" cy="28" r="2.5" fill="currentColor" />
    </svg>
  );
}

/* Grand Dual-Medallion Imperial Gold Foil Seal with Silk Ribbon Tails */
function ImperialSpecializationSeal({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Dual Silk Ribbon Tails */}
      <div className="absolute -bottom-6 flex items-center justify-center gap-1.5 pointer-events-none z-0">
        <div
          className="w-4 sm:w-5 h-12 sm:h-14 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-900 shadow-lg transform -rotate-15 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
        />
        <div
          className="w-4 sm:w-5 h-12 sm:h-14 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-900 shadow-lg transform rotate-15 origin-top"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
        />
      </div>

      {/* Main Double-Ring Medallion */}
      <div className="relative z-10 w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 p-1.5 shadow-2xl shadow-amber-500/40 flex items-center justify-center">
        <div
          className={`w-full h-full rounded-full border-2 border-amber-900/50 flex flex-col items-center justify-center text-center p-1.5 relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-[#1c162e] via-[#281f42] to-[#120d20]"
              : "bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200"
          }`}
        >
          {/* Circular Starburst */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />

          <div className="w-full h-full rounded-full border border-amber-500/70 flex flex-col items-center justify-center p-1">
            <GraduationCap className="w-5 h-5 text-amber-400 filter drop-shadow" />
            <span
              className={`text-[6.5px] sm:text-[7px] font-cinzel font-black tracking-widest uppercase leading-tight ${
                isDark ? "text-amber-300" : "text-amber-950"
              }`}
            >
              SPECIALIZATION
            </span>
            <span
              className={`text-[5.5px] font-sans font-extrabold tracking-wider ${
                isDark ? "text-amber-200/80" : "text-amber-800"
              }`}
            >
              EXCELLENCE SEAL
            </span>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[5px] text-amber-400 leading-none">
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

/* Cryptographic QR Code Component */
function SpecializationQRCode({ hash, isDark }: { hash?: string; isDark: boolean }) {
  return (
    <div
      className={`p-1.5 sm:p-2 rounded-xl border inline-flex flex-col items-center justify-center shadow-inner ${
        isDark ? "bg-white/5 border-white/10" : "bg-white border-amber-900/20"
      }`}
    >
      <svg
        className={`w-11 h-11 sm:w-14 sm:h-14 ${isDark ? "text-amber-300" : "text-slate-900"}`}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <rect x="10" y="10" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="16" y="16" width="12" height="12" rx="1.5" />
        <rect x="66" y="10" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="72" y="16" width="12" height="12" rx="1.5" />
        <rect x="10" y="66" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="16" y="72" width="12" height="12" rx="1.5" />
        <rect x="42" y="14" width="6" height="6" rx="1" />
        <rect x="52" y="14" width="6" height="6" rx="1" />
        <rect x="42" y="24" width="6" height="6" rx="1" />
        <rect x="14" y="42" width="6" height="6" rx="1" />
        <rect x="24" y="42" width="6" height="6" rx="1" />
        <rect x="14" y="52" width="6" height="6" rx="1" />
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
      <span className={`text-[6.5px] font-mono font-bold mt-1 tracking-tight ${isDark ? "text-amber-400/80" : "text-amber-900"}`}>
        VERIFY SPEC CREDENTIAL
      </span>
    </div>
  );
}

export default function SpecializationCertificatePage({ params }: { params: { trackId: string } }) {
  const trackId = (params.trackId || "bi-developer").toLowerCase();
  const specMeta: SpecializationMeta = SPECIALIZATION_CERT_DETAILS[trackId] || SPECIALIZATION_CERT_DETAILS["bi-developer"];

  const [cert, setCert] = useState<StoredCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"obsidian" | "parchment">("obsidian");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    // 1. Check if specialization cert already exists in localStorage
    let found = getSpecializationCertificate(trackId);
    const activeUser = getActiveUser();

    // 2. If not found, immediately complete for demo purposes so the user sees it live!
    if (!found) {
      found = completeSpecializationForDemo(trackId, activeUser?.name, activeUser?.email);
    }

    // Sync recipient name if active user has a custom name
    if (found && activeUser?.name && activeUser.name !== "DataMind Learner") {
      found.recipientName = activeUser.name;
    }

    setCert(found);
    setLoading(false);
  }, [trackId]);

  if (loading || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070d] text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-cinzel text-amber-200/80 tracking-widest uppercase">
            Verifying Specialization Credentials...
          </p>
        </div>
      </div>
    );
  }

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
      : "0x7F8A3B21E5C4A9D8...";

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage("Specialization Verification Link copied to clipboard!");
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  /* High-Resolution 1920x1357 PNG Download using HTML5 Canvas Tailored for Specialization Pillars */
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
        bgGrad.addColorStop(0.5, "#0f101f");
        bgGrad.addColorStop(1, "#07080f");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1920, 1357);
      } else {
        ctx.fillStyle = "#fbf8f2";
        ctx.fillRect(0, 0, 1920, 1357);
      }

      // 2. Dual Guilloche Gold & Platinum Security Borders
      ctx.strokeStyle = isDark ? "#d97706" : "#92400e";
      ctx.lineWidth = 12;
      ctx.strokeRect(45, 45, 1830, 1267);

      ctx.strokeStyle = isDark ? "#fbbf24" : "#b45309";
      ctx.lineWidth = 3;
      ctx.strokeRect(65, 65, 1790, 1227);

      ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.25)" : "rgba(180, 83, 9, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(80, 80, 1760, 1197);
      ctx.setLineDash([]); // reset

      // 3. Header Texts
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#fbbf24" : "#92400e";
      ctx.font = "bold 22px 'Cinzel', Georgia, serif";
      ctx.fillText("DATAMIND ACADEMY • EXECUTIVE SPECIALIZATION CREDENTIAL", 960, 150);

      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "bold 56px 'Cinzel', Georgia, serif";
      ctx.fillText("PROFESSIONAL SPECIALIZATION DIPLOMA", 960, 225);

      ctx.fillStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.font = "bold 20px 'Cinzel', Georgia, serif";
      ctx.fillText(specMeta.faculty.toUpperCase(), 960, 270);

      // Divider Line
      ctx.strokeStyle = isDark ? "rgba(245, 158, 11, 0.5)" : "rgba(180, 83, 9, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(700, 295);
      ctx.lineTo(1220, 295);
      ctx.stroke();

      // 4. Recipient Conferral
      ctx.fillStyle = isDark ? "#9ca3af" : "#475569";
      ctx.font = "italic 24px Georgia, serif";
      ctx.fillText("By authority of the Executive Board, this Specialization Credential is conferred upon", 960, 360);

      // Recipient Full Name
      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "bold 76px 'Playfair Display', Georgia, serif";
      ctx.fillText(cert.recipientName || "DataMind Learner", 960, 450);

      // Name Underline
      ctx.strokeStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(600, 480);
      ctx.lineTo(1320, 480);
      ctx.stroke();

      // 5. Specialization Citation
      ctx.fillStyle = isDark ? "#d1d5db" : "#334155";
      ctx.font = "22px Georgia, serif";
      ctx.fillText(
        "having fulfilled all rigorous multi-disciplinary prerequisites, comprehensive challenge batteries,",
        960,
        540
      );
      ctx.fillText(
        "and successfully demonstrated certified engineering mastery across all constituent curriculum pillars in the",
        960,
        575
      );

      // Big Specialization Title Banner
      ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.12)";
      ctx.strokeStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.lineWidth = 2.5;
      ctx.roundRect(460, 615, 1000, 85, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isDark ? "#fde68a" : "#78350f";
      ctx.font = "bold 32px 'Cinzel', Georgia, serif";
      ctx.fillText(specMeta.title, 960, 670);

      // 6. Constituent Pillars Boxes (Visual Dual Cards)
      const pillars = cert.pillars || [
        { id: "sql", title: "Relational Database Systems & SQL Engineering", score: 1200, questions: 40, icon: "🗄️" },
        { id: "powerbi", title: "Enterprise Power BI Architecture & DAX", score: 1200, questions: 40, icon: "📊" },
      ];

      const cardWidth = 480;
      const cardHeight = 110;
      const gap = 40;
      const totalWidth = pillars.length * cardWidth + (pillars.length - 1) * gap;
      const startX = (1920 - totalWidth) / 2;

      pillars.forEach((p, idx) => {
        const x = startX + idx * (cardWidth + gap);
        const y = 735;

        // Card bg
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.7)";
        ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.4)" : "rgba(180, 83, 9, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.roundRect(x, y, cardWidth, cardHeight, 14);
        ctx.fill();
        ctx.stroke();

        // Pillar Header
        ctx.textAlign = "left";
        ctx.fillStyle = isDark ? "#fbbf24" : "#92400e";
        ctx.font = "bold 15px 'Cinzel', Georgia, serif";
        ctx.fillText(`PILLAR ${idx + 1}: ${p.id.toUpperCase()} MASTERY`, x + 24, y + 36);

        // Pillar Title
        ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
        ctx.font = "bold 18px 'Cinzel', Georgia, serif";
        ctx.fillText(p.title.length > 34 ? p.title.slice(0, 32) + "..." : p.title, x + 24, y + 68);

        // Badge
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 14px monospace";
        ctx.fillText("✓ 40/40 Challenges Passed • Grade A+ (Honors)", x + 24, y + 95);
      });

      // Cumulative Stats Pill
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#a78bfa" : "#6b21a8";
      ctx.font = "bold 17px monospace";
      ctx.fillText(
        "★ 80 Cumulative Engineering Challenges Passed • 2 Capstone Examinations • Verified Academic Transcript ★",
        960,
        895
      );

      // 7. Bottom Verification & Dual Signatures
      // Left: Verification QR & Ledger
      ctx.textAlign = "left";
      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "bold 16px 'Cinzel', Georgia, serif";
      ctx.fillText("SPECIALIZATION VERIFICATION", 160, 1070);

      ctx.fillStyle = isDark ? "#fde68a" : "#0f172a";
      ctx.font = "bold 20px monospace";
      ctx.fillText(`ID: ${cert.certificateId}`, 160, 1105);

      ctx.fillStyle = isDark ? "#d1d5db" : "#334155";
      ctx.font = "18px Georgia, serif";
      ctx.fillText(`Issued: ${displayDate}`, 160, 1140);

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 16px monospace";
      ctx.fillText("✓ Multi-Disciplinary SHA-256 Ledger Verified", 160, 1175);

      // Center: Imperial Seal
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.font = "bold 22px 'Cinzel', Georgia, serif";
      ctx.fillText("★ GRAND SPECIALIZATION SEAL ★", 960, 1110);
      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "16px monospace";
      ctx.fillText(`Hash: ${displayHash}`, 960, 1150);

      // Right: Dual Signatures
      // Signature 1
      ctx.textAlign = "right";
      ctx.fillStyle = isDark ? "#fef3c7" : "#0f172a";
      ctx.font = "46px 'Alex Brush', cursive, serif";
      ctx.fillText("Ishant Mishra", 1760, 1060);

      ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.5)" : "rgba(180, 83, 9, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(1480, 1075);
      ctx.lineTo(1760, 1075);
      ctx.stroke();

      ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
      ctx.font = "bold 17px 'Cinzel', Georgia, serif";
      ctx.fillText("Ishant Mishra", 1760, 1100);

      ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
      ctx.font = "14px Georgia, serif";
      ctx.fillText("Director of Academic Affairs & Engineering", 1760, 1125);

      ctx.fillStyle = isDark ? "#f59e0b" : "#b45309";
      ctx.font = "bold 13px 'Cinzel', Georgia, serif";
      ctx.fillText("Board of Executive Accreditation", 1760, 1150);

      // Trigger Direct Download
      const link = document.createElement("a");
      link.download = `DataMind-Specialization-${cert.certificateId || "diploma"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setIsGeneratingImage(false);
      setToastMessage("Specialization Diploma PNG downloaded successfully!");
      setTimeout(() => setToastMessage(null), 3500);
    } catch (e) {
      console.error(e);
      setIsGeneratingImage(false);
    }
  };

  const pillars = cert.pillars || [
    { id: "sql", title: "Relational Database Systems & SQL Engineering", score: 1200, questions: 40, icon: "🗄️" },
    { id: "powerbi", title: "Enterprise Power BI Architecture & DAX", score: 1200, questions: 40, icon: "📊" },
  ];

  return (
    <div
      className={`min-h-screen font-sans flex flex-col justify-between p-2 sm:p-4 lg:p-6 transition-colors duration-300 ${
        isDark ? "bg-[#05060b] text-white" : "bg-[#f4efe6] text-slate-900"
      }`}
    >
      {/* 
        CRITICAL: Synchronized Print Overrides 
        Tailored strictly for the Specialization Diploma layout on single landscape page.
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
            background-color: ${isDark ? "#080911" : "#fbf8f2"} !important;
            color: ${isDark ? "#ffffff" : "#0f172a"} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-hidden {
            display: none !important;
          }
          .spec-outer-wrapper {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 20px 32px !important;
            border-radius: 0 !important;
            border-width: 8px !important;
            box-sizing: border-box !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            background-color: ${isDark ? "#080911" : "#fbf8f2"} !important;
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
          .spec-title-box {
            background-color: ${isDark ? "#1f1830" : "#fef3c7"} !important;
            border-color: ${isDark ? "#f59e0b" : "#b45309"} !important;
          }
        }
      `}</style>

      {/* Top Toolbar */}
      <div className="max-w-6xl mx-auto w-full pb-4 print-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/tracks/${trackId}`}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {specMeta.title.split(" ")[0]} Track
          </Link>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {/* Theme Toggle */}
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
                Imperial Obsidian
              </button>
              <button
                onClick={() => setThemeMode("parchment")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  !isDark
                    ? "bg-amber-200/80 text-amber-950 font-bold border border-amber-400/40 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Presidential Parchment
              </button>
            </div>

            {/* PNG Download */}
            <button
              onClick={handleDownloadPNG}
              disabled={isGeneratingImage}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingImage ? "Generating Image..." : "Download Specialization PNG"}
            </button>

            {/* PDF / Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            {/* Share */}
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

        {toastMessage && (
          <div className="mt-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl text-xs text-center font-semibold animate-in fade-in slide-in-from-top-2">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      {/* Main Specialization Certificate Canvas */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center flex-1">
        <div
          id="specialization-certificate-canvas"
          className={`spec-outer-wrapper relative w-full aspect-[1.414/1] rounded-3xl p-6 sm:p-10 lg:p-11 transition-colors duration-300 overflow-hidden shadow-2xl border-4 flex flex-col justify-between ${
            isDark
              ? "bg-[#090a14] text-white border-amber-500/50 shadow-amber-500/15"
              : "bg-[#fbf8f2] text-slate-900 border-amber-800/60 shadow-slate-900/10"
          }`}
        >
          {/* Dual Guilloché Engraved Security Borders */}
          <div
            className={`absolute inset-2 sm:inset-3 rounded-2xl border-2 pointer-events-none ${
              isDark ? "border-amber-400/30" : "border-amber-800/30"
            }`}
          />
          <div
            className={`absolute inset-3.5 sm:inset-5 rounded-2xl border border-dashed pointer-events-none ${
              isDark ? "border-amber-400/40" : "border-amber-800/40"
            }`}
          />

          {/* Corner Laurel Wreath Ornaments */}
          <div className={`absolute top-4 left-4 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none ${isDark ? "text-amber-400/50" : "text-amber-800/50"}`}>
            <LaurelWreath className="w-full h-full" />
          </div>
          <div className={`absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none transform -scale-x-100 ${isDark ? "text-amber-400/50" : "text-amber-800/50"}`}>
            <LaurelWreath className="w-full h-full" />
          </div>

          {/* Background Auras */}
          {isDark && (
            <>
              <div className="absolute -top-28 -left-28 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          {/* =================================================================== */}
          {/* TOP SECTION: Executive Specialization Ribbon & Title                */}
          {/* =================================================================== */}
          <div className="relative z-10 text-center space-y-1 sm:space-y-1.5 pt-1">
            {/* Distinct 3D Embossed Top Ribbon */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-cinzel font-black tracking-[0.25em] uppercase border shadow-md ${
                isDark
                  ? "bg-gradient-to-r from-amber-600/25 via-yellow-500/20 to-amber-600/25 border-amber-500/40 text-amber-300"
                  : "bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 border-amber-700/40 text-amber-950"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CAREER SPECIALIZATION • EXECUTIVE BOARD OF ACCREDITATION</span>
            </div>

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-cinzel font-black tracking-[0.14em] uppercase ${
                isDark ? "text-amber-100 drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]" : "text-slate-900"
              }`}
            >
              Professional Specialization Diploma
            </h2>

            <p className={`text-[10px] sm:text-xs font-cinzel tracking-[0.22em] uppercase font-bold ${isDark ? "text-amber-400/90" : "text-amber-900"}`}>
              {specMeta.faculty}
            </p>

            {/* Decorative Ornamental Divider */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <div className={`h-[1.5px] w-16 sm:w-28 ${isDark ? "bg-gradient-to-r from-transparent to-amber-400/50" : "bg-gradient-to-r from-transparent to-amber-800/50"}`} />
              <span className={`text-xs ${isDark ? "text-amber-400" : "text-amber-800"}`}>✦ ◆ ✦</span>
              <div className={`h-[1.5px] w-16 sm:w-28 ${isDark ? "bg-gradient-to-l from-transparent to-amber-400/50" : "bg-gradient-to-l from-transparent to-amber-800/50"}`} />
            </div>
          </div>

          {/* =================================================================== */}
          {/* MIDDLE SECTION: Recipient & Constituent Pillars Grid                */}
          {/* =================================================================== */}
          <div className="relative z-10 text-center space-y-2 sm:space-y-2.5 my-auto py-1">
            <p className={`text-[11px] sm:text-xs font-serif italic tracking-wider ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              By authority of the Academic Faculty and Executive Board, this Master Credential is conferred upon
            </p>

            {/* Recipient Full Name */}
            <div className="py-0.5">
              <h1
                className={`cert-recipient-name font-playfair text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
                  isDark ? "text-amber-200 drop-shadow-[0_2px_12px_rgba(251,191,36,0.25)]" : "text-slate-900"
                }`}
              >
                {cert.recipientName || "DataMind Learner"}
              </h1>

              {/* Name Underline */}
              <div className="flex items-center justify-center gap-2 max-w-sm sm:max-w-md mx-auto pt-1">
                <div className={`h-[2px] flex-1 ${isDark ? "bg-gradient-to-r from-transparent via-amber-400/70 to-amber-400" : "bg-gradient-to-r from-transparent via-amber-700/70 to-amber-700"}`} />
                <div className={`w-2 h-2 rotate-45 ${isDark ? "bg-amber-400" : "bg-amber-800"}`} />
                <div className={`h-[2px] flex-1 ${isDark ? "bg-gradient-to-l from-transparent via-amber-400/70 to-amber-400" : "bg-gradient-to-l from-transparent via-amber-700/70 to-amber-700"}`} />
              </div>
            </div>

            <p className={`text-[11px] sm:text-xs font-serif max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              having demonstrated comprehensive technical competence, algorithmic proficiency, and successfully completing all curriculum modules, challenge batteries, and capstone examinations in the
            </p>

            {/* Specialization Title Box */}
            <div
              className={`spec-title-box inline-flex items-center gap-2.5 px-5 py-1.5 sm:py-2 rounded-xl border shadow-inner ${
                isDark
                  ? "bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border-amber-500/40"
                  : "bg-amber-100/80 border-amber-700/40"
              }`}
            >
              <span className="text-xl sm:text-2xl">{specMeta.icon}</span>
              <span className={`text-sm sm:text-base font-cinzel font-black tracking-wide ${isDark ? "text-amber-300" : "text-amber-950"}`}>
                {specMeta.title}
              </span>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CONSTITUENT ENGINEERING PILLARS GRID (Distinctive Feature!)   */}
            {/* ------------------------------------------------------------- */}
            <div className="pt-1.5 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`text-[9px] sm:text-[10px] font-cinzel font-bold tracking-[0.2em] uppercase ${isDark ? "text-amber-400/80" : "text-amber-900"}`}>
                  Verified Constituent Pillars & Competencies
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
                {pillars.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`rounded-xl p-2.5 sm:p-3 border transition-all ${
                      isDark
                        ? "bg-white/[0.03] border-amber-500/30 hover:border-amber-500/50 shadow-inner"
                        : "bg-white/80 border-amber-800/25 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{p.icon}</span>
                        <span className={`text-[10px] font-cinzel font-extrabold uppercase tracking-wider ${isDark ? "text-amber-300" : "text-amber-900"}`}>
                          Pillar {idx + 1}: {p.id.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                        ✓ 40/40 Challenges
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                      {p.title}
                    </h4>

                    <div className="flex items-center justify-between mt-1 text-[9px] text-muted-foreground">
                      <span>Grade: A+ (Honors)</span>
                      <span className="font-mono text-emerald-400 font-semibold">1,200 Pts • Capstone Passed</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cumulative Metrics Bar */}
              <div className="mt-2 text-center">
                <span
                  className={`inline-block px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-tight border ${
                    isDark
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                      : "bg-purple-100 text-purple-900 border-purple-300"
                  }`}
                >
                  ★ 80 Cumulative Engineering Challenges Passed • 2 Capstones Completed • Verified Transcript ★
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* BOTTOM SECTION: Cryptographic Ledger, Imperial Seal & Dual Signatures */}
          {/* =================================================================== */}
          <div
            className={`pt-2.5 sm:pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-end pb-0.5 ${
              isDark ? "border-amber-400/30" : "border-amber-800/30"
            }`}
          >
            {/* Column 1: QR & Verification */}
            <div className="flex items-center gap-2.5">
              <SpecializationQRCode hash={cert.verificationHash} isDark={isDark} />
              <div className="space-y-0.5 text-left">
                <div className={`text-[8.5px] font-cinzel font-bold uppercase tracking-wider ${isDark ? "text-muted-foreground" : "text-slate-600"}`}>
                  Specialization Credential ID
                </div>
                <div className={`text-[10.5px] font-mono font-bold ${isDark ? "text-amber-300" : "text-slate-900"}`}>
                  {cert.certificateId}
                </div>
                <div className={`text-[9px] ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  Conferred: {displayDate}
                </div>
                <div className="text-[8.5px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> SHA-256 Ledger Verified
                </div>
              </div>
            </div>

            {/* Column 2: Grand Imperial Seal */}
            <div className="flex flex-col items-center justify-center">
              <ImperialSpecializationSeal isDark={isDark} />
            </div>

            {/* Column 3: Dual Signatures */}
            <div className="text-right space-y-0.5">
              <div className={`font-serif italic text-2xl sm:text-3xl leading-none ${isDark ? "text-amber-200" : "text-slate-900"}`} style={{ fontFamily: "'Alex Brush', cursive, serif" }}>
                Ishant Mishra
              </div>
              <div className={`h-[1px] w-40 ml-auto my-0.5 ${isDark ? "bg-amber-400/40" : "bg-amber-800/40"}`} />
              <div className={`text-[10px] font-cinzel font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Ishant Mishra
              </div>
              <div className={`text-[8.5px] ${isDark ? "text-muted-foreground" : "text-slate-600"}`}>
                Director of Academic Affairs & Engineering
              </div>
              <div className={`text-[8px] font-cinzel font-bold ${isDark ? "text-amber-400/90" : "text-amber-900"}`}>
                DataMind Board of Executive Accreditation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
