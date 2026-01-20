export const recursionBasicsExercise = {
  id: 'recursion-basics',
  title: 'Factorial',
  titleFa: 'فاکتوریل',
  difficulty: 'easy',
  
  description: `
Calculate factorial using recursion.

Write a function \`factorial(n)\` that returns n!
`,

  starterCode: `function factorial(n) {
  // Base case and recursive case
  
}`,

  solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,

  testCases: [
    { input: [5], expected: 120, description: '5! = 120' },
    { input: [0], expected: 1, description: '0! = 1' },
    { input: [1], expected: 1, description: '1! = 1' },
    { input: [3], expected: 6, description: '3! = 6' },
  ],

  hints: ['Base case: n <= 1 returns 1', 'Recursive: n * factorial(n-1)', 'Think of unwinding'],
};

export default recursionBasicsExercise;
