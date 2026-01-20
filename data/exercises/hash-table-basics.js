export const hashTableBasicsExercise = {
  id: 'hash-table-basics',
  title: 'Two Sum',
  titleFa: 'جمع دو عدد',
  difficulty: 'easy',
  
  description: `
Find two numbers in an array that add up to a target using a hash map.

Write a function \`twoSum(nums, target)\` that returns indices of the two numbers.
`,

  starterCode: `function twoSum(nums, target) {
  // Use a hash map to find complement
  
}`,

  solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,

  testCases: [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'Find 2+7=9' },
    { input: [[3, 2, 4], 6], expected: [1, 2], description: 'Find 2+4=6' },
    { input: [[3, 3], 6], expected: [0, 1], description: 'Same numbers' },
  ],

  hints: ['Store number and index in map', 'Check if complement exists', 'Return indices when found'],
};

export default hashTableBasicsExercise;
