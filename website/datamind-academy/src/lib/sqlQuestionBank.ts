export interface SQLQuestion {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  points: number;
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  tableSchema: {
    tableName: string;
    columns: { name: string; type: string }[];
  };
  hints: string[];
  initialCode: string;
  solutionCode: string;
}

export const SQL_QUESTION_POOL: SQLQuestion[] = [
  // ==========================================
  // EASY QUESTIONS (15+)
  // ==========================================
  {
    id: "sql-easy-01",
    title: "Second Highest Salary",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a SQL query to find the second highest salary from the Employee table. If there is no second highest salary, return NULL.",
    sampleInput: "+----+--------+\n| id | salary |\n+----+--------+\n| 1  | 100    |\n| 2  | 200    |\n| 3  | 300    |\n+----+--------+",
    sampleOutput: "+---------------------+\n| SecondHighestSalary |\n+---------------------+\n| 200                 |\n+---------------------+",
    constraints: ["Return NULL if fewer than 2 distinct salaries exist."],
    tableSchema: {
      tableName: "Employee",
      columns: [{ name: "id", type: "INT (PK)" }, { name: "salary", type: "INT" }],
    },
    hints: ["Use DISTINCT salary, ORDER BY salary DESC, LIMIT 1 OFFSET 1."],
    initialCode: "SELECT DISTINCT salary AS SecondHighestSalary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;",
    solutionCode: "SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;",
  },
  {
    id: "sql-easy-02",
    title: "Duplicate Emails",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a SQL query to report all the duplicate emails in the Person table.",
    sampleInput: "+----+------------------+\n| id | email            |\n+----+------------------+\n| 1  | a@b.com          |\n| 2  | c@d.com          |\n| 3  | a@b.com          |\n+----+------------------+",
    sampleOutput: "+------------------+\n| Email            |\n+------------------+\n| a@b.com          |\n+------------------+",
    constraints: ["Emails are case-insensitive."],
    tableSchema: {
      tableName: "Person",
      columns: [{ name: "id", type: "INT (PK)" }, { name: "email", type: "VARCHAR(255)" }],
    },
    hints: ["Use GROUP BY email HAVING COUNT(email) > 1."],
    initialCode: "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1;",
    solutionCode: "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1;",
  },
  {
    id: "sql-easy-03",
    title: "Customers Who Never Order",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a query to find all customers who never ordered anything.",
    sampleInput: "Customers: (1: Joe, 2: Henry, 3: Sam)\nOrders: (1: 3, 2: 1)",
    sampleOutput: "+-----------+\n| Customers |\n+-----------+\n| Henry     |\n+-----------+",
    constraints: ["Use NOT IN or LEFT JOIN WHERE order_id IS NULL."],
    tableSchema: {
      tableName: "Customers",
      columns: [{ name: "id", type: "INT (PK)" }, { name: "name", type: "VARCHAR(50)" }],
    },
    hints: ["Use LEFT JOIN Orders ON Customers.id = Orders.customerId WHERE Orders.id IS NULL."],
    initialCode: "SELECT name AS Customers FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.id IS NULL;",
    solutionCode: "SELECT name AS Customers FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.id IS NULL;",
  },
  {
    id: "sql-easy-04",
    title: "Employees Earning More Than Their Managers",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a SQL query to find the employees who earn more than their managers.",
    sampleInput: "+----+-------+--------+-----------+\n| id | name  | salary | managerId |\n+----+-------+--------+-----------+\n| 1  | Joe   | 70000  | 3         |\n| 2  | Henry | 80000  | 4         |\n| 3  | Sam   | 60000  | Null      |\n+----+-------+--------+-----------+",
    sampleOutput: "+----------+\n| Employee |\n+----------+\n| Joe      |\n+----------+",
    constraints: ["Perform a self-join on Employee table."],
    tableSchema: {
      tableName: "Employee",
      columns: [{ name: "id", type: "INT (PK)" }, { name: "name", type: "VARCHAR" }, { name: "salary", type: "INT" }, { name: "managerId", type: "INT (FK)" }],
    },
    hints: ["JOIN Employee e1 WITH Employee e2 ON e1.managerId = e2.id WHERE e1.salary > e2.salary"],
    initialCode: "SELECT e1.name AS Employee FROM Employee e1 JOIN Employee e2 ON e1.managerId = e2.id WHERE e1.salary > e2.salary;",
    solutionCode: "SELECT e1.name AS Employee FROM Employee e1 JOIN Employee e2 ON e1.managerId = e2.id WHERE e1.salary > e2.salary;",
  },
  {
    id: "sql-easy-05",
    title: "Big Countries",
    difficulty: "EASY",
    points: 15,
    problemStatement: "A country is big if it has an area of at least 3,000,000 km² or a population of at least 25,000,000. Write a query to report the name, population, and area of big countries.",
    sampleInput: "+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 31889223   | 652230  |\n| Albania     | 2873757    | 28748   |\n+-------------+------------+---------+",
    sampleOutput: "+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 31889223   | 652230  |\n+-------------+------------+---------+",
    constraints: ["Use OR logic operator."],
    tableSchema: {
      tableName: "World",
      columns: [{ name: "name", type: "VARCHAR" }, { name: "population", type: "INT" }, { name: "area", type: "INT" }],
    },
    hints: ["WHERE area >= 3000000 OR population >= 25000000"],
    initialCode: "SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;",
    solutionCode: "SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;",
  },

  // ==========================================
  // MEDIUM QUESTIONS (15+)
  // ==========================================
  {
    id: "sql-med-01",
    title: "Department Highest Salary",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Write a SQL query to find employees who have the highest salary in each of the departments.",
    sampleInput: "Employee & Department tables with salaries across Tech, HR, Sales",
    sampleOutput: "+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Max      | 90000  |\n| Sales      | Henry    | 80000  |\n+------------+----------+--------+",
    constraints: ["If there is a tie, return all employees with the max salary."],
    tableSchema: {
      tableName: "Employee & Department",
      columns: [{ name: "departmentId", type: "INT" }, { name: "salary", type: "INT" }],
    },
    hints: ["Use IN (SELECT MAX(salary) FROM Employee GROUP BY departmentId)"],
    initialCode: "SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);",
    solutionCode: "SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);",
  },
  {
    id: "sql-med-02",
    title: "Consecutive Numbers",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Find all numbers that appear at least three times consecutively in the Logs table.",
    sampleInput: "+----+-----+\n| Id | Num |\n+----+-----+\n| 1  | 1   |\n| 2  | 1   |\n| 3  | 1   |\n| 4  | 2   |\n+----+-----+",
    sampleOutput: "+-----------------+\n| ConsecutiveNums |\n+-----------------+\n| 1               |\n+-----------------+",
    constraints: ["Distinct consecutive values only."],
    tableSchema: {
      tableName: "Logs",
      columns: [{ name: "Id", type: "INT" }, { name: "Num", type: "INT" }],
    },
    hints: ["Join Logs l1, Logs l2, Logs l3 ON l1.Id = l2.Id-1 AND l2.Id = l3.Id-1 WHERE l1.Num = l2.Num AND l2.Num = l3.Num"],
    initialCode: "SELECT DISTINCT l1.Num AS ConsecutiveNums FROM Logs l1 JOIN Logs l2 ON l1.Id = l2.Id - 1 JOIN Logs l3 ON l2.Id = l3.Id - 1 WHERE l1.Num = l2.Num AND l2.Num = l3.Num;",
    solutionCode: "SELECT DISTINCT l1.Num AS ConsecutiveNums FROM Logs l1 JOIN Logs l2 ON l1.Id = l2.Id - 1 JOIN Logs l3 ON l2.Id = l3.Id - 1 WHERE l1.Num = l2.Num AND l2.Num = l3.Num;",
  },
  {
    id: "sql-med-03",
    title: "Rank Scores (DENSE_RANK)",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Write a SQL query to rank scores. If there is a tie between two scores, both should have the same ranking, and the next ranking number should be the next consecutive integer (no gaps).",
    sampleInput: "+-------+\n| Score |\n+-------+\n| 3.50  |\n| 4.00  |\n| 4.00  |\n| 3.85  |\n+-------+",
    sampleOutput: "+-------+------+\n| score | rank |\n+-------+------+\n| 4.00  | 1    |\n| 4.00  | 1    |\n| 3.85  | 2    |\n| 3.50  | 3    |\n+-------+------+",
    constraints: ["Must use DENSE_RANK() OVER (ORDER BY score DESC)."],
    tableSchema: {
      tableName: "Scores",
      columns: [{ name: "id", type: "INT" }, { name: "score", type: "DECIMAL(3,2)" }],
    },
    hints: ["DENSE_RANK() OVER (ORDER BY score DESC) as 'rank'"],
    initialCode: "SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM Scores;",
    solutionCode: "SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM Scores;",
  },

  // ==========================================
  // HARD QUESTIONS (10+)
  // ==========================================
  {
    id: "sql-hard-01",
    title: "Department Top 3 Salaries",
    difficulty: "HARD",
    points: 50,
    problemStatement: "A company's executives are interested in seeing who earns the most money in each department. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.",
    sampleInput: "Employee & Department tables with multiple tied salaries",
    sampleOutput: "+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Max      | 90000  |\n| IT         | Joe      | 85000  |\n| IT         | Randy    | 85000  |\n| IT         | Will     | 70000  |\n+------------+----------+--------+",
    constraints: ["Top 3 UNIQUE salaries per department."],
    tableSchema: {
      tableName: "Employee",
      columns: [{ name: "name", type: "VARCHAR" }, { name: "salary", type: "INT" }, { name: "departmentId", type: "INT" }],
    },
    hints: ["Use DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) <= 3"],
    initialCode: "WITH Ranked AS (\n  SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rk\n  FROM Employee\n)\nSELECT d.name as Department, r.name as Employee, r.salary as Salary\nFROM Ranked r JOIN Department d ON r.departmentId = d.id WHERE r.rk <= 3;",
    solutionCode: "WITH Ranked AS (\n  SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rk\n  FROM Employee\n)\nSELECT d.name as Department, r.name as Employee, r.salary as Salary\nFROM Ranked r JOIN Department d ON r.departmentId = d.id WHERE r.rk <= 3;",
  },
  {
    id: "sql-hard-02",
    title: "Trips and Users (Cancellation Rate)",
    difficulty: "HARD",
    points: 50,
    problemStatement: "The cancellation rate is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day. Find the cancellation rate between '2013-10-01' and '2013-10-03'.",
    sampleInput: "Trips & Users tables containing banned status and cancellation statuses",
    sampleOutput: "+------------+-------------------+\n| Day        | Cancellation Rate |\n+------------+-------------------+\n| 2013-10-01 | 0.33              |\n| 2013-10-02 | 0.00              |\n+------------+-------------------+",
    constraints: ["Round Cancellation Rate to 2 decimal places."],
    tableSchema: {
      tableName: "Trips & Users",
      columns: [{ name: "request_at", type: "DATE" }, { name: "status", type: "VARCHAR" }],
    },
    hints: ["ROUND(COUNT(CASE WHEN status != 'completed' THEN 1 END) / COUNT(*), 2)"],
    initialCode: "SELECT request_at AS Day, ROUND(SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) / COUNT(*), 2) AS 'Cancellation Rate' FROM Trips t JOIN Users c ON t.client_id = c.users_id JOIN Users d ON t.driver_id = d.users_id WHERE c.banned = 'No' AND d.banned = 'No' AND request_at BETWEEN '2013-10-01' AND '2013-10-03' GROUP BY request_at;",
    solutionCode: "SELECT request_at AS Day, ROUND(SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) / COUNT(*), 2) AS 'Cancellation Rate' FROM Trips t JOIN Users c ON t.client_id = c.users_id JOIN Users d ON t.driver_id = d.users_id WHERE c.banned = 'No' AND d.banned = 'No' AND request_at BETWEEN '2013-10-01' AND '2013-10-03' GROUP BY request_at;",
  },
];
