export const linearSearchExercise = {
  id: 'linear-search',
  title: 'Linear Search',
  titleFa: 'جستجوی خطی',
  difficulty: 'easy',
  
  description: `
Implement a linear search function that finds the index of a target value in an array.

Write a function \`linearSearch(arr, target)\` that:
- Returns the index of target if found
- Returns -1 if target is not in the array
`,
  
  descriptionFa: `
تابع جستجوی خطی را پیاده‌سازی کنید که اندیس مقدار هدف را در آرایه پیدا کند.

تابعی به نام \`linearSearch(arr, target)\` بنویسید که:
- اگر هدف پیدا شد، اندیس آن را برگرداند
- اگر هدف در آرایه نبود، -1 برگرداند
`,

  starterCode: `function linearSearch(arr, target) {
  // Search through the array to find target
  // Return the index if found, -1 if not found
  
}`,

  solution: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,

  testCases: [
    { input: [[1, 3, 5, 7, 9], 5], expected: 2, description: 'Find 5 in middle' },
    { input: [[1, 3, 5, 7, 9], 1], expected: 0, description: 'Find first element' },
    { input: [[1, 3, 5, 7, 9], 9], expected: 4, description: 'Find last element' },
    { input: [[1, 3, 5, 7, 9], 4], expected: -1, description: 'Element not found' },
    { input: [[], 5], expected: -1, description: 'Empty array' },
  ],

  hints: ['Loop through each element', 'Compare each element with target', 'Return index when found'],
};

export default linearSearchExercise;
