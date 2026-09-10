const FEATURES = [
  {
    icon: "💻",
    title: "In-Browser Code Editor",
    description:
      "Write and run SQL & Python directly in your browser. No installation needed — just open a lesson and start coding.",
  },
  {
    icon: "🎯",
    title: "Project-Based Learning",
    description:
      "Every level ends with a real-world project. Build a portfolio that proves your skills to employers.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Visual dashboard tracks your streaks, XP, completed modules, and quiz scores across all subjects.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Hints",
    description:
      "Stuck on an exercise? Get contextual hints that guide you to the answer without just giving it away.",
  },
  {
    icon: "🏆",
    title: "Verifiable Certificates",
    description:
      "Earn shareable, hash-verified certificates for each level and track. Add them directly to your LinkedIn profile.",
  },
  {
    icon: "👥",
    title: "Community & Q&A",
    description:
      "Post questions, answer peers, join study groups, and attend live weekly office hours with instructors.",
  },
  {
    icon: "📚",
    title: "Resource Library",
    description:
      "Downloadable cheat sheets, a curated dataset repository, glossary, and interview prep for every subject.",
  },
  {
    icon: "🗺️",
    title: "Adaptive Learning Paths",
    description:
      "Take a skill assessment to skip content you already know. The platform adapts to your existing knowledge.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything You Need to Learn
        </h2>
        <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
          Built around how people actually retain knowledge — not just watch
          videos.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
