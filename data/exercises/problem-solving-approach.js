export const problemSolvingApproachExercise = {
  id: 'problem-solving-approach',
  title: 'Problem Analysis',
  titleFa: 'تحلیل مسئله',
  difficulty: 'easy',
  
  description: `
Practice the problem-solving approach by analyzing a problem.

Given a problem description, identify the correct approach to solve it.
`,

  starterCode: `function identifyApproach(problem) {
  // Match problem type to approach
  // 'find-pair-sum' -> 'two-pointers'
  // 'find-subarray' -> 'sliding-window'
  // 'search-sorted' -> 'binary-search'
  // 'traverse-tree' -> 'recursion'
  
}`,

  solution: `function identifyApproach(problem) {
  const approaches = {
    'find-pair-sum': 'two-pointers',
    'find-subarray': 'sliding-window',
    'search-sorted': 'binary-search',
    'traverse-tree': 'recursion',
    'shortest-path': 'bfs',
    'all-paths': 'dfs'
  };
  return approaches[problem] || 'brute-force';
}`,

  testCases: [
    { input: ['find-pair-sum'], expected: 'two-pointers', description: 'Pair sum uses two pointers' },
    { input: ['find-subarray'], expected: 'sliding-window', description: 'Subarray uses sliding window' },
    { input: ['search-sorted'], expected: 'binary-search', description: 'Sorted search uses binary search' },
    { input: ['traverse-tree'], expected: 'recursion', description: 'Tree traversal uses recursion' },
  ],

  hints: ['Match problem patterns', 'Sorted array often means binary search', 'Pairs in sorted array use two pointers'],
};

export default problemSolvingApproachExercise;
