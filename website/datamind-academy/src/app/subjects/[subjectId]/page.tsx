import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SUBJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { PlayCircle, CheckCircle2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Fully unlocked curriculum mapping for all subjects
const OPEN_CURRICULUMS: Record<string, { title: string; description: string; lessons: { title: string; type: string; duration: string }[] }[]> = {
  sql: [
    {
      title: "Module 1: Database Fundamentals & Basic SELECT",
      description: "Relational concepts, table schemas, WHERE filtering, ORDER BY, and LIMIT.",
      lessons: [
        { title: "1.1 What is a Relational Database?", type: "theory", duration: "10 min" },
        { title: "1.2 Filtering High-Value Customers (WHERE)", type: "exercise", duration: "15 min" },
      ],
    },
    {
      title: "Module 2: Aggregations & GROUP BY",
      description: "Summarizing data with COUNT, SUM, AVG, MIN, MAX, and HAVING filter.",
      lessons: [
        { title: "2.1 Calculating Departmental Payroll (GROUP BY)", type: "exercise", duration: "20 min" },
      ],
    },
    {
      title: "Module 3: Multi-Table JOINs & Entity Relationships",
      description: "INNER, LEFT, RIGHT, FULL OUTER JOINs, and self-joins.",
      lessons: [
        { title: "3.1 E-Commerce Customer Orders (LEFT JOIN)", type: "exercise", duration: "25 min" },
      ],
    },
    {
      title: "Module 4: Subqueries & Common Table Expressions (CTEs)",
      description: "Nested queries, correlated subqueries, and WITH clauses.",
      lessons: [
        { title: "4.1 Identifying Above-Average Spenders (CTE)", type: "exercise", duration: "25 min" },
      ],
    },
    {
      title: "Module 5: Advanced Window Functions",
      description: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and running totals.",
      lessons: [
        { title: "5.1 Monthly Growth & Previous Month Revenue (LAG)", type: "exercise", duration: "30 min" },
      ],
    },
    {
      title: "Module 6: Database Optimization & Indexing",
      description: "Execution plans (EXPLAIN), B-Tree indexes, and query performance tuning.",
      lessons: [
        { title: "6.1 Index Optimization for Fast Lookups", type: "theory", duration: "20 min" },
      ],
    },
  ],
  python: [
    {
      title: "Module 1: Python Basics & Data Structures",
      description: "Variables, strings, lists, dicts, control flow, and functions.",
      lessons: [
        { title: "1.1 List Comprehensions & Data Filtering", type: "exercise", duration: "20 min" },
      ],
    },
    {
      title: "Module 2: NumPy & Numerical Computation",
      description: "Array operations, vectorization, indexing, slicing, and broadcasting.",
      lessons: [
        { title: "2.1 Vectorized Matrix Multiplication with NumPy", type: "exercise", duration: "25 min" },
      ],
    },
    {
      title: "Module 3: Pandas Data Manipulation",
      description: "DataFrames, CSV loading, missing data handling, merge/join, and groupby.",
      lessons: [
        { title: "3.1 Cleaning & Grouping Customer Churn Data", type: "exercise", duration: "30 min" },
      ],
    },
    {
      title: "Module 4: Data Visualization",
      description: "Matplotlib & Seaborn plots for exploratory data analysis (EDA).",
      lessons: [
        { title: "4.1 Plotting Sales Distributions & Correlation Heatmaps", type: "theory", duration: "20 min" },
      ],
    },
    {
      title: "Module 5: Object-Oriented Programming (OOP)",
      description: "Classes, inheritance, encapsulation, polymorphism, and custom data pipelines.",
      lessons: [
        { title: "5.1 Building a Custom Data Preprocessor Class", type: "exercise", duration: "30 min" },
      ],
    },
  ],
  powerbi: [
    {
      title: "Module 1: Power BI Desktop & Data Connections",
      description: "Connecting to SQL/Excel, Power Query transformations, and M language.",
      lessons: [
        { title: "1.1 Transforming Raw Data in Power Query", type: "theory", duration: "20 min" },
      ],
    },
    {
      title: "Module 2: Data Modeling & Star Schema",
      description: "Fact tables, Dimension tables, 1-to-Many relationships, and active/inactive joins.",
      lessons: [
        { title: "2.1 Designing a Production Star Schema", type: "theory", duration: "25 min" },
      ],
    },
    {
      title: "Module 3: Advanced DAX Measures",
      description: "CALCULATE, SUMX, FILTER, Time Intelligence (YTD, YoY), and RLS.",
      lessons: [
        { title: "3.1 Writing DAX Measures (CALCULATE & Time Intelligence)", type: "exercise", duration: "30 min" },
      ],
    },
  ],
  ml: [
    {
      title: "Module 1: Linear & Logistic Regression",
      description: "Cost functions, gradient descent, feature scaling, and binary classification.",
      lessons: [
        { title: "1.1 Training Logistic Regression for Customer Churn", type: "exercise", duration: "30 min" },
      ],
    },
    {
      title: "Module 2: Tree-Based Models & Ensembles",
      description: "Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM).",
      lessons: [
        { title: "2.1 XGBoost Classifier & Feature Importance", type: "exercise", duration: "35 min" },
      ],
    },
    {
      title: "Module 3: Model Evaluation Metrics",
      description: "Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC, and Cross-Validation.",
      lessons: [
        { title: "3.1 Evaluating Imbalanced Classifiers (F1 vs ROC-AUC)", type: "exercise", duration: "25 min" },
      ],
    },
    {
      title: "Module 4: Unsupervised Learning & Clustering",
      description: "K-Means, Hierarchical Clustering, DBSCAN, and PCA.",
      lessons: [
        { title: "4.1 Customer Segmentation with K-Means & Elbow Method", type: "exercise", duration: "30 min" },
      ],
    },
    {
      title: "Module 5: Hyperparameter Tuning & Pipelines",
      description: "GridSearchCV, RandomizedSearchCV, and Scikit-Learn Pipelines.",
      lessons: [
        { title: "5.1 Production ML Pipelines with StandardScaler & Ridge", type: "exercise", duration: "35 min" },
      ],
    },
  ],
  ai: [
    {
      title: "Module 1: Deep Learning Foundations & PyTorch",
      description: "Tensors, autograd, forward pass, loss functions, and backpropagation.",
      lessons: [
        { title: "1.1 Writing Neural Networks from Scratch in PyTorch", type: "exercise", duration: "35 min" },
      ],
    },
    {
      title: "Module 2: Computer Vision & Convolutional Nets (CNNs)",
      description: "Convolutions, pooling layers, ResNet architectures, and transfer learning.",
      lessons: [
        { title: "2.1 Image Classification with Transfer Learning (ResNet50)", type: "theory", duration: "30 min" },
      ],
    },
    {
      title: "Module 3: Natural Language Processing & Recurrent Nets",
      description: "Tokenization, Word Embeddings (Word2Vec), LSTMs, and GRUs.",
      lessons: [
        { title: "3.1 Sentiment Analysis with Bidirectional LSTM", type: "exercise", duration: "35 min" },
      ],
    },
    {
      title: "Module 4: Transformer Architecture & Attention",
      description: "Self-attention mechanism, Multi-Head Attention, Positional Encoding, and BERT/GPT.",
      lessons: [
        { title: "4.1 Implementing Scaled Dot-Product Attention", type: "exercise", duration: "40 min" },
      ],
    },
    {
      title: "Module 5: Generative AI, Fine-Tuning & LLMs",
      description: "PEFT/LoRA fine-tuning, HuggingFace Transformers, Quantization, and RAG.",
      lessons: [
        { title: "5.1 LoRA Fine-Tuning Large Language Models with HuggingFace", type: "theory", duration: "45 min" },
      ],
    },
  ],
};

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);
  if (!subject) notFound();

  const curriculum = OPEN_CURRICULUMS[params.subjectId] || OPEN_CURRICULUMS["sql"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Subject Header Banner */}
        <div className={cn("py-20 border-b relative overflow-hidden", subject.color, subject.borderColor)}>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="text-6xl mb-6 filter drop-shadow-md">{subject.icon}</div>
            <h1 className={cn("text-4xl md:text-5xl font-black mb-4", subject.textColor)}>
              {subject.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {subject.description}
            </p>

            {/* Free Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-8">
              <span>✨ 100% Free Unlocked Access — All Modules & Challenges Available</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/learn/${subject.id}/m1/lesson-1`}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-xl text-sm"
              >
                Start Module 1 Now →
              </Link>
            </div>
          </div>
        </div>

        {/* Curriculum Modules */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">Full Course Syllabus</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {curriculum.length} Modules • Unlocked for all registered users
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {curriculum.map((module, mIdx) => (
              <div key={mIdx} className="glass-card rounded-2xl overflow-hidden border border-white/5">
                <div className="bg-white/[0.03] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{module.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    UNLOCKED
                  </span>
                </div>

                <div className="divide-y divide-white/5">
                  {module.lessons.map((lesson, lIdx) => (
                    <Link
                      key={lIdx}
                      href={`/learn/${subject.id}/m${mIdx + 1}/lesson-${lIdx + 1}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <PlayCircle className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-semibold text-sm text-white group-hover:text-indigo-400 transition-colors">
                            {lesson.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {lesson.type} • {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                        Start Lesson →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
