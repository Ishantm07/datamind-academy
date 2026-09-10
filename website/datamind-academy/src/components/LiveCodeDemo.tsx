"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_LINES = [
  { text: "import pandas as pd", color: "text-purple-400" },
  { text: "from sklearn.model_selection import train_test_split", color: "text-purple-400" },
  { text: "from sklearn.ensemble import RandomForestClassifier", color: "text-purple-400" },
  { text: "", color: "" },
  { text: "# Load and explore the dataset", color: "text-emerald-600/80" },
  { text: 'df = pd.read_csv("customer_churn.csv")', color: "text-blue-300" },
  { text: "print(df.shape)  # (7043, 21)", color: "text-blue-300" },
  { text: "", color: "" },
  { text: "# Prepare features and target", color: "text-emerald-600/80" },
  { text: 'X = df.drop("Churn", axis=1)', color: "text-blue-300" },
  { text: 'y = df["Churn"]', color: "text-blue-300" },
  { text: "", color: "" },
  { text: "# Train-test split", color: "text-emerald-600/80" },
  { text: "X_train, X_test, y_train, y_test = train_test_split(", color: "text-blue-300" },
  { text: "    X, y, test_size=0.2, random_state=42", color: "text-blue-300" },
  { text: ")", color: "text-blue-300" },
  { text: "", color: "" },
  { text: "# Train the model", color: "text-emerald-600/80" },
  { text: "model = RandomForestClassifier(n_estimators=100)", color: "text-amber-300" },
  { text: "model.fit(X_train, y_train)", color: "text-amber-300" },
  { text: "", color: "" },
  { text: "# Evaluate", color: "text-emerald-600/80" },
  { text: "accuracy = model.score(X_test, y_test)", color: "text-green-400" },
  { text: 'print(f"Accuracy: {accuracy:.2%}")  # 96.45%', color: "text-green-400" },
];

export default function LiveCodeDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          // Reset after a pause
          setTimeout(() => setVisibleLines(0), 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3 block">
            Interactive Learning
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Write Real Code.{" "}
            <span className="text-gradient">See Real Results.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            No more passively watching tutorials. Our in-browser code editor lets you
            write, run, and debug Python and SQL — right alongside the lesson content.
            Instant feedback. Zero setup friction.
          </p>

          <div className="space-y-4">
            {[
              { icon: "⚡", text: "Instant code execution in your browser (WebAssembly)" },
              { icon: "🧪", text: "Hidden test cases validate your solutions automatically" },
              { icon: "💡", text: "AI-powered hints when you're stuck — no spoilers" },
              { icon: "📊", text: "Visual output for data science — charts render inline" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-xl mt-0.5">{item.icon}</span>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Animated code editor mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow behind the editor */}
          <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            {/* Title bar */}
            <div className="bg-[#1e1e1e] px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs font-mono text-muted-foreground bg-white/5 px-4 py-1 rounded-md">
                  churn_prediction.py
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                  ▶ Run
                </span>
              </div>
            </div>

            {/* Code area */}
            <div className="bg-[#1a1a2e] p-5 font-mono text-sm leading-7 min-h-[420px] overflow-hidden">
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    i < visibleLines
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  <span className="text-muted-foreground/30 select-none mr-4 inline-block w-5 text-right text-xs">
                    {i + 1}
                  </span>
                  <span className={line.color || "text-foreground"}>
                    {line.text}
                  </span>
                  {i === visibleLines - 1 && (
                    <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Terminal output */}
            {visibleLines >= CODE_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0d0d1a] border-t border-white/5 p-4 font-mono text-sm"
              >
                <span className="text-muted-foreground/50">$</span>
                <span className="text-green-400 ml-2">
                  Accuracy: 96.45% ✅ All tests passed!
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
