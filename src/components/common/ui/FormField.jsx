import React from 'react';
import FieldLabel from './FieldLabel';
import { cx } from './utils';

export default function FormField({
  label,
  error = '',
  disabled = false,
  children,
  className = '',
  labelClassName = '',
  errorClassName = '',
  htmlFor,
}) {
  return (
    <div className={cx('w-full', className)}>
      {label ? (
        <FieldLabel htmlFor={htmlFor} error={Boolean(error)} disabled={disabled} className={labelClassName}>
          {label}
        </FieldLabel>
      ) : null}
      {children}
      {error ? (
        <p className={cx('mt-2 text-right text-sm font-medium text-red-500', errorClassName)}>{error}</p>
      ) : null}
    </div>
  );
}
