export const bubbleSortExercise = {
  id: 'bubble-sort',
  lessonId: 'bubble-sort',
  title: 'Implement Bubble Sort',
  titleFa: 'پیاده‌سازی مرتب‌سازی حبابی',
  
  description: `
Implement the Bubble Sort algorithm to sort an array of numbers in ascending order.

**Requirements:**
- Sort the array in-place (modify the original array)
- Return the sorted array
- Use the bubble sort algorithm (compare adjacent elements and swap if needed)
`,
  
  descriptionFa: `
الگوریتم مرتب‌سازی حبابی را برای مرتب کردن آرایه‌ای از اعداد به ترتیب صعودی پیاده‌سازی کنید.

**الزامات:**
- آرایه را درجا مرتب کنید
- آرایه مرتب شده را برگردانید
- از الگوریتم bubble sort استفاده کنید
`,

  examples: [
    {
      input: '[5, 2, 8, 1, 9]',
      output: '[1, 2, 5, 8, 9]',
      explanation: 'Array sorted in ascending order',
    },
    {
      input: '[3, 1, 4, 1, 5]',
      output: '[1, 1, 3, 4, 5]',
      explanation: 'Handles duplicate values',
    },
  ],

  constraints: [
    'Array length: 1 ≤ n ≤ 100',
    'Array values: -1000 ≤ arr[i] ≤ 1000',
  ],

  starterCode: `function bubbleSort(arr) {
  // Your code here
  // Hint: Use nested loops
  // Outer loop: number of passes
  // Inner loop: compare adjacent elements
  
  return arr;
}`,

  testCases: [
    {
      input: [[5, 2, 8, 1, 9]],
      expectedOutput: [1, 2, 5, 8, 9],
      isHidden: false,
    },
    {
      input: [[3, 1, 4, 1, 5]],
      expectedOutput: [1, 1, 3, 4, 5],
      isHidden: false,
    },
    {
      input: [[1]],
      expectedOutput: [1],
      isHidden: false,
    },
    {
      input: [[2, 1]],
      expectedOutput: [1, 2],
      isHidden: false,
    },
    {
      input: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
      expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isHidden: true,
    },
    {
      input: [[-5, 3, -2, 8, 0]],
      expectedOutput: [-5, -2, 0, 3, 8],
      isHidden: true,
    },
  ],

  hints: [
    'Start with two nested loops: outer loop for passes, inner loop for comparisons.',
    'In each pass, compare arr[j] with arr[j+1] and swap if arr[j] > arr[j+1].',
    'After each pass, the largest unsorted element "bubbles up" to its correct position.',
    'Optimization: If no swaps occur in a pass, the array is already sorted.',
  ],

  solution: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,

  solutionExplanation: `
**How it works:**

1. **Outer loop (i)**: Controls the number of passes. After each pass, the largest unsorted element is in its correct position.

2. **Inner loop (j)**: Compares adjacent elements. Goes from 0 to n-i-1 because the last i elements are already sorted.

3. **Swap**: If arr[j] > arr[j+1], swap them using destructuring assignment.

4. **Optimization**: The \`swapped\` flag tracks if any swaps occurred. If no swaps happen in a pass, the array is already sorted and we can exit early.

**Time Complexity:** O(n²) worst/average, O(n) best (already sorted)
**Space Complexity:** O(1) - in-place sorting
`,
};

export default bubbleSortExercise;
