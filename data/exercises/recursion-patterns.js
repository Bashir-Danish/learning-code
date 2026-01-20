export const recursionPatternsExercise = {
  id: 'recursion-patterns',
  title: 'Fibonacci',
  titleFa: 'فیبوناچی',
  difficulty: 'easy',
  
  description: `
Calculate the nth Fibonacci number using recursion.

Write a function \`fibonacci(n)\` that returns the nth Fibonacci number.
`,

  starterCode: `function fibonacci(n) {
  // Base cases and recursive case
  
}`,

  solution: `function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,

  testCases: [
    { input: [0], expected: 0, description: 'fib(0) = 0' },
    { input: [1], expected: 1, description: 'fib(1) = 1' },
    { input: [5], expected: 5, description: 'fib(5) = 5' },
    { input: [10], expected: 55, description: 'fib(10) = 55' },
  ],

  hints: ['Base cases: fib(0)=0, fib(1)=1', 'Recursive: fib(n-1) + fib(n-2)', 'This is inefficient but correct'],
};

export default recursionPatternsExercise;
