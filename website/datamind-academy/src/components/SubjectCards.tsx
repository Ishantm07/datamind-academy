"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SUBJECT_GRADIENTS: Record<string, string> = {
  sql: "from-blue-500/20 to-cyan-500/5",
  powerbi: "from-amber-500/20 to-yellow-500/5",
  python: "from-emerald-500/20 to-green-500/5",
  ml: "from-violet-500/20 to-purple-500/5",
  ai: "from-rose-500/20 to-pink-500/5",
};

const SUBJECT_GLOW: Record<string, string> = {
  sql: "group-hover:shadow-blue-500/20",
  powerbi: "group-hover:shadow-amber-500/20",
  python: "group-hover:shadow-emerald-500/20",
  ml: "group-hover:shadow-violet-500/20",
  ai: "group-hover:shadow-rose-500/20",
};

const SUBJECT_ACCENT: Record<string, string> = {
  sql: "text-blue-400",
  powerbi: "text-amber-400",
  python: "text-emerald-400",
  ml: "text-violet-400",
  ai: "text-rose-400",
};

export default function SubjectCards() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3 block">
            Curriculum
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            What You&apos;ll Learn
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Five in-demand skills, structured from beginner to advanced,
            with real-world projects at every level.
          </p>
        </motion.div>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SUBJECTS.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`/subjects/${subject.id}`}
              className={cn(
                "group relative block rounded-2xl p-6 overflow-hidden transition-all duration-300 shine-effect",
                "bg-gradient-to-br border border-white/5",
                "hover:border-white/10 hover:shadow-2xl hover:-translate-y-1",
                SUBJECT_GRADIENTS[subject.id],
                SUBJECT_GLOW[subject.id]
              )}
            >
              {/* Subtle glow on card */}
              <div className={cn(
                "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
                subject.id === "sql" && "bg-blue-500/30",
                subject.id === "powerbi" && "bg-amber-500/30",
                subject.id === "python" && "bg-emerald-500/30",
                subject.id === "ml" && "bg-violet-500/30",
                subject.id === "ai" && "bg-rose-500/30",
              )} />

              {/* Icon + title */}
              <div className="relative flex items-center gap-4 mb-4">
                <div className="text-5xl filter drop-shadow-lg">{subject.icon}</div>
                <div>
                  <h3 className={cn("text-xl font-bold", SUBJECT_ACCENT[subject.id])}>
                    {subject.title}
                  </h3>
                  <div className="flex gap-1.5 mt-2">
                    {subject.levels.map((level) => (
                      <span
                        key={level}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-muted-foreground uppercase tracking-wider"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="relative text-sm text-muted-foreground leading-relaxed mb-6">
                {subject.description}
              </p>

              {/* Meta row */}
              <div className="relative flex items-center justify-between text-xs text-muted-foreground/80">
                <span>📚 {subject.topicsCount} topics</span>
                <span>⏱ ~{subject.estimatedHours}h</span>
                {subject.prerequisites.length > 0 && (
                  <span className="italic">
                    needs: {subject.prerequisites.join(", ")}
                  </span>
                )}
              </div>

              {/* Animated arrow on hover */}
              <span className={cn(
                "absolute top-5 right-5 text-lg opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1",
                SUBJECT_ACCENT[subject.id]
              )}>
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
