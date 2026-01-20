export const linkedListReversalExercise = {
  id: 'linked-list-reversal',
  title: 'Reverse Linked List',
  titleFa: 'معکوس کردن لیست پیوندی',
  difficulty: 'easy',
  
  description: `
Reverse a singly linked list.

Write a function \`reverseList(head)\` that returns the new head.
`,

  starterCode: `function reverseList(head) {
  // Use three pointers: prev, current, next
  
}`,

  solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,

  testCases: [
    { input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }], expected: { val: 3, next: { val: 2, next: { val: 1, next: null } } }, description: 'Reverse 1->2->3' },
    { input: [{ val: 1, next: null }], expected: { val: 1, next: null }, description: 'Single node' },
    { input: [null], expected: null, description: 'Empty list' },
  ],

  hints: ['Keep track of prev, current, next', 'Reverse pointer direction', 'Return prev at end'],
};

export default linkedListReversalExercise;
