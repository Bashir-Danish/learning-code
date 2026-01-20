import { useMemo } from 'react';
import clsx from 'clsx';

export default function ArrayVisualizer({ step, maxValue }) {
  const { array, comparing, swapping, sorted, minIndex, mid, left, right, eliminated, found, foundIndex } = step;
  
  const calculatedMax = useMemo(() => {
    return maxValue || Math.max(...array, 1);
  }, [array, maxValue]);

  return (
    <div className="flex items-end justify-center gap-1 sm:gap-2 h-64 p-4 bg-gray-50 rounded-lg">
      {array.map((value, index) => {
        const height = (value / calculatedMax) * 100;
        
        const isComparing = comparing?.includes(index);
        const isSwapping = swapping?.includes(index);
        const isSorted = sorted?.includes(index);
        const isMinIndex = minIndex === index;
        const isMid = mid === index;
        const isInRange = left !== undefined && right !== undefined && index >= left && index <= right;
        const isEliminated = eliminated?.includes(index);
        const isFound = found && foundIndex === index;

        let bgColor = 'bg-primary-500';
        let borderColor = 'border-transparent';
        
        if (isFound) {
          bgColor = 'bg-green-500';
          borderColor = 'border-green-300';
        } else if (isSwapping) {
          bgColor = 'bg-red-500 animate-swap';
        } else if (isComparing) {
          bgColor = 'bg-yellow-500 animate-highlight';
        } else if (isMinIndex) {
          bgColor = 'bg-orange-500';
        } else if (isMid) {
          bgColor = 'bg-purple-500';
        } else if (isSorted) {
          bgColor = 'bg-green-500';
        } else if (isEliminated) {
          bgColor = 'bg-gray-300';
        } else if (!isInRange && left !== undefined) {
          bgColor = 'bg-gray-300';
        }

        return (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={clsx(
                'w-8 sm:w-12 rounded-t-md transition-all duration-300 border-2',
                bgColor,
                borderColor
              )}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
            <span className={clsx(
              'text-xs font-mono',
              isSorted ? 'text-green-600 font-bold' : 'text-gray-600'
            )}>
              {value}
            </span>
            <span className="text-xs text-gray-400">
              [{index}]
            </span>
          </div>
        );
      })}
    </div>
  );
}
