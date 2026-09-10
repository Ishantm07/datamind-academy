"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TRACKS, SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Tracks() {
  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3 block">
            Career Tracks
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Curated Learning Paths
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Not sure where to start? Follow a pre-built track designed
            around your career goal.
          </p>
        </motion.div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRACKS.map((track, i) => {
            const trackSubjects = track.subjects.map(
              (id) => SUBJECTS.find((s) => s.id === id)!
            );

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="gradient-border"
              >
                <div className="glass-card rounded-2xl p-7 h-full">
                  {/* Title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {track.title} Track
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        ~{track.durationMonths} months • Guided path
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Subject flow */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {trackSubjects.map((subject, j) => (
                      <span key={subject.id} className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-foreground">
                          {subject.icon} {subject.title}
                        </span>
                        {j < trackSubjects.length - 1 && (
                          <span className="text-muted-foreground/50 text-xs">→</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Goal + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-muted-foreground">
                      🎯 {track.goal}
                    </span>
                    <Link
                      href={`/tracks/${track.id}`}
                      className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      View Track →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
