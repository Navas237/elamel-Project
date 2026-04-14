import React from 'react';
import { IconLoading } from '../../../lib/icons';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none select-none';

const variants = {
  primary: 'text-white',
  success: 'text-white',
  gold:    'text-gray-900 font-extrabold',
  outline: 'bg-white border-2 text-[var(--teal-600)] hover:bg-[var(--color-outline-soft)]',
  neutral: 'bg-[var(--color-surface-muted)] text-gray-600 hover:bg-white border border-gray-200',
  danger:  'text-white',
};

const variantStyle = {
  primary: { background: 'var(--color-primary-button)' },
  success: { background: 'var(--color-primary-button)' },
  gold:    { background: 'linear-gradient(135deg,#FFD43B,#F0B800)' },
  outline: { borderColor: 'var(--color-outline-border)' },
  neutral: {},
  danger:  { background: 'linear-gradient(135deg,#ef4444,#dc2626)' },
};

const sizes = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2   text-sm',
  md: 'px-5 py-3   text-base',
  lg: 'px-6 py-4   text-lg sm:text-xl',
};

const join = (...cls) => cls.filter(Boolean).join(' ');

export default function Button({
  children,
  type      = 'button',
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  disabled  = false,
  fullWidth = false,
  className = '',
  loadingText = 'جاري التنفيذ...',
  leadingIcon = null,
  style = {},
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      style={{ ...(variantStyle[variant] ?? variantStyle.primary), ...style }}
      className={join(
        base,
        variants[variant] ?? variants.primary,
        sizes[size]   ?? sizes.md,
        fullWidth  && 'w-full',
        isDisabled ? 'opacity-60' : 'active:scale-95 hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <IconLoading className="animate-spin" size={18} />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {leadingIcon}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
