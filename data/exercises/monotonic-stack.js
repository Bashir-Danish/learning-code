export const monotonicStackExercise = {
  id: 'monotonic-stack',
  title: 'Next Greater Element',
  titleFa: 'عنصر بزرگتر بعدی',
  difficulty: 'medium',
  
  description: `
Find the next greater element for each element in the array.

Write a function \`nextGreaterElement(nums)\` that returns array of next greater elements.
`,

  starterCode: `function nextGreaterElement(nums) {
  // Use monotonic decreasing stack
  
}`,

  solution: `function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,

  testCases: [
    { input: [[2, 1, 2, 4, 3]], expected: [4, 2, 4, -1, -1], description: 'Mixed array' },
    { input: [[1, 2, 3]], expected: [2, 3, -1], description: 'Increasing' },
    { input: [[3, 2, 1]], expected: [-1, -1, -1], description: 'Decreasing' },
  ],

  hints: ['Use stack to track waiting elements', 'Pop when current is greater', 'Remaining stack has no greater'],
};

export default monotonicStackExercise;
