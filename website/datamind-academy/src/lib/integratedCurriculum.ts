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
