"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Pick Your Path",
    description:
      "Take a 2-minute quiz or choose a career track — Data Analyst, Data Scientist, AI Engineer, or build your own custom path.",
    icon: "🗺️",
    color: "from-blue-500/20 to-blue-600/5",
    accent: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    number: "02",
    title: "Learn by Doing",
    description:
      "Every lesson pairs a bite-sized concept with a hands-on coding exercise. Write real Python & SQL in our browser-based editor.",
    icon: "💻",
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    number: "03",
    title: "Build Projects",
    description:
      "Apply what you've learned in guided capstone projects — from sales dashboards to ML-powered recommendation engines.",
    icon: "🚀",
    color: "from-purple-500/20 to-purple-600/5",
    accent: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    number: "04",
    title: "Get Certified",
    description:
      "Earn verifiable certificates for every completed level and track. Share directly on LinkedIn and add to your resume.",
    icon: "🏆",
    color: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
];

export default function HowItWorks() {
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
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3 block">
          How It Works
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Four Steps to Mastery
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Our structured approach gets you from &quot;what is a variable?&quot; to deploying ML models — step by step.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30" />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative rounded-2xl bg-gradient-to-br ${step.color} border ${step.borderColor} p-6 text-center`}
          >
            {/* Step number circle */}
            <div className="relative z-10 mx-auto w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center mb-5">
              <span className={`text-lg font-black ${step.accent}`}>
                {step.number}
              </span>
            </div>

            <div className="text-3xl mb-3">{step.icon}</div>
            <h3 className="text-white font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
