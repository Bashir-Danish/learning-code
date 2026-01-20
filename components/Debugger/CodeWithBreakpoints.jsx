import clsx from 'clsx';

export default function CodeWithBreakpoints({ 
  code, 
  currentLine, 
  breakpoints = [], 
  onToggleBreakpoint 
}) {
  const lines = code.split('\n');

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden font-mono text-sm">
      {lines.map((line, index) => {
        const isCurrentLine = index === currentLine;
        const hasBreakpoint = breakpoints.includes(index);
        
        return (
          <div
            key={index}
            className={clsx(
              'flex items-stretch',
              isCurrentLine && 'bg-yellow-500/20'
            )}
          >
            {/* Breakpoint gutter */}
            <button
              onClick={() => onToggleBreakpoint?.(index)}
              className={clsx(
                'w-8 flex items-center justify-center hover:bg-gray-800 transition-colors',
                hasBreakpoint ? 'text-red-500' : 'text-transparent hover:text-red-300'
              )}
            >
              ●
            </button>
            
            {/* Line number */}
            <div className="w-10 text-right pr-3 text-gray-500 select-none py-1">
              {index + 1}
            </div>
            
            {/* Code */}
            <div
              className={clsx(
                'flex-1 px-3 py-1',
                isCurrentLine ? 'text-yellow-300 bg-yellow-500/10' : 'text-gray-300'
              )}
            >
              {line || ' '}
              {isCurrentLine && (
                <span className="ml-2 text-yellow-500">◄</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
