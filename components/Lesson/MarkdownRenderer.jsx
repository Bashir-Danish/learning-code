import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register commonly used languages to ensure highlighting works in the browser build
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('vue', markup);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('python', python);

export default function MarkdownRenderer({ content, className = '', isRTL = false }) {
  return (
    <div className={`prose prose-slate max-w-none ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            let language = match ? match[1] : '';

            // Map some common language ids to Prism-supported ones
            const langMap = {
              vue: 'markup',
              html: 'markup',
              xml: 'markup',
              js: 'javascript',
              ts: 'typescript',
              jsx: 'jsx',
              tsx: 'tsx'
            };

            if (language && langMap[language]) language = langMap[language];

            const codeStr = String(children);
            const looksLikeBlock =
              inline === false ||
              Boolean(language) ||
              /\n/.test(codeStr);

            // Only render SyntaxHighlighter for real code blocks.
            // Inline backticks inside headings/lists sometimes come through with inline=undefined.
            if (looksLikeBlock) {
              let usedLang = language || 'markup';

              // If the block is a Vue SFC / HTML that contains a <script> tag, prefer JS highlighting
              if (usedLang === 'markup' && /<script[\s>]/i.test(codeStr)) {
                usedLang = 'javascript';
              }
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={usedLang}
                  PreTag="div"
                  className="rounded-lg !my-4"
                  customStyle={{ direction: 'ltr', textAlign: 'left' }}
                  {...props}
                >
                  {codeStr.replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }

            return (
              <code
                className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 inline"
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
