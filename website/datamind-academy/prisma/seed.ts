import { PrismaClient, LessonType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding production-scale DataMind Academy curriculum with 25+ modules & HackerRank-style challenges...");

  // Clear existing content
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
  // 1. SUBJECTS
  // ==========================================
  console.log("Creating Subjects...");
  const sqlSubject = await prisma.subject.create({
    data: {
      id: "sql",
      title: "SQL & Relational Databases",
      description: "Master database querying, relational design, complex JOINs, CTEs, and window functions.",
      icon: "🗄️",
      order: 1,
      prerequisites: [],
      estimatedHours: 40,
    },
  });

  const pythonSubject = await prisma.subject.create({
    data: {
      id: "python",
      title: "Python Programming & Data Analysis",
      description: "Learn Python fundamentals, object-oriented design, Pandas, NumPy, and data visualization.",
      icon: "🐍",
      order: 2,
      prerequisites: [],
      estimatedHours: 50,
    },
  });

  const powerbiSubject = await prisma.subject.create({
    data: {
      id: "powerbi",
      title: "Power BI & Business Intelligence",
      description: "Transform raw business data into interactive dashboards, star schemas, and DAX measures.",
      icon: "📊",
      order: 3,
      prerequisites: ["sql"],
      estimatedHours: 35,
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
  // 2. TRACKS
  // ==========================================
  console.log("Creating Tracks...");
  await prisma.track.createMany({
    data: [
      { id: "data-analyst", title: "Data Analyst", description: "Query databases, clean data, and build executive dashboards.", icon: "📈", durationMonths: 4, goal: "Master SQL, Power BI, and Python Data Analysis." },
      { id: "data-scientist", title: "Data Scientist", description: "End-to-end data science from SQL data extraction to predictive ML modeling.", icon: "🔬", durationMonths: 8, goal: "Build predictive models and extract actionable business insights." },
      { id: "ai-engineer", title: "AI & ML Engineer", description: "Design, train, and deploy production-grade Deep Learning & LLM applications.", icon: "⚡", durationMonths: 12, goal: "Master Neural Networks, Transformers, and GenAI." },
    ],
  });

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
  // 3. SQL TRACK MODULES & LESSONS (6 Modules)
  // ==========================================
  console.log("Creating SQL Track Curriculum...");
  
  const sqlM1 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 1: Database Fundamentals & Basic SELECT", description: "Relational concepts, table schemas, WHERE filtering, ORDER BY, and LIMIT.", order: 1 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM1.id,
        title: "1.1 What is a Relational Database?",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 10,
        contentMd: "# Relational Database Concepts\nUnderstand Tables, Primary Keys (PK), and Foreign Keys (FK).",
        initialCode: "SELECT * FROM customers;",
        language: "sql",
      },
      {
        moduleId: sqlM1.id,
        title: "1.2 Filtering High-Value Customers (WHERE)",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 15,
        contentMd: "# Exercise: Filter Customers\nQuery customers from 'USA' or 'Canada' who spent over $500.",
        initialCode: "SELECT first_name, last_name, country FROM customers WHERE country IN ('USA', 'Canada') AND total_spent > 500;",
        language: "sql",
        solutionCode: "SELECT first_name, last_name, country FROM customers WHERE country IN ('USA', 'Canada') AND total_spent > 500;",
      },
    ],
  });

  const sqlM2 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 2: Aggregations & GROUP BY", description: "Summarizing data with COUNT, SUM, AVG, MIN, MAX, and HAVING filter.", order: 2 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM2.id,
        title: "2.1 Calculating Departmental Payroll (GROUP BY)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 20,
        contentMd: "# Exercise: Department Payroll\nCalculate total and average salary per department for departments with more than 5 employees.",
        initialCode: "SELECT department_id, COUNT(*) as emp_count, SUM(salary) as total_payroll, AVG(salary) as avg_salary FROM employees GROUP BY department_id HAVING COUNT(*) > 5;",
        language: "sql",
        solutionCode: "SELECT department_id, COUNT(*) as emp_count, SUM(salary) as total_payroll, AVG(salary) as avg_salary FROM employees GROUP BY department_id HAVING COUNT(*) > 5;",
      },
    ],
  });

  const sqlM3 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 3: Multi-Table JOINs & Entity Relationships", description: "INNER, LEFT, RIGHT, FULL OUTER JOINs, and self-joins.", order: 3 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM3.id,
        title: "3.1 E-Commerce Customer Orders (LEFT JOIN)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 25,
        contentMd: "# Exercise: Customer Orders\nList all customers including those who have never placed an order.",
        initialCode: "SELECT c.customer_id, c.first_name, o.order_id, o.order_date FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;",
        language: "sql",
        solutionCode: "SELECT c.customer_id, c.first_name, o.order_id, o.order_date FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;",
      },
    ],
  });

  const sqlM4 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 4: Subqueries & Common Table Expressions (CTEs)", description: "Nested queries, correlated subqueries, and WITH clauses for clean modular SQL.", order: 4 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM4.id,
        title: "4.1 Identifying Above-Average Spenders (CTE)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 25,
        contentMd: "# Exercise: CTE Analysis\nWrite a CTE to find customers spending more than the global average order value.",
        initialCode: "WITH AvgOrder AS (SELECT AVG(total_amount) as global_avg FROM orders) SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT global_avg FROM AvgOrder);",
        language: "sql",
        solutionCode: "WITH AvgOrder AS (SELECT AVG(total_amount) as global_avg FROM orders) SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT global_avg FROM AvgOrder);",
      },
    ],
  });

  const sqlM5 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 5: Advanced Window Functions", description: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and running totals.", order: 5 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM5.id,
        title: "5.1 Monthly Growth & Previous Month Revenue (LAG)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 30,
        contentMd: "# Exercise: Month-over-Month Growth\nUse LAG() to calculate month-over-month revenue growth percentage.",
        initialCode: "SELECT month, revenue, LAG(revenue, 1) OVER (ORDER BY month) as prev_month_revenue FROM monthly_sales;",
        language: "sql",
        solutionCode: "SELECT month, revenue, LAG(revenue, 1) OVER (ORDER BY month) as prev_month_revenue FROM monthly_sales;",
      },
    ],
  });

  const sqlM6 = await prisma.module.create({
    data: { subjectId: "sql", title: "Module 6: Database Optimization & Indexing", description: "Execution plans (EXPLAIN), B-Tree indexes, and query performance tuning.", order: 6 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: sqlM6.id,
        title: "6.1 Index Optimization for Fast Lookups",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 20,
        contentMd: "# Query Performance & B-Tree Indexes\nLearn how database indexes turn O(N) table scans into O(log N) tree lookups.",
        initialCode: "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';",
        language: "sql",
      },
    ],
  });

  // ==========================================
  // 4. PYTHON TRACK MODULES & LESSONS (5 Modules based on Learning Python)
  // ==========================================
  console.log("Creating Python Track Curriculum (Learning Python Edition)...");

  const pyM1 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 1: Python Data Model, Core Types & Dynamic Typing",
      description: "Understand Python object references, memory management, numbers, strings, lists, dicts, tuples, and mutability.",
      order: 1,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pyM1.id,
        title: "1.1 Theory: Python Object References, Dynamic Typing & Mutability",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 12,
        contentMd: "# The Python Data Model & Dynamic Typing\n\nIn Python, **types live with objects, not variables**. Variables are simply named pointers referencing objects in heap memory.\n\n### 1. The Dynamic Typing Architecture\n- **Variables**: Stored in a system symbol table with links to heap objects.\n- **Objects**: Allocated memory chunks containing a type designator and a reference counter.\n- **Garbage Collection**: Automatically reclaims memory when an object's reference count drops to 0.\n\n### 2. Mutability vs. Immutability\n- **Immutable**: Numbers, Strings, Tuples, Frozensets. Any modification creates a fresh object.\n- **Mutable**: Lists, Dictionaries, Sets. Modified directly in memory without changing object ID.\n\n### 3. Shared References\n```python\na = [1, 2, 3]\nb = a       # Shared reference\nc = a[:]    # Shallow copy\n```",
        initialCode: "# Python Dynamic Typing Demonstration\na = [1, 2, 3]\nb = a\nb.append(4)\nprint('a:', a)  # Shows [1, 2, 3, 4]",
        language: "python",
      },
      {
        moduleId: pyM1.id,
        title: "1.2 Challenge: Filtering Even Squares (List Comprehensions)",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 15,
        contentMd: "# Exercise: List Comprehension Filtering\nWrite a function `filter_even_squares(numbers)` that accepts a list of integers, filters out odd numbers, and returns a list of squares of the even numbers using a concise Python list comprehension.",
        initialCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    # Implement single-line comprehension\n    pass",
        language: "python",
        solutionCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    return [x**2 for x in numbers if x % 2 == 0]",
      },
    ],
  });

  const pyM2 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 2: Statements, Control Flow & Iteration Protocols",
      description: "Master conditional truth tests, loop constructs (while/for with else), the Iteration Protocol, and comprehensions.",
      order: 2,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pyM2.id,
        title: "2.1 Theory: The Python Iteration Protocol & Comprehensions",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 15,
        contentMd: "# The Python Iteration Protocol\n\nAny iterable object in Python implements `__iter__()` and returns an iterator with `__next__()`.\n\n### 1. Loop `else` Clause\nIn Python, `for` and `while` loops can have an optional `else:` clause that executes **only if the loop completed without encountering a `break`**.\n\n### 2. Comprehensions\n- List: `[x for x in seq if cond]`\n- Dict: `{k: v for k, v in zip(keys, vals)}`\n- Generator: `(x for x in seq)`",
        initialCode: "# Testing the iteration protocol\nnumbers = [1, 2, 3]\nit = iter(numbers)\nprint(next(it))\nprint(next(it))",
        language: "python",
      },
      {
        moduleId: pyM2.id,
        title: "2.2 Challenge: Character Frequency Counter",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 20,
        contentMd: "# Exercise: Character Frequency Counter\nWrite a function `char_frequency(text)` that takes a string and returns a dictionary mapping characters to their frequency count.",
        initialCode: "def char_frequency(text: str) -> dict[str, int]:\n    # Return character counts\n    pass",
        language: "python",
        solutionCode: "def char_frequency(text: str) -> dict[str, int]:\n    counts = {}\n    for c in text:\n        counts[c] = counts.get(c, 0) + 1\n    return counts",
      },
    ],
  });

  const pyM3 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 3: Functions, Scopes (LEGB), Closures & Generators",
      description: "Deep dive into function definitions, argument passing modes (*args, **kwargs), the LEGB scope lookup rule, closures, and yield generators.",
      order: 3,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pyM3.id,
        title: "3.1 Theory: LEGB Scope Lookup Rule, Closures & Generators",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 18,
        contentMd: "# Scopes, Closures & Generators\n\n### 1. The LEGB Scope Lookup Rule\n1. **L (Local)**: Inside current function.\n2. **E (Enclosing)**: Static enclosing functions (nested scopes).\n3. **G (Global)**: Top-level module variables.\n4. **B (Built-in)**: Pre-defined Python names (`len`, `open`, `range`).\n\nUse `global` to modify module-level variables and `nonlocal` to modify enclosing scope variables.\n\n### 2. Generators & `yield`\nFunctions with `yield` pause their execution frame and yield values on demand, saving memory.",
        initialCode: "# Scope demonstration\nx = 'global'\ndef outer():\n    x = 'enclosing'\n    def inner():\n        return x\n    return inner()",
        language: "python",
      },
      {
        moduleId: pyM3.id,
        title: "3.2 Challenge: Fibonacci Generator with Yield",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 20,
        contentMd: "# Exercise: Fibonacci Generator\nWrite a generator function `fibonacci_gen(limit)` that yields Fibonacci numbers up to and including `limit`.",
        initialCode: "def fibonacci_gen(limit: int):\n    # Yield Fibonacci numbers <= limit\n    pass",
        language: "python",
        solutionCode: "def fibonacci_gen(limit: int):\n    a, b = 0, 1\n    while a <= limit:\n        yield a\n        a, b = b, a + b",
      },
    ],
  });

  const pyM4 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 4: Object-Oriented Programming & Operator Overloading",
      description: "Classes as object factories, encapsulation, inheritance hierarchies, MRO (Method Resolution Order), and dunder operator overloading methods.",
      order: 4,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pyM4.id,
        title: "4.1 Theory: OOP Architecture, Inheritance & Operator Overloading",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 20,
        contentMd: "# OOP & Dunder Operator Overloading\n\nIn Python, classes are first-class runtime objects.\n\n### Key Dunder Methods:\n- `__init__(self, ...)`: Instance initialization.\n- `__str__(self)`: Human-friendly string representation.\n- `__repr__(self)`: Code-faithful string representation.\n- `__add__(self, other)`: Overloads `+`.\n- `__sub__(self, other)`: Overloads `-`.\n- `__mul__(self, other)`: Overloads `*`.\n- `__eq__(self, other)`: Overloads `==`.\n- `__abs__(self)`: Overloads `abs()`.",
        initialCode: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f'Point({self.x}, {self.y})'",
        language: "python",
      },
      {
        moduleId: pyM4.id,
        title: "4.2 Challenge: 2D Vector with Operator Overloading",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 30,
        contentMd: "# Exercise: Vector2D Class\nCreate a `Vector2D` class that overloads `+`, `-`, `*` (scalar), `==`, `abs()`, and `__repr__`.",
        initialCode: "import math\n\nclass Vector2D:\n    def __init__(self, x: float, y: float):\n        pass\n    # Implement dunder operators",
        language: "python",
        solutionCode: "import math\n\nclass Vector2D:\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n    def __sub__(self, other):\n        return Vector2D(self.x - other.x, self.y - other.y)\n    def __mul__(self, scalar: float):\n        return Vector2D(self.x * scalar, self.y * scalar)\n    def __abs__(self):\n        return math.hypot(self.x, self.y)\n    def __eq__(self, other):\n        return isinstance(other, Vector2D) and self.x == other.x and self.y == other.y\n    def __repr__(self):\n        return f'Vector2D({self.x}, {self.y})'",
      },
    ],
  });

  const pyM5 = await prisma.module.create({
    data: {
      subjectId: "python",
      title: "Module 5: Advanced Python: Decorators, Context Managers & Exceptions",
      description: "Building robust production systems with custom exception hierarchies, context managers (with), and function/class decorators.",
      order: 5,
    },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pyM5.id,
        title: "5.1 Theory: Decorators, Context Managers & Exception Handling",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 20,
        contentMd: "# Decorators & Context Managers\n\n### 1. Decorator Pattern\nA decorator is a callable that wraps another function to augment its behavior using `@functools.wraps`.\n\n### 2. Context Managers (`with`)\nImplemented via `__enter__` and `__exit__` to guarantee resource cleanup and handle exceptions cleanly.",
        initialCode: "from functools import wraps\nimport time\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        res = func(*args, **kwargs)\n        print(f'{func.__name__} took {time.time()-start:.4f}s')\n        return res\n    return wrapper",
        language: "python",
      },
      {
        moduleId: pyM5.id,
        title: "5.2 Challenge: Custom Exception Suppressing Context Manager",
        type: LessonType.EXERCISE,
        order: 2,
        durationMinutes: 25,
        contentMd: "# Exercise: Context Manager\nImplement a context manager class `SuppressExceptions(*exception_types)` that swallows specified exception types within a `with` block while allowing unhandled exceptions to raise normally.",
        initialCode: "class SuppressExceptions:\n    def __init__(self, *exc_types):\n        pass\n    def __enter__(self):\n        pass\n    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:\n        pass",
        language: "python",
        solutionCode: "class SuppressExceptions:\n    def __init__(self, *exc_types):\n        self.exc_types = exc_types\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:\n        if exc_type is not None and issubclass(exc_type, self.exc_types):\n            return True\n        return False",
      },
    ],
  });

  // ==========================================
  // 5. POWER BI MODULES & LESSONS (3 Modules)
  // ==========================================
  console.log("Creating Power BI Track Curriculum...");

  const pbiM1 = await prisma.module.create({
    data: { subjectId: "powerbi", title: "Module 1: Power BI Desktop & Data Connections", description: "Connecting to SQL/Excel, Power Query transformations, and M language.", order: 1 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pbiM1.id,
        title: "1.1 Transforming Raw Data in Power Query",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 20,
        contentMd: "# Power Query Transformations\nUnpivot columns, split text, remove duplicates, and apply conditional columns.",
        initialCode: "// Power Query M snippet\nTable.SelectRows(Source, each ([Country] = \"USA\"))",
        language: "sql",
      },
    ],
  });

  const pbiM2 = await prisma.module.create({
    data: { subjectId: "powerbi", title: "Module 2: Data Modeling & Star Schema", description: "Fact tables, Dimension tables, 1-to-Many relationships, and active/inactive joins.", order: 2 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pbiM2.id,
        title: "2.1 Designing a Production Star Schema",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 25,
        contentMd: "# Star Schema Architecture\nDesign FactSales surrounded by DimCustomer, DimProduct, and DimDate.",
        initialCode: "-- Fact and Dimension Relationships",
        language: "sql",
      },
    ],
  });

  const pbiM3 = await prisma.module.create({
    data: { subjectId: "powerbi", title: "Module 3: Advanced DAX Measures", description: "CALCULATE, SUMX, FILTER, Time Intelligence (YTD, YoY), and Row-Level Security (RLS).", order: 3 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: pbiM3.id,
        title: "3.1 Writing DAX Measures (CALCULATE & Time Intelligence)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 30,
        contentMd: "# DAX Calculations\nWrite measures for Sales YTD and Year-over-Year Growth %.",
        initialCode: "Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Calendar'[Date])",
        language: "sql",
        solutionCode: "Sales YTD = TOTALYTD(SUM(Sales[Amount]), 'Calendar'[Date])",
      },
    ],
  });

  // ==========================================
  // 6. MACHINE LEARNING MODULES & LESSONS (5 Modules)
  // ==========================================
  console.log("Creating Machine Learning Track Curriculum...");

  const mlM1 = await prisma.module.create({
    data: { subjectId: "ml", title: "Module 1: Linear & Logistic Regression", description: "Cost functions, gradient descent, feature scaling, and binary classification.", order: 1 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: mlM1.id,
        title: "1.1 Training Logistic Regression for Customer Churn",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 30,
        contentMd: "# Logistic Regression\nFit LogisticRegression model and inspect feature coefficients.",
        initialCode: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\n# model.fit(X_train, y_train)",
        language: "python",
        solutionCode: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)",
      },
    ],
  });

  const mlM2 = await prisma.module.create({
    data: { subjectId: "ml", title: "Module 2: Tree-Based Models & Ensembles", description: "Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM).", order: 2 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: mlM2.id,
        title: "2.1 XGBoost Classifier & Feature Importance",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 35,
        contentMd: "# Gradient Boosting with XGBoost\nTrain an XGBClassifier and extract top feature importances.",
        initialCode: "from xgboost import XGBClassifier\n\nmodel = XGBClassifier(n_estimators=100, learning_rate=0.1)\n# model.fit(X_train, y_train)",
        language: "python",
        solutionCode: "from xgboost import XGBClassifier\n\nmodel = XGBClassifier(n_estimators=100, learning_rate=0.1)\nmodel.fit(X_train, y_train)",
      },
    ],
  });

  const mlM3 = await prisma.module.create({
    data: { subjectId: "ml", title: "Module 3: Model Evaluation Metrics", description: "Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC, and Cross-Validation.", order: 3 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: mlM3.id,
        title: "3.1 Evaluating Imbalanced Classifiers (F1 vs ROC-AUC)",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 25,
        contentMd: "# Evaluation Metrics\nCompute precision_score, recall_score, and roc_auc_score for fraud detection.",
        initialCode: "from sklearn.metrics import classification_report, roc_auc_score\n\n# print(classification_report(y_true, y_pred))",
        language: "python",
        solutionCode: "from sklearn.metrics import classification_report, roc_auc_score\n\ndef evaluate(y_true, y_pred, y_prob):\n    print(classification_report(y_true, y_pred))\n    return roc_auc_score(y_true, y_prob)",
      },
    ],
  });

  const mlM4 = await prisma.module.create({
    data: { subjectId: "ml", title: "Module 4: Unsupervised Learning & Clustering", description: "K-Means, Hierarchical Clustering, DBSCAN, and PCA for dimensionality reduction.", order: 4 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: mlM4.id,
        title: "4.1 Customer Segmentation with K-Means & Elbow Method",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 30,
        contentMd: "# K-Means Clustering\nDetermine optimal K using inertia elbow curve and fit KMeans clusterer.",
        initialCode: "from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=4, random_state=42)\n# clusters = kmeans.fit_predict(X)",
        language: "python",
        solutionCode: "from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=4, random_state=42)\nclusters = kmeans.fit_predict(X)",
      },
    ],
  });

  const mlM5 = await prisma.module.create({
    data: { subjectId: "ml", title: "Module 5: Hyperparameter Tuning & Pipelines", description: "GridSearchCV, RandomizedSearchCV, and Scikit-Learn Pipelines.", order: 5 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: mlM5.id,
        title: "5.1 Production ML Pipelines with StandardScaler & Ridge",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 35,
        contentMd: "# Scikit-Learn Pipeline\nCombine Imputer, Scaler, and Estimator into a single Pipeline object.",
        initialCode: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge\n\npipeline = Pipeline([('scaler', StandardScaler()), ('model', Ridge())])",
        language: "python",
        solutionCode: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge\n\npipeline = Pipeline([('scaler', StandardScaler()), ('model', Ridge())])",
      },
    ],
  });

  // ==========================================
  // 7. ARTIFICIAL INTELLIGENCE & DEEP LEARNING (5 Modules)
  // ==========================================
  console.log("Creating AI Track Curriculum...");

  const aiM1 = await prisma.module.create({
    data: { subjectId: "ai", title: "Module 1: Deep Learning Foundations & PyTorch", description: "Tensors, autograd, forward pass, loss functions, and backpropagation.", order: 1 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: aiM1.id,
        title: "1.1 Writing Neural Networks from Scratch in PyTorch",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 35,
        contentMd: "# PyTorch Neural Networks\nDefine a PyTorch nn.Module with Linear layers and ReLU activations.",
        initialCode: "import torch\nimport torch.nn as nn\n\nclass MultiLayerPerceptron(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(128, 10)\n    def forward(self, x):\n        return self.fc2(self.relu(self.fc1(x)))",
        language: "python",
        solutionCode: "import torch\nimport torch.nn as nn\n\nclass MultiLayerPerceptron(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(128, 10)\n    def forward(self, x):\n        return self.fc2(self.relu(self.fc1(x)))",
      },
    ],
  });

  const aiM2 = await prisma.module.create({
    data: { subjectId: "ai", title: "Module 2: Computer Vision & Convolutional Neural Networks (CNNs)", description: "Convolutions, pooling layers, ResNet architectures, and transfer learning.", order: 2 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: aiM2.id,
        title: "2.1 Image Classification with Transfer Learning (ResNet50)",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 30,
        contentMd: "# Transfer Learning with torchvision\nFreeze backbone weights and replace final classification head.",
        initialCode: "import torchvision.models as models\n\nresnet = models.resnet50(pretrained=True)",
        language: "python",
      },
    ],
  });

  const aiM3 = await prisma.module.create({
    data: { subjectId: "ai", title: "Module 3: Natural Language Processing & Recurrent Nets", description: "Tokenization, Word Embeddings (Word2Vec), LSTMs, and GRUs.", order: 3 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: aiM3.id,
        title: "3.1 Sentiment Analysis with Bidirectional LSTM",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 35,
        contentMd: "# Recurrent Neural Networks\nBuild a Bidirectional LSTM for text sentiment classification.",
        initialCode: "import torch.nn as nn\n\nclass SentimentLSTM(nn.Module):\n    def __init__(self, vocab_size, embed_dim, hidden_dim):\n        super().__init__()\n        self.embed = nn.Embedding(vocab_size, embed_dim)\n        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)\n        self.fc = nn.Linear(hidden_dim * 2, 1)",
        language: "python",
        solutionCode: "import torch.nn as nn\n\nclass SentimentLSTM(nn.Module):\n    def __init__(self, vocab_size, embed_dim, hidden_dim):\n        super().__init__()\n        self.embed = nn.Embedding(vocab_size, embed_dim)\n        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)\n        self.fc = nn.Linear(hidden_dim * 2, 1)",
      },
    ],
  });

  const aiM4 = await prisma.module.create({
    data: { subjectId: "ai", title: "Module 4: Transformer Architecture & Attention Mechanisms", description: "Self-attention mechanism, Multi-Head Attention, Positional Encoding, and BERT/GPT.", order: 4 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: aiM4.id,
        title: "4.1 Implementing Scaled Dot-Product Attention",
        type: LessonType.EXERCISE,
        order: 1,
        durationMinutes: 40,
        contentMd: "# Scaled Dot-Product Attention\nCompute Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V.",
        initialCode: "import torch\nimport math\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n    weights = torch.softmax(scores, dim=-1)\n    return torch.matmul(weights, V)",
        language: "python",
        solutionCode: "import torch\nimport math\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n    weights = torch.softmax(scores, dim=-1)\n    return torch.matmul(weights, V)",
      },
    ],
  });

  const aiM5 = await prisma.module.create({
    data: { subjectId: "ai", title: "Module 5: Generative AI, Fine-Tuning & LLMs", description: "PEFT/LoRA fine-tuning, HuggingFace Transformers, Quantization (BitsAndBytes), and RAG.", order: 5 },
  });
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: aiM5.id,
        title: "5.1 LoRA Fine-Tuning Large Language Models with HuggingFace",
        type: LessonType.THEORY,
        order: 1,
        durationMinutes: 45,
        contentMd: "# Parameter-Efficient Fine-Tuning (LoRA)\nFine-tune open-weight LLMs (Llama 3, Mistral) using PEFT LoRA adapters.",
        initialCode: "from peft import LoraConfig, get_peft_model\n\nlora_config = LoraConfig(r=16, lora_alpha=32, target_modules=['q_proj', 'v_proj'])",
        language: "python",
      },
    ],
  });

  // ==========================================
  // 8. ACHIEVEMENTS
  // ==========================================
  console.log("Creating Achievements...");
  await prisma.achievement.createMany({
    data: [
      { id: "FIRST_QUERY", title: "First Query", description: "Successfully executed your first SQL statement.", icon: "⚡", xpReward: 50 },
      { id: "STREAK_7_DAYS", title: "7-Day Streak", description: "Learned continuously for 7 days in a row.", icon: "🔥", xpReward: 200 },
      { id: "SQL_MASTER", title: "SQL Explorer", description: "Completed all modules in the SQL Track.", icon: "🗄️", xpReward: 500 },
      { id: "PYTHON_NOVICE", title: "Python Coder", description: "Wrote and executed 10 Python exercises.", icon: "🐍", xpReward: 150 },
      { id: "ML_ENGINEER", title: "ML Practitioner", description: "Trained your first Machine Learning model.", icon: "🤖", xpReward: 300 },
      { id: "ATTENTION_HERO", title: "Attention Is All You Need", description: "Implemented scaled dot-product attention in PyTorch.", icon: "🧠", xpReward: 600 },
    ],
  });

  console.log("🎉 Production-scale Database Seeding Complete! Total 25+ modules across 5 subjects.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
