import React from 'react';
import { cx } from './utils';

const toneClasses = {
  blue: 'bg-[var(--teal-50)] text-[var(--teal-600)]',
  purple: 'bg-[var(--teal-100)] text-[var(--teal-700)]',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-[var(--brand-accent-light)] text-[var(--brand-accent-darker)]',
};

export default function SectionHeader({
  step,
  title,
  className = '',
  tone = 'blue',
  titleClassName = '',
}) {
  return (
    <div className={cx('mb-4 sm:mb-6 flex items-center gap-2', className)}>
      {step !== undefined ? (
        <span
          className={cx(
            'flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold sm:h-8 sm:w-8 sm:text-base',
            toneClasses[tone] || toneClasses.blue
          )}
        >
          {step}
        </span>
      ) : null}
      <h2 className={cx('text-xl font-bold text-gray-800 sm:text-2xl', titleClassName)}>{title}</h2>
    </div>
  );
}
