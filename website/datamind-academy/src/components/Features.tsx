"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "💻",
    title: "In-Browser Code Editor",
    description:
      "Write and run SQL & Python directly in your browser with our VS Code-powered editor. Zero installation needed.",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: "🎯",
    title: "Project-Based Learning",
    description:
      "Every level ends with a real-world project. Build a portfolio that proves your skills to employers.",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Visual dashboard tracks your streaks, XP, completed modules, and quiz scores across all subjects.",
    gradient: "from-violet-500/10 to-purple-500/5",
  },
  {
    icon: "🤖",
    title: "AI-Powered Hints",
    description:
      "Stuck on an exercise? Get contextual hints that guide you to the answer without giving it away.",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: "🏆",
    title: "Verifiable Certificates",
    description:
      "Earn shareable, hash-verified certificates for each level and track. Add them to your LinkedIn.",
    gradient: "from-rose-500/10 to-pink-500/5",
  },
  {
    icon: "👥",
    title: "Community & Q&A",
    description:
      "Post questions, help peers, join study groups, and attend live weekly office hours with instructors.",
    gradient: "from-teal-500/10 to-cyan-500/5",
  },
  {
    icon: "📚",
    title: "Resource Library",
    description:
      "Downloadable cheat sheets, curated datasets, glossary, and interview prep questions for every subject.",
    gradient: "from-indigo-500/10 to-blue-500/5",
  },
  {
    icon: "🗺️",
    title: "Adaptive Learning Paths",
    description:
      "Take a skill assessment to skip content you already know. The platform adapts to your level.",
    gradient: "from-fuchsia-500/10 to-violet-500/5",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-3 block">
          Platform
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Built around how people actually retain knowledge — not just watch
          videos.
        </p>
      </motion.div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`group glass-card rounded-2xl p-6 bg-gradient-to-br ${feature.gradient} shine-effect`}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-4xl mb-4 inline-block"
            >
              {feature.icon}
            </motion.div>
            <h3 className="font-bold text-white mb-2 text-sm">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
