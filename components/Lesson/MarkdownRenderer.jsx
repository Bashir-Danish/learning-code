import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ content, className = '', isRTL = false }) {
  return (
    <div className={`prose prose-slate max-w-none ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  className="rounded-lg !my-4"
                  customStyle={{ direction: 'ltr', textAlign: 'left' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            return (
              <code
                className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600"
                dir="ltr"
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className={`min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className={`px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className={`px-4 py-2 text-sm text-gray-700 border-t border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                {children}
              </td>
            );
          },
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3 border-b border-gray-200 pb-2">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
                {children}
              </h3>
            );
          },
          p({ children }) {
            return (
              <p className="text-gray-700 leading-relaxed my-3">
                {children}
              </p>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-inside space-y-1 my-3 text-gray-700">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside space-y-1 my-3 text-gray-700">
                {children}
              </ol>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-primary-50 rounded-r-lg">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
