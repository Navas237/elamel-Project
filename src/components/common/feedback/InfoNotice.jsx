import React from 'react';
import { cx } from '../ui/utils';

const toneClasses = {
  info: 'bg-[var(--color-info-soft)] text-[var(--color-info-text)]',
  warning: 'border-amber-500 bg-amber-50 text-amber-700',
  success: 'border-emerald-500 bg-emerald-50 text-emerald-700',
};

export default function InfoNotice({
  children,
  tone = 'info',
  className = '',
}) {
  return (
    <div
      className={cx(
        'rounded-lg border-r-4 p-3 sm:p-4 text-right',
        toneClasses[tone] || toneClasses.info,
        className
      )}
      style={tone === 'info' ? { borderColor: 'var(--color-info-border)' } : undefined}
    >
      {children}
    </div>
  );
}
