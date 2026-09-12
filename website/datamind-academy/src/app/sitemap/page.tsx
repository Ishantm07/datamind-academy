"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Layers } from "lucide-react";
import { SUBJECTS, TRACKS } from "@/lib/data";

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Navigation Index
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Platform Sitemap</h1>
          <p className="text-xs text-muted-foreground">Complete index of DataMind Academy routes and resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Core Learning</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400">Student Dashboard</Link></li>
              <li><Link href="/profile" className="hover:text-indigo-400">User Profile & Diplomas</Link></li>
              <li><Link href="/subjects" className="hover:text-indigo-400">All Subjects Directory</Link></li>
              <li><Link href="/tracks" className="hover:text-indigo-400">Career Tracks Directory</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Subjects & Tracks</h2>
            <ul className="space-y-2 text-gray-300">
              {SUBJECTS.map(s => (
                <li key={s.id}><Link href={`/subjects/${s.id}`} className="hover:text-indigo-400">{s.title} Course</Link></li>
              ))}
              {TRACKS.map(t => (
                <li key={t.id}><Link href={`/tracks/${t.id}`} className="hover:text-indigo-400">{t.title} Track</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Resources & Institutional</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/resources?tab=cheatsheets" className="hover:text-indigo-400">Cheat Sheets</Link></li>
              <li><Link href="/resources?tab=datasets" className="hover:text-indigo-400">Dataset Library</Link></li>
              <li><Link href="/resources?tab=glossary" className="hover:text-indigo-400">Data Glossary</Link></li>
              <li><Link href="/resources?tab=interview" className="hover:text-indigo-400">Interview Prep</Link></li>
              <li><Link href="/verify" className="hover:text-indigo-400 font-semibold text-emerald-400">Verification Registry</Link></li>
              <li><Link href="/certifications" className="hover:text-indigo-400">Certifications Guide</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400">Engineering Blog</Link></li>
              <li><Link href="/community" className="hover:text-indigo-400">Community Hub</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
