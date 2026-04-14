import React from 'react';
import { cx } from './utils';

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

const radiusClasses = {
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-xl',
};

export default function Card({
  children,
  className = '',
  padding = 'md',
  radius = 'lg',
  shadow = 'md',
  border = true,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cx(
        'bg-white',
        paddingClasses[padding] || paddingClasses.md,
        radiusClasses[radius] || radiusClasses.lg,
        shadowClasses[shadow] || shadowClasses.md,
        border && 'border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
