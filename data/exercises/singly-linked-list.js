export const singlyLinkedListExercise = {
  id: 'singly-linked-list',
  title: 'Linked List Length',
  titleFa: 'طول لیست پیوندی',
  difficulty: 'easy',
  
  description: `
Find the length of a singly linked list.

Write a function \`getLength(head)\` that returns the number of nodes.
`,

  starterCode: `function getLength(head) {
  // Traverse and count nodes
  
}`,

  solution: `function getLength(head) {
  let count = 0;
  let current = head;
  while (current !== null) {
    count++;
    current = current.next;
  }
  return count;
}`,

  testCases: [
    { input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }], expected: 3, description: 'Three nodes' },
    { input: [{ val: 1, next: null }], expected: 1, description: 'Single node' },
    { input: [null], expected: 0, description: 'Empty list' },
  ],

  hints: ['Start from head', 'Move to next until null', 'Count each node'],
};

export default singlyLinkedListExercise;
