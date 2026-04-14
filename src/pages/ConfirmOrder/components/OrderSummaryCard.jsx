import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
        <div className='mb-6 sm:mb-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2'>
                <span className='w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm sm:text-base'>3</span>
                <span className='text-lg sm:text-2xl'>ملخص الطلب</span>
            </h2>

            <div className='rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 border-2' style={{background:'linear-gradient(135deg,#F0FBFA,#CCEEE9)',borderColor:'#99DDD3'}}>
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
                    <div className='flex items-center gap-1 text-gray-600 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold '>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>{Number(shippingCost)}</span>
                    </div>
                    <span className='text-sm sm:text-lg font-semibold'>مصاريف الشحن</span>
                </div>

                {extraWeightCharge > 0 && (
                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                        <div className='flex items-center gap-1 text-orange-600 sm:gap-2'>
                            <span className='text-sm sm:text-base font-bold '>جنيه</span>
                            <span className='text-base sm:text-xl font-bold '>{Math.ceil(Number(extraWeightCharge))}</span>
                        </div>
                        <span className='text-sm sm:text-lg font-semibold'>رسوم إضافية لوزن الأوردر</span>
                    </div>
                )}

                <div className='flex justify-between items-center pt-2 sm:pt-4'>
                    <div className='flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium' style={{color:'#2E9E98',background:'#F0FBFA'}}>
                        <span className='text-lg sm:text-2xl font-bold '>جنيه</span>
                        <span className='text-xl sm:text-3xl font-black '>{Math.round(Number(finalNetTotal))}</span>
                    </div>
                    <span className='text-lg sm:text-2xl font-bold text-gray-800'>الإجمالي النهائي</span>
                </div>
            </div>

            <button
                disabled={isCheckingOut}
                type="submit"
                className={`w-full mt-6 sm:mt-8 py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3
          ${isCheckingOut
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'text-white hover:shadow-xl hover:-translate-y-1'
                    } rounded-xl sm:rounded-2xl`}
                style={{background:'linear-gradient(135deg,#4EC4BD,#1D7A75)'}}
            >
                {isCheckingOut ? (
                    <>
                        <AiOutlineLoading3Quarters className="animate-spin text-xl sm:text-2xl" />
                        <span>جاري تأكيد الطلب...</span>
                    </>
                ) : (
                    <>
                        <span>تأكيد الطلب الآن</span>
                    </>
                )}
            </button>

            {deliveryDuration && (
                <div className='mt-3 sm:mt-4 text-center text-sm sm:text-base text-gray-500 flex items-center justify-center gap-2 bg-gray-50 py-2 rounded-lg'>
                    <span className='text-lg sm:text-xl'>🚚</span>
                    <span>{deliveryDuration}</span>
                </div>
            )}
        </div>
    );
}
