import React, { useMemo } from 'react';
import katex from 'katex';

export default function MathBlock({ math, block = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.error("KaTeX render error:", e);
      return `<code>${math}</code>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`my-3 text-center overflow-x-auto py-2 px-3 rounded bg-slate-950/60 border border-slate-800/80 shadow-inner ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-block mx-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
