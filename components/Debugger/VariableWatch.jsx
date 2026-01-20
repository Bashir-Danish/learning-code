import clsx from 'clsx';

export default function VariableWatch({ variables, changedVar }) {
  if (!variables || Object.keys(variables).length === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        No variables to display
      </div>
    );
  }

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    return String(value);
  };

  const getTypeColor = (value) => {
    if (Array.isArray(value)) return 'text-purple-600';
    if (typeof value === 'number') return 'text-blue-600';
    if (typeof value === 'string') return 'text-green-600';
    if (typeof value === 'boolean') return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-1">
      {Object.entries(variables).map(([name, value]) => {
        const isChanged = name === changedVar;
        
        return (
          <div
            key={name}
            className={clsx(
              'flex items-center justify-between px-3 py-2 rounded font-mono text-sm',
              isChanged 
                ? 'bg-yellow-100 border border-yellow-300' 
                : 'bg-gray-50'
            )}
          >
            <span className="text-gray-700 font-medium">{name}</span>
            <span className={clsx('font-semibold', getTypeColor(value))}>
              {formatValue(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
