// Foundations
import { bigOLesson } from './big-o';
import { timeComplexityLesson } from './time-complexity';
import { spaceComplexityLesson } from './space-complexity';
import { problemSolvingApproachLesson } from './problem-solving-approach';

// Arrays & Strings
import { arraysBasicsLesson } from './arrays-basics';
import { twoPointersLesson } from './two-pointers';
import { slidingWindowLesson } from './sliding-window';
import { stringsManipulationLesson } from './strings-manipulation';
import { prefixSumLesson } from './prefix-sum';

// Hash Tables
import { hashTableBasicsLesson } from './hash-table-basics';
import { hashCollisionsLesson } from './hash-collisions';
import { hashMapPatternsLesson } from './hash-map-patterns';

// Linked Lists
import { singlyLinkedListLesson } from './singly-linked-list';
import { doublyLinkedListLesson } from './doubly-linked-list';
import { fastSlowPointersLesson } from './fast-slow-pointers';
import { linkedListReversalLesson } from './linked-list-reversal';

// Stacks & Queues
import { stackBasicsLesson } from './stack-basics';
import { queueBasicsLesson } from './queue-basics';
import { monotonicStackLesson } from './monotonic-stack';
import { dequeLesson } from './deque';

// Sorting
import { bubbleSortLesson } from './bubble-sort';
import { selectionSortLesson } from './selection-sort';
import { insertionSortLesson } from './insertion-sort';
import { mergeSortLesson } from './merge-sort';
import { quickSortLesson } from './quick-sort';
import { heapSortLesson } from './heap-sort';
import { countingSortLesson } from './counting-sort';

// Searching
import { linearSearchLesson } from './linear-search';
import { binarySearchLesson } from './binary-search';
import { binarySearchVariationsLesson } from './binary-search-variations';

// Recursion & Backtracking
import { recursionBasicsLesson } from './recursion-basics';
import { recursionPatternsLesson } from './recursion-patterns';
import { backtrackingLesson } from './backtracking';

// Trees
import { binaryTreeBasicsLesson } from './binary-tree-basics';
import { treeTraversalsLesson } from './tree-traversals';
import { binarySearchTreeLesson } from './binary-search-tree';
import { balancedTreesLesson } from './balanced-trees';

// Heaps
import { heapBasicsLesson } from './heap-basics';
import { priorityQueueLesson } from './priority-queue';
import { topKProblemsLesson } from './top-k-problems';

// Graphs
import { graphBasicsLesson } from './graph-basics';
import { bfsLesson } from './bfs';
import { dfsLesson } from './dfs';
import { dijkstraLesson } from './dijkstra';
import { topologicalSortLesson } from './topological-sort';

// Dynamic Programming
import { dpIntroductionLesson } from './dp-introduction';
import { memoizationLesson } from './memoization';
import { tabulationLesson } from './tabulation';
import { classicDpProblemsLesson } from './classic-dp-problems';

// Lesson registry
export const lessons = {
  // Foundations
  'big-o-notation': bigOLesson,
  'time-complexity': timeComplexityLesson,
  'space-complexity': spaceComplexityLesson,
  'problem-solving-approach': problemSolvingApproachLesson,
  
  // Arrays & Strings
  'arrays-basics': arraysBasicsLesson,
  'two-pointers': twoPointersLesson,
  'sliding-window': slidingWindowLesson,
  'strings-manipulation': stringsManipulationLesson,
  'prefix-sum': prefixSumLesson,
  
  // Hash Tables
  'hash-table-basics': hashTableBasicsLesson,
  'hash-collisions': hashCollisionsLesson,
  'hash-map-patterns': hashMapPatternsLesson,
  
  // Linked Lists
  'singly-linked-list': singlyLinkedListLesson,
  'doubly-linked-list': doublyLinkedListLesson,
  'fast-slow-pointers': fastSlowPointersLesson,
  'linked-list-reversal': linkedListReversalLesson,
  
  // Stacks & Queues
  'stack-basics': stackBasicsLesson,
  'queue-basics': queueBasicsLesson,
  'monotonic-stack': monotonicStackLesson,
  'deque': dequeLesson,
  
  // Sorting
  'bubble-sort': bubbleSortLesson,
  'selection-sort': selectionSortLesson,
  'insertion-sort': insertionSortLesson,
  'merge-sort': mergeSortLesson,
  'quick-sort': quickSortLesson,
  'heap-sort': heapSortLesson,
  'counting-sort': countingSortLesson,
  
  // Searching
  'linear-search': linearSearchLesson,
  'binary-search': binarySearchLesson,
  'binary-search-variations': binarySearchVariationsLesson,
  
  // Recursion & Backtracking
  'recursion-basics': recursionBasicsLesson,
  'recursion-patterns': recursionPatternsLesson,
  'backtracking': backtrackingLesson,
  
  // Trees
  'binary-tree-basics': binaryTreeBasicsLesson,
  'tree-traversals': treeTraversalsLesson,
  'binary-search-tree': binarySearchTreeLesson,
  'balanced-trees': balancedTreesLesson,
  
  // Heaps
  'heap-basics': heapBasicsLesson,
  'priority-queue': priorityQueueLesson,
  'top-k-problems': topKProblemsLesson,
  
  // Graphs
  'graph-basics': graphBasicsLesson,
  'bfs': bfsLesson,
  'dfs': dfsLesson,
  'dijkstra': dijkstraLesson,
  'topological-sort': topologicalSortLesson,
  
  // Dynamic Programming
  'dp-introduction': dpIntroductionLesson,
  'memoization': memoizationLesson,
  'tabulation': tabulationLesson,
  'classic-dp-problems': classicDpProblemsLesson,
};

export function getLesson(lessonId) {
  return lessons[lessonId] || null;
}

export function getAllLessons() {
  return Object.values(lessons);
}
