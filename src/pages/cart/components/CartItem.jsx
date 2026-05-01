import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import QuantityControl from './QuantityControl';
import getOptimizedImage from '../../../hooks/useOptimizedImage';
import { IconBook } from '../../../lib/icons';

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
    const { id, name, company, price, quantity, image } = item;
    const pct = discountData?.itemPercentages?.[id] || 0;
    const isHidden = discountData?.itemHiddenPercentages?.[id];

    const priceAfterDiscount = Math.ceil(price - Math.round(price * pct / 100));
    const totalAfterDiscount = Math.ceil(priceAfterDiscount * quantity);
    const savedAmount = Math.round(price * quantity * pct / 100);

    const imageSrc = getOptimizedImage(image);

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-8 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                <div className="text-center">
                    <button aria-label="حذف العنصر" onClick={onDelete} className="text-red-400 hover:text-red-600 hover:scale-105 transition text-3xl">
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

                <div className="col-span-2 flex items-center justify-end gap-3 text-right">
                    <div className="flex flex-col">
                        <span className="text-gray-800 font-bold text-base leading-tight">{company}</span>
                        <span className="text-gray-600 font-medium text-sm">{name}</span>
                    </div>
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 shadow-sm">
                        {imageSrc ? (
                            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <IconBook size={24} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300 p-1.5">
                <div className="flex gap-2 items-stretch" dir="rtl">
                    {/* Image */}
                    <div className="w-14 self-stretch rounded-md overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 shadow-sm">
                        {imageSrc ? (
                            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <IconBook size={20} />
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-0">
                        <div className="space-y-0">
                            <h4 className="font-bold text-[13px] text-gray-900 leading-tight line-clamp-1">
                                {company}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-medium line-clamp-1">
                                {name}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1.5">
                                <EGP value={priceAfterDiscount} className="font-bold text-[14px]" style={{ color: 'var(--teal-600)' }} />
                                {pct > 0 && (
                                    <EGP value={price} strike className="text-[9px] text-gray-400" />
                                )}
                            </div>
                            <QuantityControl value={quantity} onPlus={onPlus} onMinus={onMinus} size="sm" />
                        </div>
                    </div>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-gray-50 flex items-center justify-between" dir="rtl">
                    <div className="flex items-center gap-1">
                        <span className="text-green-700 font-bold text-[9px] bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100/50">
                            الإجمالي: {totalAfterDiscount} ج
                        </span>
                        {pct > 0 && (
                            <span className="text-orange-600 text-[8.5px] font-bold bg-orange-50 px-1.5 py-0.5 rounded-full border border-orange-100/50">
                                وفرت: {savedAmount} ج
                            </span>
                        )}
                    </div>
                    <button 
                        aria-label="حذف العنصر" 
                        onClick={onDelete} 
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                        <MdDeleteForever size={16} />
                    </button>
                </div>
            </div>
        </>
    );
}
