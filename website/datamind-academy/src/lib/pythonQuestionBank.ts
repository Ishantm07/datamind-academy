export interface PythonQuestion {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  points: number;
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  hints: string[];
  initialCode: string;
  solutionCode: string;
}

export const PYTHON_QUESTION_POOL: PythonQuestion[] = [
  // ==========================================
  // EASY QUESTIONS (15+)
  // ==========================================
  {
    id: "py-easy-01",
    title: "Palindrome String Checker",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a function `is_palindrome(s)` that takes a string `s`, removes all non-alphanumeric characters, converts it to lowercase, and returns `True` if it is a palindrome, or `False` otherwise.",
    sampleInput: '"A man, a plan, a canal: Panama"',
    sampleOutput: "True",
    constraints: ["Consider only alphanumeric characters and ignore cases.", "0 <= len(s) <= 2 * 10^5"],
    hints: ["Filter using `c.isalnum()` and compare `cleaned == cleaned[::-1]`."],
    initialCode: "def is_palindrome(s: str) -> bool:\n    # Write your solution here\n    pass",
    solutionCode: "def is_palindrome(s: str) -> bool:\n    cleaned = ''.join(c.lower() for c in s if c.isalnum())\n    return cleaned == cleaned[::-1]",
  },
  {
    id: "py-easy-02",
    title: "Two Sum Target Lookup",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Given a list of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.",
    sampleInput: "nums = [2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
    constraints: ["Only one valid answer exists.", "Can be solved in O(n) time using a dictionary."],
    hints: ["Use a dictionary to store seen numbers and their indices: `seen[num] = index`."],
    initialCode: "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass",
    solutionCode: "def two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
  },
  {
    id: "py-easy-03",
    title: "List Comprehension & Filtering",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a function `filter_even_squares(numbers)` that takes a list of integers and returns a new list containing the squares of only the even integers, preserving their original order.",
    sampleInput: "[1, 2, 3, 4, 5, 6]",
    sampleOutput: "[4, 16, 36]",
    constraints: ["Must use a single-line list comprehension."],
    hints: ["Use `[x**2 for x in numbers if x % 2 == 0]`."],
    initialCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    # Write single-line list comprehension\n    pass",
    solutionCode: "def filter_even_squares(numbers: list[int]) -> list[int]:\n    return [x**2 for x in numbers if x % 2 == 0]",
  },
  {
    id: "py-easy-04",
    title: "Count Character Frequencies",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Write a function `char_frequency(s)` that returns a dictionary mapping each character in the string `s` to its count.",
    sampleInput: '"banana"',
    sampleOutput: "{'b': 1, 'a': 3, 'n': 2}",
    constraints: ["Case-sensitive counting."],
    hints: ["Use standard dictionary `.get(char, 0) + 1` or `collections.Counter`."],
    initialCode: "def char_frequency(s: str) -> dict[str, int]:\n    # Write your solution here\n    pass",
    solutionCode: "def char_frequency(s: str) -> dict[str, int]:\n    counts = {}\n    for c in s:\n        counts[c] = counts.get(c, 0) + 1\n    return counts",
  },
  {
    id: "py-easy-05",
    title: "Merge Two Sorted Lists",
    difficulty: "EASY",
    points: 15,
    problemStatement: "Given two sorted integer lists `list1` and `list2`, merge them into a single sorted list and return it.",
    sampleInput: "list1 = [1, 3, 5], list2 = [2, 4, 6]",
    sampleOutput: "[1, 2, 3, 4, 5, 6]",
    constraints: ["The output list must be sorted in ascending order."],
    hints: ["Use two pointers or `sorted(list1 + list2)`."],
    initialCode: "def merge_sorted_lists(list1: list[int], list2: list[int]) -> list[int]:\n    # Write your solution here\n    pass",
    solutionCode: "def merge_sorted_lists(list1: list[int], list2: list[int]) -> list[int]:\n    return sorted(list1 + list2)",
  },

  // ==========================================
  // MEDIUM QUESTIONS (15+)
  // ==========================================
  {
    id: "py-med-01",
    title: "Group Anagrams",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Given an array of strings `strs`, group the anagrams together. Return the list of groups in any order.",
    sampleInput: '["eat", "tea", "tan", "ate", "nat", "bat"]',
    sampleOutput: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]',
    constraints: ["All inputs consist of lowercase English letters."],
    hints: ["Sort each string to use as a dictionary key: `tuple(sorted(word))`."],
    initialCode: "from collections import defaultdict\n\ndef group_anagrams(strs: list[str]) -> list[list[str]]:\n    # Write your solution here\n    pass",
    solutionCode: "from collections import defaultdict\n\ndef group_anagrams(strs: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    for s in strs:\n        groups[''.join(sorted(s))].append(s)\n    return list(groups.values())",
  },
  {
    id: "py-med-02",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Given a string `s`, find the length of the longest substring without repeating characters using the sliding window technique.",
    sampleInput: '"abcabcbb"',
    sampleOutput: "3 (the substring is 'abc')",
    constraints: ["0 <= len(s) <= 5 * 10^4", "Solve in O(n) time using sliding window."],
    hints: ["Maintain a sliding window with a dictionary storing the last seen index of each character."],
    initialCode: "def length_of_longest_substring(s: str) -> int:\n    # Write sliding window solution\n    pass",
    solutionCode: "def length_of_longest_substring(s: str) -> int:\n    seen = {}\n    max_len = start = 0\n    for i, c in enumerate(s):\n        if c in seen and seen[c] >= start:\n            start = seen[c] + 1\n        seen[c] = i\n        max_len = max(max_len, i - start + 1)\n    return max_len",
  },
  {
    id: "py-med-03",
    title: "Custom Timer Decorator",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Write a function decorator `@timed` that measures the execution time of any function, logs its duration in seconds, and returns the function's original output.",
    sampleInput: "@timed\ndef slow_add(a, b):\n    return a + b",
    sampleOutput: "Returns a + b and records duration.",
    constraints: ["Use `functools.wraps` to preserve function metadata."],
    hints: ["Import `time` and `functools.wraps`. Record `start = time.time()`, call `func(*args, **kwargs)`, then calculate elapsed."],
    initialCode: "import time\nfrom functools import wraps\n\ndef timed(func):\n    # Implement decorator\n    pass",
    solutionCode: "import time\nfrom functools import wraps\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        duration = time.time() - start\n        wrapper.last_duration = duration\n        return result\n    return wrapper",
  },
  {
    id: "py-med-04",
    title: "Flatten Nested List Iterator",
    difficulty: "MEDIUM",
    points: 30,
    problemStatement: "Write a generator function `flatten(nested_list)` that takes an arbitrarily nested list of integers and yields numbers in depth-first order.",
    sampleInput: "[1, [2, [3, 4], 5], [6, 7]]",
    sampleOutput: "list(flatten(...)) -> [1, 2, 3, 4, 5, 6, 7]",
    constraints: ["Use recursion or a stack with Python generators (`yield from`)."],
    hints: ["Check `isinstance(item, list)`, then `yield from flatten(item)` else `yield item`."],
    initialCode: "def flatten(nested_list):\n    # Implement generator\n    pass",
    solutionCode: "def flatten(nested_list):\n    for item in nested_list:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item",
  },

  // ==========================================
  // HARD QUESTIONS (10+)
  // ==========================================
  {
    id: "py-hard-01",
    title: "LRU Cache Implementation",
    difficulty: "HARD",
    points: 50,
    problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get(key)` and `put(key, value)` operating in O(1) average time complexity.",
    sampleInput: "lru = LRUCache(2); lru.put(1, 1); lru.put(2, 2); lru.get(1); lru.put(3, 3); // evicts key 2",
    sampleOutput: "lru.get(2) -> -1",
    constraints: ["Both `get` and `put` must run in O(1) time complexity.", "Use `collections.OrderedDict` or Doubly Linked List + Hash Map."],
    hints: ["Use `collections.OrderedDict`. On access, use `move_to_end(key)`. On overflow, use `popitem(last=False)`."],
    initialCode: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass",
    solutionCode: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)",
  },
  {
    id: "py-hard-02",
    title: "Custom Context Manager (Dunder Methods)",
    difficulty: "HARD",
    points: 50,
    problemStatement: "Create a class `AtomicTransaction` implementing `__enter__` and `__exit__`. If an exception is raised within the `with` block, roll back changes made to a target dictionary and suppress only `ValueError` exceptions.",
    sampleInput: "state = {'balance': 100}\nwith AtomicTransaction(state):\n    state['balance'] += 50\n    raise ValueError('Fail')",
    sampleOutput: "state['balance'] remains 100 (rolled back).",
    constraints: ["`__exit__` should return `True` to suppress ValueError, and restore original dictionary state on error."],
    hints: ["Make a shallow/deep copy in `__enter__`. In `__exit__`, if `exc_type` is not None, restore the copy. Return `exc_type is ValueError`."],
    initialCode: "class AtomicTransaction:\n    def __init__(self, target_dict: dict):\n        self.target = target_dict\n        self.backup = None\n\n    def __enter__(self):\n        pass\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        pass",
    solutionCode: "class AtomicTransaction:\n    def __init__(self, target_dict: dict):\n        self.target = target_dict\n        self.backup = None\n\n    def __enter__(self):\n        self.backup = self.target.copy()\n        return self.target\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is not None:\n            self.target.clear()\n            self.target.update(self.backup)\n            return exc_type is ValueError\n        return False",
  },
];
