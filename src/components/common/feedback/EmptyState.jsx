import React from 'react';

export default function EmptyState({
  icon = null,
  title,
  description = '',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  return (
    <div className={['flex flex-col items-center justify-center px-4', className].filter(Boolean).join(' ')}>
      {icon ? <div className="mb-6 text-6xl sm:text-7xl md:text-8xl">{icon}</div> : null}
      <h3 className={['text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center', titleClassName].filter(Boolean).join(' ')}>
        {title}
      </h3>
      {description ? (
        <p className={['text-base sm:text-lg text-center text-gray-500', descriptionClassName].filter(Boolean).join(' ')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
