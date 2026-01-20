import { Layers } from 'lucide-react';

export default function CallStack({ callStack }) {
  if (!callStack || callStack.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        Call stack empty
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {callStack.map((frame, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded font-mono text-sm"
        >
          <Layers className="w-4 h-4 text-gray-400" />
          <span className="text-primary-600 font-medium">{frame.name}</span>
          <span className="text-gray-400">:</span>
          <span className="text-gray-600">line {frame.line + 1}</span>
        </div>
      ))}
    </div>
  );
}
