export const bfsExercise = {
  id: 'bfs',
  title: 'Level Order Traversal',
  titleFa: 'پیمایش سطحی',
  difficulty: 'medium',
  
  description: `
Perform level order traversal of a binary tree.

Write a function \`levelOrder(root)\` that returns values level by level.
`,

  starterCode: `function levelOrder(root) {
  // Use queue for BFS
  
}`,

  solution: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,

  testCases: [
    { input: [{ val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }], expected: [[3], [9, 20], [15, 7]], description: 'Level order' },
    { input: [null], expected: [], description: 'Empty tree' },
  ],

  hints: ['Use queue for BFS', 'Process level by level', 'Track level size'],
};

export default bfsExercise;
