import React from 'react'
import InvoiceModal from '../../components/InvoiceModal'
import './ConfirmOrder.css'

// Import newly refactored components
import PersonalInfoForm from './components/PersonalInfoForm'
import DeliveryAddressForm from './components/DeliveryAddressForm'
import OrderSummaryCard from './components/OrderSummaryCard'

// Import the custom hook layer
import useConfirmOrder from './hooks/useConfirmOrder'

export default function ConfirmOrderNew() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        errors,
        getformData,
        normalizeArabicNumbers,
        textFieldStyle,
        customSelectStyles,
        governorateOptions,
        centerOptions,
        areaOptions,
        selectedGovernorate,
        setSelectedGovernorate,
        selectedCenter,
        setSelectedCenter,
        selectedArea,
        setSelectedArea,
        increasWightt,
        totalPrice,
        discountData,
        totalPriceAfterDicount,
        msarefElchange,
        increasWight,
        longOfCharge,
        confirmOrderLoading,
        invoiceRef,
        orderForInvoice
    } = useConfirmOrder();

    return (
        <>
            <InvoiceModal
                ref={invoiceRef}
                order={orderForInvoice}
                time={longOfCharge}
            />

            <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 px-3 sm:py-12 sm:px-4 mt-[70px] sm:mt-[80px]'>
                <div className='max-w-4xl mx-auto'>

                    {/* Header Section */}
                    <div className='text-center mb-6 sm:mb-8'>
                        <div className='inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg'>
                        </div>
                        <h1 className='text-2xl sm:text-4xl font-bold text-gray-800 mb-2'>تأكيد الطلب</h1>
                        <p className='text-sm sm:text-base text-gray-600 px-4'>يرجى ملء البيانات التالية لإتمام طلبك</p>
                    </div>

                    {/* Main Form Card */}
                    <div className='bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden'>
                        <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 sm:h-2'></div>

                        <div className='p-4 sm:p-8 md:p-10'>
                            <form onSubmit={handleSubmit(getformData)}>

                                <PersonalInfoForm
                                    register={register}
                                    errors={errors}
                                    normalizeArabicNumbers={normalizeArabicNumbers}
                                    textFieldStyle={textFieldStyle}
                                />

                                <DeliveryAddressForm
                                    register={register}
                                    errors={errors}
                                    control={control}
                                    setValue={setValue}
                                    governorateOptions={governorateOptions}
                                    centerOptions={centerOptions}
                                    areaOptions={areaOptions}
                                    selectedGovernorate={selectedGovernorate}
                                    selectedCenter={selectedCenter}
                                    setSelectedGovernorate={setSelectedGovernorate}
                                    setSelectedCenter={setSelectedCenter}
                                    setSelectedArea={setSelectedArea}
                                    increasWightt={increasWightt}
                                    customSelectStyles={customSelectStyles}
                                    textFieldStyle={textFieldStyle}
                                />

                                <OrderSummaryCard
                                    totalPrice={totalPrice}
                                    discountAmount={discountData.amount}
                                    priceAfterDiscount={totalPriceAfterDicount()}
                                    shippingCost={msarefElchange}
                                    extraWeightCharge={increasWight}
                                    finalNetTotal={totalPriceAfterDicount() + Number(msarefElchange) + Number(increasWight)}
                                    deliveryDuration={longOfCharge}
                                    isCheckingOut={confirmOrderLoading}
                                />

                            </form>
                        </div>
                    </div>

                    <div className='mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center'>
                        <div className='bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md'>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'> 🚚 توصيل لحد باب البيت</p>
                        </div>
                        <div className='bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md'>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'>  💵 الدفع عند الاستلام </p>
                        </div>
                        <div className='bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md'>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'> ✅ ضمان الجوده </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
