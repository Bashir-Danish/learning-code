/**
 * Generate step-by-step visualization for Binary Search
 * @param {number[]} inputArray - Sorted array to search
 * @param {number} target - Value to find
 * @returns {Object[]} Array of steps with state snapshots
 */
export function generateBinarySearchSteps(inputArray, target) {
  const arr = [...inputArray].sort((a, b) => a - b); // Ensure sorted
  const steps = [];
  
  let left = 0;
  let right = arr.length - 1;

  // Initial state
  steps.push({
    array: arr,
    left,
    right,
    mid: -1,
    target,
    found: false,
    eliminated: [],
    currentLine: 0,
    variables: { left, right, target },
    description: `Searching for ${target} in sorted array`,
    descriptionFa: `جستجوی ${target} در آرایه مرتب`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Calculate mid step
    steps.push({
      array: arr,
      left,
      right,
      mid,
      target,
      found: false,
      eliminated: [],
      currentLine: 2,
      variables: { left, right, mid, midValue: arr[mid] },
      description: `Calculating mid: (${left} + ${right}) / 2 = ${mid}`,
      descriptionFa: `محاسبه وسط: (${left} + ${right}) / 2 = ${mid}`,
    });

    // Compare step
    steps.push({
      array: arr,
      left,
      right,
      mid,
      target,
      found: false,
      eliminated: [],
      currentLine: 3,
      variables: { left, right, mid, midValue: arr[mid], comparing: `${arr[mid]} vs ${target}` },
      description: `Comparing arr[${mid}] = ${arr[mid]} with target ${target}`,
      descriptionFa: `مقایسه arr[${mid}] = ${arr[mid]} با هدف ${target}`,
    });

    if (arr[mid] === target) {
      // Found!
      steps.push({
        array: arr,
        left,
        right,
        mid,
        target,
        found: true,
        foundIndex: mid,
        eliminated: [],
        currentLine: 4,
        variables: { left, right, mid, found: true },
        description: `Found ${target} at index ${mid}!`,
        descriptionFa: `${target} در اندیس ${mid} پیدا شد!`,
      });
      return steps;
    }

    if (arr[mid] < target) {
      // Eliminate left half
      const eliminated = Array.from({ length: mid - left + 1 }, (_, i) => left + i);
      left = mid + 1;

      steps.push({
        array: arr,
        left,
        right,
        mid: -1,
        target,
        found: false,
        eliminated,
        currentLine: 5,
        variables: { left, right, action: 'eliminate left half' },
        description: `${arr[mid]} < ${target}, searching right half`,
        descriptionFa: `${arr[mid]} < ${target}، جستجو در نیمه راست`,
      });
    } else {
      // Eliminate right half
      const eliminated = Array.from({ length: right - mid + 1 }, (_, i) => mid + i);
      right = mid - 1;

      steps.push({
        array: arr,
        left,
        right,
        mid: -1,
        target,
        found: false,
        eliminated,
        currentLine: 7,
        variables: { left, right, action: 'eliminate right half' },
        description: `${arr[mid]} > ${target}, searching left half`,
        descriptionFa: `${arr[mid]} > ${target}، جستجو در نیمه چپ`,
      });
    }
  }

  // Not found
  steps.push({
    array: arr,
    left,
    right,
    mid: -1,
    target,
    found: false,
    notFound: true,
    eliminated: [],
    currentLine: 9,
    variables: { left, right, result: -1 },
    description: `${target} not found in array`,
    descriptionFa: `${target} در آرایه پیدا نشد`,
  });

  return steps;
}

export const binarySearchPseudocode = [
  'function binarySearch(arr, target):',
  '    left = 0, right = n - 1',
  '    while left <= right:',
  '        mid = (left + right) / 2',
  '        if arr[mid] == target:',
  '            return mid',
  '        if arr[mid] < target:',
  '            left = mid + 1',
  '        else:',
  '            right = mid - 1',
  '    return -1  // not found',
];

export default { generateBinarySearchSteps, binarySearchPseudocode };
