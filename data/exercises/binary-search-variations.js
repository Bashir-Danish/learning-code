export const binarySearchVariationsExercise = {
  id: 'binary-search-variations',
  title: 'Search in Rotated Array',
  titleFa: 'جستجو در آرایه چرخیده',
  difficulty: 'medium',
  
  description: `
Search for a target in a rotated sorted array.

Write a function \`search(nums, target)\` that returns the index or -1.
`,

  starterCode: `function search(nums, target) {
  // Modified binary search
  
}`,

  solution: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,

  testCases: [
    { input: [[4,5,6,7,0,1,2], 0], expected: 4, description: 'Find 0' },
    { input: [[4,5,6,7,0,1,2], 3], expected: -1, description: 'Not found' },
    { input: [[1], 0], expected: -1, description: 'Single element' },
  ],

  hints: ['Find which half is sorted', 'Check if target in sorted half', 'Adjust search range'],
};

export default binarySearchVariationsExercise;
