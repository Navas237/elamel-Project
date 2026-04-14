import React, { useState } from 'react';
import { Input, Button } from '../../../components/common';

export default function CouponSection({ couponCode, appliedCouponCode, onCodeChange, onApply, onRemove }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b border-gray-100 bg-white">
            <button
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3 px-4 transition-colors duration-200"
                style={{ color: 'var(--teal-600)' }}
            >
                <span className="text-lg select-none">🏷️</span>
                <span>هل لديك كوبون خصم إضافي؟</span>
                <span className={`transition-transform duration-300 text-xs ${open ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div
                    className="mx-4 mb-3 rounded-xl border p-4"
                    style={{ background: 'linear-gradient(135deg,#FFFFFF,#F6FBFB)', borderColor: 'var(--color-card-border-strong)' }}
                >
                    <div className="flex gap-2 items-center" dir="ltr">
                        <Input
                            type="text"
                            value={couponCode}
                            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
                            placeholder="ادخل كود الخصم"
                            dir="rtl"
                            disabled={!!appliedCouponCode}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onApply}
                            disabled={!!appliedCouponCode}
                            className="whitespace-nowrap"
                        >
                            تطبيق
                        </Button>
                    </div>

                    {appliedCouponCode && (
                        <div className="mt-2 flex items-center justify-between gap-2">
                            <Button variant="danger" size="sm" onClick={onRemove} className="text-xs">
                                حذف الكوبون
                            </Button>
                            <p className="text-sm font-bold" style={{ color: 'var(--teal-600)' }}>
                                تم التطبيق: <span>{appliedCouponCode}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
