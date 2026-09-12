export interface LessonItem {
  id: string;
  title: string;
  type: "THEORY" | "EXERCISE";
  duration: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  points?: number;
  theoryMarkdown?: string;
  problemStatement?: string;
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string[];
  tableSchema?: { tableName: string; columns: { name: string; type: string }[] };
  hints?: string[];
  initialCode?: string;
  solutionCode?: string;
  language?: "sql" | "python";
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  lessons: LessonItem[];
}

export const INTEGRATED_SQL_MODULES: ModuleItem[] = [
  {
    id: "m1",
    title: "Module 1: Relational Architecture & DQL Fundamentals",
    description: "Understand RDBMS architecture, DQL (Data Query Language), SELECT syntax, filtering, and sorting.",
    lessons: [
      {
        id: "lesson-1",
        title: "1.1 Theory: Relational Model, Schemas & DQL Overview",
        type: "THEORY",
        duration: "10 min",
        theoryMarkdown: `# Relational Model & DQL Overview

An **RDBMS (Relational Database Management System)** stores data in two-dimensional tables consisting of **Rows** (records) and **Columns** (attributes).

### 1. Database Language Categories:
- **DQL (Data Query Language)**: Used to fetch data from tables (\`SELECT\`).
- **DDL (Data Definition Language)**: Used to define structure (\`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`).
- **DML (Data Manipulation Language)**: Used to modify rows (\`INSERT\`, \`UPDATE\`, \`DELETE\`).
- **DCL (Data Control Language)**: Used to grant/revoke permissions (\`GRANT\`, \`REVOKE\`).
- **TCL (Transaction Control Language)**: Used to manage transactions (\`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\`).

### 2. Basic Query Syntax & Logical Order of Execution:
Even though you write a query starting with \`SELECT\`, the database engine executes it in the following order:

1. **FROM & JOIN**: Locates the tables.
2. **WHERE**: Filters individual rows.
3. **GROUP BY**: Groups rows into summary buckets.
4. **HAVING**: Filters grouped buckets.
5. **SELECT**: Chooses columns to return.
6. **ORDER BY**: Sorts the final output.
7. **LIMIT / OFFSET**: Constrains row count.
`,
      },
      {
        id: "lesson-2",
        title: "1.2 Challenge: Filtering High-Value Customers (WHERE & IN)",
        type: "EXERCISE",
        duration: "15 min",
        difficulty: "EASY",
        points: 15,
        problemStatement: "Query all customer names, country, and total_spent from CUSTOMERS for users living in 'USA' or 'Canada' AND having total_spent > 500.",
        sampleInput: "+------+----------+---------+-------------+\n| ID   | Name     | Country | Total_Spent |\n+------+----------+---------+-------------+\n| 1    | Samantha | USA     | 750         |\n| 2    | Pierre   | Canada  | 600         |\n+------+----------+---------+-------------+",
        sampleOutput: "+----------+---------+-------------+\n| Name     | Country | Total_Spent |\n+----------+---------+-------------+\n| Samantha | USA     | 750         |\n| Pierre   | Canada  | 600         |\n+----------+---------+-------------+",
        constraints: ["Use IN operator for country filter."],
        tableSchema: {
          tableName: "CUSTOMERS",
          columns: [{ name: "ID", type: "INT (PK)" }, { name: "Name", type: "VARCHAR" }, { name: "Country", type: "VARCHAR" }, { name: "Total_Spent", type: "INT" }],
        },
        hints: ["WHERE Country IN ('USA', 'Canada') AND Total_Spent > 500"],
        initialCode: "SELECT Name, Country, Total_Spent FROM CUSTOMERS WHERE -- Add condition;",
        solutionCode: "SELECT Name, Country, Total_Spent FROM CUSTOMERS WHERE Country IN ('USA', 'Canada') AND Total_Spent > 500;",
        language: "sql",
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Aggregations, GROUP BY & HAVING",
    description: "Summarizing row metrics using COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING clauses.",
    lessons: [
      {
        id: "lesson-1",
        title: "2.1 Theory: Aggregation Functions & GROUP BY Execution",
        type: "THEORY",
        duration: "12 min",
        theoryMarkdown: `# Aggregation & GROUP BY

Aggregate functions take multiple values and return a single summary value.

### Key Aggregate Functions:
- \`COUNT(*)\`: Counts total rows (including NULLs).
- \`COUNT(col)\`: Counts non-null values in a column.
- \`SUM(col)\`: Returns the total sum of numerical values.
- \`AVG(col)\`: Computes the arithmetic mean.
- \`MIN(col)\` / \`MAX(col)\`: Returns lowest / highest value.

### WHERE vs HAVING:
- **WHERE**: Filters rows **BEFORE** aggregation takes place.
- **HAVING**: Filters summary rows **AFTER** aggregation.
`,
      },
      {
        id: "lesson-2",
        title: "2.2 Challenge: Departmental Payroll Analysis (GROUP BY & HAVING)",
        type: "EXERCISE",
        duration: "20 min",
        difficulty: "MEDIUM",
        points: 30,
        problemStatement: "Calculate total employees, total payroll, and average salary per department for departments with more than 5 employees.",
        sampleInput: "Department_ID and Salary columns from EMPLOYEES",
        sampleOutput: "+---------------+-----------+---------------+------------+\n| Department_ID | Total_Emp | Total_Payroll | Avg_Salary |\n+---------------+-----------+---------------+------------+\n| 10            | 6         | 540000        | 90000      |\n+---------------+-----------+---------------+------------+",
        constraints: ["Filter aggregated results using HAVING COUNT(*) > 5."],
        hints: ["GROUP BY Department_ID HAVING COUNT(*) > 5"],
        initialCode: "SELECT Department_ID, COUNT(*) as Total_Emp, SUM(Salary) as Total_Payroll, AVG(Salary) as Avg_Salary FROM EMPLOYEES GROUP BY Department_ID HAVING COUNT(*) > 5;",
        solutionCode: "SELECT Department_ID, COUNT(*) as Total_Emp, SUM(Salary) as Total_Payroll, AVG(Salary) as Avg_Salary FROM EMPLOYEES GROUP BY Department_ID HAVING COUNT(*) > 5;",
        language: "sql",
      },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Multi-Table JOINs & Entity Relationships",
    description: "Combining rows from multiple tables using INNER, LEFT, RIGHT, FULL JOINs and Self JOINs.",
    lessons: [
      {
        id: "lesson-1",
        title: "3.1 Theory: JOIN Mechanics & Venn Diagram Logic",
        type: "THEORY",
        duration: "15 min",
        theoryMarkdown: `# Understanding SQL JOINs

When databases are normalized, entity details are distributed across separate tables. **JOINs** reconnect these tables using relational keys.

### Types of JOINs:
1. **INNER JOIN**: Returns only matching records in both tables.
2. **LEFT (OUTER) JOIN**: Returns all records from the left table, and matching records from the right table.
3. **RIGHT (OUTER) JOIN**: Returns all records from the right table, and matching records from the left table.
4. **FULL OUTER JOIN**: Returns all records when there is a match in left OR right table.
`,
      },
      {
        id: "lesson-2",
        title: "3.2 Challenge: Customers Who Never Placed an Order (LEFT JOIN)",
        type: "EXERCISE",
        duration: "25 min",
        difficulty: "MEDIUM",
        points: 30,
        problemStatement: "Write a SQL query to find all customers who have never placed an order.",
        sampleInput: "CUSTOMERS (ID: 1 Alice, ID: 2 Bob)\nORDERS (ID: 101, Customer_ID: 1)",
        sampleOutput: "+-----------+\n| Customers |\n+-----------+\n| Bob       |\n+-----------+",
        constraints: ["Use LEFT JOIN and check for NULL order ID."],
        hints: ["LEFT JOIN ORDERS o ON c.ID = o.Customer_ID WHERE o.ID IS NULL"],
        initialCode: "SELECT c.Name AS Customers FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.ID = o.Customer_ID WHERE o.ID IS NULL;",
        solutionCode: "SELECT c.Name AS Customers FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.ID = o.Customer_ID WHERE o.ID IS NULL;",
        language: "sql",
      },
    ],
  },
  {
    id: "m4",
    title: "Module 4: Window Functions & Advanced Analytics",
    description: "Computing analytic metrics over row partitions using ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD.",
    lessons: [
      {
        id: "lesson-1",
        title: "4.1 Theory: Window Functions vs GROUP BY",
        type: "THEORY",
        duration: "15 min",
        theoryMarkdown: `# Analytic Window Functions

Unlike \`GROUP BY\` which collapses rows, **Window Functions** compute aggregate or ranking values across a defined partition of rows without reducing row count.

### Window Function Syntax:
\`\`\`sql
FUNCTION_NAME() OVER (
  PARTITION BY column_name
  ORDER BY sort_column DESC
)
\`\`\`
`,
      },
      {
        id: "lesson-2",
        title: "4.2 Challenge: Department Top 3 Salaries (DENSE_RANK)",
        type: "EXERCISE",
        duration: "30 min",
        difficulty: "HARD",
        points: 50,
        problemStatement: "Query employees who have a salary in the top 3 unique salaries within their department.",
        sampleInput: "EMPLOYEE table with multiple departmental salaries",
        sampleOutput: "+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Max      | 90000  |\n| IT         | Joe      | 85000  |\n+------------+----------+--------+",
        constraints: ["Use DENSE_RANK() OVER (PARTITION BY Department_ID ORDER BY Salary DESC)."],
        hints: ["WITH Ranked AS (...) SELECT * FROM Ranked WHERE rk <= 3"],
        initialCode: "WITH Ranked AS (\n  SELECT Department_ID, Name, Salary, DENSE_RANK() OVER (PARTITION BY Department_ID ORDER BY Salary DESC) as rk\n  FROM EMPLOYEES\n)\nSELECT Department_ID, Name, Salary FROM Ranked WHERE rk <= 3;",
        solutionCode: "WITH Ranked AS (\n  SELECT Department_ID, Name, Salary, DENSE_RANK() OVER (PARTITION BY Department_ID ORDER BY Salary DESC) as rk\n  FROM EMPLOYEES\n)\nSELECT Department_ID, Name, Salary FROM Ranked WHERE rk <= 3;",
        language: "sql",
      },
    ],
  },
];

export const INTEGRATED_PYTHON_MODULES: ModuleItem[] = [
  {
    id: "m1",
    title: "Module 1: Python Data Model, Core Types & Dynamic Typing",
    description: "Understand Python object references, memory management, numbers, strings, lists, dicts, tuples, and mutability.",
    lessons: [
      {
        id: "lesson-1",
        title: "1.1 Theory: Python Object References, Dynamic Typing & Mutability",
        type: "THEORY",
        duration: "12 min",
        theoryMarkdown: `# The Python Data Model & Dynamic Typing

In Python, **types live with objects, not variables**. A variable is simply a named reference pointing to an object residing in heap memory.

### 1. The Dynamic Typing Architecture:
- **Variables**: Entries in a system symbol table with links to objects.
- **Objects**: Allocated memory chunks with two standard header fields:
  1. A **type designator** telling Python what type of object it is (e.g., \`int\`, \`list\`).
  2. A **reference counter** tracking how many variables currently point to this object.
- **Garbage Collection**: When an object's reference count drops to 0, Python's runtime reclaims its memory automatically. A cyclic collector handles circular cross-references.

### 2. Mutability vs. Immutability:
- **Immutable Types**: Numbers, Strings, Tuples, Frozensets, Bytes. Once created, their internal values cannot change in-place. Operations produce fresh objects.
- **Mutable Types**: Lists, Dictionaries, Sets, Bytearrays, User-defined classes. These can be modified directly in memory without changing their object identity (\`id()\`).

### 3. Shared References & Copies:
\`\`\`python
a = [1, 2, 3]
b = a        # Shared reference (both point to same list)
b.append(4)  # Modifies a as well!

c = a[:]     # Shallow copy (new top-level list object)
import copy
d = copy.deepcopy(a) # Deep copy (recursively duplicates nested structures)
\`\`\`
`,
      },
      {
        id: "lesson-2",
        title: "1.2 Challenge: Filtering Even Squares (List Comprehensions)",
        type: "EXERCISE",
        duration: "15 min",
        difficulty: "EASY",
        points: 20,
        problemStatement: "Write a function filter_even_squares(numbers) that accepts a list of integers, filters out odd numbers, and returns a list of squares of the even numbers using a concise Python list comprehension.",
        sampleInput: "numbers = [1, 2, 3, 4, 5, 6]",
        sampleOutput: "[4, 16, 36]",
        constraints: ["Must use a 1-line list comprehension.", "Preserve original relative order."],
        tableSchema: {
          tableName: "filter_even_squares(numbers)",
          columns: [
            { name: "numbers", type: "list[int]" },
            { name: "Returns", type: "list[int]" },
          ],
        },
        hints: ["[x**2 for x in numbers if x % 2 == 0]"],
        initialCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    # Implement with list comprehension\n    pass",
        solutionCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    return [x**2 for x in numbers if x % 2 == 0]",
        language: "python",
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Statements, Control Flow & Iteration Protocols",
    description: "Master conditional truth tests, loop constructs (while/for with else), the Iteration Protocol, and comprehensions.",
    lessons: [
      {
        id: "lesson-1",
        title: "2.1 Theory: The Python Iteration Protocol & Comprehensions",
        type: "THEORY",
        duration: "15 min",
        theoryMarkdown: `# The Python Iteration Protocol

In Python, iteration is not based on traditional index increments. Instead, it relies on a standardized, universal **Iteration Protocol**.

### 1. The Iteration Protocol:
Any iterable object provides an \`__iter__()\` method that returns an iterator object. The iterator object must provide a \`__next__()\` method (or \`next()\` built-in) that:
1. Returns the next item in the sequence on each call.
2. Raises a \`StopIteration\` exception when no more elements remain.

\`\`\`python
items = [10, 20, 30]
it = iter(items)       # Calls items.__iter__()
next(it)              # Returns 10
next(it)              # Returns 20
next(it)              # Returns 30
next(it)              # Raises StopIteration
\`\`\`

### 2. Comprehensions vs. Map/Filter:
- **List Comprehension**: \`[x * 2 for x in items if x > 0]\`
- **Dict Comprehension**: \`{k: v for k, v in zip(keys, values)}\`
- **Set Comprehension**: \`{x.lower() for x in words}\`
- **Generator Expression**: \`(x * 2 for x in items)\` — executes lazily on-demand without memory overhead for large streams.

### 3. Loop \`else\` Clause:
Python \`for\` and \`while\` loops can have an optional \`else:\` block. It executes **only if the loop completed normally without encountering a \`break\` statement**.
`,
      },
      {
        id: "lesson-2",
        title: "2.2 Challenge: Character Frequency Counter",
        type: "EXERCISE",
        duration: "20 min",
        difficulty: "EASY",
        points: 20,
        problemStatement: "Write a function char_frequency(text) that takes a string and returns a dictionary where keys are the characters and values are their frequencies. Case-sensitive.",
        sampleInput: "text = 'hello world'",
        sampleOutput: "{'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}",
        constraints: ["Maintain accurate count for all characters including whitespace."],
        tableSchema: {
          tableName: "char_frequency(text)",
          columns: [
            { name: "text", type: "str" },
            { name: "Returns", type: "dict[str, int]" },
          ],
        },
        hints: ["Use a standard dict with freq[c] = freq.get(c, 0) + 1."],
        initialCode: "def char_frequency(text: str) -> dict[str, int]:\n    # Build frequency dict\n    pass",
        solutionCode: "def char_frequency(text: str) -> dict[str, int]:\n    freq = {}\n    for c in text:\n        freq[c] = freq.get(c, 0) + 1\n    return freq",
        language: "python",
      },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Functions, Scopes (LEGB), Closures & Generators",
    description: "Deep dive into function definitions, argument passing modes (*args, **kwargs), the LEGB scope lookup rule, closures, and yield generators.",
    lessons: [
      {
        id: "lesson-1",
        title: "3.1 Theory: LEGB Scope Lookup Rule, Closures & Generators",
        type: "THEORY",
        duration: "18 min",
        theoryMarkdown: `# Scopes, Closures & Generators

### 1. The LEGB Scope Lookup Rule:
When referencing a variable name in a function, Python searches four scopes in order:
1. **L (Local)**: Names assigned within the current function (\`def\` or \`lambda\`).
2. **E (Enclosing)**: Names in the local scope of any statically enclosing functions, from inner to outer.
3. **G (Global)**: Names assigned at top-level of the current module file.
4. **B (Built-in)**: Names pre-assigned in Python's built-in module (e.g. \`open\`, \`range\`, \`len\`).

### 2. Changing Scope Behavior:
- \`global X\`: Tells Python that assignments to \`X\` inside the function modify the module-level variable.
- \`nonlocal X\`: Tells Python that assignments to \`X\` modify the variable in an enclosing function scope (essential for stateful closures).

### 3. Closures (Factory Functions):
A closure is a nested function that remembers and retains access to variables in its enclosing scope, even after the outer function has finished execution.

### 4. Generators and \`yield\`:
Generator functions contain one or more \`yield\` statements. When called, they return a generator object that preserves the function's local frame and instruction pointer between calls.
`,
      },
      {
        id: "lesson-2",
        title: "3.2 Challenge: Fibonacci Generator with Yield",
        type: "EXERCISE",
        duration: "20 min",
        difficulty: "MEDIUM",
        points: 30,
        problemStatement: "Write a generator function fibonacci_gen(limit) that yields Fibonacci numbers up to (and including) limit using Python's yield statement.",
        sampleInput: "limit = 20",
        sampleOutput: "list(fibonacci_gen(20)) -> [0, 1, 1, 2, 3, 5, 8, 13]",
        constraints: ["Must be a Python generator function using yield.", "Sequence starts with 0, 1."],
        tableSchema: {
          tableName: "fibonacci_gen(limit)",
          columns: [
            { name: "limit", type: "int" },
            { name: "Returns", type: "Generator[int, None, None]" },
          ],
        },
        hints: ["Initialize a, b = 0, 1; while a <= limit: yield a; a, b = b, a + b"],
        initialCode: "def fibonacci_gen(limit: int):\n    # Yield fibonacci numbers <= limit\n    pass",
        solutionCode: "def fibonacci_gen(limit: int):\n    a, b = 0, 1\n    while a <= limit:\n        yield a\n        a, b = b, a + b",
        language: "python",
      },
    ],
  },
  {
    id: "m4",
    title: "Module 4: Object-Oriented Programming & Operator Overloading",
    description: "Classes as object factories, encapsulation, inheritance hierarchies, MRO (Method Resolution Order), and dunder operator overloading methods.",
    lessons: [
      {
        id: "lesson-1",
        title: "4.1 Theory: OOP Architecture, Inheritance & Operator Overloading",
        type: "THEORY",
        duration: "20 min",
        theoryMarkdown: `# OOP Architecture & Operator Overloading

In Python, classes are first-class objects created at runtime with the \`class\` statement.

### 1. Class and Instance Mechanics:
- **Class**: Functions as an object factory and namespace holding methods and class variables.
- **Instance**: Concrete record with its own distinct \`__dict__\` namespace.
- **Attribute Tree Search**: \`instance.attr\` first searches the instance's dictionary. If not found, it searches the class, then each superclass according to the **MRO (Method Resolution Order)**.

### 2. Operator Overloading (Dunder Methods):
Python intercept built-in operations through specially named double-underscore (dunder) methods:
- \`__init__(self, ...)\`: Instance initializer.
- \`__str__(self)\`: User-friendly string display (\`str(x)\`, \`print(x)\`).
- \`__repr__(self)\`: Unambiguous code representation (\`repr(x)\`).
- \`__len__(self)\`: Intercepts \`len(x)\`.
- \`__getitem__(self, key)\`: Intercepts index access \`x[key]\` and slicing.
- \`__call__(self, ...)\`: Allows an instance to be called like a function \`x()\`.
- \`__add__(self, other)\`: Intercepts addition \`x + y\`.
- \`__eq__(self, other)\`: Intercepts equality \`x == y\`.
`,
      },
      {
        id: "lesson-2",
        title: "4.2 Challenge: 2D Vector with Operator Overloading",
        type: "EXERCISE",
        duration: "30 min",
        difficulty: "HARD",
        points: 45,
        problemStatement: "Create a Python Vector2D class that overloads operators: + (__add__), - (__sub__), * (__mul__ for scalar multiplication), == (__eq__), and __repr__ formatted as Vector2D(x, y). Also implement vector magnitude via abs(v) using math.hypot.",
        sampleInput: "v1 = Vector2D(3, 4); v2 = Vector2D(1, 2); v1 + v2; abs(v1)",
        sampleOutput: "v1 + v2 -> Vector2D(4, 6), abs(v1) -> 5.0",
        constraints: ["Vector coordinates are floats or ints.", "Support scalar multiplication."],
        tableSchema: {
          tableName: "Vector2D(x, y)",
          columns: [
            { name: "x, y", type: "float | int" },
            { name: "__add__(other)", type: "Vector2D" },
            { name: "__mul__(scalar)", type: "Vector2D" },
            { name: "__abs__()", type: "float" },
          ],
        },
        hints: ["Implement __add__, __sub__, __mul__, __abs__, __eq__, and __repr__."],
        initialCode: "import math\n\nclass Vector2D:\n    def __init__(self, x: float, y: float):\n        pass\n    # Implement dunder operator methods",
        solutionCode: "import math\n\nclass Vector2D:\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other: 'Vector2D') -> 'Vector2D':\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __sub__(self, other: 'Vector2D') -> 'Vector2D':\n        return Vector2D(self.x - other.x, self.y - other.y)\n\n    def __mul__(self, scalar: float) -> 'Vector2D':\n        return Vector2D(self.x * scalar, self.y * scalar)\n\n    def __abs__(self) -> float:\n        return math.hypot(self.x, self.y)\n\n    def __eq__(self, other: object) -> bool:\n        if isinstance(other, Vector2D):\n            return self.x == other.x and self.y == other.y\n        return False\n\n    def __repr__(self) -> str:\n        return f'Vector2D({self.x}, {self.y})'",
        language: "python",
      },
    ],
  },
  {
    id: "m5",
    title: "Module 5: Advanced Python: Decorators, Context Managers & Exceptions",
    description: "Building robust production systems with custom exception hierarchies, context managers (with), and function/class decorators.",
    lessons: [
      {
        id: "lesson-1",
        title: "5.1 Theory: Decorators, Context Managers & Exception Handling",
        type: "THEORY",
        duration: "20 min",
        theoryMarkdown: `# Advanced Python Constructs

### 1. Decorators:
A decorator is a callable that takes another function as an argument, adds functionality, and returns an altered or wrapper callable.
\`\`\`python
def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Code before target function
        result = func(*args, **kwargs)
        # Code after target function
        return result
    return wrapper
\`\`\`
Using \`@functools.wraps\` copies original name, docstrings, and parameter annotations to the wrapper.

### 2. Context Managers (\`with\` statement):
Guarantees clean setup and teardown of resources regardless of whether errors occur.
- \`__enter__(self)\`: Runs before the enclosed code block. Return value bound to \`as var\`.
- \`__exit__(self, exc_type, exc_val, exc_tb)\`: Runs after the block exits. If an exception occurred and \`__exit__\` returns \`True\`, the exception is suppressed.

### 3. Exception Handling Lifecycle:
\`\`\`python
try:
    # Code that might fail
except SpecificError as e:
    # Handles specific error
else:
    # Runs ONLY if NO exceptions occurred in try block
finally:
    # ALWAYS runs (resource cleanup, closing sockets/files)
\`\`\`
`,
      },
      {
        id: "lesson-2",
        title: "5.2 Challenge: Custom Exception Suppressing Context Manager",
        type: "EXERCISE",
        duration: "25 min",
        difficulty: "HARD",
        points: 45,
        problemStatement: "Implement a context manager class SuppressExceptions(*exception_types) that can be used with Python's with statement to swallow specified exception types while re-raising any unhandled exception types. Use __enter__ and __exit__.",
        sampleInput: "with SuppressExceptions(ZeroDivisionError, ValueError):\n    x = 1 / 0\nprint('Safely survived!')",
        sampleOutput: "Prints 'Safely survived!' without crashing.",
        constraints: ["Return True in __exit__ if exc_type is a subclass of any handled exception; otherwise return False."],
        tableSchema: {
          tableName: "SuppressExceptions(*exc_types)",
          columns: [
            { name: "exc_types", type: "type[Exception]" },
            { name: "__enter__()", type: "self" },
            { name: "__exit__(exc_type, exc_val, exc_tb)", type: "bool" },
          ],
        },
        hints: ["In __exit__, check if exc_type and issubclass(exc_type, self.exc_types): return True."],
        initialCode: "class SuppressExceptions:\n    def __init__(self, *exc_types):\n        pass\n    def __enter__(self):\n        pass\n    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:\n        pass",
        solutionCode: "class SuppressExceptions:\n    def __init__(self, *exc_types):\n        self.exc_types = exc_types\n\n    def __enter__(self):\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:\n        if exc_type is not None and issubclass(exc_type, self.exc_types):\n            return True\n        return False",
        language: "python",
      },
    ],
  },
];

