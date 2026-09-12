"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  FileText,
  Database,
  Download,
  HelpCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";

// Cheat sheets data
const CHEAT_SHEETS = [
  {
    subject: "SQL",
    title: "SQL Window Functions & Advanced Joins",
    icon: "🗄️",
    snippets: [
      {
        title: "Row Number vs Rank vs Dense Rank",
        code: `SELECT \n  employee_id, department, salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rnk,\n  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rnk\nFROM employees;`,
      },
      {
        title: "Running Total & Moving Average",
        code: `SELECT \n  order_date, revenue,\n  SUM(revenue) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as running_total,\n  AVG(revenue) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg_7d\nFROM daily_sales;`,
      },
    ],
  },
  {
    subject: "Power BI",
    title: "Power BI DAX Essential Formulations",
    icon: "📊",
    snippets: [
      {
        title: "CALCULATE with Time Intelligence (YoY Sales)",
        code: `Total Sales YOY % =\nVAR CurrentYearSales = [Total Sales]\nVAR PriorYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Calendar'[Date]))\nRETURN\n  DIVIDE(CurrentYearSales - PriorYearSales, PriorYearSales, 0)`,
      },
      {
        title: "Dynamic Customer Retention Cohort Filter",
        code: `Active Customers =\nCALCULATE(\n  DISTINCTCOUNT(Orders[CustomerID]),\n  FILTER(\n    ALL('Calendar'[Date]),\n    'Calendar'[Date] >= MAX('Calendar'[Date]) - 90\n  )\n)`,
      },
    ],
  },
  {
    subject: "Python",
    title: "Python Pandas High-Throughput Wrangling",
    icon: "🐍",
    snippets: [
      {
        title: "Group By Aggregation & Column Renaming",
        code: `summary_df = df.groupby(['region', 'category']).agg(\n    total_revenue=('revenue', 'sum'),\n    avg_order_value=('revenue', 'mean'),\n    unique_customers=('customer_id', 'nunique')\n).reset_index()\nsummary_df.sort_values(by='total_revenue', ascending=False, inplace=True)`,
      },
      {
        title: "Vectorized Outlier Clamping (IQR)",
        code: `Q1 = df['amount'].quantile(0.25)\nQ3 = df['amount'].quantile(0.75)\nIQR = Q3 - Q1\ndf_clean = df[~((df['amount'] < (Q1 - 1.5 * IQR)) | (df['amount'] > (Q3 + 1.5 * IQR)))]`,
      },
    ],
  },
];

// Clean Datasets Library
const DATASETS = [
  {
    id: "ecommerce-orders",
    title: "Global E-Commerce Omnichannel Orders",
    rows: "54,210 Rows",
    columns: "14 Columns",
    format: "CSV (4.2 MB)",
    description: "Multi-year transactional data with customer IDs, shipping status, product categories, unit cost, and localized margins.",
    recommendedFor: ["SQL Joins", "Power BI DAX", "Cohort Analysis"],
  },
  {
    id: "telecom-churn",
    title: "SaaS Telecom Customer Churn & LTV",
    rows: "7,043 Rows",
    columns: "21 Columns",
    format: "CSV (1.1 MB)",
    description: "Customer account longevity, monthly charges, contract types, support tickets, and binary churn flag.",
    recommendedFor: ["Logistic Regression", "Random Forest", "Feature Engineering"],
  },
  {
    id: "tech-salaries",
    title: "Data & AI Global Workforce Compensation",
    rows: "12,450 Rows",
    columns: "11 Columns",
    format: "CSV (850 KB)",
    description: "Salary records for Data Analysts, BI Engineers, and AI Researchers normalized across remote statuses, experience levels, and countries.",
    recommendedFor: ["Exploratory Data Analysis", "Tableau/Power BI", "Regression"],
  },
  {
    id: "hospital-readmission",
    title: "Clinical Patient Readmission Risk",
    rows: "25,000 Rows",
    columns: "18 Columns",
    format: "CSV (2.6 MB)",
    description: "Patient inpatient metrics, admission types, diagnostic counts, medication changes, and 30-day readmission outcome.",
    recommendedFor: ["Healthcare Analytics", "Classification ML", "ROC-AUC Tuning"],
  },
];

// Glossary Terms
const GLOSSARY = [
  { term: "OLAP vs OLTP", category: "Database", def: "OLTP (Online Transaction Processing) is optimized for fast row-level writes and operational ACID queries. OLAP (Online Analytical Processing) is columnar, optimized for bulk aggregations and historical intelligence." },
  { term: "DAX Context Transition", category: "Power BI", def: "The automatic transformation of a Row Context into an equivalent Filter Context when referencing a measure or wrapping an expression in CALCULATE." },
  { term: "Star Schema", category: "Data Modeling", def: "An intuitive dimensional modeling structure with a central Fact table connected directly to denormalized Dimension tables via foreign keys." },
  { term: "Window Partitioning", category: "SQL", def: "The technique of dividing a result set into subsets (via PARTITION BY) so that calculation windows can restart computation per group without collapsing rows." },
  { term: "Dataform / dbt", category: "Data Engineering", def: "Transformation frameworks that compile SQL queries into managed, version-controlled DAGs inside cloud data warehouses." },
  { term: "ROC-AUC", category: "Machine Learning", def: "Receiver Operating Characteristic - Area Under Curve. Evaluates classification models across all decision thresholds, resilient against class imbalances." },
  { term: "RAG (Retrieval-Augmented Generation)", category: "AI Systems", def: "Architecture that supplements LLM prompts with semantically retrieved context chunks from external vector databases before response generation." },
  { term: "Cosine Similarity", category: "AI & Math", def: "Measure of similarity between two non-zero vectors in multi-dimensional embedding space, calculating the cosine of the angle between them." },
];

// Interview Questions
const INTERVIEW_QUESTIONS = [
  {
    question: "How do you find the 2nd highest salary in an employee table without hardcoding?",
    tag: "SQL • High Frequency",
    solution: `WITH RankedSalaries AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM employees\n)\nSELECT salary FROM RankedSalaries WHERE rnk = 2 LIMIT 1;\n\n/* Using DENSE_RANK ensures that ties for 1st place do not skip the actual 2nd distinct salary! */`,
  },
  {
    question: "Explain the difference between WHERE and HAVING in SQL aggregations.",
    tag: "SQL • Fundamentals",
    solution: `WHERE filters individual rows BEFORE any aggregation (GROUP BY) takes place.\nHAVING filters the grouped summary results AFTER aggregation.\n\nExample:\nSELECT department, AVG(salary)\nFROM employees\nWHERE status = 'Active'         -- Filters rows first\nGROUP BY department\nHAVING AVG(salary) > 85000;    -- Filters aggregated groups`,
  },
  {
    question: "How does CALCULATE alter the filter context in Power BI DAX?",
    tag: "Power BI • Advanced",
    solution: `CALCULATE is the only DAX function capable of creating or modifying the filter context.\nIt operates in 3 distinct steps:\n1. Performs context transition (turns any active row context into filter context).\n2. Evaluates its filter arguments against the outer context.\n3. Overrides, merges, or removes filters before computing the core expression.`,
  },
  {
    question: "What is the Bias-Variance Tradeoff in Machine Learning?",
    tag: "Machine Learning • Core Theory",
    solution: `Bias refers to error from overly simplistic assumptions (underfitting) — model misses true data patterns.\nVariance refers to error from excessive sensitivity to small training data fluctuations (overfitting) — model memorizes noise.\nThe optimal model minimizes Total Error = Bias^2 + Variance + Irreducible Error.`,
  },
];

function ResourceContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "cheatsheets";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [glossaryFilter, setGlossaryFilter] = useState("");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && ["cheatsheets", "datasets", "glossary", "interview"].includes(t)) {
      setActiveTab(t);
    }
  }, [searchParams]);

  const copySnippet = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const filteredGlossary = GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
      g.def.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
      g.category.toLowerCase().includes(glossaryFilter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Free Developer & Student Assets
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Data Engineering & AI Resource Hub
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Cheat sheets, production-clean dataset downloads, architectural glossaries, and interview challenge guides.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: "cheatsheets", label: "Cheat Sheets", icon: "📑" },
          { id: "datasets", label: "Dataset Library", icon: "💾" },
          { id: "glossary", label: "Data Glossary", icon: "📖" },
          { id: "interview", label: "Interview Prep", icon: "🎯" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/5"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: CHEAT SHEETS */}
      {activeTab === "cheatsheets" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHEAT_SHEETS.map((sheet, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 bg-[#0e0f1d] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{sheet.icon}</span>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                        {sheet.subject}
                      </span>
                      <h3 className="text-base font-bold text-white">{sheet.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {sheet.snippets.map((snip, idx) => (
                      <div key={idx} className="rounded-xl bg-black/40 border border-white/5 p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-gray-300 text-[11px]">{snip.title}</span>
                          <button
                            onClick={() => copySnippet(snip.code)}
                            className="text-muted-foreground hover:text-white transition-colors"
                            title="Copy Code"
                          >
                            {copiedCode === snip.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <pre className="text-[10px] font-mono text-indigo-200 overflow-x-auto p-2 rounded-lg bg-black/60">
                          {snip.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DATASET LIBRARY */}
      {activeTab === "datasets" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DATASETS.map((ds) => (
              <div
                key={ds.id}
                className="rounded-3xl p-6 bg-gradient-to-br from-[#121324] to-[#0d0e1a] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Clean & Preprocessed
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{ds.format}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{ds.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{ds.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span>📊 {ds.rows}</span>
                    <span>•</span>
                    <span>📑 {ds.columns}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ds.recommendedFor.map((rec, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-gray-300"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      alert(`Downloading sample data schema and CSV for ${ds.title}...`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Download Clean CSV Starter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DATA GLOSSARY */}
      {activeTab === "glossary" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={glossaryFilter}
              onChange={(e) => setGlossaryFilter(e.target.value)}
              placeholder="Search terms (e.g. OLAP, Star Schema, RAG, DAX)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0e0f1d] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{item.term}</h3>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERVIEW PREP */}
      {activeTab === "interview" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {INTERVIEW_QUESTIONS.map((q, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#0e0f1d] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {q.tag}
                </span>
                <span className="text-xs font-bold text-muted-foreground">Q0{i + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">{q.question}</h3>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-muted-foreground block mb-1">Model Solution:</span>
                <pre className="text-xs font-mono text-emerald-300 bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {q.solution}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080f] text-foreground">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-xs text-muted-foreground">Loading resource center...</div>}>
          <ResourceContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
