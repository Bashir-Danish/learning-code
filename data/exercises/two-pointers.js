export const twoPointersExercise = {
  id: 'two-pointers',
  title: 'Two Sum Sorted',
  titleFa: 'جمع دو عدد در آرایه مرتب',
  difficulty: 'easy',
  
  description: `
Given a sorted array, find two numbers that add up to a target.

Write a function \`twoSum(arr, target)\` that returns indices of the two numbers.
`,

  starterCode: `function twoSum(arr, target) {
  // Use two pointers from start and end
  
}`,

  solution: `function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [-1, -1];
}`,

  testCases: [
    { input: [[1, 2, 3, 4, 5], 9], expected: [3, 4], description: 'Find 4+5=9' },
    { input: [[1, 2, 3, 4, 5], 3], expected: [0, 1], description: 'Find 1+2=3' },
    { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'Find 2+7=9' },
    { input: [[1, 2, 3], 10], expected: [-1, -1], description: 'No solution' },
  ],

  hints: ['Start with left=0, right=end', 'Move left if sum too small', 'Move right if sum too big'],
};

export default twoPointersExercise;
