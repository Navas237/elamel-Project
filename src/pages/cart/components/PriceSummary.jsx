import React from 'react';

function PriceRow({ label, value, className = '' }) {
    return (
        <div className={`flex items-center justify-between text-base ${className}`}>
            <div className="flex gap-1 font-bold">
                <span>جنيه</span>
                <span>{value}</span>
            </div>
            <span className="text-gray-500">{label}</span>
        </div>
    );
}

export default function PriceSummary({ totalPrice, finalPrice }) {
    const discountAmount = Math.round(totalPrice - finalPrice);
    const hasDiscount = discountAmount > 0;

    return (
        <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            {hasDiscount && (
                <>
                    <PriceRow
                        label="الإجمالي قبل الخصم"
                        value={totalPrice}
                        className="text-gray-500 line-through"
                    />
                    <PriceRow
                        label="قيمة الخصم"
                        value={`${discountAmount} -`}
                        className="text-orange-500"
                    />
                </>
            )}

            <div
                className="flex items-center justify-between rounded-xl px-4 py-3 font-extrabold border"
                style={{ 
                    background: 'linear-gradient(135deg, #FFFDF0 0%, #FFF1B8 100%)', 
                    borderColor: '#FFE082',
                    color: '#854D0E' 
                }}
            >
                <div className="flex gap-1 text-2xl font-black">
                    <span>جنيه</span>
                    <span>{Math.round(finalPrice)}</span>
                </div>
                <span className="text-xl">الإجمالي النهائي</span>
            </div>
        </div>
    );
}
