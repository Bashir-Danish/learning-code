export const memoizationExercise = {
  id: 'memoization',
  title: 'Fibonacci with Memo',
  titleFa: 'فیبوناچی با حافظه',
  difficulty: 'easy',
  
  description: `
Calculate Fibonacci using memoization for efficiency.

Write a function \`fib(n)\` that uses memoization.
`,

  starterCode: `function fib(n, memo = {}) {
  // Use memo to cache results
  
}`,

  solution: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,

  testCases: [
    { input: [10], expected: 55, description: 'fib(10) = 55' },
    { input: [20], expected: 6765, description: 'fib(20) = 6765' },
    { input: [0], expected: 0, description: 'fib(0) = 0' },
  ],

  hints: ['Check memo first', 'Store result before returning', 'Pass memo to recursive calls'],
};

export default memoizationExercise;
