export const heapBasicsExercise = {
  id: 'heap-basics',
  title: 'Kth Largest Element',
  titleFa: 'کمین بزرگترین عنصر',
  difficulty: 'medium',
  
  description: `
Find the kth largest element in an array using a min heap.

Write a function \`findKthLargest(nums, k)\` that returns the kth largest.
`,

  starterCode: `function findKthLargest(nums, k) {
  // Use min heap of size k
  
}`,

  solution: `function findKthLargest(nums, k) {
  // Simple approach: sort and return
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,

  testCases: [
    { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, description: '2nd largest is 5' },
    { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, description: '4th largest is 4' },
  ],

  hints: ['Sort descending', 'Return k-1 index', 'Or use min heap of size k'],
};

export default heapBasicsExercise;
