export const timeComplexityExercise = {
  id: 'time-complexity',
  title: 'Identify Time Complexity',
  titleFa: 'شناسایی پیچیدگی زمانی',
  difficulty: 'easy',
  
  description: `
Analyze the time complexity of given code snippets.

Write a function \`getTimeComplexity(code)\` that returns the Big O notation.
`,

  starterCode: `function getTimeComplexity(code) {
  // Analyze the code pattern and return Big O
  // 'single-loop' -> 'O(n)'
  // 'nested-loop' -> 'O(n^2)'
  // 'constant' -> 'O(1)'
  // 'logarithmic' -> 'O(log n)'
  
}`,

  solution: `function getTimeComplexity(code) {
  const patterns = {
    'single-loop': 'O(n)',
    'nested-loop': 'O(n^2)',
    'constant': 'O(1)',
    'logarithmic': 'O(log n)',
    'triple-loop': 'O(n^3)'
  };
  return patterns[code] || 'Unknown';
}`,

  testCases: [
    { input: ['single-loop'], expected: 'O(n)', description: 'Single loop' },
    { input: ['nested-loop'], expected: 'O(n^2)', description: 'Nested loops' },
    { input: ['constant'], expected: 'O(1)', description: 'Constant time' },
    { input: ['logarithmic'], expected: 'O(log n)', description: 'Binary search pattern' },
  ],

  hints: ['Single loop is O(n)', 'Nested loops multiply', 'Halving is logarithmic'],
};

export default timeComplexityExercise;
