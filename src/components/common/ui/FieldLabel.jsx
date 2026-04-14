import React from 'react';
import { cx } from './utils';

export default function FieldLabel({
  children,
  error = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <label
      className={cx(
        'mb-2 block text-right font-bold',
        error ? 'text-red-500' : disabled ? 'text-gray-400' : 'text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
