import React from 'react';
import { cx } from './utils';

const variants = {
  info: 'bg-[var(--teal-50)] text-[var(--teal-700)]',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  gradient: 'text-white shadow-md',
};

export default function Badge({ children, variant = 'info', className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-bold',
        variants[variant] || variants.info,
        className
      )}
      style={variant === 'gradient' ? { background: 'var(--color-primary-button)' } : undefined}
    >
      {children}
    </span>
  );
}
