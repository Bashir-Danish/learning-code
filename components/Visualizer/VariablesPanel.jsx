export default function VariablesPanel({ variables, description, descriptionFa }) {
  if (!variables) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Description */}
      <div className="mb-4 pb-3 border-b border-gray-100">
        <p className="text-gray-900 font-medium">{description}</p>
        {descriptionFa && (
          <p className="text-gray-500 text-sm fa mt-1" dir="rtl">
            {descriptionFa}
          </p>
        )}
      </div>

      {/* Variables */}
      <div className="text-sm text-gray-500 mb-2">Variables</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(variables).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-50 rounded px-3 py-2 font-mono text-sm"
          >
            <span className="text-gray-500">{key}:</span>{' '}
            <span className="text-primary-600 font-semibold">
              {typeof value === 'boolean' 
                ? value.toString() 
                : typeof value === 'object'
                  ? JSON.stringify(value)
                  : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
