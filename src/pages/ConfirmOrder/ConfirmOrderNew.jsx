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

            <div className='min-h-screen py-5 px-3 sm:py-14 sm:px-4 mt-[70px] sm:mt-[80px]' style={{ background: 'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)' }}>
                <div className='max-w-4xl mx-auto'>

                    {/* Header Section */}
                    <div className='text-center mb-7 sm:mb-10'>
                        <div className='inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 shadow-lg' style={{ background: 'var(--color-primary-button)', boxShadow: '0 12px 28px rgba(29,122,117,0.18)' }}>
                        </div>
                        <h1 className='text-2xl sm:text-4xl font-bold text-gray-800 mb-2'>تأكيد الطلب</h1>
                        <p className='text-sm sm:text-base text-gray-600 px-4'>يرجى ملء البيانات التالية لإتمام طلبك</p>
                    </div>

                    {/* Main Form Card */}
                    <div className='bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-xl overflow-hidden border' style={{ borderColor: 'var(--color-card-border)' }}>
                        <div className='h-1.5 sm:h-2' style={{ background: 'var(--color-primary-button)' }}></div>

                        <div className='p-4 sm:p-8 md:p-10 lg:p-12'>
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
                                    finalNetTotal={totalPriceAfterDicount() + Number(msarefElchange) }
                                    deliveryDuration={longOfCharge}
                                    isCheckingOut={confirmOrderLoading}
                                />

                            </form>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className='mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center'>
                        <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor: 'var(--color-card-border)' }}>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'> 🚚 توصيل لحد باب البيت</p>
                        </div>
                        <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor: 'var(--color-card-border)' }}>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'>  💵 الدفع عند الاستلام </p>
                        </div>
                        <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor: 'var(--color-card-border)' }}>
                            <p className='text-xs sm:text-sm font-semibold text-gray-700'> ✅ ضمان الجوده </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
