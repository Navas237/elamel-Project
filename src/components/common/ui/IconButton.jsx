import React from 'react';
import { cx } from './utils';

export default function IconButton({
  children,
  className = '',
  size = 'md',
  variant = 'ghost',
  ...props
}) {
  const sizes = {
    sm: 'h-9 w-9 text-lg',
    md: 'h-11 w-11 text-xl',
    lg: 'h-12 w-12 text-2xl',
  };

  const variants = {
    ghost: 'text-gray-700 hover:bg-gray-100',
    primary: 'text-white shadow-md',
    white: 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm',
  };

  const variantStyle = {
    primary: { background: 'var(--color-primary-button)' },
  };

  return (
    <button
      className={cx(
        'inline-flex items-center justify-center rounded-full transition duration-300 active:scale-95',
        sizes[size] || sizes.md,
        variants[variant] || variants.ghost,
        className
      )}
      style={variantStyle[variant]}
      {...props}
    >
      {children}
    </button>
  );
}
