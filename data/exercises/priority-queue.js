export const priorityQueueExercise = {
  id: 'priority-queue',
  title: 'Last Stone Weight',
  titleFa: 'وزن آخرین سنگ',
  difficulty: 'easy',
  
  description: `
Smash stones together, heaviest first. Return weight of last stone.

Write a function \`lastStoneWeight(stones)\` that simulates the process.
`,

  starterCode: `function lastStoneWeight(stones) {
  // Repeatedly take two heaviest stones
  
}`,

  solution: `function lastStoneWeight(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    const first = stones.shift();
    const second = stones.shift();
    if (first !== second) {
      stones.push(first - second);
    }
  }
  return stones.length === 0 ? 0 : stones[0];
}`,

  testCases: [
    { input: [[2, 7, 4, 1, 8, 1]], expected: 1, description: 'Last stone weight' },
    { input: [[1]], expected: 1, description: 'Single stone' },
    { input: [[2, 2]], expected: 0, description: 'Equal stones' },
  ],

  hints: ['Sort to find heaviest', 'Smash two heaviest', 'Add difference if not equal'],
};

export default priorityQueueExercise;
