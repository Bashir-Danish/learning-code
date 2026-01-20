import { generateBubbleSortSteps, bubbleSortPseudocode } from './bubbleSort';
import { generateSelectionSortSteps, selectionSortPseudocode } from './selectionSort';
import { generateBinarySearchSteps, binarySearchPseudocode } from './binarySearch';

export const algorithms = {
  'bubble-sort': {
    name: 'Bubble Sort',
    nameFa: 'مرتب‌سازی حبابی',
    type: 'sorting',
    generateSteps: generateBubbleSortSteps,
    pseudocode: bubbleSortPseudocode,
  },
  'selection-sort': {
    name: 'Selection Sort',
    nameFa: 'مرتب‌سازی انتخابی',
    type: 'sorting',
    generateSteps: generateSelectionSortSteps,
    pseudocode: selectionSortPseudocode,
  },
  'binary-search': {
    name: 'Binary Search',
    nameFa: 'جستجوی دودویی',
    type: 'searching',
    generateSteps: generateBinarySearchSteps,
    pseudocode: binarySearchPseudocode,
  },
};

export function getAlgorithm(algorithmId) {
  return algorithms[algorithmId] || null;
}

export function getAllAlgorithms() {
  return Object.entries(algorithms).map(([id, algo]) => ({
    id,
    ...algo,
  }));
}

export function generateRandomArray(size = 8, min = 1, max = 50) {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}
