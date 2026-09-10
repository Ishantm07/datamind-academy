"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Subjects", href: "/subjects" },
  { label: "Tracks", href: "/tracks" },
  { label: "Projects", href: "/projects" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25"
            >
              <span className="text-white text-lg font-bold">D</span>
            </motion.div>
            <span className="font-bold text-lg tracking-tight">
              DataMind{" "}
              <span className="text-gradient">Academy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="group relative rounded-xl px-5 py-2.5 text-sm font-semibold text-white overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.5),transparent_70%)]" />
              <span className="relative">Start Free →</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1.5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block h-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-current rounded-full"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="py-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-white/5"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 flex flex-col gap-2 px-3">
                  <Link href="/login" className="text-sm font-medium text-center border border-white/10 rounded-xl py-2.5 hover:bg-white/5 transition-colors">
                    Log in
                  </Link>
                  <Link href="/signup" className="text-sm font-semibold text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity">
                    Start Free →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
