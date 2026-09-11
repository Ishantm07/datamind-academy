export interface ChallengeData {
  id: string;
  subjectId: string;
  moduleId: string;
  lessonId: string;
  title: string;
  type: "THEORY" | "EXERCISE" | "QUIZ" | "PROJECT";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  points: number;
  durationMinutes: number;
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  tableSchema?: {
    tableName: string;
    columns: { name: string; type: string }[];
  };
  hints: string[];
  initialCode: string;
  solutionCode: string;
  language: "sql" | "python";
}

export const ALL_CHALLENGES: Record<string, ChallengeData> = {
  // ==========================================
  // SQL TRACK CHALLENGES
  // ==========================================
  "sql-m1-l1": {
    id: "sql-m1-l1",
    subjectId: "sql",
    moduleId: "m1",
    lessonId: "lesson-1",
    title: "1.1 Basic SELECT & Column Aliasing",
    type: "EXERCISE",
    difficulty: "EASY",
    points: 15,
    durationMinutes: 10,
    problemStatement: "Query the `Name` and `Salary` of all employees from the `EMPLOYEES` table. Format the output such that `Salary` is aliased as `Monthly_Pay`.",
    sampleInput: `+----+----------+--------+\n| ID | Name     | Salary |\n+----+----------+--------+\n| 1  | Alice    | 85000  |\n| 2  | Bob      | 62000  |\n+----+----------+--------+`,
    sampleOutput: `+----------+-------------+\n| Name     | Monthly_Pay |\n+----------+-------------+\n| Alice    | 85000       |\n| Bob      | 62000       |\n+----------+-------------+`,
    constraints: ["Return results ordered by Name ascending."],
    tableSchema: {
      tableName: "EMPLOYEES",
      columns: [
        { name: "ID", type: "INTEGER (PK)" },
        { name: "Name", type: "VARCHAR(50)" },
        { name: "Salary", type: "INTEGER" },
      ],
    },
    hints: ["Use `SELECT Name, Salary AS Monthly_Pay FROM EMPLOYEES ORDER BY Name ASC;`"],
    initialCode: "-- Write your query below\nSELECT Name, Salary FROM EMPLOYEES;",
    solutionCode: "SELECT Name, Salary AS Monthly_Pay FROM EMPLOYEES ORDER BY Name ASC;",
    language: "sql",
  },
  "sql-m1-l2": {
    id: "sql-m1-l2",
    subjectId: "sql",
    moduleId: "m1",
    lessonId: "lesson-2",
    title: "1.2 Filtering High-Value Customers (WHERE)",
    type: "EXERCISE",
    difficulty: "EASY",
    points: 20,
    durationMinutes: 15,
    problemStatement: "Query all customers from `CUSTOMERS` who reside in 'USA' or 'Canada' AND have total purchases exceeding $500.",
    sampleInput: `+----+----------+---------+-------------+\n| ID | Name     | Country | Total_Spent |\n+----+----------+---------+-------------+\n| 1  | Samantha | USA     | 750         |\n| 2  | John     | UK      | 900         |\n| 3  | Pierre   | Canada  | 600         |\n+----+----------+---------+-------------+`,
    sampleOutput: `+----------+---------+-------------+\n| Name     | Country | Total_Spent |\n+----------+---------+-------------+\n| Samantha | USA     | 750         |\n| Pierre   | Canada  | 600         |\n+----------+---------+-------------+`,
    constraints: ["Use IN operator for country filtering."],
    tableSchema: {
      tableName: "CUSTOMERS",
      columns: [
        { name: "ID", type: "INTEGER (PK)" },
        { name: "Name", type: "VARCHAR(50)" },
        { name: "Country", type: "VARCHAR(50)" },
        { name: "Total_Spent", type: "INTEGER" },
      ],
    },
    hints: ["Use `WHERE Country IN ('USA', 'Canada') AND Total_Spent > 500`"],
    initialCode: "SELECT Name, Country, Total_Spent FROM CUSTOMERS WHERE -- Condition here;",
    solutionCode: "SELECT Name, Country, Total_Spent FROM CUSTOMERS WHERE Country IN ('USA', 'Canada') AND Total_Spent > 500;",
    language: "sql",
  },
  "sql-m2-l1": {
    id: "sql-m2-l1",
    subjectId: "sql",
    moduleId: "m2",
    lessonId: "lesson-1",
    title: "2.1 Departmental Payroll Aggregations (GROUP BY)",
    type: "EXERCISE",
    difficulty: "MEDIUM",
    points: 30,
    durationMinutes: 20,
    problemStatement: "Calculate the total employee count, total payroll, and average salary for each department. Filter to include only departments with more than 5 employees using HAVING.",
    sampleInput: `+---------------+--------+\n| Department_ID | Salary |\n+---------------+--------+\n| 10            | 90000  |\n| 10            | 85000  |\n+---------------+--------+`,
    sampleOutput: `+---------------+-----------+---------------+------------+\n| Department_ID | Total_Emp | Total_Payroll | Avg_Salary |\n+---------------+-----------+---------------+------------+\n| 10            | 6         | 540000        | 90000      |\n+---------------+-----------+---------------+------------+`,
    constraints: ["Filter group results using HAVING COUNT(*) > 5."],
    hints: ["Use `GROUP BY Department_ID HAVING COUNT(*) > 5`"],
    initialCode: "SELECT Department_ID, COUNT(*) as Total_Emp, SUM(Salary) as Total_Payroll, AVG(Salary) as Avg_Salary FROM EMPLOYEES GROUP BY Department_ID;",
    solutionCode: "SELECT Department_ID, COUNT(*) as Total_Emp, SUM(Salary) as Total_Payroll, AVG(Salary) as Avg_Salary FROM EMPLOYEES GROUP BY Department_ID HAVING COUNT(*) > 5;",
    language: "sql",
  },
  "sql-m3-l1": {
    id: "sql-m3-l1",
    subjectId: "sql",
    moduleId: "m3",
    lessonId: "lesson-1",
    title: "3.1 E-Commerce Customer Orders (LEFT JOIN)",
    type: "EXERCISE",
    difficulty: "MEDIUM",
    points: 35,
    durationMinutes: 25,
    problemStatement: "Query all customer names along with their order IDs and total amount. Include customers who have placed zero orders (showing NULL for order details).",
    sampleInput: `CUSTOMERS: (ID: 1 Alice, ID: 2 Bob)\nORDERS: (Order_ID: 101, Customer_ID: 1, Amount: 150)`,
    sampleOutput: `+-------+----------+--------+\n| Name  | Order_ID | Amount |\n+-------+----------+--------+\n| Alice | 101      | 150    |\n| Bob   | NULL     | NULL   |\n+-------+----------+--------+`,
    constraints: ["Use LEFT JOIN between CUSTOMERS and ORDERS."],
    hints: ["Use `FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.ID = o.Customer_ID`"],
    initialCode: "SELECT c.Name, o.Order_ID, o.Amount FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.ID = o.Customer_ID;",
    solutionCode: "SELECT c.Name, o.Order_ID, o.Amount FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.ID = o.Customer_ID;",
    language: "sql",
  },
  "sql-m5-l1": {
    id: "sql-m5-l1",
    subjectId: "sql",
    moduleId: "m5",
    lessonId: "lesson-1",
    title: "5.1 Month-over-Month Revenue Growth (LAG)",
    type: "EXERCISE",
    difficulty: "HARD",
    points: 50,
    durationMinutes: 30,
    problemStatement: "Use the `LAG()` window function to calculate previous month revenue and compute the Month-over-Month growth percentage.",
    sampleInput: `+---------+---------+\n| Month   | Revenue |\n+---------+---------+\n| 2026-01 | 100000  |\n| 2026-02 | 125000  |\n+---------+---------+`,
    sampleOutput: `+---------+---------+--------------+--------------+\n| Month   | Revenue | Prev_Revenue | MoM_Growth_% |\n+---------+---------+--------------+--------------+\n| 2026-01 | 100000  | NULL         | NULL         |\n| 2026-02 | 125000  | 100000       | 25.00%       |\n+---------+---------+--------------+--------------+`,
    constraints: ["Order by Month ascending inside OVER()."],
    hints: ["Use `LAG(Revenue, 1) OVER (ORDER BY Month)`"],
    initialCode: "SELECT Month, Revenue, LAG(Revenue, 1) OVER (ORDER BY Month) as Prev_Revenue FROM MONTHLY_SALES;",
    solutionCode: "SELECT Month, Revenue, LAG(Revenue, 1) OVER (ORDER BY Month) as Prev_Revenue FROM MONTHLY_SALES;",
    language: "sql",
  },

  // ==========================================
  // PYTHON TRACK CHALLENGES
  // ==========================================
  "python-m1-l1": {
    id: "python-m1-l1",
    subjectId: "python",
    moduleId: "m1",
    lessonId: "lesson-1",
    title: "1.1 List Comprehensions & Data Filtering",
    type: "EXERCISE",
    difficulty: "EASY",
    points: 20,
    durationMinutes: 15,
    problemStatement: "Write a function `filter_even_squares(numbers)` that takes a list of integers, filters out odd numbers, and returns a list of squares of the even numbers using a list comprehension.",
    sampleInput: "[1, 2, 3, 4, 5, 6]",
    sampleOutput: "[4, 16, 36]",
    constraints: ["Must use a 1-line list comprehension."],
    hints: ["[x**2 for x in numbers if x % 2 == 0]"],
    initialCode: "def filter_even_squares(numbers):\n    # Write list comprehension here\n    pass",
    solutionCode: "def filter_even_squares(numbers):\n    return [x**2 for x in numbers if x % 2 == 0]",
    language: "python",
  },
  "python-m3-l1": {
    id: "python-m3-l1",
    subjectId: "python",
    moduleId: "m3",
    lessonId: "lesson-1",
    title: "3.1 Cleaning Customer Churn Data (Pandas)",
    type: "EXERCISE",
    difficulty: "MEDIUM",
    points: 35,
    durationMinutes: 25,
    problemStatement: "Write a function `clean_churn_data(df)` that converts `TotalCharges` to numeric, fills missing values with the column median, and returns the cleaned DataFrame.",
    sampleInput: "DataFrame with string 'TotalCharges' containing missing values ' '",
    sampleOutput: "Cleaned DataFrame with float64 'TotalCharges' and median filled",
    constraints: ["Use pd.to_numeric with errors='coerce'"],
    hints: ["df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')"],
    initialCode: "import pandas as pd\n\ndef clean_churn_data(df):\n    # Clean and fill missing median values\n    pass",
    solutionCode: "import pandas as pd\n\ndef clean_churn_data(df):\n    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')\n    median_val = df['TotalCharges'].median()\n    df['TotalCharges'] = df['TotalCharges'].fillna(median_val)\n    return df",
    language: "python",
  },

  // ==========================================
  // MACHINE LEARNING TRACK CHALLENGES
  // ==========================================
  "ml-m2-l1": {
    id: "ml-m2-l1",
    subjectId: "ml",
    moduleId: "m2",
    lessonId: "lesson-1",
    title: "2.1 XGBoost Churn Classifier",
    type: "EXERCISE",
    difficulty: "HARD",
    points: 50,
    durationMinutes: 35,
    problemStatement: "Train an XGBoost Classifier (`XGBClassifier`) with `n_estimators=100` and `learning_rate=0.1`. Return the top 3 feature importances.",
    sampleInput: "Features X (20 numeric columns) and binary target y (0/1 Churn)",
    sampleOutput: "Top 3 features: ['Contract_MonthToMonth', 'Tenure', 'TotalCharges']",
    constraints: ["Set random_state=42 for reproducibility."],
    hints: ["model.feature_importances_"],
    initialCode: "from xgboost import XGBClassifier\n\ndef train_xgboost(X_train, y_train):\n    # Fit XGBClassifier and return model\n    pass",
    solutionCode: "from xgboost import XGBClassifier\n\ndef train_xgboost(X_train, y_train):\n    model = XGBClassifier(n_estimators=100, learning_rate=0.1, random_state=42)\n    model.fit(X_train, y_train)\n    return model",
    language: "python",
  },

  // ==========================================
  // AI TRACK CHALLENGES
  // ==========================================
  "ai-m4-l1": {
    id: "ai-m4-l1",
    subjectId: "ai",
    moduleId: "m4",
    lessonId: "lesson-1",
    title: "4.1 Scaled Dot-Product Attention in PyTorch",
    type: "EXERCISE",
    difficulty: "HARD",
    points: 60,
    durationMinutes: 40,
    problemStatement: "Implement the Scaled Dot-Product Attention formula from 'Attention Is All You Need': Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V using PyTorch.",
    sampleInput: "Tensors Q, K, V with shape (batch_size, seq_len, d_k)",
    sampleOutput: "Output Tensor with shape (batch_size, seq_len, d_k)",
    constraints: ["Must divide scores by math.sqrt(d_k) before softmax."],
    hints: ["Use torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)"],
    initialCode: "import torch\nimport math\n\ndef scaled_dot_product_attention(Q, K, V):\n    # Implement Attention equation\n    pass",
    solutionCode: "import torch\nimport math\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n    weights = torch.softmax(scores, dim=-1)\n    return torch.matmul(weights, V)",
    language: "python",
  },
};

export function getChallenge(subjectId: string, moduleId: string, lessonId: string): ChallengeData {
  const key = `${subjectId}-${moduleId}-${lessonId}`;
  return ALL_CHALLENGES[key] || ALL_CHALLENGES["sql-m1-l1"];
}
