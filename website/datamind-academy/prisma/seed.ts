import { PrismaClient, LessonType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DataMind Academy database with real, explanatory curriculum content...");

  // Clear existing content to prevent duplicates during seeding
  await prisma.forumComment.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.codeSubmission.deleteMany();
  await prisma.userLessonProgress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.trackSubject.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.track.deleteMany();

  // ==========================================
  // 1. SEED SUBJECTS
  // ==========================================
  console.log("Creating Subjects...");
  const sqlSubject = await prisma.subject.create({
    data: {
      id: "sql",
      title: "SQL & Relational Databases",
      description: "Master database querying, relational design, complex JOINs, CTEs, and window functions from scratch.",
      icon: "🗄️",
      order: 1,
      prerequisites: [],
      estimatedHours: 40,
    },
  });

  const powerbiSubject = await prisma.subject.create({
    data: {
      id: "powerbi",
      title: "Power BI & Business Intelligence",
      description: "Transform raw business data into interactive dashboards, star schemas, and advanced DAX measures.",
      icon: "📊",
      order: 2,
      prerequisites: ["sql"],
      estimatedHours: 35,
    },
  });

  const pythonSubject = await prisma.subject.create({
    data: {
      id: "python",
      title: "Python Programming & Data Analysis",
      description: "Learn Python fundamentals, object-oriented design, Pandas, NumPy, and data visualization.",
      icon: "🐍",
      order: 3,
      prerequisites: [],
      estimatedHours: 50,
    },
  });

  const mlSubject = await prisma.subject.create({
    data: {
      id: "ml",
      title: "Machine Learning Foundations & Engineering",
      description: "Build, evaluate, and deploy supervised and unsupervised ML models using Scikit-Learn and XGBoost.",
      icon: "🤖",
      order: 4,
      prerequisites: ["python", "sql"],
      estimatedHours: 60,
    },
  });

  const aiSubject = await prisma.subject.create({
    data: {
      id: "ai",
      title: "Artificial Intelligence & Deep Learning",
      description: "Explore neural networks, CNNs, Transformers, LLMs, PyTorch, and generative AI architectures.",
      icon: "🧠",
      order: 5,
      prerequisites: ["ml", "python"],
      estimatedHours: 70,
    },
  });

  // ==========================================
  // 2. SEED TRACKS
  // ==========================================
  console.log("Creating Tracks...");
  const dataAnalystTrack = await prisma.track.create({
    data: {
      id: "data-analyst",
      title: "Data Analyst",
      description: "Become a professional Data Analyst capable of querying databases, cleaning data, and building executive dashboards.",
      icon: "📈",
      durationMonths: 4,
      goal: "Master SQL, Power BI, and Python Data Analysis for entry-to-mid analyst roles.",
    },
  });

  const dataScientistTrack = await prisma.track.create({
    data: {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Master end-to-end data science — from SQL data extraction to predictive ML modeling and statistical analysis.",
      icon: "🔬",
      durationMonths: 8,
      goal: "Build predictive models and extract actionable business insights from massive datasets.",
    },
  });

  const aiEngineerTrack = await prisma.track.create({
    data: {
      id: "ai-engineer",
      title: "AI & ML Engineer",
      description: "Specialized path for software developers and data scientists building state-of-the-art AI systems and LLM applications.",
      icon: "⚡",
      durationMonths: 12,
      goal: "Design, train, and deploy production-grade Deep Learning & LLM applications.",
    },
  });

  // Link Subjects to Tracks
  await prisma.trackSubject.createMany({
    data: [
      { trackId: "data-analyst", subjectId: "sql", order: 1 },
      { trackId: "data-analyst", subjectId: "powerbi", order: 2 },
      { trackId: "data-analyst", subjectId: "python", order: 3 },
      { trackId: "data-scientist", subjectId: "sql", order: 1 },
      { trackId: "data-scientist", subjectId: "python", order: 2 },
      { trackId: "data-scientist", subjectId: "ml", order: 3 },
      { trackId: "ai-engineer", subjectId: "python", order: 1 },
      { trackId: "ai-engineer", subjectId: "ml", order: 2 },
      { trackId: "ai-engineer", subjectId: "ai", order: 3 },
    ],
  });

  // ==========================================
  // 3. SEED MODULES & EXPLANATORY LESSONS (SQL)
  // ==========================================
  console.log("Creating SQL Modules and Lessons...");
  const sqlMod1 = await prisma.module.create({
    data: {
      subjectId: "sql",
      title: "Module 1: Relational Databases & SELECT Fundamentals",
      description: "Understand database tables, schemas, and master basic querying with SELECT, WHERE, ORDER BY, and LIMIT.",
      order: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: sqlMod1.id,
      title: "Lesson 1.1: What is a Relational Database?",
      type: LessonType.THEORY,
      order: 1,
      durationMinutes: 10,
      contentMd: `# Introduction to Relational Databases

A **Relational Database Management System (RDBMS)** organizes data into structured tables consisting of **rows** (records) and **columns** (attributes).

### Key Concepts:
1. **Table**: A structured grid storing specific entities (e.g., \`customers\`, \`orders\`, \`products\`).
2. **Primary Key (PK)**: A unique identifier for every row in a table (e.g., \`customer_id\`).
3. **Foreign Key (FK)**: A column in one table that links to the Primary Key of another table, creating a relationship.

### Why SQL?
SQL (**Structured Query Language**) is the universal domain-specific language used to create, read, update, and manage relational databases like PostgreSQL, MySQL, and SQLite.
`,
      initialCode: `-- SQL Comment: Write your first query below!
SELECT * FROM customers;`,
      language: "sql",
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: sqlMod1.id,
      title: "Lesson 1.2: Filtering Data with WHERE and Logical Operators",
      type: LessonType.EXERCISE,
      order: 2,
      durationMinutes: 20,
      contentMd: `# Filtering Data with WHERE

The \`WHERE\` clause allows you to filter rows based on specific condition criteria.

### Syntax:
\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition;
\`\`\`

### Common Operators:
- \`=\` Equal to
- \`!=\` or \`<>\` Not equal to
- \`>\`, \`<\`, \`>=\`, \`<=\` Numerical comparisons
- \`AND\`, \`OR\`, \`NOT\` Logical combinations
- \`IN (val1, val2)\` Match against a list of values
- \`BETWEEN val1 AND val2\` Range comparison
- \`LIKE 'A%'\` Pattern matching (\`%\` = any characters, \`_\` = single character)

### Exercise:
Write a query to retrieve the \`first_name\`, \`last_name\`, and \`country\` of all customers who live in either **'USA'** or **'Canada'** AND have spent more than **$500**.
`,
      initialCode: `-- Write your SQL query here
SELECT first_name, last_name, country 
FROM customers 
WHERE -- Add your condition here
;`,
      language: "sql",
      testCasesJson: [
        { query: "SELECT first_name, last_name, country FROM customers WHERE country IN ('USA', 'Canada') AND total_spent > 500", expectedRowCount: 4 }
      ],
      solutionCode: `SELECT first_name, last_name, country 
FROM customers 
WHERE country IN ('USA', 'Canada') AND total_spent > 500;`,
    },
  });

  const sqlMod2 = await prisma.module.create({
    data: {
      subjectId: "sql",
      title: "Module 2: Advanced JOINs & Aggregations",
      description: "Connect multiple tables using INNER, LEFT, RIGHT, FULL JOINs and perform data summarization using GROUP BY and HAVING.",
      order: 2,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: sqlMod2.id,
      title: "Lesson 2.1: Mastering Table JOINs",
      type: LessonType.EXERCISE,
      order: 1,
      durationMinutes: 25,
      contentMd: `# Joining Multiple Tables

In real databases, data is normalized across multiple tables. To combine rows from two tables, we use the \`JOIN\` clause based on a common column.

### Types of JOINs:
1. **INNER JOIN**: Returns rows only when there is a match in **both** tables.
2. **LEFT JOIN**: Returns **all** rows from the left table, and matched rows from the right table (unmatched right rows get \`NULL\`).
3. **RIGHT JOIN**: Returns all rows from the right table, and matched rows from the left table.
4. **FULL OUTER JOIN**: Returns all rows when there is a match in either left or right table.

### Syntax:
\`\`\`sql
SELECT orders.order_id, customers.first_name, orders.amount
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
\`\`\`

### Exercise:
Write an \`INNER JOIN\` query to display each customer's \`first_name\`, \`last_name\`, their \`order_id\`, and order \`total_amount\`.
`,
      initialCode: `SELECT c.first_name, c.last_name, o.order_id, o.total_amount
FROM customers c
-- Add your JOIN clause here
;`,
      language: "sql",
      solutionCode: `SELECT c.first_name, c.last_name, o.order_id, o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;`,
    },
  });

  const sqlMod3 = await prisma.module.create({
    data: {
      subjectId: "sql",
      title: "Module 3: Window Functions & Analytics",
      description: "Perform advanced analytics calculations across row sets using ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), and LEAD().",
      order: 3,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: sqlMod3.id,
      title: "Lesson 3.1: Analytic Window Functions (ROW_NUMBER & LAG)",
      type: LessonType.EXERCISE,
      order: 1,
      durationMinutes: 30,
      contentMd: `# Introduction to Window Functions

Unlike \`GROUP BY\` (which collapses multiple rows into a single summary row), **Window Functions** compute values across a set of table rows related to the current row without collapsing the rows.

### Syntax:
\`\`\`sql
FUNCTION_NAME() OVER (
  PARTITION BY column1 
  ORDER BY column2 ASC/DESC
)
\`\`\`

### Key Window Functions:
- \`ROW_NUMBER()\`: Assigns a sequential integer to rows starting at 1.
- \`RANK()\`: Assigns rank with gaps for ties (1, 2, 2, 4).
- \`DENSE_RANK()\`: Assigns rank without gaps for ties (1, 2, 2, 3).
- \`LAG(col, offset)\`: Accesses data from a previous row in the result set.
- \`LEAD(col, offset)\`: Accesses data from a subsequent row in the result set.

### Exercise:
Use \`ROW_NUMBER()\` to rank employees by salary within each department.
`,
      initialCode: `SELECT 
  employee_id,
  department_name,
  salary,
  -- Add ROW_NUMBER() window function here
FROM employees;`,
      language: "sql",
      solutionCode: `SELECT 
  employee_id,
  department_name,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department_name ORDER BY salary DESC) as salary_rank
FROM employees;`,
    },
  });

  // ==========================================
  // 4. SEED MODULES & EXPLANATORY LESSONS (PYTHON)
  // ==========================================
  console.log("Creating Python Modules and Lessons...");
  const pyMod1 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 1: Python Syntax & Data Structures",
      description: "Master variables, data types, lists, dictionaries, tuples, sets, and control flow statements.",
      order: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: pyMod1.id,
      title: "Lesson 1.1: Python Data Structures (Lists & Dicts)",
      type: LessonType.EXERCISE,
      order: 1,
      durationMinutes: 20,
      contentMd: `# Python Data Structures

Python provides four built-in collection data types:
1. **List**: Ordered, mutable collection allowing duplicates. Defined with \`[]\`.
2. **Dictionary**: Unordered collection of key-value pairs. Defined with \`{}\`.
3. **Tuple**: Ordered, immutable collection allowing duplicates. Defined with \`()\`.
4. **Set**: Unordered collection of unique items. Defined with \`{}\`.

### Examples:
\`\`\`python
# List operations
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")

# Dictionary operations
user = {"name": "Alice", "age": 28, "role": "Data Analyst"}
print(user["name"])  # Output: Alice
\`\`\`

### Exercise:
Write a function \`get_high_scorers(scores_dict, threshold)\` that takes a dictionary of student scores and returns a list of names of students whose score is greater than or equal to the threshold.
`,
      initialCode: `def get_high_scorers(scores_dict, threshold):
    # Write your solution here
    pass

# Test your function:
# print(get_high_scorers({"Alice": 85, "Bob": 60, "Charlie": 92}, 80))
# Expected output: ['Alice', 'Charlie']
`,
      language: "python",
      solutionCode: `def get_high_scorers(scores_dict, threshold):
    return [name for name, score in scores_dict.items() if score >= threshold]`,
    },
  });

  const pyMod2 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 2: Data Analysis with Pandas & NumPy",
      description: "Manipulate dataframes, clean missing data, perform groupings, and calculate statistical summaries.",
      order: 2,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: pyMod2.id,
      title: "Lesson 2.1: Data Manipulation with Pandas DataFrames",
      type: LessonType.EXERCISE,
      order: 1,
      durationMinutes: 30,
      contentMd: `# Data Manipulation with Pandas

**Pandas** is the standard Python library for data manipulation and analysis. Its core data structure is the **DataFrame** — a 2-dimensional labeled table.

### Key Pandas Operations:
\`\`\`python
import pandas as pd

# Load data
df = pd.read_csv("data.csv")

# Inspection
print(df.head())
print(df.info())
print(df.describe())

# Filtering
adults = df[df["age"] >= 18]

# Grouping & Aggregation
summary = df.groupby("department")["salary"].mean()
\`\`\`

### Exercise:
Given a dataframe \`df\`, write Python code to calculate the average salary for each department and filter for departments with an average salary exceeding $75,000.
`,
      initialCode: `import pandas as pd

def filter_top_departments(df):
    # Group by department, calculate mean salary, filter > 75000
    pass
`,
      language: "python",
      solutionCode: `import pandas as pd

def filter_top_departments(df):
    avg_salary = df.groupby("department")["salary"].mean()
    return avg_salary[avg_salary > 75000]`,
    },
  });

  // ==========================================
  // 5. SEED MODULES & EXPLANATORY LESSONS (MACHINE LEARNING)
  // ==========================================
  console.log("Creating ML Modules and Lessons...");
  const mlMod1 = await prisma.module.create({
    data: {
      subjectId: "ml",
      title: "Module 1: Supervised Learning & Scikit-Learn",
      description: "Build classification and regression models using Linear Regression, Logistic Regression, Decision Trees, and Random Forests.",
      order: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: mlMod1.id,
      title: "Lesson 1.1: Building Your First Classifier with Scikit-Learn",
      type: LessonType.EXERCISE,
      order: 1,
      durationMinutes: 35,
      contentMd: `# Supervised Machine Learning Workflow

Supervised learning algorithms learn a mapping function from input features ($X$) to a target output ($y$).

### Workflow Steps:
1. **Data Preprocessing**: Fill missing values, encode categorical variables, scale numerical features.
2. **Train/Test Split**: Split data (e.g., 80% train, 20% test) to evaluate model generalization.
3. **Model Fitting**: Train the algorithm on the training dataset.
4. **Evaluation**: Assess accuracy, precision, recall, and F1-score on unseen test data.

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Fit
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 3. Predict & Evaluate
predictions = model.predict(X_test)
acc = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {acc:.2%}")
\`\`\`

### Exercise:
Write a function \`train_and_evaluate(X, y)\` that performs an 80/20 train-test split, trains a \`RandomForestClassifier\`, and returns the test set accuracy score.
`,
      initialCode: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def train_and_evaluate(X, y):
    # Implement train/test split, fit classifier, and return accuracy
    pass
`,
      language: "python",
      solutionCode: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def train_and_evaluate(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    return accuracy_score(y_test, predictions)`,
    },
  });

  // ==========================================
  // 6. SEED ACHIEVEMENTS
  // ==========================================
  console.log("Creating Achievements...");
  await prisma.achievement.createMany({
    data: [
      { id: "FIRST_QUERY", title: "First Query", description: "Successfully executed your first SQL statement.", icon: "⚡", xpReward: 50 },
      { id: "STREAK_7_DAYS", title: "7-Day Streak", description: "Learned continuously for 7 days in a row.", icon: "🔥", xpReward: 200 },
      { id: "SQL_MASTER", title: "SQL Explorer", description: "Completed all modules in the SQL Track.", icon: "🗄️", xpReward: 500 },
      { id: "PYTHON_NOVICE", title: "Python Coder", description: "Wrote and executed 10 Python exercises.", icon: "🐍", xpReward: 150 },
      { id: "ML_ENGINEER", title: "ML Practitioner", description: "Trained your first Machine Learning model.", icon: "🤖", xpReward: 300 },
    ],
  });

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
