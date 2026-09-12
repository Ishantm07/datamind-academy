import { ModuleTheory } from "./types";

export interface SubjectCourseModule {
  id: string; // "m1", "m2", "m3", "m4"
  number: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  readingMinutes: number;
  challengeCount: number; // 10
  theoryMarkdown: string;
  keyTakeaways: string[];
}

export const COURSE_MODULES: Record<string, SubjectCourseModule[]> = {
  // =========================================================================
  // SQL TRACK (Modules 1 - 4)
  // =========================================================================
  sql: [
    {
      id: "m1",
      number: 1,
      title: "Relational Architecture & DQL Fundamentals",
      subtitle: "Master RDBMS architecture, DQL querying, SELECT column expressions, filtering, and ordering.",
      description: "Understand the core relational database model, tables, primary keys, and writing production SELECT queries with WHERE and ORDER BY.",
      duration: "15 min read",
      readingMinutes: 15,
      challengeCount: 10,
      keyTakeaways: [
        "RDBMS stores data in 2D relations (tables) with typed columns and unique row identifiers.",
        "SQL queries execute in logical order: FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT.",
        "WHERE filters rows before any aggregation, supporting IN, BETWEEN, LIKE, and NULL checks.",
        "ORDER BY sorts output ascending (ASC, default) or descending (DESC) and supports multi-column tie-breakers.",
      ],
      theoryMarkdown: `# Module 1: Relational Architecture & DQL Fundamentals

## 1. Relational Database Concepts
A **Relational Database Management System (RDBMS)** organizes data into structured two-dimensional tables (relations). Each table consists of:
- **Columns (Attributes)**: Named fields with specific data types (e.g., \`INT\`, \`VARCHAR\`, \`TIMESTAMP\`).
- **Rows (Tuples / Records)**: Individual entity instances.
- **Primary Key (PK)**: A unique, non-null column (or set of columns) that guarantees row identity.
- **Foreign Key (FK)**: A column that establishes a referential integrity constraint pointing to a primary key in another table.

---

## 2. SQL Language Classification
SQL operations are categorized into distinct functional subsets:
| Sublanguage | Meaning | Common Statements |
|---|---|---|
| **DQL** | Data Query Language | \`SELECT\` |
| **DDL** | Data Definition Language | \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\` |
| **DML** | Data Manipulation Language | \`INSERT\`, \`UPDATE\`, \`DELETE\` |
| **DCL** | Data Control Language | \`GRANT\`, \`REVOKE\` |
| **TCL** | Transaction Control Language | \`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\` |

---

## 3. Logical Query Processing Order
While you write queries starting with \`SELECT\`, database query optimizers execute clauses in a strict logical order:
\`\`\`text
1. FROM & JOIN     -> Locate source tables and join cartesian products
2. WHERE           -> Filter individual rows matching predicates
3. GROUP BY        -> Bucket matching rows into groups
4. HAVING          -> Filter aggregated groups
5. SELECT          -> Compute column projections, expressions, and aliases
6. DISTINCT        -> Eliminate duplicate output tuples
7. ORDER BY        -> Sort final projected rows
8. LIMIT / OFFSET  -> Constrain returned row count
\`\`\`

> **Why this matters**: You cannot use a column alias defined in \`SELECT\` inside your \`WHERE\` clause because \`WHERE\` evaluates **before** \`SELECT\`!

---

## 4. Column Projections & Aliases
You retrieve specific columns using comma-separated lists, and rename columns for readability using the \`AS\` keyword:
\`\`\`sql
SELECT 
    first_name, 
    last_name, 
    salary * 12 AS annual_compensation
FROM employees;
\`\`\`

---

## 5. Row Filtering with WHERE
The \`WHERE\` clause applies boolean conditions to evaluate each candidate row:
- **Comparison**: \`=\`, \`!=\`, \`<>\`, \`<\`, \`<=\`, \`>\`, \`>=\`
- **Membership**: \`column IN ('Engineering', 'Product', 'Design')\`
- **Range**: \`salary BETWEEN 50000 AND 100000\` (inclusive)
- **Pattern Matching**: \`email LIKE '%@datamind.academy'\`
  - \`%\`: Matches zero or more characters.
  - \`_\`: Matches exactly one character.
- **NULL Handling**: Must use \`IS NULL\` or \`IS NOT NULL\` because \`column = NULL\` yields \`UNKNOWN\` (three-valued logic).

---

## 6. Sorting & Pagination
Control output order and limit payload sizes:
\`\`\`sql
SELECT id, name, department, hire_date
FROM employees
WHERE is_active = TRUE
ORDER BY department ASC, hire_date DESC
LIMIT 10 OFFSET 20;
\`\`\`
`,
    },
    {
      id: "m2",
      number: 2,
      title: "Aggregations, GROUP BY & HAVING",
      subtitle: "Compute multi-row analytical metrics, bucket records by dimensions, and filter aggregated results.",
      description: "Learn how to summarize datasets using COUNT, SUM, AVG, MIN, MAX, and differentiate row-level WHERE filtering from aggregate HAVING clauses.",
      duration: "18 min read",
      readingMinutes: 18,
      challengeCount: 10,
      keyTakeaways: [
        "Aggregate functions collapse multiple input rows into a single scalar summary value.",
        "COUNT(*) counts all rows including NULLs; COUNT(col) counts only non-null values.",
        "GROUP BY partitions data into buckets based on distinct column combinations.",
        "WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
      ],
      theoryMarkdown: `# Module 2: Aggregations, GROUP BY & HAVING

## 1. Aggregate Function Fundamentals
Aggregate functions perform mathematical operations over a set of input values and return a single summary result:
- \`COUNT(*)\`: Counts all rows, including rows containing NULLs.
- \`COUNT(column)\`: Counts non-null entries in that specific column.
- \`COUNT(DISTINCT column)\`: Counts unique non-null values.
- \`SUM(column)\`: Computes numeric sum of non-null values.
- \`AVG(column)\`: Computes arithmetic mean (ignores NULLs in divisor).
- \`MIN(column)\` / \`MAX(column)\`: Computes lowest / highest value (works on numbers, strings, and dates).

\`\`\`sql
SELECT 
    COUNT(*) AS total_employees,
    AVG(salary) AS average_salary,
    MIN(hire_date) AS earliest_hire,
    MAX(salary) AS peak_salary
FROM employees;
\`\`\`

---

## 2. Partitioning Data with GROUP BY
When combined with \`GROUP BY\`, aggregate functions compute values **per group** instead of over the whole table:
\`\`\`sql
SELECT 
    department_id,
    job_title,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 2) AS avg_payroll
FROM employees
GROUP BY department_id, job_title;
\`\`\`

> **Core Rule**: Every non-aggregated column in the \`SELECT\` list **must** appear in the \`GROUP BY\` clause.

---

## 3. The Crucial Difference: WHERE vs HAVING
| Feature | WHERE Clause | HAVING Clause |
|---|---|---|
| **Timing** | Evaluates **before** rows are grouped | Evaluates **after** groups are formed |
| **Operates On** | Individual table rows | Summary group buckets |
| **Aggregates Allowed?** | ❌ No (\`WHERE AVG(salary) > 5000\` is an error) | ✅ Yes (\`HAVING AVG(salary) > 5000\`) |

\`\`\`sql
-- Find departments with > 5 senior engineers where average salary exceeds $100k
SELECT 
    department_id,
    COUNT(*) AS senior_count,
    AVG(salary) AS avg_salary
FROM employees
WHERE experience_years >= 5         -- 1. Filters candidate rows first
GROUP BY department_id              -- 2. Groups remaining rows
HAVING AVG(salary) > 100000         -- 3. Filters aggregate metrics
   AND COUNT(*) >= 5;
\`\`\`
`,
    },
    {
      id: "m3",
      number: 3,
      title: "Multi-Table JOINs & Entity Relationships",
      subtitle: "Connect relational schemas using INNER, LEFT, RIGHT, FULL OUTER, and Self JOINs.",
      description: "Master multi-table relational joins, foreign key mapping, join conditions, and handling missing or null-matched records.",
      duration: "20 min read",
      readingMinutes: 20,
      challengeCount: 10,
      keyTakeaways: [
        "JOINs combine columns from two or more tables based on a related common key.",
        "INNER JOIN returns only rows with matches in both tables.",
        "LEFT JOIN preserves all rows from the left table, populating right columns with NULL when no match exists.",
        "Self-joins connect a table to itself, essential for hierarchical data (e.g. employee-manager trees).",
      ],
      theoryMarkdown: `# Module 3: Multi-Table JOINs & Entity Relationships

## 1. Why Normalization Requires JOINs
Relational databases follow **Normalization** (1NF, 2NF, 3NF) to eliminate redundancy and anomaly updates. Instead of storing customer addresses in every order row, customers and orders reside in separate tables linked by \`customer_id\`. **JOINs** dynamically reconstruct these relationships.

---

## 2. Visualizing Join Types
\`\`\`text
1. INNER JOIN:
   [ Table A (o) Table B ] -> Only overlapping intersection

2. LEFT JOIN:
   [ Table A (o   Table B ] -> All of Table A, plus matched Table B (NULL if unmatched)

3. RIGHT JOIN:
   [ Table A   o) Table B ] -> All of Table B, plus matched Table A

4. FULL OUTER JOIN:
   [ Table A ( o ) Table B ] -> Union of both tables with NULLs for missing sides
\`\`\`

---

## 3. INNER JOIN Syntax & Best Practice
Always use explicit ANSI SQL-92 join syntax (\`JOIN ... ON\`) rather than legacy comma joins (\`FROM a, b WHERE ...\`):
\`\`\`sql
SELECT 
    o.order_id,
    c.customer_name,
    c.email,
    o.order_total,
    o.created_at
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'COMPLETED';
\`\`\`

---

## 4. LEFT OUTER JOIN: Finding Missing Data
A classic analytical pattern is finding entities with **zero** related activities by joining and checking for \`IS NULL\`:
\`\`\`sql
-- Find customers who registered but have never placed an order
SELECT 
    c.id,
    c.customer_name,
    c.registered_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL;
\`\`\`

---

## 5. Self JOINs for Hierarchical Graphs
When records within the same table reference other records in that table (such as an \`employees\` table with a \`manager_id\` column pointing back to \`employee_id\`):
\`\`\`sql
SELECT 
    e.name AS employee_name,
    e.job_title,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`
`,
    },
    {
      id: "m4",
      number: 4,
      title: "Window Functions & Advanced Analytics",
      subtitle: "Compute running totals, rankings, and lead/lag intervals over partitioned windows.",
      description: "Deep dive into analytic SQL: OVER(), PARTITION BY, ORDER BY, ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and CTEs.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "Window functions compute values across rows related to the current row without collapsing rows like GROUP BY.",
        "ROW_NUMBER assigns distinct sequential integers; RANK leaves gaps on ties; DENSE_RANK assigns consecutive numbers on ties.",
        "LAG and LEAD look backward and forward in time across partitions to compute period-over-period growth.",
        "Common Table Expressions (WITH cte AS (...)) modularize complex queries and replace clumsy subqueries.",
      ],
      theoryMarkdown: `# Module 4: Window Functions & Advanced Analytics

## 1. What Are Window Functions?
Unlike \`GROUP BY\` which reduces multiple rows into a single summary row, a **Window Function** computes aggregate or ranking calculations across a set of rows while **retaining individual row identities**:

\`\`\`sql
SELECT 
    name,
    department,
    salary,
    AVG(salary) OVER(PARTITION BY department) AS dept_avg_salary
FROM employees;
\`\`\`

Every employee row remains visible, alongside their department's calculated average!

---

## 2. Anatomy of the OVER Clause
\`\`\`sql
FUNCTION() OVER (
    PARTITION BY partition_columns    -- Defines group boundaries (like GROUP BY)
    ORDER BY sort_columns             -- Sets row evaluation sequence
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING -- Defines sliding window frame
)
\`\`\`

---

## 3. Ranking Functions Comparison
Suppose salaries are: [100k, 100k, 90k, 80k]
| Function | Output Sequence | Behavior on Ties |
|---|---|---|
| \`ROW_NUMBER()\` | 1, 2, 3, 4 | Never ties; arbitrary tie-breaker |
| \`RANK()\` | 1, 1, 3, 4 | Ties share rank, next rank skips (gaps exist) |
| \`DENSE_RANK()\` | 1, 1, 2, 3 | Ties share rank, next rank is consecutive (no gaps) |

\`\`\`sql
-- Find the Top 3 earners per department
WITH RankedSalaries AS (
    SELECT 
        id,
        name,
        department,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_pos
    FROM employees
)
SELECT * FROM RankedSalaries WHERE rank_pos <= 3;
\`\`\`

---

## 4. Value Offsets: LAG & LEAD
Essential for time-series and period-over-period growth calculations:
- \`LAG(col, offset, default)\`: Fetches value from \`offset\` rows prior.
- \`LEAD(col, offset, default)\`: Fetches value from \`offset\` rows ahead.

\`\`\`sql
-- Compute Month-over-Month (MoM) revenue growth
SELECT 
    report_month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY report_month) AS prev_month_revenue,
    ROUND(
        (revenue - LAG(revenue, 1) OVER (ORDER BY report_month)) * 100.0 / 
        LAG(revenue, 1) OVER (ORDER BY report_month), 
        2
    ) AS mom_growth_pct
FROM monthly_sales;
\`\`\`
`,
    },
  ],

  // =========================================================================
  // PYTHON TRACK (Modules 1 - 4)
  // =========================================================================
  python: [
    {
      id: "m1",
      number: 1,
      title: "Python Data Model & Memory Architecture",
      subtitle: "Object references, dynamic typing, mutability vs immutability, collections, and copy semantics.",
      description: "Learn how CPython allocates memory, garbage collection reference counts, variable binding, and fundamental data structures.",
      duration: "15 min read",
      readingMinutes: 15,
      challengeCount: 10,
      keyTakeaways: [
        "Variables in Python are named object references; types belong to objects, not variable names.",
        "Immutable types (int, float, str, tuple, frozenset) cannot be modified in-place.",
        "Mutable types (list, dict, set, bytearray) can be changed without altering object identity.",
        "Assignment (b = a) shares references; shallow copies duplicate containers; deep copies duplicate nested trees.",
      ],
      theoryMarkdown: `# Module 1: Python Data Model & Memory Architecture

## 1. Everything is an Object
In Python, variables do not hold raw data in static memory addresses. Instead:
- **Objects** are allocated on the heap, each possessing:
  1. A **type header** indicating the object type.
  2. A **reference counter** tracking how many variables point to this memory.
  3. The **underlying value** payload.
- **Variables** are simply names in a namespace dictionary pointing to objects.

\`\`\`python
a = [1, 2, 3]
b = a          # Both names point to the EXACT same memory address
b.append(4)
print(a)       # Output: [1, 2, 3, 4] -> a is mutated!
print(id(a) == id(b)) # True
\`\`\`

---

## 2. Mutability vs Immutability
| Category | Types | Characteristics |
|---|---|---|
| **Immutable** | \`int\`, \`float\`, \`str\`, \`tuple\`, \`frozenset\`, \`bytes\` | Values cannot change in-place. Operations return new objects. Safe as dictionary keys. |
| **Mutable** | \`list\`, \`dict\`, \`set\`, \`bytearray\`, custom classes | In-place modifications allowed. Not hashable (cannot be dict keys). |

---

## 3. Copy Semantics
\`\`\`python
import copy

original = [[1, 2], [3, 4]]

# 1. Reference assignment
ref = original

# 2. Shallow copy (new outer list, same inner lists)
shallow = list(original) # or original.copy() or original[:]

# 3. Deep copy (recursively creates fresh objects)
deep = copy.deepcopy(original)

original[0].append(99)
print(shallow[0])  # [1, 2, 99] (affected!)
print(deep[0])     # [1, 2] (isolated and safe!)
\`\`\`
`,
    },
    {
      id: "m2",
      number: 2,
      title: "Control Flow & The Iteration Protocol",
      subtitle: "Iterators, generators, yield semantics, list/dict/set comprehensions, and loop patterns.",
      description: "Master Python's iteration protocol, building custom iterators, generators that stream data with constant memory, and clean comprehensions.",
      duration: "18 min read",
      readingMinutes: 18,
      challengeCount: 10,
      keyTakeaways: [
        "Iterables implement __iter__(); iterators implement __next__() and raise StopIteration when exhausted.",
        "Generators yield values on-demand, executing lazily with O(1) memory footprint.",
        "List, dict, and set comprehensions provide declarative, optimized C-speed looping.",
        "for...else runs the else block only if the loop completes without encountering a break statement.",
      ],
      theoryMarkdown: `# Module 2: Control Flow & The Iteration Protocol

## 1. The Iteration Protocol
When Python executes \`for item in collection:\`, under the hood it performs:
\`\`\`python
iterator = iter(collection)    # Calls collection.__iter__()
while True:
    try:
        item = next(iterator)  # Calls iterator.__next__()
        # Loop body executes here
    except StopIteration:
        break                  # Normal completion
\`\`\`

---

## 2. Generators & The \`yield\` Statement
A **Generator function** produces a sequence of values lazily over time rather than holding an entire million-record list in RAM:
\`\`\`python
def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a       # Pauses execution and yields control to caller
        a, b = b, a + b

# Uses O(1) memory regardless of limit size!
for num in fibonacci(1000000):
    if num > 100: break
    print(num, end=" ")
\`\`\`

---

## 3. High-Performance Comprehensions
Comprehensions are faster than manual \`.append()\` loops because the bytecode is optimized in C:
\`\`\`python
# List comprehension: [expression for item in iterable if condition]
even_squares = [x**2 for x in range(20) if x % 2 == 0]

# Dict comprehension: {key_expr: val_expr for item in iterable}
user_lookup = {user["id"]: user["name"] for user in users_data}

# Set comprehension: {expr for item in iterable}
unique_domains = {email.split("@")[1] for email in email_list}
\`\`\`
`,
    },
    {
      id: "m3",
      number: 3,
      title: "Functions, Scopes (LEGB) & Closures",
      subtitle: "First-class functions, *args/**kwargs, LEGB scope lookup, closures, and custom decorators.",
      description: "Deep dive into function objects, positional and keyword parameter unpacking, closures, and metaprogramming with decorators.",
      duration: "20 min read",
      readingMinutes: 20,
      challengeCount: 10,
      keyTakeaways: [
        "Functions in Python are first-class citizens: they can be passed as args, returned, and stored in collections.",
        "Variable lookup follows the LEGB rule: Local ➔ Enclosing ➔ Global ➔ Built-in.",
        "Closures capture variables from enclosing scopes even after the outer function has finished executing.",
        "Decorators wrap functions to extend behavior without modifying source code.",
      ],
      theoryMarkdown: `# Module 3: Functions, Scopes (LEGB) & Closures

## 1. The LEGB Scope Hierarchy
When Python resolves a variable name, it checks four scopes in order:
1. **L (Local)**: Defined inside the current function (\`def\` or \`lambda\`).
2. **E (Enclosing)**: Defined in outer nested enclosing functions.
3. **G (Global)**: Module-level variables defined at the top of the file.
4. **B (Built-in)**: Built-in Python names (\`len\`, \`range\`, \`Exception\`).

---

## 2. Closures: Encapsulating State
A **Closure** is an inner function that retains access to variables from its parent enclosing scope even after the parent function has returned:
\`\`\`python
def make_multiplier(factor: float):
    def multiplier(number: float) -> float:
        return number * factor # 'factor' is enclosed from parent scope!
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5)) # 10
print(triple(5)) # 15
\`\`\`

---

## 3. Production Decorator Architecture
Decorators provide clean separation of concerns for logging, timing, validation, and caching:
\`\`\`python
import functools
import time

def performance_timer(func):
    @functools.wraps(func) # Preserves function name, docstrings, and signature
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[{func.__name__}] Executed in {elapsed:.6f}s")
        return result
    return wrapper

@performance_timer
def fetch_database_records(limit=1000):
    time.sleep(0.05)
    return [i for i in range(limit)]
\`\`\`
`,
    },
    {
      id: "m4",
      number: 4,
      title: "Object-Oriented Programming & Special Methods",
      subtitle: "Classes as object factories, MRO inheritance, encapsulation, and dunder operator overloading.",
      description: "Master Python OOP architecture: classes, instance namespaces, Method Resolution Order (MRO), properties, and dunder methods.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "Classes serve as object factories and shared namespace blueprints.",
        "Attribute resolution searches instance dictionary (__dict__) first, then class, then superclasses via C3 MRO.",
        "Dunder methods (__str__, __repr__, __len__, __add__) hook into built-in operators and protocols.",
        "@property provides Pythonic getters and setters with validation.",
      ],
      theoryMarkdown: `# Module 4: Object-Oriented Programming & Special Methods

## 1. Class Architecture & Namespaces
In Python, a class is itself a runtime object. When you instantiate a class, a new instance is created with its own \`__dict__\` namespace:
\`\`\`python
class BankAccount:
    interest_rate = 0.05 # Class variable (shared across all instances)

    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner     # Instance variable (private to this instance)
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
\`\`\`

---

## 2. Essential Dunder (Magic) Methods
By implementing special double-underscore methods, your classes integrate seamlessly with Python's syntax:
| Method | Triggered by | Description |
|---|---|---|
| \`__init__(self, ...)\` | \`ClassName(...)\` | Object initialization constructor |
| \`__str__(self)\` | \`str(x)\`, \`print(x)\` | Human-readable user display string |
| \`__repr__(self)\` | \`repr(x)\`, REPL | Unambiguous developer string |
| \`__len__(self)\` | \`len(x)\` | Returns integer container length |
| \`__getitem__(self, key)\` | \`x[key]\`, slicing | Index access and iteration |
| \`__add__(self, other)\` | \`x + y\` | Arithmetic addition operator |
| \`__eq__(self, other)\` | \`x == y\` | Structural equality comparison |

\`\`\`python
class Point2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __add__(self, other: 'Point2D') -> 'Point2D':
        return Point2D(self.x + other.x, self.y + other.y)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Point2D):
            return self.x == other.x and self.y == other.y
        return False

    def __repr__(self) -> str:
        return f"Point2D({self.x}, {self.y})"
\`\`\`
`,
    },
  ],

  // =========================================================================
  // POWER BI TRACK (Modules 1 - 4)
  // =========================================================================
  powerbi: [
    {
      id: "m1",
      number: 1,
      title: "Power BI Desktop & Power Query ETL",
      subtitle: "Data ingestion, M transformations, schema shaping, and automated data pipelines.",
      description: "Learn how to extract, transform, and load enterprise data with Power Query, M language formulas, and data type hygiene.",
      duration: "15 min read",
      readingMinutes: 15,
      challengeCount: 10,
      keyTakeaways: [
        "Power Query applies non-destructive transformation steps compiled in the M language.",
        "Unpivoting wide survey/financial columns creates normalized tabular structures essential for DAX.",
        "Merge queries perform relational joins; Append queries concatenate rows from matching schemas.",
      ],
      theoryMarkdown: `# Module 1: Power BI Desktop & Power Query ETL

## 1. The Power BI Architecture
Power BI is an end-to-end business intelligence engine composed of:
1. **Power Query Engine (M Language)**: Connects to 100+ sources, cleans, transforms, and stages data.
2. **VertiPaq Engine (xVelocity in-memory database)**: Compresses data columnar-wise for blazing performance.
3. **DAX Formula Engine**: Calculates metrics, KPIs, and dynamic aggregations at query time.
4. **Visualization Layer**: Interactive cross-filtering report visuals and dashboards.
`,
    },
    {
      id: "m2",
      number: 2,
      title: "Data Modeling & Star Schema Architecture",
      subtitle: "Fact vs Dimension tables, relationship cardinalities, filter direction, and surrogate keys.",
      description: "Design production-grade tabular models, star schemas, relationship management, and eliminating bidirectional filter pitfalls.",
      duration: "18 min read",
      readingMinutes: 18,
      challengeCount: 10,
      keyTakeaways: [
        "Star Schema (Fact surrounded by Dimensions) is the gold standard for Power BI performance.",
        "Fact tables contain numeric metrics; Dimension tables contain descriptive attributes.",
        "Relationships should almost always be 1-to-Many with single-directional filter propagation.",
      ],
      theoryMarkdown: `# Module 2: Data Modeling & Star Schema Architecture

## 1. Fact Tables vs Dimension Tables
- **Fact Tables**: Large tables holding numeric measurements and foreign keys (e.g. Sales, Pageviews, Orders).
- **Dimension Tables**: Filter lookup tables providing context (e.g. Dim_Customer, Dim_Date, Dim_Product).
`,
    },
    {
      id: "m3",
      number: 3,
      title: "DAX Formulations & Evaluation Context",
      subtitle: "Calculated columns vs Measures, Row Context, Filter Context, and the CALCULATE function.",
      description: "Master DAX (Data Analysis Expressions), understand row context vs filter context, and leverage CALCULATE to override filter contexts.",
      duration: "20 min read",
      readingMinutes: 20,
      challengeCount: 10,
      keyTakeaways: [
        "Calculated columns compute at data refresh and consume RAM; Measures compute dynamically at visual render time.",
        "Filter context represents all active slicer, row, and column filters applied to the visual.",
        "CALCULATE is the single most powerful DAX function: it modifies and overrides active filter context.",
      ],
      theoryMarkdown: `# Module 3: DAX Formulations & Evaluation Context

## 1. Measures vs Calculated Columns
Always prefer **Measures** over Calculated Columns for aggregations to keep model size minimal and performance high.
\`\`\`dax
Total Revenue = SUM(Sales[OrderAmount])
High Margin Sales = CALCULATE([Total Revenue], Products[Margin] > 0.40)
\`\`\`
`,
    },
    {
      id: "m4",
      number: 4,
      title: "Time Intelligence, KPIs & Enterprise BI",
      subtitle: "Date tables, YTD/YoY growth, moving averages, Row-Level Security (RLS), and report storytelling.",
      description: "Build robust date dimensions, calculate cumulative and comparative KPIs (YTD, QTD, MoM), and configure role-based security.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "A contiguous Date Dimension marked as a Date Table is required for all time intelligence calculations.",
        "TOTALYTD, SAMEPERIODLASTYEAR, and DATEADD compute cumulative and period-over-period growth.",
        "Row-Level Security (RLS) restricts data access per user email using DAX filters (USERPRINCIPALNAME).",
      ],
      theoryMarkdown: `# Module 4: Time Intelligence, KPIs & Enterprise BI

## 1. Time Intelligence Formulations
\`\`\`dax
Revenue YTD = TOTALYTD([Total Revenue], 'Dim_Date'[Date])
Revenue Previous Year = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Dim_Date'[Date]))
YoY Growth % = DIVIDE([Total Revenue] - [Revenue Previous Year], [Revenue Previous Year])
\`\`\`
`,
    },
  ],

  // =========================================================================
  // MACHINE LEARNING TRACK (Modules 1 - 4)
  // =========================================================================
  ml: [
    {
      id: "m1",
      number: 1,
      title: "Supervised Learning & Regression Algorithms",
      subtitle: "Cost functions, gradient descent, feature scaling, Polynomial Regression, Ridge, and Lasso.",
      description: "Understand the mathematical foundations of machine learning, training linear regressors, Mean Squared Error (MSE), and regularization.",
      duration: "18 min read",
      readingMinutes: 18,
      challengeCount: 10,
      keyTakeaways: [
        "Supervised learning trains models on labeled feature-target pairs (X, y).",
        "Gradient Descent iteratively adjusts weights to minimize the loss function.",
        "Feature scaling (StandardScaler, MinMaxScaler) prevents features with large magnitudes from dominating.",
        "L1 Regularization (Lasso) produces sparse features; L2 Regularization (Ridge) shrinks weights.",
      ],
      theoryMarkdown: `# Module 1: Supervised Learning & Regression Algorithms

## 1. The Machine Learning Paradigm
Traditional programming writes explicit rules to generate outputs. Machine Learning uses historical input-output pairs to **learn the rules automatically**:
\`\`\`text
Data + Answers -> Machine Learning -> Rules / Model
\`\`\`
`,
    },
    {
      id: "m2",
      number: 2,
      title: "Classification, Logistic Regression & Trees",
      subtitle: "Binary & multi-class classification, Sigmoid function, Decision Trees, and splitting criteria.",
      description: "Learn how classification algorithms partition decision boundaries, entropy vs Gini impurity, and interpreting decision tree splits.",
      duration: "20 min read",
      readingMinutes: 20,
      challengeCount: 10,
      keyTakeaways: [
        "Logistic regression applies the Sigmoid function to output a calibrated probability between 0 and 1.",
        "Decision trees recursively partition feature space to minimize Gini Impurity or Information Gain.",
        "Precision measures true positive accuracy; Recall measures capture rate of actual positives; F1 balances both.",
      ],
      theoryMarkdown: `# Module 2: Classification, Logistic Regression & Trees

## 1. The Sigmoid Logistic Function
\`\`\`python
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression()
clf.fit(X_train, y_train)
probabilities = clf.predict_proba(X_test)
\`\`\`
`,
    },
    {
      id: "m3",
      number: 3,
      title: "Ensemble Learning: Random Forest & Boosting",
      subtitle: "Bagging vs Boosting, Random Forests, Out-of-Bag error, AdaBoost, Gradient Boosting, and XGBoost.",
      description: "Harness the power of model ensembles: reduce variance with Random Forests, and reduce bias iteratively with Gradient Boosted Trees.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "Bagging (Bootstrap Aggregating) trains diverse models in parallel on random data subsets to reduce variance.",
        "Boosting trains models sequentially, each learner correcting the errors of the preceding model.",
        "XGBoost and LightGBM provide state-of-the-art tabular accuracy through regularized gradient boosting.",
      ],
      theoryMarkdown: `# Module 3: Ensemble Learning: Random Forest & Boosting

## 1. Bagging vs Boosting
- **Random Forest (Bagging)**: Combines hundreds of de-correlated decision trees trained on bootstrap samples with random feature subsets.
- **Gradient Boosting (Boosting)**: Fits each new tree to the residual pseudo-errors of the previous trees.
`,
    },
    {
      id: "m4",
      number: 4,
      title: "Unsupervised Learning, Clustering & Pipelines",
      subtitle: "K-Means, Hierarchical Clustering, PCA dimensionality reduction, Scikit-Learn Pipelines.",
      description: "Extract hidden patterns from unlabelled datasets, cluster data with K-Means & Elbow method, reduce dimensions with PCA, and build production pipelines.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "K-Means partitions data into K clusters by iteratively updating centroids to minimize inertia.",
        "Principal Component Analysis (PCA) projects high-dimensional data onto orthogonal axes of maximum variance.",
        "Scikit-Learn Pipelines prevent data leakage by encapsulating transformers and estimators into a single object.",
      ],
      theoryMarkdown: `# Module 4: Unsupervised Learning, Clustering & Pipelines

## 1. Production Pipeline Design
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])
pipeline.fit(X_train, y_train)
\`\`\`
`,
    },
  ],

  // =========================================================================
  // ARTIFICIAL INTELLIGENCE TRACK (Modules 1 - 4)
  // =========================================================================
  ai: [
    {
      id: "m1",
      number: 1,
      title: "Deep Learning Foundations, Tensors & PyTorch",
      subtitle: "Perceptrons, PyTorch Tensors, Autograd, activation functions, loss functions, and backpropagation.",
      description: "Learn how artificial neural networks learn: computational graphs, automatic differentiation with PyTorch autograd, and training loops.",
      duration: "20 min read",
      readingMinutes: 20,
      challengeCount: 10,
      keyTakeaways: [
        "Neural networks are universal function approximators composed of stacked linear layers and non-linear activations.",
        "PyTorch Tensors are multi-dimensional arrays with GPU acceleration and automatic gradient tracking (requires_grad=True).",
        "Backpropagation applies the calculus chain rule to compute loss gradients with respect to every model weight.",
      ],
      theoryMarkdown: `# Module 1: Deep Learning Foundations, Tensors & PyTorch

## 1. The PyTorch Computational Graph
\`\`\`python
import torch
import torch.nn as nn

class MultilayerPerceptron(nn.Module):
    def __init__(self, in_features, hidden_dim, out_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, out_classes)
        )

    def forward(self, x):
        return self.net(x)
\`\`\`
`,
    },
    {
      id: "m2",
      number: 2,
      title: "Computer Vision & Convolutional Networks (CNNs)",
      subtitle: "2D Convolutions, Kernels, Max Pooling, ResNet residual skip connections, and Transfer Learning.",
      description: "Understand spatial representations in computer vision: feature extraction filters, spatial downsampling, and pre-trained models.",
      duration: "22 min read",
      readingMinutes: 22,
      challengeCount: 10,
      keyTakeaways: [
        "Convolutional filters preserve spatial 2D relationships while sharing weights across the entire image.",
        "Pooling layers reduce spatial dimensionality and provide translational invariance.",
        "Residual skip connections in ResNet solve the vanishing gradient problem in deep 100+ layer architectures.",
      ],
      theoryMarkdown: `# Module 2: Computer Vision & Convolutional Networks (CNNs)

## 1. How Convolutions Work
Convolutions slide mathematical filter kernels across pixels to detect edges, textures, shapes, and complex semantic objects.
`,
    },
    {
      id: "m3",
      number: 3,
      title: "Sequence Modeling, Attention & Transformers",
      subtitle: "RNNs, LSTMs, Scaled Dot-Product Attention, Multi-Head Attention, and Transformer Encoders/Decoders.",
      description: "Explore the revolution that powered modern AI: self-attention mechanics, Query/Key/Value vectors, and transformer architecture.",
      duration: "25 min read",
      readingMinutes: 25,
      challengeCount: 10,
      keyTakeaways: [
        "Self-attention allows every token in a sequence to attend to every other token with O(1) sequential path length.",
        "Attention formula: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V.",
        "Multi-Head Attention enables the model to jointly attend to information from different representation subspaces.",
      ],
      theoryMarkdown: `# Module 3: Sequence Modeling, Attention & Transformers

## 1. The Self-Attention Equation
\`\`\`python
import torch
import math

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, V)
\`\`\`
`,
    },
    {
      id: "m4",
      number: 4,
      title: "Large Language Models (LLMs), Fine-Tuning & AI Agents",
      subtitle: "Pre-training, LoRA/PEFT parameter-efficient fine-tuning, RAG retrieval, and autonomous agent loops.",
      description: "Build cutting-edge AI systems: parameter-efficient fine-tuning (LoRA), Retrieval-Augmented Generation (RAG) with vector databases, and multi-agent loops.",
      duration: "25 min read",
      readingMinutes: 25,
      challengeCount: 10,
      keyTakeaways: [
        "LLMs predict next tokens using causal masking over billions of training parameters.",
        "LoRA (Low-Rank Adaptation) freezes base weights and trains lightweight rank-decomposition adapter matrices.",
        "RAG grounds LLM outputs in external verified enterprise knowledge via vector embeddings and semantic search.",
        "AI Agents combine reasoning (ReAct prompt loops), memory, and tool execution to solve multi-step problems autonomously.",
      ],
      theoryMarkdown: `# Module 4: Large Language Models (LLMs), Fine-Tuning & AI Agents

## 1. Parameter-Efficient Fine-Tuning (LoRA)
Instead of updating all 70B weights, LoRA represents weight updates as low-rank matrices, reducing trainable parameters by 99% while retaining full accuracy!
`,
    },
  ],
};

export function getModuleTheory(subjectId: string, moduleId: string): SubjectCourseModule | undefined {
  const list = COURSE_MODULES[subjectId.toLowerCase()] || COURSE_MODULES["sql"];
  return list.find((m) => m.id === moduleId);
}

export function getAllModulesForSubject(subjectId: string): SubjectCourseModule[] {
  return COURSE_MODULES[subjectId.toLowerCase()] || COURSE_MODULES["sql"];
}
