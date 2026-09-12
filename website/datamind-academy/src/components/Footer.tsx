"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Learn: [
    { label: "SQL", href: "/subjects/sql" },
    { label: "Power BI", href: "/subjects/powerbi" },
    { label: "Python", href: "/subjects/python" },
    { label: "Machine Learning", href: "/subjects/ml" },
    { label: "Artificial Intelligence", href: "/subjects/ai" },
  ],
  Tracks: [
    { label: "Data Analyst", href: "/tracks/data-analyst" },
    { label: "BI Developer", href: "/tracks/bi-developer" },
    { label: "Data Engineer", href: "/tracks/data-engineer" },
    { label: "Data Scientist", href: "/tracks/data-scientist" },
    { label: "AI & ML Engineer", href: "/tracks/ai-engineer" },
  ],
  Resources: [
    { label: "Cheat Sheets", href: "/resources/cheatsheets" },
    { label: "Dataset Library", href: "/resources/datasets" },
    { label: "Glossary", href: "/resources/glossary" },
    { label: "Interview Prep", href: "/resources/interview" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Certifications", href: "/certifications" },
    { label: "Verify Credential", href: "/verify" },
    { label: "Community", href: "/community" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-auto">
      {/* Subtle gradient line at the top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: logo + links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="font-bold text-sm">
                DataMind <span className="text-gradient">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free, structured, project-based learning for the data age.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} DataMind Academy. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-indigo-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
