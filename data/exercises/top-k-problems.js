export const topKProblemsExercise = {
  id: 'top-k-problems',
  title: 'Top K Frequent Elements',
  titleFa: 'K عنصر پرتکرار',
  difficulty: 'medium',
  
  description: `
Find the k most frequent elements in an array.

Write a function \`topKFrequent(nums, k)\` that returns the k most frequent.
`,

  starterCode: `function topKFrequent(nums, k) {
  // Count frequencies and find top k
  
}`,

  solution: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
}`,

  testCases: [
    { input: [[1,1,1,2,2,3], 2], expected: [1, 2], description: 'Top 2 frequent' },
    { input: [[1], 1], expected: [1], description: 'Single element' },
  ],

  hints: ['Count frequencies with Map', 'Sort by frequency', 'Take top k'],
};

export default topKProblemsExercise;
