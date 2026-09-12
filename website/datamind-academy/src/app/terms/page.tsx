"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Use</h1>
          <p className="text-xs text-muted-foreground">Effective Date: September 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DataMind Academy, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Educational Curriculum & Materials</h2>
            <p>
              All curriculum modules, challenges, dataset samples, code explanations, and documentation are provided for personal educational use. You may freely use code snippets written in the challenges in your personal projects and portfolios.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Academic Integrity & Diplomas</h2>
            <p>
              DataMind Academy credentials and diplomas represent individual problem-solving competency. The dynamic question-shuffling mechanism is designed to ensure concept mastery. Misuse or automated circumvention of certification exams may result in revocation of verified status.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Disclaimer & Limitation of Liability</h2>
            <p>
              The platform and educational exercises are provided "as is" without warranty of any kind. DataMind Academy is not liable for indirect or consequential damages arising from the use of the platform or external third-party tools.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
