export interface ProjectMilestone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  codeSnippet?: {
    language: string;
    code: string;
    label: string;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  trackId: string;
  trackName: string;
  subjects: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  icon: string;
  overview: string;
  problemStatement: string;
  businessImpact: string;
  datasetInfo: {
    name: string;
    rows: string;
    columns: string;
    description: string;
  };
  milestones: ProjectMilestone[];
  readmeTemplate: string;
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "ecommerce-bi-intelligence",
    title: "Omnichannel E-Commerce Revenue & Retention Intelligence",
    subtitle: "Enterprise Tabular Modeling, Advanced DAX & Executive Dashboard",
    trackId: "bi-developer",
    trackName: "BI Developer Specialization",
    subjects: ["sql", "powerbi"],
    difficulty: "Advanced",
    estimatedHours: 6,
    icon: "📊",
    overview:
      "Design and deploy an enterprise-grade Business Intelligence suite for a global multi-brand online retailer processing over 50,000 monthly orders across web, mobile, and third-party marketplaces.",
    problemStatement:
      "Leadership lacks visibility into net margin profitability by localized region, dynamic customer cohort retention across 30/60/90 days, and real-time inventory velocity.",
    businessImpact:
      "Enables C-suite executives to detect underperforming product lines, optimize regional ad-spend, and reduce customer churn by 14%.",
    datasetInfo: {
      name: "Global_Ecommerce_Transactions.csv",
      rows: "54,210 Transactions",
      columns: "16 Dimensions & Metrics",
      description: "Includes OrderID, CustomerID, Timestamp, Channel, Region, ProductSKU, UnitPrice, CostOfGoods, Discount, and ReturnStatus.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Relational Schema Design & SQL Auditing",
        subtitle: "Audit data quality, remove duplicate transactions, and establish Star Schema fact/dim tables.",
        description:
          "Transform the denormalized transactional dump into a Kimball Star Schema with a centralized FactOrders table linked to DimCustomer, DimProduct, DimDate, and DimChannel.",
        deliverables: [
          "Write SQL DDL statements defining primary and foreign key relationships.",
          "Identify and handle negative profit anomalies and cancelled orders.",
          "Validate referential integrity between customer registrations and transactions.",
        ],
        codeSnippet: {
          language: "sql",
          label: "SQL Schema DDL & Star Schema Extraction",
          code: `-- 1. Extract and cleanse FactOrders\nCREATE TABLE Fact_Orders AS\nSELECT\n    order_id,\n    customer_id,\n    product_sku,\n    channel_id,\n    CAST(order_timestamp AS DATE) AS order_date,\n    quantity,\n    unit_price,\n    discount_amount,\n    (quantity * unit_price) - discount_amount AS net_revenue,\n    (quantity * cogs_unit) AS total_cogs,\n    ((quantity * unit_price) - discount_amount) - (quantity * cogs_unit) AS gross_profit\nFROM raw_ecommerce_orders\nWHERE order_status NOT IN ('Fraud_Cancelled', 'System_Test');`,
        },
      },
      {
        id: "m2",
        title: "Milestone 2: High-Performance SQL Aggregations & Cohort Framing",
        subtitle: "Formulate customer acquisition cohorts and monthly recurring repeat purchase rates.",
        description:
          "Use SQL Window Functions to identify each customer's first purchase month and track their retention curve across successive calendar quarters.",
        deliverables: [
          "Construct a cohort index calculating months elapsed since first order.",
          "Compute Average Order Value (AOV) and Purchase Frequency per cohort.",
          "Export cleansed analytical view ready for Power BI tabular ingestion.",
        ],
        codeSnippet: {
          language: "sql",
          label: "SQL Cohort Retention Matrix",
          code: `WITH FirstOrders AS (\n    SELECT \n        customer_id,\n        DATE_TRUNC('month', MIN(order_date)) AS cohort_month\n    FROM Fact_Orders\n    GROUP BY customer_id\n),\nOrderActivities AS (\n    SELECT\n        f.customer_id,\n        fo.cohort_month,\n        DATE_TRUNC('month', f.order_date) AS activity_month,\n        (EXTRACT(YEAR FROM f.order_date) - EXTRACT(YEAR FROM fo.cohort_month)) * 12 +\n        (EXTRACT(MONTH FROM f.order_date) - EXTRACT(MONTH FROM fo.cohort_month)) AS period_number\n    FROM Fact_Orders f\n    JOIN FirstOrders fo ON f.customer_id = fo.customer_id\n)\nSELECT\n    cohort_month,\n    period_number,\n    COUNT(DISTINCT customer_id) AS active_retained_customers\nFROM OrderActivities\nGROUP BY cohort_month, period_number\nORDER BY cohort_month, period_number;`,
        },
      },
      {
        id: "m3",
        title: "Milestone 3: Power BI Data Model & DAX Measure Architecture",
        subtitle: "Implement dynamic time-intelligence, context transitions, and KPI measures in DAX.",
        description:
          "Import cleansed tables into Power BI. Establish 1-to-many single-direction relationships from Dimensions to FactOrders. Author core DAX measures.",
        deliverables: [
          "Implement [Total Net Revenue], [Gross Margin %], and [YoY Growth %].",
          "Formulate [Dynamic Rolling 90-Day Active Customers] with CALCULATE and ALL.",
          "Configure Date Table with standard ISO weeks and fiscal year offsets.",
        ],
        codeSnippet: {
          language: "dax",
          label: "Core Enterprise DAX Measures",
          code: `// Year-over-Year Revenue Growth %\nYoY Revenue Growth % =\nVAR CurrentRevenue = [Total Net Revenue]\nVAR PriorRevenue = CALCULATE([Total Net Revenue], SAMEPERIODLASTYEAR('DimDate'[Date]))\nRETURN\n    DIVIDE(CurrentRevenue - PriorRevenue, PriorRevenue, 0)\n\n// 90-Day Active Customer Cohort\nActive Customers 90D =\nCALCULATE(\n    DISTINCTCOUNT(Fact_Orders[customer_id]),\n    DATESINPERIOD('DimDate'[Date], MAX('DimDate'[Date]), -90, DAY)\n)`,
        },
      },
      {
        id: "m4",
        title: "Milestone 4: Executive Dashboard UI & Visual Storytelling",
        subtitle: "Design dark-mode executive dashboard with cross-filtering, tooltips, and drillthrough.",
        description:
          "Assemble an interactive 3-page Power BI report: Executive Summary, Customer Retention Cohorts, and Regional Margin Breakdown.",
        deliverables: [
          "Build high-contrast KPI summary cards with trend sparklines.",
          "Implement cohort heat map showing % retention decay by month.",
          "Add dynamic parameter slicers enabling currency toggling and regional filtering.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Packaging & GitHub Documentation",
        subtitle: "Document architecture, publish screenshots, and prepare interview talking points.",
        description:
          "Package your project into a professional GitHub repository with complete SQL scripts, data dictionary, Power BI template file (.pbit), and an executive summary.",
        deliverables: [
          "Format polished README.md using the provided template.",
          "Upload high-resolution report screenshots and GIF walkthrough.",
          "Draft 3 bullet points ready for your resume under 'Projects'.",
        ],
      },
    ],
    readmeTemplate: `# Omnichannel E-Commerce Revenue & Retention Intelligence

## Executive Summary
Engineered an enterprise Business Intelligence pipeline processing 54,000+ omnichannel retail transactions. Transformed denormalized transactional logs into a Kimball Star Schema, authored robust DAX time-intelligence formulations, and delivered an executive C-suite dashboard tracking net margins and cohort retention.

## Tech Stack
- **Database / ETL**: SQL (Window functions, CTEs, Data Warehousing)
- **BI Platform**: Microsoft Power BI Desktop & Service
- **Formulas / Modeling**: DAX (Context Transition, Time Intelligence, Star Schema)
- **Data Modeling**: Kimball Dimensional Modeling (Fact & Dimension Tables)

## Key Business Outcomes
- **Identified 18% margin disparity** across regional marketplace channels.
- **Uncovered 90-day retention inflection point** at month 2, recommending targeted re-engagement campaigns.
- **Automated weekly executive reporting**, eliminating 4 hours of manual data collation per week.
`,
  },
  {
    id: "financial-fraud-detection",
    title: "Financial Transaction Fraud & Anomaly Detection Pipeline",
    subtitle: "High-Imbalance Classification, Feature Engineering & Threshold Tuning",
    trackId: "data-scientist",
    trackName: "Data Scientist Specialization",
    subjects: ["python", "ml", "sql"],
    difficulty: "Advanced",
    estimatedHours: 5,
    icon: "🛡️",
    overview:
      "Develop an end-to-end machine learning classification system capable of identifying unauthorized credit card transactions from high-velocity streaming payment logs where fraud represents less than 0.2% of all traffic.",
    problemStatement:
      "A digital banking platform is incurring major chargeback costs due to sophisticated synthetic fraud rings. Standard accuracy-focused classifiers fail completely on extreme 99.8:0.2 class imbalance.",
    businessImpact:
      "Captures 92% of fraudulent attempts (Recall) while maintaining false positive rate under 1.5%, saving an estimated $340,000 annually in chargebacks.",
    datasetInfo: {
      name: "Financial_Payments_Log.csv",
      rows: "100,000 Card Transactions",
      columns: "28 Engineered & PCA Features",
      description: "Includes TransactionTime, Amount, MerchantCategory, DistanceFromHome, DeviceTrustScore, and binary IsFraud flag.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Exploratory Analysis & Imbalance Diagnostic",
        subtitle: "Audit fraud distribution, transaction velocity spikes, and outlier behavior.",
        description: "Analyze class skewness and compute baseline non-fraud vs fraud statistical distributions.",
        deliverables: [
          "Plot class distribution and verify 99.8% non-fraud skew.",
          "Audit transaction amounts using log-transformations.",
          "Compute correlation heatmap between transaction velocity and fraud status.",
        ],
      },
      {
        id: "m2",
        title: "Milestone 2: Feature Engineering & Velocity Features",
        subtitle: "Construct rolling transaction velocity windows and behavioral delta metrics.",
        description: "Engineer time-since-last-transaction, rolling 1-hour transaction volume, and deviation from historical average spend.",
        deliverables: [
          "Create rolling aggregates using Pandas transform.",
          "Apply RobustScaler to prevent extreme payment outliers from distorting gradients.",
          "Split data temporally into Train (70%) and Test (30%) to prevent lookahead data leakage.",
        ],
        codeSnippet: {
          language: "python",
          label: "Feature Engineering Rolling Windows",
          code: `import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import RobustScaler\n\n# Calculate customer spending deviation\ndf['customer_mean_spend'] = df.groupby('customer_id')['amount'].transform('mean')\ndf['spend_ratio'] = df['amount'] / (df['customer_mean_spend'] + 1e-5)\n\n# Transaction velocity in previous 1 hour\ndf['time_diff'] = df.groupby('customer_id')['timestamp'].diff().dt.total_seconds().fillna(99999)\ndf['is_rapid_repeat'] = (df['time_diff'] < 300).astype(int)\n\n# Robust scaling\nscaler = RobustScaler()\ndf[['amount_scaled', 'spend_ratio_scaled']] = scaler.fit_transform(df[['amount', 'spend_ratio']])`,
        },
      },
      {
        id: "m3",
        title: "Milestone 3: Model Architecture & Resampling Strategy",
        subtitle: "Benchmark Random Forest, XGBoost, and evaluate SMOTE vs Class-Weighting.",
        description: "Compare baseline Logistic Regression against tuned XGBoost classifiers using PR-AUC (Precision-Recall Area Under Curve).",
        deliverables: [
          "Train baseline model with class_weight='balanced'.",
          "Perform Stratified K-Fold Cross Validation.",
          "Evaluate PR-AUC and ROC-AUC metrics instead of deceptive accuracy scores.",
        ],
      },
      {
        id: "m4",
        title: "Milestone 4: Optimal Decision Threshold Calibration",
        subtitle: "Tune probability decision boundary to minimize financial loss and customer friction.",
        description: "Formulate a cost-matrix function balancing fraud chargeback cost vs legitimate transaction decline friction.",
        deliverables: [
          "Generate precision-recall curve across threshold values from 0.05 to 0.95.",
          "Pinpoint optimal threshold achieving 92% Recall at max precision.",
          "Produce confusion matrix and cost-savings estimation report.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Documentation & Production Serving Architecture",
        subtitle: "Structure repository with modular inference script and Dockerfile.",
        description: "Write production-ready predict function that accepts raw JSON transaction payloads and returns real-time fraud probability.",
        deliverables: [
          "Assemble inference pipeline with pickle/joblib model export.",
          "Draft complete README.md with model evaluation benchmarks.",
          "Prepare technical interview talking points on class imbalance handling.",
        ],
      },
    ],
    readmeTemplate: `# Financial Transaction Fraud & Anomaly Detection Pipeline

## Overview
Built an end-to-end Machine Learning pipeline detecting unauthorized financial transactions under extreme class imbalance (0.2% positive fraud rate). Evaluated Random Forest, LightGBM, and XGBoost using Precision-Recall Area Under Curve (PR-AUC) and calibrated decision thresholds based on actual dollar cost impact.

## Architecture
- **Data Wrangling**: Python, Pandas, NumPy
- **Feature Engineering**: Robust scaling, behavioral spend ratios, temporal velocity counters
- **Model Algorithms**: XGBoost Classifier, Random Forest, SMOTE / Cost-Sensitive Weighting
- **Metrics**: PR-AUC, Recall@Precision, Confusion Matrix Cost Optimization

## Performance
- **PR-AUC**: 0.884 (vs. baseline 0.312)
- **Fraud Recall**: 92.4% with False Positive Rate under 1.2%
`,
  },
  {
    id: "saas-churn-prediction",
    title: "SaaS Customer Churn Prediction & Retention Cohort Engine",
    subtitle: "Feature Extraction, Survival Analysis & Explanatory SHAP Interpretability",
    trackId: "data-analyst",
    trackName: "Data Analyst Specialization",
    subjects: ["python", "sql", "ml"],
    difficulty: "Intermediate",
    estimatedHours: 4,
    icon: "📉",
    overview:
      "Analyze customer subscription longevity, feature usage frequency, and support interactions across 7,000+ B2B software accounts to predict churn risks 30 days before contract expiration.",
    problemStatement:
      "Customer Success teams are blindsided when accounts fail to renew annual subscriptions. They lack leading indicators of product disengagement.",
    businessImpact:
      "Enables proactive outreach to high-value accounts at risk, reducing quarterly customer attrition by 11%.",
    datasetInfo: {
      name: "SaaS_Account_Usage_Churn.csv",
      rows: "7,043 Customer Records",
      columns: "21 Product & Contract Metrics",
      description: "Includes TenureMonths, MonthlyCharges, TotalCharges, ContractType, SupportTickets, WeeklyActiveHours, and ChurnFlag.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: SQL Cohort Retention & Contract Aggregations",
        subtitle: "Query contract duration splits, monthly billing trends, and churn rates by product tier.",
        description: "Extract summary distributions demonstrating whether month-to-month contracts correlate with higher churn.",
        deliverables: [
          "Calculate churn rates across contract types (Month-to-Month vs 1-Year vs 2-Year).",
          "Identify correlation between customer support tickets and likelihood of cancellation.",
        ],
      },
      {
        id: "m2",
        title: "Milestone 2: Data Cleaning & One-Hot Encoding in Python",
        subtitle: "Handle categorical variables, impute missing values, and scale continuous numerical metrics.",
        description: "Transform raw customer attributes into machine-learning ready numpy matrices using ColumnTransformer.",
        deliverables: [
          "Encode categorical features (Contract, PaymentMethod, TechSupport).",
          "Normalize tenure and monthly charge distributions.",
        ],
      },
      {
        id: "m3",
        title: "Milestone 3: Model Training & Evaluation",
        subtitle: "Train Logistic Regression and Gradient Boosted Trees to predict customer churn.",
        description: "Benchmark algorithms and evaluate precision, recall, and F1 score on unseen test data.",
        deliverables: [
          "Produce classification report with F1-score > 0.80.",
          "Plot ROC curve and calculate AUC score.",
        ],
      },
      {
        id: "m4",
        title: "Milestone 4: Explainability with SHAP (Shapley Additive Explanations)",
        subtitle: "Provide interpretable feature importance for Customer Success managers.",
        description: "Generate SHAP beeswarm and force plots to demonstrate which specific factors drive individual churn predictions.",
        deliverables: [
          "Rank top 5 drivers of churn (e.g., Short tenure + high support ticket frequency).",
          "Export personalized risk factor summary table for customer accounts.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Packaging & Executive Presentation",
        subtitle: "Synthesize insights into an actionable executive deck and GitHub repository.",
        description: "Draft an analytical case study detailing strategic retention recommendations for the executive leadership team.",
        deliverables: [
          "Format complete GitHub README with visual SHAP charts.",
          "Draft 3 resume accomplishment bullets highlighting business impact.",
        ],
      },
    ],
    readmeTemplate: `# SaaS Customer Churn Prediction & Retention Cohort Engine

## Project Summary
Analyzed 7,000+ subscription accounts to predict customer churn risks. Built an interpretable Gradient Boosting classifier achieving 82% F1-score and applied SHAP values to isolate the top drivers of customer disengagement.

## Key Insights
- Month-to-month contract holders have a **42% higher churn rate** than annual subscribers.
- Accounts filing 3+ support tickets in their first 30 days without resolution exhibited an **80% likelihood of departure**.
`,
  },
  {
    id: "data-warehouse-etl",
    title: "Enterprise Data Warehouse & Automated ETL Pipeline",
    subtitle: "Dimensional Modeling, Kimball Architecture & Python Pipeline Orchestration",
    trackId: "data-engineer",
    trackName: "Data Engineer Specialization",
    subjects: ["sql", "python"],
    difficulty: "Advanced",
    estimatedHours: 6,
    icon: "⚙️",
    overview:
      "Architect a scalable relational Data Warehouse integrating disparate operational transactional sources, applying automated schema validations, SCD Type 2 tracking, and automated ETL execution.",
    problemStatement:
      "Analytics teams are querying messy operational OLTP databases directly, resulting in slow query performance, inconsistent metric definitions, and lack of historical change tracking.",
    businessImpact:
      "Accelerates BI query response times by 5x while providing audit-proof Slowly Changing Dimension (SCD Type 2) historical records.",
    datasetInfo: {
      name: "Enterprise_ERP_Logistics.sqlite",
      rows: "250,000 Records across 6 Tables",
      columns: "Operational Schemas",
      description: "Raw relational tables: Users, Orders, OrderItems, Products, Warehouses, and ShippingStatus.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Source System Profiling & Kimball Architecture",
        subtitle: "Design the dimensional bus matrix and Star Schema architecture.",
        description: "Map out Fact_Sales, Dim_Customer (SCD Type 2), Dim_Product, Dim_Store, and Dim_Date.",
        deliverables: [
          "Produce architectural entity-relationship diagram (ERD).",
          "Write warehouse schema creation scripts with surrogate keys.",
        ],
      },
      {
        id: "m2",
        title: "Milestone 2: Automated Python Extraction & Data Validation",
        subtitle: "Build idempotent extraction pipeline with Pydantic / Great Expectations schema checks.",
        description: "Extract dirty operational logs, flag nulls and orphaned keys, and output cleaned staging tables.",
        deliverables: [
          "Implement pipeline exception logging and row count reconcile checks.",
          "Write modular Python extractor functions.",
        ],
      },
      {
        id: "m3",
        title: "Milestone 3: Slowly Changing Dimensions (SCD Type 2) Logic",
        subtitle: "Capture customer demographic and address changes over time.",
        description: "Implement effective_start_date, effective_end_date, and is_current boolean flags in SQL.",
        deliverables: [
          "Write idempotent upsert logic tracking historical attribute changes.",
          "Verify point-in-time historical reporting accuracy.",
        ],
      },
      {
        id: "m4",
        title: "Milestone 4: High-Throughput Aggregations & Analytical Marts",
        subtitle: "Materialize monthly department summary views for business analysts.",
        description: "Build pre-aggregated data mart views to power instantaneous executive queries.",
        deliverables: [
          "Create indexed summary tables for finance and operations teams.",
          "Benchmark query latency before and after dimensional modeling.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Packaging & Pipeline Architecture Guide",
        subtitle: "Document ETL architecture with flowchart and run instructions.",
        description: "Assemble a clean GitHub repository containing data warehouse DDLs, Python pipeline scripts, and architectural diagrams.",
        deliverables: [
          "Publish complete Star Schema ERD diagram.",
          "Write comprehensive README.md with local setup instructions.",
        ],
      },
    ],
    readmeTemplate: `# Enterprise Data Warehouse & Automated ETL Pipeline

## Project Overview
Designed and implemented a Kimball-standard Star Schema Data Warehouse from operational relational sources. Built an automated Python ETL pipeline with schema validation and SCD Type 2 dimension tracking.

## Architecture Highlights
- **Schema**: Kimball Dimensional Modeling (Fact_Sales + Dimensions with Surrogate Keys)
- **SCD Type 2**: Preserves complete historical customer attributes over time
- **ETL**: Python automated pipeline with idempotency and data quality gate checks
`,
  },
  {
    id: "rag-support-agent",
    title: "Autonomous Customer Support RAG Agent with Vector Search",
    subtitle: "Dense Embeddings, Vector Indexing, Semantic Retrieval & LLM Generation",
    trackId: "ai-engineer",
    trackName: "AI & ML Systems Engineer Specialization",
    subjects: ["python", "ai", "ml"],
    difficulty: "Advanced",
    estimatedHours: 6,
    icon: "🤖",
    overview:
      "Construct an end-to-end Retrieval-Augmented Generation (RAG) assistant that ingests company technical documentation, splits content into semantically coherent chunks, indexes vector embeddings, and generates accurate, cited technical support answers.",
    problemStatement:
      "Technical support engineers spend 60% of their day answering repetitive architecture questions documented across hundreds of markdown knowledge base files.",
    businessImpact:
      "Resolves 45% of tier-1 support tickets autonomously with verifiable source citations, eliminating hallucinated answers.",
    datasetInfo: {
      name: "Enterprise_API_Documentation.zip",
      rows: "240 Markdown & PDF Technical Guides",
      columns: "Text Corpora",
      description: "Full developer guides, API endpoints, error code descriptions, and architectural FAQs.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Document Ingestion & Semantic Chunking",
        subtitle: "Parse markdown and PDF files into semantically coherent overlapping chunks.",
        description: "Implement recursive text splitting with 500-token chunk sizes and 50-token overlap to maintain contextual continuity.",
        deliverables: [
          "Extract clean text from documentation files.",
          "Split documents into indexed chunk dictionaries with metadata source tags.",
        ],
      },
      {
        id: "m2",
        title: "Milestone 2: Dense Vector Embeddings & Vector Store Indexing",
        subtitle: "Compute vector representations and index in ChromaDB or FAISS.",
        description: "Generate embeddings for all chunks and establish an in-memory vector database with cosine similarity indexing.",
        deliverables: [
          "Batch compute vector embeddings.",
          "Verify semantic search accuracy against sample technical queries.",
        ],
      },
      {
        id: "m3",
        title: "Milestone 3: Top-K Semantic Retrieval & Prompt Engineering",
        subtitle: "Retrieve relevant chunks and construct constrained context prompts.",
        description: "Build query pipeline that extracts the top-3 most relevant chunks and formats an instruction-tuned prompt.",
        deliverables: [
          "Implement similarity search with relevance score filtering.",
          "Design system prompt enforcing strict citation and prohibiting hallucinations.",
        ],
      },
      {
        id: "m4",
        title: "Milestone 4: Response Generation & Source Verification",
        subtitle: "Generate answers with cited document metadata.",
        description: "Synthesize concise technical answers with direct file and section references.",
        deliverables: [
          "Connect to LLM API (or local model) to stream responses.",
          "Validate that generated responses correctly cite source chunks.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Packaging & Interactive UI",
        subtitle: "Package project with Streamlit / CLI demo and complete README.",
        description: "Document the complete RAG architecture with vector space diagrams and sample query benchmarks.",
        deliverables: [
          "Write technical README.md explaining chunking strategies and embedding choices.",
          "Draft resume bullet points highlighting Generative AI engineering skills.",
        ],
      },
    ],
    readmeTemplate: `# Autonomous Technical Support RAG Agent

## Overview
Built a production-ready Retrieval-Augmented Generation (RAG) system answering complex technical documentation questions. Implemented recursive semantic chunking, dense vector indexing, and strict context-grounded prompt engineering to eliminate hallucinations.

## Key Technologies
- **Embeddings**: Dense Vector Text Embeddings
- **Vector Database**: ChromaDB / FAISS (Cosine Similarity Search)
- **Orchestration**: Python, Semantic Chunking, Metadata Indexing
- **Generation**: Instruction-tuned LLM with Citation Anchoring
`,
  },
  {
    id: "hospital-readmission-analytics",
    title: "Clinical Hospital Readmission & Patient Risk Stratification",
    subtitle: "Healthcare KPIs, Readmission Drivers & Clinical Dashboard",
    trackId: "data-analyst",
    trackName: "Data Analyst Specialization",
    subjects: ["sql", "powerbi"],
    difficulty: "Intermediate",
    estimatedHours: 4,
    icon: "🏥",
    overview:
      "Analyze 25,000 inpatient hospital admissions to identify key clinical and demographic risk factors driving 30-day hospital readmissions, delivering an executive clinical dashboard for hospital administrators.",
    problemStatement:
      "Healthcare networks face substantial Medicare penalties when 30-day patient readmission rates exceed national benchmarks. Hospital leadership needs visibility into high-risk patient segments.",
    businessImpact:
      "Pinpoints 3 primary controllable readmission risk factors, aiding post-discharge planning and lowering penalty risk by an estimated $180,000.",
    datasetInfo: {
      name: "Hospital_Inpatient_Readmissions.csv",
      rows: "25,000 Inpatient Stays",
      columns: "18 Clinical Metrics",
      description: "PatientID, AgeGroup, PrimaryDiagnosis, LengthOfStay, NumberOfMedications, PriorAdmissions, and Readmitted30DaysFlag.",
    },
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Clinical Data Quality & SQL Risk Segmentation",
        subtitle: "Clean admission records and calculate baseline readmission rates by primary diagnosis.",
        description: "Identify high-risk diagnostic clusters (e.g., Congestive Heart Failure, Diabetes, COPD).",
        deliverables: [
          "Write SQL aggregation queries grouping readmission rates by diagnosis code.",
          "Calculate Average Length of Stay (ALOS) across patient age brackets.",
        ],
      },
      {
        id: "m2",
        title: "Milestone 2: Polypharmacy & Chronic Care Cross-Tabulation",
        subtitle: "Analyze correlation between number of prescribed medications and readmission rate.",
        description: "Segment patients into medication complexity tiers to test the polypharmacy risk hypothesis.",
        deliverables: [
          "Create medication count buckets in SQL (<5, 5-10, 10+).",
          "Compute relative readmission risk ratios across cohorts.",
        ],
      },
      {
        id: "m3",
        title: "Milestone 3: Power BI Clinical Dashboard Design",
        subtitle: "Build an executive healthcare analytics dashboard.",
        description: "Design interactive visual report featuring readmission rate gauges, diagnostic breakdown tree, and patient risk tier slicers.",
        deliverables: [
          "Build executive summary page with 30-day readmission rate KPI vs national benchmark.",
          "Implement decomposition tree analyzing root causes of patient returns.",
        ],
      },
      {
        id: "m4",
        title: "Milestone 4: Clinical Recommendations & Actionable Insights",
        subtitle: "Translate statistical findings into concrete hospital operational policies.",
        description: "Draft 3 evidence-backed recommendations for discharge planning and 48-hour follow-up telehealth visits.",
        deliverables: [
          "Produce 1-page executive memo summarizing key findings.",
        ],
      },
      {
        id: "m5",
        title: "Milestone 5: Portfolio Packaging & Case Study Presentation",
        subtitle: "Document healthcare analytics project for your portfolio.",
        description: "Format polished GitHub repository highlighting domain-specific healthcare data acumen.",
        deliverables: [
          "Publish README.md with dashboard screenshots and data dictionary.",
          "Draft resume bullet points highlighting healthcare analytics impact.",
        ],
      },
    ],
    readmeTemplate: `# Clinical Hospital Readmission & Patient Risk Stratification

## Project Overview
Analyzed 25,000 inpatient admission records to uncover the primary drivers of 30-day readmissions. Identified high-risk diagnostic segments and built an interactive Power BI clinical analytics suite for hospital administrators.

## Key Insights
- Patients on **10+ concurrent medications (polypharmacy)** exhibited a **28% readmission rate** (2.1x above hospital average).
- Discharge follow-up within 48 hours for CHF patients reduced readmission likelihood by **34%**.
`,
  },
];

// Helper functions for persistent project progress
const PROJECT_PROGRESS_PREFIX = "datamind_project_milestones_";

export function getProjectMilestones(projectId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${PROJECT_PROGRESS_PREFIX}${projectId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleProjectMilestone(projectId: string, milestoneId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getProjectMilestones(projectId);
    const updated = current.includes(milestoneId)
      ? current.filter((id) => id !== milestoneId)
      : [...current, milestoneId];
    localStorage.setItem(`${PROJECT_PROGRESS_PREFIX}${projectId}`, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}
