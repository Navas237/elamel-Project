import React from 'react';
import { cx } from './utils';

export default function SummaryRow({
  label,
  value,
  currencyLabel = '',
  className = '',
  valueClassName = '',
  labelClassName = '',
  bordered = true,
}) {
  return (
    <div className={cx('flex items-center justify-between', bordered && 'border-b border-gray-200 pb-3', className)}>
      <div className={cx('flex items-center gap-1 sm:gap-2 text-gray-700', valueClassName)}>
        {currencyLabel ? <span className="text-sm font-bold sm:text-base">{currencyLabel}</span> : null}
        <span className="text-base font-bold sm:text-xl">{value}</span>
      </div>
      <span className={cx('text-sm font-semibold sm:text-lg', labelClassName)}>{label}</span>
    </div>
  );
}
