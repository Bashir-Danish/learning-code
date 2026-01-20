export const fastSlowPointersExercise = {
  id: 'fast-slow-pointers',
  title: 'Detect Cycle',
  titleFa: 'تشخیص حلقه',
  difficulty: 'easy',
  
  description: `
Detect if a linked list has a cycle using Floyd's algorithm.

Write a function \`hasCycle(head)\` that returns true if there's a cycle.

Note: A linked list node has \`val\` and \`next\` properties.
`,

  starterCode: `function hasCycle(head) {
  // Use slow and fast pointers
  
}`,

  solution: `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,

  testCases: [
    { input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }], expected: false, description: 'No cycle - simple list' },
    { input: [null], expected: false, description: 'Empty list' },
    { input: [{ val: 1, next: null }], expected: false, description: 'Single node' },
  ],

  hints: ['Slow moves 1 step', 'Fast moves 2 steps', 'They meet if cycle exists'],
};

export default fastSlowPointersExercise;
