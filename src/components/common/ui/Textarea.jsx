import React from 'react';
import { cx } from './utils';

export default function Textarea({ className = '', hasError = false, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cx(
        'w-full rounded-xl border bg-white px-4 py-3 text-right text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[var(--color-input-border-focus)] focus:ring-4 focus:ring-[var(--color-input-ring)] disabled:cursor-not-allowed disabled:bg-gray-100',
        hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-[var(--color-input-border)]',
        className
      )}
      {...props}
    />
  );
}
