"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Business Analyst → Data Scientist",
    avatar: "PS",
    avatarGradient: "from-pink-500 to-rose-600",
    quote:
      "I went from writing Excel formulas to building ML models in 6 months. The structured path from SQL → Python → ML made everything click. Landed a data scientist role at a Fortune 500.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Marketing Manager → BI Developer",
    avatar: "JR",
    avatarGradient: "from-blue-500 to-cyan-600",
    quote:
      "The Power BI track is incredible. DAX finally makes sense! The hands-on projects gave me a portfolio that impressed my interviewers. Got promoted within 3 months of finishing.",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    role: "CS Student → AI Engineer",
    avatar: "AK",
    avatarGradient: "from-violet-500 to-purple-600",
    quote:
      "The Transformer architecture module blew my mind. Being able to write attention mechanisms from scratch in the browser editor — and actually see the attention heatmaps — was a game-changer.",
    rating: 5,
  },
  {
    name: "Tom Chen",
    role: "Accountant → Data Analyst",
    avatar: "TC",
    avatarGradient: "from-amber-500 to-orange-600",
    quote:
      "Started with absolutely zero coding experience. The SQL beginner track held my hand through every concept. Within 4 months I was writing complex window functions at work. My team was shocked.",
    rating: 5,
  },
  {
    name: "Maria Gonzalez",
    role: "PhD Researcher → ML Engineer",
    avatar: "MG",
    avatarGradient: "from-emerald-500 to-teal-600",
    quote:
      "I knew statistics but not Python. The bridge modules connecting subjects were brilliant — especially 'Python → ML'. Now I deploy models with FastAPI and MLflow thanks to the advanced track.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Self-taught → Full-Stack Data Pro",
    avatar: "DP",
    avatarGradient: "from-indigo-500 to-blue-600",
    quote:
      "Did the entire All-Rounder track. SQL, Power BI, Python, ML, and AI — all in 14 months. The community Q&A saved me hundreds of hours. Best learning investment I've ever made, and it's free!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-400 mb-3 block">
            Success Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Loved by <span className="text-gradient">50,000+</span> Learners
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real career transformations from people who started exactly where you are now.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
