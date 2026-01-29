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

// React Fundamentals
import {
  jsxBasicsLesson,
  componentsPropsLesson,
  stateUsestateLesson,
  eventHandlingLesson,
  conditionalRenderingLesson,
  listsKeysLesson,
  formsControlledLesson,
  stylingReactLesson,
} from './react-fundamentals';

// React Intermediate
import {
  lifecycleUseeffectLesson,
  contextApiLesson,
  customHooksLesson,
  performanceOptimizationLesson,
  errorBoundariesLesson,
  portalsLesson,
} from './react-intermediate';

// React Advanced
import {
  reactRouterLesson,
  stateManagementLesson,
  dataFetchingLesson,
  serverComponentsLesson,
  codeSplittingLesson,
  testingReactLesson,
} from './react-advanced';

// React Expert
import {
  advancedPatternsLesson,
  typescriptReactLesson,
  buildToolsLesson,
  nextjsBasicsLesson,
  reactNativeLesson,
  realWorldPatternsLesson,
  reactPwaLesson,
} from './react-expert';

// Vue Fundamentals
import {
  introSfcLesson,
  reactivityRefLesson,
  lifecycleWatchersLesson,
  componentCompositionLesson,
  formsValidationLesson,
  builtinComponentsLesson,
  directivesBuiltinLesson,
  debuggingLesson,
} from './vue-fundamentals';

// Vue Intermediate
import {
  composablesLesson,
  provideInjectLesson,
  dynamicComponentsLesson,
  advancedSlotsLesson,
  directivesPluginsLesson,
  animationsLesson,
} from './vue-intermediate';

// Vue Advanced
import {
  piniaLesson,
  vueRouterLesson,
  vueDataFetchingLesson,
  i18nLesson,
  uiLibrariesLesson,
  viteToolingLesson,
} from './vue-advanced';

// Vue Expert
import {
  vuePerformanceLesson,
  nuxtBasicsLesson,
  vueTestingLesson,
  advancedNuxtLesson,
  microFrontendsLesson,
  mobileVueLesson,
  vuePwaLesson,
} from './vue-expert';

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

  // React Fundamentals
  'jsx-basics': jsxBasicsLesson,
  'components-props': componentsPropsLesson,
  'state-usestate': stateUsestateLesson,
  'event-handling': eventHandlingLesson,
  'conditional-rendering': conditionalRenderingLesson,
  'lists-keys': listsKeysLesson,
  'forms-controlled': formsControlledLesson,
  'styling-react': stylingReactLesson,

  // React Intermediate
  'lifecycle-useeffect': lifecycleUseeffectLesson,
  'context-api': contextApiLesson,
  'custom-hooks': customHooksLesson,
  'performance-optimization': performanceOptimizationLesson,
  'error-boundaries': errorBoundariesLesson,
  'portals': portalsLesson,

  // React Advanced
  'react-router': reactRouterLesson,
  'state-management': stateManagementLesson,
  'data-fetching': dataFetchingLesson,
  'server-components': serverComponentsLesson,
  'code-splitting': codeSplittingLesson,
  'testing-react': testingReactLesson,

  // React Expert
  'advanced-patterns': advancedPatternsLesson,
  'typescript-react': typescriptReactLesson,
  'build-tools': buildToolsLesson,
  'nextjs-basics': nextjsBasicsLesson,
  'react-native': reactNativeLesson,
  'real-world-patterns': realWorldPatternsLesson,
  'react-pwa': reactPwaLesson,

  // Vue Fundamentals
  'intro-sfc': introSfcLesson,
  'reactivity-ref': reactivityRefLesson,
  'lifecycle-watchers': lifecycleWatchersLesson,
  'component-composition': componentCompositionLesson,
  'forms-validation': formsValidationLesson,
  'builtin-components': builtinComponentsLesson,
  'directives-builtin': directivesBuiltinLesson,
  'vue-debugging': debuggingLesson,

  // Vue Intermediate
  'composables': composablesLesson,
  'provide-inject': provideInjectLesson,
  'dynamic-components': dynamicComponentsLesson,
  'advanced-slots': advancedSlotsLesson,
  'directives-plugins': directivesPluginsLesson,
  'animations-gsap': animationsLesson,

  // Vue Advanced
  'pinia': piniaLesson,
  'vue-router': vueRouterLesson,
  'vue-data-fetching': vueDataFetchingLesson,
  'vue-i18n': i18nLesson,
  'ui-libraries': uiLibrariesLesson,
  'vite-tooling': viteToolingLesson,

  // Vue Expert
  'vue-performance': vuePerformanceLesson,
  'nuxt-basics': nuxtBasicsLesson,
  'vue-testing': vueTestingLesson,
  'advanced-nuxt': advancedNuxtLesson,
  'vue-microfrontends': microFrontendsLesson,
  'vue-mobile': mobileVueLesson,
  'vue-pwa': vuePwaLesson,
};

export function getLesson(lessonId) {
  return lessons[lessonId] || null;
}

export function getAllLessons() {
  return Object.values(lessons);
}
