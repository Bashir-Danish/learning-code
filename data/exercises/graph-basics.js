export const graphBasicsExercise = {
  id: 'graph-basics',
  title: 'Find All Paths',
  titleFa: 'یافتن همه مسیرها',
  difficulty: 'medium',
  
  description: `
Find all paths from node 0 to node n-1 in a directed acyclic graph.

Write a function \`allPathsSourceTarget(graph)\` that returns all paths.
`,

  starterCode: `function allPathsSourceTarget(graph) {
  // Use DFS to find all paths
  
}`,

  solution: `function allPathsSourceTarget(graph) {
  const result = [];
  const target = graph.length - 1;
  
  function dfs(node, path) {
    if (node === target) {
      result.push([...path]);
      return;
    }
    for (const next of graph[node]) {
      path.push(next);
      dfs(next, path);
      path.pop();
    }
  }
  
  dfs(0, [0]);
  return result;
}`,

  testCases: [
    { input: [[[1, 2], [3], [3], []]], expected: [[0, 1, 3], [0, 2, 3]], description: 'Two paths' },
    { input: [[[1], []]], expected: [[0, 1]], description: 'Single path' },
  ],

  hints: ['Start DFS from node 0', 'Track current path', 'Add to result when reaching target'],
};

export default graphBasicsExercise;
