import React from 'react';
import { IconLoading, IconArrowLeft } from '../../../lib/icons';

export default function OrderSummaryCard({
    totalPrice,
    discountAmount,
    priceAfterDiscount,
    shippingCost,
    extraWeightCharge,
    finalNetTotal,
    deliveryDuration,
    isCheckingOut
}) {
    return (
        <div className='mb-8 sm:mb-10'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7 flex items-center gap-2.5'>
                <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm' style={{ background: 'var(--color-primary-button)' }}>3</span>
                <span className='text-lg sm:text-2xl'>ملخص الطلب</span>
            </h2>

            <div className='rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 border' style={{ background: 'linear-gradient(135deg,#FFFFFF,#F7FBFB)', borderColor: 'var(--color-card-border-strong)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                <div className='flex justify-between items-center pb-2 sm:pb-3 border-b-2 border-gray-200'>
                    <div className='flex items-center text-gray-700 gap-1 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold '>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>{Number(totalPrice)}</span>
                    </div>
                    <span className='text-sm sm:text-lg font-semibold '>الاجمالي قبل الخصم</span>
                </div>

                <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                    <div className='flex items-center gap-1 text-orange-600 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold '>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                            {`${Number(discountAmount)} -`}
                        </span>
                    </div>
                    <span className='text-sm sm:text-lg font-semibold '>قيمه الخصم</span>
                </div>

                <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                    <div className='flex items-center gap-1 text-gray-700 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold'>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                            {Math.round(Number(priceAfterDiscount))}
                        </span>
                    </div>
                    <span className='text-sm sm:text-lg font-semibold '>الإجمالي بعد الخصم</span>
                </div>

                <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                    <div className='flex items-center gap-1 text-gray-700 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold'>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                            {Math.round(Number(shippingCost))}
                        </span>
                    </div>
                    <span className='text-sm sm:text-lg font-semibold text-gray-700'>مصاريف الشحن</span>
                </div>

                {/* {extraWeightCharge > 0 && (
                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                        <div className='flex items-center gap-1 text-orange-600 sm:gap-2'>
                            <span className='text-sm sm:text-base font-bold '>جنيه</span>
                            <span className='text-base sm:text-xl font-bold '>{Math.ceil(Number(extraWeightCharge))}</span>
                        </div>
                        <span className='text-sm sm:text-lg font-semibold'>رسوم إضافية لوزن الأوردر</span>
                    </div>
                )} */}

                <div className='flex justify-between items-center pt-2 sm:pt-3 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 px-4 sm:px-6 py-3.5 sm:py-4 rounded-b-xl sm:rounded-b-2xl border-t-4' style={{ background: 'linear-gradient(135deg,#F2FBFA,#E8F7F5)', borderColor: 'var(--teal-300)' }}>
                    <div className='flex items-center gap-1 sm:gap-2'>
                        <span className='text-lg sm:text-xl font-semibold text-green-700'>جنيه</span>
                        <span className='text-2xl sm:text-3xl font-bold text-green-700'>
                            {Math.round(Number(finalNetTotal))}
                        </span>
                    </div>
                    <span className='text-lg sm:text-xl font-bold text-green-800'>  الإجمالي النهائي</span>
                </div>
            </div>

            {deliveryDuration && (
                <div className='mt-4 sm:mt-5 rounded-xl p-3.5 sm:p-4 border' style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-card-border-strong)' }}>
                    <p className='font-medium text-right text-sm sm:text-base' style={{ color: 'var(--teal-700)' }}>{deliveryDuration}</p>
                </div>
            )}

            <button
                type='submit'
                className='w-full mt-6 sm:mt-8 text-white font-bold text-lg sm:text-xl py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg transform transition duration-300 active:scale-95 sm:hover:scale-[1.015] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 sm:gap-3'
                style={{ background: 'var(--color-primary-button)', boxShadow: '0 18px 34px rgba(29,122,117,0.22)' }}
                disabled={isCheckingOut}
            >
                {isCheckingOut ? (
                    <>
                        <IconLoading size={22} className='animate-spin' />
                        <span>  جاري تسجيل الأوردر...</span>
                    </>
                ) : (
                    <>
                        <span>تأكيد الطلب</span>
                        <IconArrowLeft size={20} />
                    </>
                )}
            </button>

            <div className='mt-3 sm:mt-4 text-center'>
                <p className='text-xs sm:text-sm text-gray-500 px-2'>
                    بالضغط على "تأكيد الطلب" فإنك توافق على شروط وأحكام الخدمة
                </p>
            </div>
        </div>
    );
}
