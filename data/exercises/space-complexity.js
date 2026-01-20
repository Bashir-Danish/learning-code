export const spaceComplexityExercise = {
  id: 'space-complexity',
  title: 'Identify Space Complexity',
  titleFa: 'شناسایی پیچیدگی فضایی',
  difficulty: 'easy',
  
  description: `
Analyze the space complexity of given algorithms.

Write a function \`getSpaceComplexity(algorithm)\` that returns the Big O space notation.
`,

  starterCode: `function getSpaceComplexity(algorithm) {
  // 'in-place-sort' -> 'O(1)'
  // 'copy-array' -> 'O(n)'
  // 'matrix' -> 'O(n^2)'
  // 'recursive-n' -> 'O(n)'
  
}`,

  solution: `function getSpaceComplexity(algorithm) {
  const patterns = {
    'in-place-sort': 'O(1)',
    'copy-array': 'O(n)',
    'matrix': 'O(n^2)',
    'recursive-n': 'O(n)',
    'hash-map': 'O(n)'
  };
  return patterns[algorithm] || 'Unknown';
}`,

  testCases: [
    { input: ['in-place-sort'], expected: 'O(1)', description: 'In-place algorithm' },
    { input: ['copy-array'], expected: 'O(n)', description: 'Array copy' },
    { input: ['matrix'], expected: 'O(n^2)', description: '2D matrix' },
    { input: ['recursive-n'], expected: 'O(n)', description: 'Recursive call stack' },
  ],

  hints: ['In-place uses constant space', 'Copying uses linear space', 'Recursion uses stack space'],
};

export default spaceComplexityExercise;
