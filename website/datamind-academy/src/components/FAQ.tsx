"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "Is DataMind Academy really free?",
    a: "Yes! All beginner and intermediate content is completely free forever. Advanced tracks, certifications, and AI-powered code hints are available with a Pro subscription for power users who want to go further.",
  },
  {
    q: "Do I need any coding experience to start?",
    a: "Not at all. Our SQL and Python beginner tracks start from absolute zero — we explain what a variable is, what a database is, and build up from there. If you can use a web browser, you can learn here.",
  },
  {
    q: "What makes this different from YouTube tutorials?",
    a: "Three things: structure, interactivity, and accountability. Our curriculum is carefully sequenced so concepts build on each other. Every lesson has hands-on coding exercises with auto-grading. And our progress tracking, streaks, and community keep you motivated.",
  },
  {
    q: "Can I run Python and SQL code without installing anything?",
    a: "Yes! We use WebAssembly (Pyodide for Python, sql.js for SQL) to execute your code entirely inside your browser. No downloads, no terminal setup, no environment conflicts. Just open a lesson and start coding.",
  },
  {
    q: "How long does it take to complete a track?",
    a: "It depends on your pace. The BI Developer track takes ~5 months at 1 hour/day. The Data Scientist track is ~10 months. The full AI Engineer track is ~14 months. But you can go faster — there are no gates or waiting periods.",
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Each certificate is hash-verified with a unique URL that employers can validate. While no online certificate replaces experience, the portfolio projects you build during each track are specifically designed to showcase job-relevant skills.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3 block">
          FAQ
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Common Questions
        </h2>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left glass-card rounded-xl p-5 transition-all hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-white text-sm">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl text-muted-foreground flex-shrink-0"
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
