export const bigOExercise = {
  id: 'big-o',
  title: 'Big O Analysis',
  titleFa: 'تحلیل Big O',
  difficulty: 'easy',
  
  description: `
Given a function, determine its time complexity in Big O notation.

Write a function \`getTimeComplexity(code)\` that returns the Big O notation as a string.

For this exercise, analyze the following patterns:
- Single loop over n elements → O(n)
- Nested loops over n elements → O(n²)
- No loops, constant operations → O(1)
- Loop that halves the input → O(log n)
`,
  
  descriptionFa: `
با توجه به یک تابع، پیچیدگی زمانی آن را با نماد Big O تعیین کنید.

تابعی به نام \`getTimeComplexity(code)\` بنویسید که نماد Big O را به صورت رشته برگرداند.

برای این تمرین، الگوهای زیر را تحلیل کنید:
- یک حلقه روی n عنصر → O(n)
- حلقه‌های تودرتو روی n عنصر → O(n²)
- بدون حلقه، عملیات ثابت → O(1)
- حلقه‌ای که ورودی را نصف می‌کند → O(log n)
`,

  starterCode: `function getTimeComplexity(pattern) {
  // pattern can be: 'single-loop', 'nested-loop', 'constant', 'halving'
  // Return the Big O notation as a string: 'O(n)', 'O(n²)', 'O(1)', 'O(log n)'
  
  // Your code here
  
}`,

  solution: `function getTimeComplexity(pattern) {
  // pattern can be: 'single-loop', 'nested-loop', 'constant', 'halving'
  // Return the Big O notation as a string
  
  switch (pattern) {
    case 'single-loop':
      return 'O(n)';
    case 'nested-loop':
      return 'O(n²)';
    case 'constant':
      return 'O(1)';
    case 'halving':
      return 'O(log n)';
    default:
      return 'Unknown';
  }
}`,

  testCases: [
    {
      input: ['single-loop'],
      expected: 'O(n)',
      description: 'Single loop is O(n)',
    },
    {
      input: ['nested-loop'],
      expected: 'O(n²)',
      description: 'Nested loops is O(n²)',
    },
    {
      input: ['constant'],
      expected: 'O(1)',
      description: 'Constant operations is O(1)',
    },
    {
      input: ['halving'],
      expected: 'O(log n)',
      description: 'Halving loop is O(log n)',
    },
  ],

  hints: [
    'Think about how many times each pattern iterates',
    'Single loop: runs n times',
    'Nested loop: runs n × n times',
    'Constant: runs fixed number of times',
    'Halving: runs log₂(n) times',
  ],

  hintsFa: [
    'فکر کنید هر الگو چند بار تکرار می‌شود',
    'حلقه تکی: n بار اجرا می‌شود',
    'حلقه تودرتو: n × n بار اجرا می‌شود',
    'ثابت: تعداد ثابتی اجرا می‌شود',
    'نصف کردن: log₂(n) بار اجرا می‌شود',
  ],
};

export default bigOExercise;
