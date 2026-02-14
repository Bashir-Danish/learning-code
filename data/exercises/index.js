import { bubbleSortExercise } from './bubble-sort';
import { binarySearchExercise } from './binary-search';
import { bigOExercise } from './big-o';
import { linearSearchExercise } from './linear-search';
import { selectionSortExercise } from './selection-sort';
import { insertionSortExercise } from './insertion-sort';
import { stackBasicsExercise } from './stack-basics';
import { queueBasicsExercise } from './queue-basics';
import { twoPointersExercise } from './two-pointers';
import { slidingWindowExercise } from './sliding-window';
import { spaceComplexityExercise } from './space-complexity';
import { prefixSumExercise } from './prefix-sum';
import { timeComplexityExercise } from './time-complexity';
import { arraysBasicsExercise } from './arrays-basics';
import { doublyLinkedListExercise } from './doubly-linked-list';
import { hashTableBasicsExercise } from './hash-table-basics';
import { stringsManipulationExercise } from './strings-manipulation';
import { hashCollisionsExercise } from './hash-collisions';
import { singlyLinkedListExercise } from './singly-linked-list';
import { hashMapPatternsExercise } from './hash-map-patterns';
import { dequeExercise } from './deque';
import { monotonicStackExercise } from './monotonic-stack';
import { recursionBasicsExercise } from './recursion-basics';
import { fastSlowPointersExercise } from './fast-slow-pointers';
import { linkedListReversalExercise } from './linked-list-reversal';
import { recursionPatternsExercise } from './recursion-patterns';
import { heapSortExercise } from './heap-sort';
import { heapBasicsExercise } from './heap-basics';
import { countingSortExercise } from './counting-sort';
import { mergeSortExercise } from './merge-sort';
import { quickSortExercise } from './quick-sort';
import { priorityQueueExercise } from './priority-queue';
import { treeTraversalsExercise } from './tree-traversals';
import { binarySearchTreeExercise } from './binary-search-tree';
import { binaryTreeBasicsExercise } from './binary-tree-basics';
import { balancedTreesExercise } from './balanced-trees';
import { graphBasicsExercise } from './graph-basics';
import { bfsExercise } from './bfs';
import { dpIntroductionExercise } from './dp-introduction';
import { dijkstraExercise } from './dijkstra';
import { dfsExercise } from './dfs';
import { memoizationExercise } from './memoization';
import { tabulationExercise } from './tabulation';
import { topologicalSortExercise } from './topological-sort';
import { classicDpProblemsExercise } from './classic-dp-problems';
import { backtrackingExercise } from './backtracking';
import { topKProblemsExercise } from './top-k-problems';
import { binarySearchVariationsExercise } from './binary-search-variations';
import { problemSolvingApproachExercise } from './problem-solving-approach';
import {
  nodejsConnectionExercises,
  sqlQueriesExercises,
  joinsExercises,
  databaseDesignExercises,
  securityExercises,
} from './database-fundamentals';

export const exercises = {
  'bubble-sort': bubbleSortExercise,
  'binary-search': binarySearchExercise,
  'big-o': bigOExercise,
  'linear-search': linearSearchExercise,
  'selection-sort': selectionSortExercise,
  'insertion-sort': insertionSortExercise,
  'stack-basics': stackBasicsExercise,
  'queue-basics': queueBasicsExercise,
  'two-pointers': twoPointersExercise,
  'sliding-window': slidingWindowExercise,
  'space-complexity': spaceComplexityExercise,
  'prefix-sum': prefixSumExercise,
  'time-complexity': timeComplexityExercise,
  'arrays-basics': arraysBasicsExercise,
  'doubly-linked-list': doublyLinkedListExercise,
  'hash-table-basics': hashTableBasicsExercise,
  'strings-manipulation': stringsManipulationExercise,
  'hash-collisions': hashCollisionsExercise,
  'singly-linked-list': singlyLinkedListExercise,
  'hash-map-patterns': hashMapPatternsExercise,
  'deque': dequeExercise,
  'monotonic-stack': monotonicStackExercise,
  'recursion-basics': recursionBasicsExercise,
  'fast-slow-pointers': fastSlowPointersExercise,
  'linked-list-reversal': linkedListReversalExercise,
  'recursion-patterns': recursionPatternsExercise,
  'heap-sort': heapSortExercise,
  'heap-basics': heapBasicsExercise,
  'counting-sort': countingSortExercise,
  'merge-sort': mergeSortExercise,
  'quick-sort': quickSortExercise,
  'priority-queue': priorityQueueExercise,
  'tree-traversals': treeTraversalsExercise,
  'binary-search-tree': binarySearchTreeExercise,
  'binary-tree-basics': binaryTreeBasicsExercise,
  'balanced-trees': balancedTreesExercise,
  'graph-basics': graphBasicsExercise,
  'bfs': bfsExercise,
  'dp-introduction': dpIntroductionExercise,
  'dijkstra': dijkstraExercise,
  'dfs': dfsExercise,
  'memoization': memoizationExercise,
  'tabulation': tabulationExercise,
  'topological-sort': topologicalSortExercise,
  'classic-dp-problems': classicDpProblemsExercise,
  'backtracking': backtrackingExercise,
  'top-k-problems': topKProblemsExercise,
  'binary-search-variations': binarySearchVariationsExercise,
  'problem-solving-approach': problemSolvingApproachExercise,
  'nodejs-connection-exercises': nodejsConnectionExercises,
  'sql-queries-exercises': sqlQueriesExercises,
  'joins-exercises': joinsExercises,
  'database-design-exercises': databaseDesignExercises,
  'security-exercises': securityExercises,
};

export function getExercise(exerciseId) {
  return exercises[exerciseId] || null;
}

export function getAllExercises() {
  return Object.values(exercises);
}
