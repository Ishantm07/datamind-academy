"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TRACKS } from "@/lib/data";
import {
  SPECIALIZATION_CERT_DETAILS,
  getSpecializationCertificate,
  getActiveUser,
  StoredCertificate,
} from "@/lib/progressStore";
import {
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  Printer,
} from "lucide-react";

export default function SpecializationCertificatePage() {
  const params = useParams();
  const trackId = typeof params?.trackId === "string" ? params.trackId.toLowerCase() : "bi-developer";

  const track = TRACKS.find((t) => t.id === trackId);
  const specMeta = SPECIALIZATION_CERT_DETAILS[trackId];

  if (!track && !specMeta) {
    notFound();
  }

  const certData = specMeta || {
    title: track?.title ? `${track.title} Specialization` : "Career Specialization",
    badge: track?.icon || "🏆",
    faculty: "Faculty of Enterprise Analytics & Applied Data Systems",
    subFaculty: "Executive Board of Professional Career Accreditations",
    description: track?.description || "Mastery across multi-discipline curriculum modules and rigorous capstones.",
    subjects: track?.subjects || ["sql", "powerbi"],
    defaultCertId: `DM-SPEC-${(trackId || "spec").toUpperCase()}-001`,
  };

  const [recipientName, setRecipientName] = useState("DataMind Learner");
  const [issuedDate, setIssuedDate] = useState("");
  const [certId, setCertId] = useState(certData.defaultCertId);
  const [verificationHash, setVerificationHash] = useState("0x7F8A3B21E5C4A9D8");
  const [isOfficialEarned, setIsOfficialEarned] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read active user name
    const activeUser = getActiveUser();
    if (activeUser?.name && activeUser.name !== "DataMind Learner") {
      setRecipientName(activeUser.name);
    }

    // Check if user legitimately holds a stored specialization certificate
    const storedCert = getSpecializationCertificate(trackId);
    if (storedCert) {
      if (storedCert.recipientName && storedCert.recipientName !== "DataMind Learner") {
        setRecipientName(storedCert.recipientName);
      }
      setCertId(storedCert.certificateId);
      setIssuedDate(storedCert.issuedAt);
      if (storedCert.verificationHash) {
        setVerificationHash(storedCert.verificationHash);
      }
      setIsOfficialEarned(true);
    } else {
      setIssuedDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [trackId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Specialization Credential URL copied to clipboard!");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownloadPNG = () => {
    setIsDownloading(true);
    showToast("Generating high-resolution 1920x1357 PNG Master Diploma...");

    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1357;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    // Background Rich Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1357);
    bgGrad.addColorStop(0, "#080911");
    bgGrad.addColorStop(0.3, "#0d0f1e");
    bgGrad.addColorStop(0.7, "#0d0d1a");
    bgGrad.addColorStop(1, "#07070d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1920, 1357);

    // Outer Dual Gold Borders
    ctx.strokeStyle = "rgba(245, 158, 11, 0.65)";
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, 1848, 1285);

    ctx.strokeStyle = "rgba(217, 119, 6, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, 1812, 1249);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 45);
      ctx.lineTo(0, 0);
      ctx.lineTo(45, 0);
      ctx.stroke();

      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(8, 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(64, 64, 0);
    drawCorner(1856, 64, Math.PI / 2);
    drawCorner(1856, 1293, Math.PI);
    drawCorner(64, 1293, -Math.PI / 2);

    // Top Header Banner
    ctx.fillStyle = "#1e1b4b";
    ctx.fillRect(660, 56, 600, 44);
    ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(660, 56, 600, 44);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("CAREER SPECIALIZATION • EXECUTIVE ACCREDITATION", 960, 83);

    // Datamind Logo / Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 32px sans-serif";
    ctx.fillText("DATAMIND ACADEMY", 960, 150);

    // Faculty
    ctx.fillStyle = "#a5b4fc";
    ctx.font = "600 16px sans-serif";
    ctx.fillText(certData.faculty.toUpperCase(), 960, 182);

    ctx.fillStyle = "#818cf8";
    ctx.font = "italic 13px sans-serif";
    ctx.fillText(certData.subFaculty, 960, 204);

    // Certificate Title
    const goldTextGrad = ctx.createLinearGradient(600, 260, 1320, 260);
    goldTextGrad.addColorStop(0, "#fde68a");
    goldTextGrad.addColorStop(0.5, "#f59e0b");
    goldTextGrad.addColorStop(1, "#d97706");
    ctx.fillStyle = goldTextGrad;
    ctx.font = "900 46px sans-serif";
    ctx.fillText("PROFESSIONAL SPECIALIZATION DIPLOMA", 960, 275);

    // Subtitle
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px sans-serif";
    ctx.fillText("THIS EXECUTIVE DIPLOMA IS FORMALLY CONFERRED UPON", 960, 320);

    // Recipient Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 52px serif";
    ctx.fillText(recipientName, 960, 395);

    // Golden Underline
    const lineGrad = ctx.createLinearGradient(660, 415, 1260, 415);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.5, "#fbbf24");
    lineGrad.addColorStop(1, "transparent");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(660, 415, 600, 3);

    // Description
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "16px sans-serif";
    ctx.fillText(
      `for distinguished executive completion of the ${certData.title}`,
      960,
      460
    );
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      "demonstrating advanced engineering competence across all multi-pillar curricula & verified capstones.",
      960,
      485
    );

    // Dual Pillars Box (Constituent Disciplines)
    const pillarY = 530;
    const pillarH = 175;
    const pillarW = 440;

    // Pillar 1 Card (SQL or primary)
    ctx.fillStyle = "rgba(30, 27, 75, 0.4)";
    ctx.fillRect(490, pillarY, pillarW, pillarH);
    ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(490, pillarY, pillarW, pillarH);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "left";
    ctx.fillText("PILLAR I • RELATIONAL SYSTEMS", 520, pillarY + 38);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("SQL Database Engineering", 520, pillarY + 70);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px sans-serif";
    ctx.fillText("• 40 Challenges Passed", 520, pillarY + 102);
    ctx.fillText("• Advanced Joins, Aggregations & Query Tuning", 520, pillarY + 125);
    ctx.fillText("• Grade: A+ (Honors Mastery)", 520, pillarY + 148);

    // Pillar 2 Card (Power BI or secondary)
    ctx.fillStyle = "rgba(40, 25, 60, 0.4)";
    ctx.fillRect(990, pillarY, pillarW, pillarH);
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(990, pillarY, pillarW, pillarH);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 13px monospace";
    ctx.fillText("PILLAR II • ENTERPRISE ANALYTICS", 1020, pillarY + 38);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Power BI & DAX Formulations", 1020, pillarY + 70);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px sans-serif";
    ctx.fillText("• 40 Challenges Passed", 1020, pillarY + 102);
    ctx.fillText("• Tabular Modeling, Time-Intelligence & KPI Logic", 1020, pillarY + 125);
    ctx.fillText("• Grade: A+ (Honors Mastery)", 1020, pillarY + 148);

    // Cumulative Stats Banner
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(560, 740, 800, 48);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeRect(560, 740, 800, 48);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "★ 80 Cumulative Engineering Challenges Passed • 2 Capstones Completed ★",
      960,
      770
    );

    // Signatures & Imperial Medallion Seal Section
    const footerY = 880;

    // Left Signature
    ctx.textAlign = "center";
    ctx.fillStyle = "#f59e0b";
    ctx.font = "italic 32px 'Brush Script MT', cursive, serif";
    ctx.fillText("Ishant Mishra", 400, footerY + 50);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(270, footerY + 70);
    ctx.lineTo(530, footerY + 70);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("Ishant Mishra", 400, footerY + 95);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px sans-serif";
    ctx.fillText("Director of Academic Affairs, DataMind", 400, footerY + 115);

    // Right Signature
    ctx.fillStyle = "#f59e0b";
    ctx.font = "italic 32px 'Brush Script MT', cursive, serif";
    ctx.fillText("Dr. Sophia Vance", 1520, footerY + 50);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(1390, footerY + 70);
    ctx.lineTo(1650, footerY + 70);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("Dr. Sophia Vance", 1520, footerY + 95);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px sans-serif";
    ctx.fillText("Dean of Specialized Industry Programs", 1520, footerY + 115);

    // Center Imperial Gold Seal
    const sealX = 960;
    const sealY = footerY + 60;

    // Silk Ribbons
    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.moveTo(sealX - 25, sealY + 20);
    ctx.lineTo(sealX - 45, sealY + 120);
    ctx.lineTo(sealX - 25, sealY + 105);
    ctx.lineTo(sealX - 5, sealY + 120);
    ctx.lineTo(sealX - 10, sealY + 20);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sealX + 10, sealY + 20);
    ctx.lineTo(sealX + 5, sealY + 120);
    ctx.lineTo(sealX + 25, sealY + 105);
    ctx.lineTo(sealX + 45, sealY + 120);
    ctx.lineTo(sealX + 25, sealY + 20);
    ctx.fill();

    // Outer Medallion
    const sealGrad = ctx.createRadialGradient(sealX, sealY, 15, sealX, sealY, 70);
    sealGrad.addColorStop(0, "#fde68a");
    sealGrad.addColorStop(0.6, "#f59e0b");
    sealGrad.addColorStop(1, "#b45309");
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 68, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#78350f";
    ctx.font = "900 10px monospace";
    ctx.fillText("★ SPECIALIZATION ★", sealX, sealY - 24);
    ctx.font = "900 24px sans-serif";
    ctx.fillText("MASTER", sealX, sealY + 5);
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("EXCELLENCE", sealX, sealY + 22);

    // Bottom Verification Hash & Date
    ctx.fillStyle = "#64748b";
    ctx.font = "12px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`CREDENTIAL ID: ${certId}`, 120, 1260);
    ctx.fillText(`LEDGER VERIFICATION: ${verificationHash}`, 120, 1282);

    ctx.textAlign = "right";
    ctx.fillText(`CONFERRED DATE: ${issuedDate}`, 1800, 1260);
    ctx.fillText("ACCREDITATION: OFFICIAL VERIFIED DIPLOMA", 1800, 1282);

    // Download PNG
    try {
      const link = document.createElement("a");
      link.download = `DataMind-Specialization-${trackId.toUpperCase()}-${recipientName.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Master Specialization Diploma downloaded successfully!");
    } catch (e) {
      showToast("Download failed. You may use Print to save as PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Top Control Bar */}
        <section className="border-b border-white/10 bg-[#0c0d18]/80 backdrop-blur-md sticky top-16 z-30 py-3">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Link href="/tracks" className="text-muted-foreground hover:text-white transition-colors">
                Career Tracks
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <Link href={`/tracks/${trackId}`} className="text-muted-foreground hover:text-white transition-colors">
                {certData.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="text-amber-400 font-bold">Specialization Diploma</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center gap-1.5"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-muted-foreground" /> Print / PDF
              </button>
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center gap-1.5"
                title="Share Verification Link"
              >
                <Share2 className="w-3.5 h-3.5 text-muted-foreground" /> Share
              </button>
              <button
                onClick={handleDownloadPNG}
                disabled={isDownloading}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloading ? "Rendering..." : "Download High-Res PNG"}
              </button>
            </div>
          </div>
        </section>

        {/* Info Banner if not officially earned yet */}
        {!isOfficialEarned && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="rounded-2xl p-4 bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-lg shrink-0">
                  ℹ️
                </div>
                <div>
                  <h4 className="font-bold text-white">Specialization Credential Preview</h4>
                  <p className="text-gray-300">
                    Complete all modules and capstone challenges across this track's curriculum to officially register and issue this diploma.
                  </p>
                </div>
              </div>
              <Link
                href={`/tracks/${trackId}`}
                className="shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
              >
                View Track Curriculum →
              </Link>
            </div>
          </div>
        )}

        {/* Certificate Display Area */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Outer Border & Certificate Frame */}
          <div
            ref={certRef}
            className="relative rounded-3xl p-3 sm:p-5 md:p-8 bg-gradient-to-b from-[#111224] via-[#0d0e1a] to-[#080912] border-4 border-amber-500/60 shadow-[0_0_80px_rgba(245,158,11,0.15)] overflow-hidden"
          >
            {/* Inner Gold Frame */}
            <div className="relative rounded-2xl p-6 sm:p-10 md:p-12 border border-amber-500/30 bg-[#0c0d18]/90 overflow-hidden">
              {/* Background Luxury Ambient Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

              {/* 3D Top Accreditation Ribbon */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/50 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
                    CAREER SPECIALIZATION • EXECUTIVE BOARD OF ACCREDITATION
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>

              {/* Academy & Faculty Header */}
              <div className="text-center space-y-1.5 mb-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  <span>🏛️</span>
                  <span>DataMind Academy of Engineering & Technology</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-indigo-300 tracking-wide">
                  {certData.faculty}
                </h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground italic">
                  {certData.subFaculty}
                </p>
              </div>

              {/* Grand Diploma Title */}
              <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  PROFESSIONAL SPECIALIZATION DIPLOMA
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-medium">
                  This Executive Credential Is Formally Conferred Upon
                </p>
              </div>

              {/* Recipient Name */}
              <div className="text-center my-6">
                <div className="inline-block relative">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-wide">
                    {recipientName}
                  </span>
                  <div className="h-1 w-full mt-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                </div>
              </div>

              {/* Conferred Text */}
              <div className="max-w-2xl mx-auto text-center text-xs sm:text-sm text-gray-300 leading-relaxed mb-8">
                for distinguished executive completion of the{" "}
                <strong className="text-white font-bold">{certData.title}</strong>, demonstrating advanced
                engineering competency across all constituent disciplines, multi-tiered algorithmic challenges, and
                comprehensive capstone projects.
              </div>

              {/* CONSTITUENT ENGINEERING PILLARS (Distinct Visual Differentiation) */}
              <div className="my-8 pt-6 border-t border-white/10">
                <div className="text-center mb-5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    CONSTITUENT MULTI-DISCIPLINARY PILLARS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {/* Pillar 1 */}
                  <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2.5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                        Pillar I • Relational Core
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Grade: A+ (Honors)
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🗄️</span> SQL Relational Database Systems
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Advanced joins, window functions, schema design, index optimization, and complex aggregation logic.
                    </p>
                    <div className="text-[11px] font-mono text-muted-foreground pt-1 flex items-center justify-between border-t border-white/5">
                      <span>Challenges: 40/40 Passed</span>
                      <span className="text-amber-400 font-semibold">1,200 PTS</span>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                        Pillar II • Executive Reporting
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Grade: A+ (Honors)
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>📊</span> Power BI Enterprise Analytics & DAX
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Tabular data modeling, complex CALCULATE filters, time-intelligence functions, and KPI dashboards.
                    </p>
                    <div className="text-[11px] font-mono text-muted-foreground pt-1 flex items-center justify-between border-t border-white/5">
                      <span>Challenges: 40/40 Passed</span>
                      <span className="text-amber-400 font-semibold">1,200 PTS</span>
                    </div>
                  </div>
                </div>

                {/* Cumulative Metric Badge */}
                <div className="mt-5 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200">
                    <span className="text-amber-400">★</span>
                    <span className="font-semibold">80 Cumulative Engineering Challenges Passed</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-semibold">2 Capstone Exams Completed</span>
                    <span className="text-amber-400">★</span>
                  </div>
                </div>
              </div>

              {/* Signatures & Grand Imperial Seal */}
              <div className="pt-10 border-t border-white/10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                {/* Director Signature */}
                <div className="space-y-1">
                  <div className="font-serif italic text-2xl sm:text-3xl text-amber-300/90 font-medium">
                    Ishant Mishra
                  </div>
                  <div className="w-44 h-0.5 bg-white/20 mx-auto" />
                  <div className="text-xs font-bold text-white pt-1">Ishant Mishra</div>
                  <div className="text-[10px] text-muted-foreground">Director of Academic Affairs</div>
                </div>

                {/* Imperial Dual-Medallion Gold Foil Seal with Silk Ribbon Tails */}
                <div className="flex flex-col items-center justify-center relative my-4 md:my-0">
                  {/* Silk Ribbons Hanging Down */}
                  <div className="absolute -bottom-7 flex items-center gap-2 pointer-events-none">
                    <div className="w-5 h-12 bg-gradient-to-b from-amber-600 to-amber-800 shadow-md transform -rotate-12 rounded-b-sm border-t border-amber-400/40" />
                    <div className="w-5 h-12 bg-gradient-to-b from-amber-600 to-amber-800 shadow-md transform rotate-12 rounded-b-sm border-t border-amber-400/40" />
                  </div>

                  {/* Embossed Gold Seal */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-1 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-yellow-200 flex items-center justify-center relative z-10">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/60 flex flex-col items-center justify-center text-amber-950 p-2 text-center bg-gradient-to-tr from-amber-400 to-yellow-300">
                      <span className="text-[7px] font-black uppercase tracking-widest leading-none">
                        ★ SPECIALIZATION ★
                      </span>
                      <span className="text-xs font-black tracking-tight leading-tight my-0.5">
                        MASTER
                      </span>
                      <span className="text-[7px] font-bold uppercase tracking-wider leading-none">
                        EXCELLENCE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dean Signature */}
                <div className="space-y-1">
                  <div className="font-serif italic text-2xl sm:text-3xl text-amber-300/90 font-medium">
                    Dr. Sophia Vance
                  </div>
                  <div className="w-44 h-0.5 bg-white/20 mx-auto" />
                  <div className="text-xs font-bold text-white pt-1">Dr. Sophia Vance</div>
                  <div className="text-[10px] text-muted-foreground">Dean of Specialized Industry Programs</div>
                </div>
              </div>

              {/* Bottom Ledger & Verification Hash */}
              <div className="mt-12 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-muted-foreground">
                <div>
                  CREDENTIAL ID: <span className="text-indigo-300 font-semibold">{certId}</span>
                </div>
                <div>
                  SHA-256 LEDGER: <span className="text-gray-400">{verificationHash}</span>
                </div>
                <div>
                  CONFERRED: <span className="text-white font-semibold">{issuedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official cryptographically verifiable credential issued by DataMind Academy</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/profile?tab=certificates" className="text-indigo-400 hover:underline">
                View All Diplomas in Profile →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
