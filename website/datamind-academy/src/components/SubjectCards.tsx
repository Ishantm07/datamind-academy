import Link from "next/link";
import { SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function SubjectCards() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          What You&apos;ll Learn
        </h2>
        <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
          Five in-demand skills, structured from beginner to advanced,
          with real-world projects at every level.
        </p>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((subject) => (
          <Link
            key={subject.id}
            href={`/subjects/${subject.id}`}
            className={cn(
              "group relative rounded-2xl border p-6 transition-all duration-200",
              "hover:shadow-lg hover:-translate-y-1",
              subject.color,
              subject.borderColor
            )}
          >
            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{subject.icon}</span>
              <div>
                <h3 className={cn("text-xl font-bold", subject.textColor)}>
                  {subject.title}
                </h3>
                <div className="flex gap-1 mt-1">
                  {subject.levels.map((level) => (
                    <span
                      key={level}
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        "bg-white/60 dark:bg-black/30",
                        subject.textColor
                      )}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {subject.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>📚 {subject.topicsCount} topics</span>
              <span>⏱ ~{subject.estimatedHours}h</span>
              {subject.prerequisites.length > 0 && (
                <span className="italic">
                  needs: {subject.prerequisites.join(", ")}
                </span>
              )}
            </div>

            {/* Arrow */}
            <span
              className={cn(
                "absolute top-5 right-5 text-lg opacity-0 group-hover:opacity-100 transition-opacity",
                subject.textColor
              )}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
