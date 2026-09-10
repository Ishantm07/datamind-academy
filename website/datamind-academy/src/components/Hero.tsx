import Link from "next/link";

const STATS = [
  { value: "5", label: "Subjects" },
  { value: "250+", label: "Lessons" },
  { value: "50K+", label: "Learners" },
  { value: "Free", label: "To Start" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-background dark:from-blue-950/20">
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Free · Structured · Project-Based Learning
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          From Zero to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            Data Pro
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
          Master <strong>SQL</strong>, <strong>Power BI</strong>,{" "}
          <strong>Python</strong>, <strong>Machine Learning</strong>, and{" "}
          <strong>AI</strong> — through structured courses, hands-on projects,
          and a supportive community.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/tracks"
            className="w-full sm:w-auto rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:shadow-primary/25 hover:shadow-xl"
          >
            Find My Learning Path →
          </Link>
          <Link
            href="/subjects/sql"
            className="w-full sm:w-auto rounded-xl border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Browse Courses
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
