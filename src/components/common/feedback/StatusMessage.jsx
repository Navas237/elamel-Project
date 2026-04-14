import React from 'react';

const tones = {
  muted: 'text-gray-500',
  info: 'text-[var(--teal-600)]',
  danger: 'text-red-600',
  success: 'text-emerald-600',
};

export default function StatusMessage({
  message,
  tone = 'muted',
  className = '',
  centered = true,
}) {
  return (
    <p
      className={[
        'p-4 text-sm',
        centered ? 'text-center' : '',
        tones[tone] || tones.muted,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {message}
    </p>
  );
}
