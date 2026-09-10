import Link from "next/link";
import { TRACKS, SUBJECTS } from "@/lib/data";

export default function Tracks() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Curated Learning Tracks
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Not sure where to start? Follow a pre-built track designed
            around your career goal.
          </p>
        </div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRACKS.map((track) => {
            const trackSubjects = track.subjects.map(
              (id) => SUBJECTS.find((s) => s.id === id)!
            );

            return (
              <div
                key={track.id}
                className="bg-background rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                {/* Title row */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{track.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {track.title} Track
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      ~{track.durationMonths} months
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {track.description}
                </p>

                {/* Subject pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trackSubjects.map((subject, i) => (
                    <span key={subject.id} className="flex items-center gap-1">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${subject.color} ${subject.textColor} ${subject.borderColor}`}
                      >
                        {subject.icon} {subject.title}
                      </span>
                      {i < trackSubjects.length - 1 && (
                        <span className="text-muted-foreground text-xs">→</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Goal + CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground italic">
                    🎯 {track.goal}
                  </span>
                  <Link
                    href={`/tracks/${track.id}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    View Track →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
