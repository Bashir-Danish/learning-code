import clsx from 'clsx';

export default function PseudocodePanel({ pseudocode, currentLine }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <div className="text-gray-400 text-xs mb-2">Pseudocode</div>
      {pseudocode.map((line, index) => (
        <div
          key={index}
          className={clsx(
            'py-1 px-2 rounded transition-colors',
            currentLine === index
              ? 'bg-yellow-500/20 text-yellow-300'
              : 'text-gray-300'
          )}
        >
          <span className="text-gray-500 mr-3 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
          {line}
        </div>
      ))}
    </div>
  );
}
