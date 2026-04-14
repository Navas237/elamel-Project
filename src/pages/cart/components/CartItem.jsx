import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import QuantityControl from './QuantityControl';

function EGP({ value, className = '', strike = false, style = {} }) {
    return (
        <span
            className={`flex gap-0.5 items-baseline ${className} ${strike ? 'line-through text-gray-400' : ''}`}
            style={style}
        >
            <span className="text-xs font-bold">ج</span>
            <span>{value}</span>
        </span>
    );
}

export default function CartItem({ item, discountData, onDelete, onPlus, onMinus }) {
    const { id, name, company, price, quantity } = item;
    const pct = discountData?.itemPercentages?.[id] || 0;
    const isHidden = discountData?.itemHiddenPercentages?.[id];

    const priceAfterDiscount = Math.ceil(price - Math.round(price * pct / 100));
    const totalAfterDiscount = Math.ceil(priceAfterDiscount * quantity);
    const savedAmount = Math.round(price * quantity * pct / 100);

    return (
        <>
            <div className="hidden md:grid grid-cols-8 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                <div className="text-center">
                    <button onClick={onDelete} className="text-red-400 hover:text-red-600 hover:scale-110 transition-all text-3xl">
                        <MdDeleteForever />
                    </button>
                </div>

                <div className="text-center">
                    <EGP value={totalAfterDiscount} className="font-bold text-lg justify-center" style={{ color: 'var(--teal-600)' }} />
                </div>

                <div className="text-center">
                    <QuantityControl value={quantity} onPlus={onPlus} onMinus={onMinus} size="md" />
                </div>

                <div className="text-center">
                    <EGP value={priceAfterDiscount} className="text-gray-700 font-semibold justify-center" />
                </div>

                <div className="text-center">
                    {pct > 0 ? (
                        <div className="text-orange-600 flex flex-col items-center gap-0.5 font-semibold text-sm">
                            {!isHidden && <span>({pct}%)</span>}
                            <EGP value={savedAmount} className="text-orange-600" />
                        </div>
                    ) : <span className="text-gray-400">0</span>}
                </div>

                <div className="text-center">
                    <EGP
                        value={price}
                        strike={pct > 0}
                        className={pct > 0 ? 'text-gray-400 justify-center' : 'text-gray-600 justify-center'}
                    />
                </div>

                <div className="col-span-2 text-right">
                    <span className="text-gray-800 font-semibold text-lg">{company} {name}</span>
                </div>
            </div>

            <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-2">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-baseline gap-1">
                        {pct > 0 && (
                            <EGP value={price} strike className="text-sm font-semibold" />
                        )}
                        <EGP value={priceAfterDiscount} className="font-extrabold text-lg" style={{ color: 'var(--teal-600)' }} />
                    </div>
                    <h4 className="font-bold text-[14px] text-gray-800 leading-snug text-right flex-1" dir="rtl">
                        {company} {name}
                    </h4>
                </div>

                <div className="bg-gray-50 rounded-lg px-2 py-1 border border-gray-100 flex items-center justify-between gap-2" dir="rtl">
                    <QuantityControl value={quantity} onPlus={onPlus} onMinus={onMinus} size="sm" />

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className="text-green-700 font-bold text-xs bg-green-100/70 px-2 py-1 rounded">
                            الإجمالي: {totalAfterDiscount} <span className="text-xs">ج</span>
                        </span>
                        {pct > 0 && (
                            <span className="text-orange-600 text-[11px] font-bold bg-orange-100/70 px-1.5 py-1 rounded whitespace-nowrap">
                                وفرت: {savedAmount} ج{!isHidden && ` (%${pct})`}
                            </span>
                        )}
                        <button onClick={onDelete} className="text-red-400 hover:text-red-600 transition-colors text-lg">
                            <MdDeleteForever />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
