import React from 'react';

export default function AIResultCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 animate-fade-in overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
