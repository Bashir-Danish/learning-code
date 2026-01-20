export const binarySearchExercise = {
  id: 'binary-search',
  lessonId: 'binary-search',
  title: 'Implement Binary Search',
  titleFa: 'پیاده‌سازی جستجوی دودویی',
  
  description: `
Implement the Binary Search algorithm to find a target value in a sorted array.

**Requirements:**
- Return the index of the target if found
- Return -1 if the target is not in the array
- The input array is already sorted in ascending order
- Use the binary search algorithm (divide and conquer)
`,
  
  descriptionFa: `
الگوریتم جستجوی دودویی را برای یافتن یک مقدار هدف در آرایه مرتب پیاده‌سازی کنید.

**الزامات:**
- اندیس هدف را برگردانید اگر پیدا شد
- اگر هدف در آرایه نیست، -1 برگردانید
- آرایه ورودی از قبل به ترتیب صعودی مرتب شده است
`,

  examples: [
    {
      input: 'arr = [1, 3, 5, 7, 9], target = 5',
      output: '2',
      explanation: '5 is at index 2',
    },
    {
      input: 'arr = [1, 3, 5, 7, 9], target = 6',
      output: '-1',
      explanation: '6 is not in the array',
    },
  ],

  constraints: [
    'Array is sorted in ascending order',
    'Array length: 1 ≤ n ≤ 10000',
    'Array values: -10000 ≤ arr[i] ≤ 10000',
    'All values in array are unique',
  ],

  starterCode: `function binarySearch(arr, target) {
  // Your code here
  // Hint: Use two pointers (left and right)
  // Calculate mid and compare with target
  
  return -1;
}`,

  testCases: [
    {
      input: { arr: [1, 3, 5, 7, 9], target: 5 },
      expectedOutput: 2,
      isHidden: false,
    },
    {
      input: { arr: [1, 3, 5, 7, 9], target: 1 },
      expectedOutput: 0,
      isHidden: false,
    },
    {
      input: { arr: [1, 3, 5, 7, 9], target: 9 },
      expectedOutput: 4,
      isHidden: false,
    },
    {
      input: { arr: [1, 3, 5, 7, 9], target: 6 },
      expectedOutput: -1,
      isHidden: false,
    },
    {
      input: { arr: [2, 4, 6, 8, 10, 12, 14, 16], target: 10 },
      expectedOutput: 4,
      isHidden: true,
    },
    {
      input: { arr: [1], target: 1 },
      expectedOutput: 0,
      isHidden: true,
    },
    {
      input: { arr: [1, 2], target: 2 },
      expectedOutput: 1,
      isHidden: true,
    },
  ],

  hints: [
    'Initialize two pointers: left = 0 and right = arr.length - 1',
    'Calculate mid as Math.floor((left + right) / 2)',
    'If arr[mid] === target, return mid',
    'If arr[mid] < target, search the right half (left = mid + 1)',
    'If arr[mid] > target, search the left half (right = mid - 1)',
  ],

  solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,

  solutionExplanation: `
**How it works:**

1. **Initialize pointers**: Start with \`left = 0\` and \`right = arr.length - 1\`

2. **Loop while valid range**: Continue while \`left <= right\`

3. **Calculate middle**: \`mid = Math.floor((left + right) / 2)\`

4. **Compare and decide**:
   - If \`arr[mid] === target\`: Found it! Return \`mid\`
   - If \`arr[mid] < target\`: Target is in right half, so \`left = mid + 1\`
   - If \`arr[mid] > target\`: Target is in left half, so \`right = mid - 1\`

5. **Not found**: If loop ends, return \`-1\`

**Time Complexity:** O(log n) - We halve the search space each iteration
**Space Complexity:** O(1) - Only using a few variables
`,
};

export default binarySearchExercise;
