import React from 'react';

export default function QuantityControl({ value, onPlus, onMinus, size = 'md' }) {
    const s = size === 'sm'
        ? { btn: 'w-7 h-7 text-sm', num: 'min-w-[18px] text-sm' }
        : { btn: 'w-8 h-8 text-base', num: 'min-w-[32px] text-base' };

    const btnBase = 'rounded-full flex items-center justify-center font-bold transition duration-200 active:scale-90 select-none';

    return (
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-1.5 py-0.5 border border-gray-200">
            {/* Plus */}
            <button
                className={`${btnBase} ${s.btn}`}
                style={{ background: 'var(--color-surface-muted)', color: 'var(--teal-500)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--teal-400)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--color-surface-muted)'; e.currentTarget.style.color='var(--teal-500)'; }}
                onClick={onPlus}
            >
                +
            </button>

            {/* Count */}
            <span className={`font-bold text-gray-800 text-center ${s.num}`}>{value}</span>

            {/* Minus */}
            <button
                className={`${btnBase} ${s.btn}`}
                style={{ background: 'var(--brand-danger-light)', color: 'var(--brand-danger)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--brand-danger)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--brand-danger-light)'; e.currentTarget.style.color='var(--brand-danger)'; }}
                onClick={onMinus}
            >
                -
            </button>
        </div>
    );
}
