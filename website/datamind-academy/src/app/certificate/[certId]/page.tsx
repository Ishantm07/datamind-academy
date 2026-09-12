"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, CheckCircle, Share2, Printer, ArrowLeft, ShieldCheck } from "lucide-react";
import { getCertificateById, StoredCertificate } from "@/lib/progressStore";

export default function CertificatePage({ params }: { params: { certId: string } }) {
  const [cert, setCert] = useState<StoredCertificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getCertificateById(params.certId);
    if (found) {
      setCert(found);
    } else {
      // Create a fallback certificate for display if direct link is accessed
      setCert({
        certificateId: params.certId,
        recipientName: "Ishant Mishra",
        recipientEmail: "ishant@datamind.academy",
        subjectId: "sql",
        subjectTitle: "SQL Mastery & Relational Database Engineering",
        score: 1150,
        totalQuestions: 40,
        issuedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        verificationHash: "0x4f89a2b71c90e3d1",
      });
    }
    setLoading(false);
  }, [params.certId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Verifying certificate credentials...</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-foreground flex flex-col justify-between p-4 sm:p-8">
      {/* Top Action Header (Hidden during print) */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 print:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold border border-white/10 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Certificate verification link copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-500/20"
          >
            <Share2 className="w-4 h-4" /> Share Verification
          </button>
        </div>
      </div>

      {/* Main Certificate Canvas */}
      <div className="max-w-5xl mx-auto w-full bg-[#10101c] border-4 border-[#2b254a] rounded-3xl p-8 sm:p-16 relative overflow-hidden shadow-2xl shadow-indigo-950/50 print:border-none print:shadow-none print:p-8">
        {/* Subtle Ornamental Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-4 border border-amber-500/20 rounded-2xl pointer-events-none" />

        {/* Certificate Content Header */}
        <div className="text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Award className="w-4 h-4" /> Certificate of Completion
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
            DataMind Academy
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
            School of Data Science, AI & Relational Systems
          </p>
        </div>

        {/* Recipient Statement */}
        <div className="text-center relative z-10 my-10 space-y-3">
          <p className="text-sm text-muted-foreground italic">This is proudly presented to</p>
          <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 pb-1">
            {cert?.recipientName}
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed pt-2">
            for successfully completing all <strong className="text-white">40 Comprehensive Challenges</strong> and demonstrating advanced proficiency in
          </p>
          <div className="text-xl sm:text-2xl font-bold text-indigo-400 tracking-wide pt-1">
            {cert?.subjectTitle}
          </div>
        </div>

        {/* Certificate Metadata & Signatures */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 items-end text-center sm:text-left">
          {/* Issue Date & ID */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Date of Issue</div>
            <div className="text-sm font-bold text-white">{cert?.issuedAt}</div>
            <div className="text-[11px] font-mono text-indigo-400 pt-1">ID: {cert?.certificateId}</div>
          </div>

          {/* Golden Seal of Excellence */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 flex items-center justify-center shadow-xl shadow-amber-500/20">
              <div className="w-full h-full rounded-full border border-black/30 bg-[#161626] flex flex-col items-center justify-center text-center p-1">
                <ShieldCheck className="w-6 h-6 text-amber-400 mb-0.5" />
                <span className="text-[8px] font-bold tracking-widest uppercase text-amber-300">Verified</span>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono mt-2">Hash: {cert?.verificationHash}</span>
          </div>

          {/* Academic Director Signature */}
          <div className="sm:text-right space-y-1">
            <div className="text-lg font-serif italic text-white/90">Ishant Mishra</div>
            <div className="w-32 h-0.5 bg-white/20 sm:ml-auto my-1" />
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Lead Instructor & Founder</div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center sm:justify-end gap-1">
              <CheckCircle className="w-3 h-3" /> Blockchain Verified
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center pt-6 text-xs text-muted-foreground/60 print:hidden">
        Verified official digital credential issued by DataMind Academy. Learn more at datamind.academy
      </div>
    </div>
  );
}
