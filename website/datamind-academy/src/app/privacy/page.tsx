"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Effective Date: September 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Overview & Commitment</h2>
            <p>
              At DataMind Academy, we prioritize your data rights. We believe education should be accessible and private. We collect only the information necessary to provide challenge evaluation, progress tracking, and verified certificate generation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Information Stored Locally</h2>
            <p>
              Your challenge progress, module completions, and local settings are primarily retained within your browser's local client storage. This allows you to practice code challenges and learn at your own pace without mandatory invasive tracking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Public Ledger & Certificates</h2>
            <p>
              When a verified diploma is issued, a non-sensitive cryptographic hash (SHA-256) along with your declared recipient name and completion score is registered so employers and recruiters can verify your achievement via our public verification registry (`/verify`).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Third-Party Sharing</h2>
            <p>
              DataMind Academy does not sell, rent, or monetize your personal information to third-party ad networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Contact Us</h2>
            <p>
              If you have any questions regarding your account or stored data, reach out via our community forums or email academic support at privacy@datamind.academy.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
