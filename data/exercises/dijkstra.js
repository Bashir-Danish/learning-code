export const dijkstraExercise = {
  id: 'dijkstra',
  title: 'Network Delay Time',
  titleFa: 'زمان تأخیر شبکه',
  difficulty: 'medium',
  
  description: `
Find the time for a signal to reach all nodes from source.

Write a function \`networkDelayTime(times, n, k)\` that returns minimum time.
`,

  starterCode: `function networkDelayTime(times, n, k) {
  // Use Dijkstra's algorithm
  
}`,

  solution: `function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (const [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }
  
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const visited = new Set();
  
  while (visited.size < n) {
    let minNode = -1;
    let minDist = Infinity;
    for (let i = 1; i <= n; i++) {
      if (!visited.has(i) && dist[i] < minDist) {
        minDist = dist[i];
        minNode = i;
      }
    }
    if (minNode === -1) break;
    visited.add(minNode);
    
    for (const [next, weight] of (graph.get(minNode) || [])) {
      dist[next] = Math.min(dist[next], dist[minNode] + weight);
    }
  }
  
  const result = Math.max(...dist.slice(1));
  return result === Infinity ? -1 : result;
}`,

  testCases: [
    { input: [[[2,1,1],[2,3,1],[3,4,1]], 4, 2], expected: 2, description: 'Network delay' },
    { input: [[[1,2,1]], 2, 2], expected: -1, description: 'Unreachable node' },
  ],

  hints: ['Build adjacency list', 'Track minimum distances', 'Return max distance'],
};

export default dijkstraExercise;
