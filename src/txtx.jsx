 return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {Productloading ?
                <div className='vh-10 my-[200px] !w-[100%] mx-auto !flex-center flex-col items'>
                    <Lottie animationData={Loadunglotie} className='w-[30%] mx-auto' />
                </div>
                : ProductError ?
                    <div>
                        <div className='vh-10 my-[00px] !w-[100%] mx-auto !flex-center flex-col items'>
                            <Lottie animationData={Errorloite} className='w-[30%] mx-auto' />
                        </div>
                    </div>
                    : ProductData.length > 0 ?
                        <div className="flex flex-col items-center justify-center !mt-[80px] my-8 w-full px-4">
                            {/* Header */}
                            <div className="w-full max-w-6xl mb-1">
                                <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">🛒 عربة التسوق</h1>

                                <div className="w-full max-w-7xl mx-auto px-1 mb-3 flex justify-center">
                                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-gray-100 shadow-sm w-fit max-w-full">
                                        <div className="flex flex-nowrap justify-center gap-1.5 md:gap-3 overflow-x-auto">
                                            {features.map((offer, index) => {
                                                const isActive = discountData?.activeOfferIds?.includes(offer.id);
                                                return (
                                                    <div className={`card-anmtion flex-1 min-w-0 max-w-[120px] md:max-w-[150px] ${isActive ? 'bg-gradient-to-r from-[#e8f4fc] to-[#d4f5f0] rounded-xl ' : ''}`} key={index}>

                                                        <div
                                                            className={`bg-white p-1.5 md:p-3 text-center transition-all duration-300 flex flex-col justify-center h-[80px] md:h-[110px] overflow-hidden ${isActive ? 'bg-gradient-to-r from-[#e8f4fc] to-[#d4f5f0] rounded-xl ' : ''} `}
                                                        >
                                                            {/* <div className="text-sm md:text-xl mb-0.5">{offer.icon}</div> */}
                                                            <div className="text-xs md:text-lg font-extrabold text-blue-600 leading-none mb-0.5">
                                                                {offer.discount}
                                                            </div>
                                                            <div className="text-[7.5px] md:text-[11px] text-gray-500 font-medium leading-tight mt-1">
                                                                {offer.condition}
                                                            </div>
                                                            {/* {offer.amount && (
                                                                <div className="text-[8px] md:text-xs font-bold text-gray-700 mt-1 leading-none">
                                                                    <div className='flex gap-0.5 justify-center mt-0.5'>
                                                                        <span>{offer.egp}</span>
                                                                        <span>{offer.amount}</span>
                                                                    </div>
                                                                    <div className="mt-0.5">
                                                                        <span>{offer.more}</span>
                                                                    </div>
                                                                </div>
                                                            )} */}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop View - Modern Card Design */}
                            <div className="hidden md:block w-full max-w-6xl">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    {/* Table Header */}
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                        <div className="grid grid-cols-8 gap-4 p-6 font-bold text-lg">
                                            <div className="text-center">حذف</div>
                                            <div className="text-center">الإجمالي</div>
                                            <div className="text-center">الكمية</div>
                                            <div className="text-center"> بعد الخصم </div>
                                            <div className="text-center">الخصم </div>
                                            <div className="text-center"> قبل الخصم  </div>
                                            <div className="text-center col-span-2 ">المنتج</div>
                                        </div>
                                    </div>

                                    {/* Table Body */}
                                    <div className="divide-y divide-gray-200">
                                        {ProductData?.map((value, index) => (
                                            <div key={index} className="grid grid-cols-8 gap-4 p-6 items-center hover:bg-gray-50 transition-colors duration-200">
                                                <div className="text-center">
                                                    <button
                                                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200 text-3xl"
                                                        onClick={() => deletCart(value)}
                                                    >
                                                        <MdDeleteForever />
                                                    </button>
                                                </div>
                                                <div className="text-center flex gap-1 ">
                                                    <span className="text-blue-600 font-bold text-lg">
                                                        ج
                                                    </span>
                                                    <span className="text-blue-600 font-bold text-lg">
                                                        
                                                        {Math.ceil(value.price * value.quantity  - (value.price *   value.quantity * (discountData?.itemPercentages?.[value.id] || 0) / 100))}
                                                    </span>
                                                </div>
                                                <div className="text-center">
                                                    <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                                                        <button
                                                            // disabled={value.stoke < value.quantity }
                                                            className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex gap-1 items-center justify-center font-bold transition-all duration-200 hover:scale-110"
                                                            onClick={() => changeCount(value.id, "plus")}
                                                        >
                                                            +
                                                        </button>
                                                        <span className="font-bold text-gray-800 min-w-[30px] text-center">
                                                            {value.quantity}
                                                        </span>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex gap-1 items-center justify-center font-bold transition-all duration-200 hover:scale-110"
                                                            onClick={() => changeCount(value.id, "menus")}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-center flex gap-1 justify-center">
                                                    <span className="text-gray-700 font-semibold"> ج</span>
                                                    <span className="text-gray-700 font-semibold">
                                                        {Math.ceil(value.price - ( Math.round(value.price * (discountData?.itemPercentages?.[value.id] || 0) / 100)))}
                                                    </span>
                                                </div>
                                                <div className="text-center flex gap-1 justify-center">
                                                    {discountData?.itemPercentages?.[value.id] > 0 ? (
                                                        <div className="text-orange-600 flex gap-1 font-semibold">
                                                            {!discountData?.itemHiddenPercentages?.[value.id] && (
                                                                <span>
                                                                    ( {discountData?.itemPercentages?.[value.id]}%)
                                                                </span>
                                                            )}
                                                            <div className='flex gap-0.5'>
                                                                <span>ج</span>
                                                                <span>{Math.round((value.price * value.quantity * discountData.itemPercentages[value.id] / 100))}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">0</span>
                                                    )}
                                                </div>
                                                <div className="text-center flex gap-1 justify-center">
                                                    {discountData?.itemPercentages?.[value.id] > 0 ? (
                                                        <>
                                                            <span className="text-gray-500 font-semibold line-through"> ج</span>
                                                            <span className="text-gray-500 font-semibold line-through">{value.price} </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">{value.price}</span>
                                                    )}
                                                </div>
                                                <div className=" text-right col-span-2 ">
                                                    <span className="text-gray-800 font-semibold text-lg">{`${value.company} ${value.name}`}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Discount Badge */}

                                    {/* <div className="discount-anmotion-border">
                                        <div className="discount-banner bg-gradient-to-r from-[#e8f4fc] to-[#d4f5f0] text-gray-800 p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-2xl"></span>
                                                <span className="text-lg font-bold ms-1 ">
                                                    تم تطبيق خصم
                                                    <span className='text-3xl me-1 '>
                                                        %{(((totalPrice - totalPriceAfterDicount()) / totalPrice) * 100).toFixed()}
                                                    </span>
                                                </span>
                                                {/* <span className="text-2xl">🎉</span> */}
                                    {/* </div> */}
                                    {/* </div> */}
                                    {/* </div> */}


                                    <div>
                                        {offersList.some((offer) => {
                                            offer.status === 'نشط' && offer.offer_type === 'coupon' ?
                                                (

                                                    <div className="p-4 border-b cursor-pointer border-gray-200 bg-white">
                                                        <button
                                                            onClick={() => setShowCoupon(!showCoupon)}
                                                            className="w-full  cursor-pointer flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors duration-200 group"
                                                        >
                                                            <span className="text-xl">🏷️</span>
                                                            <span>هل لديك كوبون خصم اضافي ؟</span>
                                                            <span className={`transition-transform duration-300 text-xs ${showCoupon ? 'rotate-180' : ''}`}>▼</span>
                                                        </button>

                                                        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${showCoupon ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                                                <div className="flex gap-3 items-center max-w-md mx-auto" dir="ltr">
                                                                    <input
                                                                        type="text"
                                                                        value={couponCode}
                                                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                                        placeholder="ادخل كود الخصم"
                                                                        dir="rtl"
                                                                        disabled={!!appliedCouponCode}
                                                                        className="flex-1 px-5 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium text-gray-700 placeholder-gray-400 transition-all duration-200 bg-white disabled:opacity-50"
                                                                    />
                                                                    <button
                                                                        onClick={handleApplyCoupon}
                                                                        disabled={!!appliedCouponCode}
                                                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50"
                                                                    >
                                                                        تطبيق
                                                                    </button>
                                                                </div>
                                                                {appliedCouponCode && (
                                                                    <div className="flex items-center justify-center gap-3 mt-2">
                                                                        <button
                                                                            onClick={() => { setAppliedCouponCode(''); setCouponCode(''); localStorage.removeItem('appliedCouponCode'); }}
                                                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer"
                                                                        >
                                                                            حذف الكوبون
                                                                        </button>
                                                                        <p className="text-sm text-green-600 font-bold">تم تطبيق الكوبون: <span>{appliedCouponCode}</span></p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ""

                                        })}
                                    </div>

                                    {/* Price Summary */}
                                    <div className="bg-gray-50  p-6">

                                        <div className="max-w-md    mr-auto space-y-3">

                                                 {
                                                     Math.round(totalPrice - totalPriceAfterDicount()) > 0 && (
                                                        <div>
                                                        
                                            <div className="flex justify-between items-center text-lg">
                                                <div className='flex gap-2 font-bold'>

                                                    <span className="">جنيه</span>
                                                    <span className="">{totalPrice} </span>
                                                </div>
                                                <span className="text-gray-600">الاجمالي قبل الخصم  </span>
                                            </div>
                                            <div className="flex gap-2 text-orange-600 justify-between items-center text-lg">
                                                <div className='flex gap-2'>

                                                    <span className="font-bold">
                                                        جنيه
                                                    </span>
                                                    <span className="font-bold">
                                                        {Math.round(totalPrice - totalPriceAfterDicount())}  -
                                                    </span>
                                                </div>
                                                <span className="">قيمه الخصم</span>
                                            </div>
                                                </div>
                                                    )
                                                 }

                                            <div className="border-t-2  text-green-600 border-gray-300 pt-3 flex gap-2 justify-between items-center">
                                                <div className='flex gap-2 '>

                                                    <span className="font-bold text-2xl">
                                                        جنيه
                                                    </span>
                                                    <span className="font-bold text-2xl">
                                                        {Math.round(totalPriceAfterDicount())}
                                                    </span>
                                                </div>
                                                <span className=" font-bold text-xl">الإجمالي النهائي</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile View - Compact One Line Cards */}
                            <div className="md:hidden w-full max-w-2xl space-y-2">
                                {ProductData?.map((value, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col  p-1 gap-1">
                                            {/* Header: Delete Button and Title */}
                                            <div className="flex justify-between items-start">
                                                
                                                 <div className="flex items-baseline gap-2">
                                                      {discountData?.itemPercentages?.[value.id] > 0 && (
                                                            <span className="text-gray-400  flex font-semibold line-through text-sm">
                                                                 <span className=""> ج</span>
                                                                {value.price}  
                                                            </span>
                                                        )}
                                                        <span className="text-blue-600  flex  gap-1 font-extrabold text-lg tracking-tight">
                                                            <span className="font-extrabold text-lg"> ج</span>
                                                            {Math.round(value.price - (value.price * (discountData?.itemPercentages?.[value.id] || 0) / 100))}
                                                        </span>
                                                      
                                                    </div>
                                                {/* <button
                                                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors flex-shrink-0"
                                                    onClick={() => deletCart(value)}
                                                >
                                                    <MdDeleteForever className="text-xl" />
                                                </button> */}
                                                <h4 className="py-1 font-bold text-[14px] text-gray-800 text-base leading-snug text-right flex-1 ml-3" dir="rtl">
                                                    {`${value.company} ${value.name}`}
                                                </h4>
                                            </div>

                                            {/* Price and Controls Section */}
                                            <div className=" bg-gray-50/80 rounded-lg py-1 px-2  border border-gray-100" dir="rtl">

                                                {/* Price block */}
                                                <div className="flex  !justify-between  items-center gap-5 ">

                                                       {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 bg-white rounded-full px-0.5 py-0.5 box-shadow-sm border border-gray-200 mb-1">
                                                    <button
                                                        className="bg-blue-50 hover:bg-blue-500 hover:text-white text-blue-600 w-7 h-7 rounded-full flex items-center justify-center font-bold transition-all text-sm"
                                                        onClick={() => changeCount(value.id, "plus")}
                                                    >
                                                        +
                                                    </button>
                                                    <span className="font-bold text-gray-800 min-w-[16px] text-center text-sm">
                                                        {value.quantity}
                                                    </span>
                                                    <button
                                                        className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 w-7 h-7 rounded-full flex items-center justify-center font-bold transition-all text-sm"
                                                        onClick={() => changeCount(value.id, "menus")}
                                                    >
                                                        -
                                                    </button>
                                                </div>

                                                    {/* Total and Badges */}
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="text-green-700 font-bold text-xs bg-green-100/60 px-2 py-1 rounded shadow-sm">
                                                            الإجمالي: {Math.round(value.price - (value.price * (discountData?.itemPercentages?.[value.id] || 0) / 100)) * value.quantity} <span className="text-xs mr-0.2 font-bold"> ج</span>
                                                        </div>
                                                        {discountData?.itemPercentages?.[value.id] > 0 && (
                                                            <div className="text-orange-600 text-[11px] font-bold bg-orange-100/60 px-1.5 py-1 rounded shadow-sm whitespace-nowrap flex items-center justify-center gap-1">
                                                                <span>وفرت: {Math.round((value.price * value.quantity * (discountData?.itemPercentages?.[value.id] || 0) / 100))} <span className="text-xs mr-0.2 font-bold"> ج</span></span>
                                                                {!discountData?.itemHiddenPercentages?.[value.id] && (
                                                                    <span>(%{discountData?.itemPercentages?.[value.id]})</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                              
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Mobile Discount & Price Summary */}
                                <div className=" rounded-xl space-y-4 shadow-md overflow-hidden">
                                    {/* Discount Badge */}
                                    {/* <div className="discount-anmotion-border">
                                        <div className="bg-gradient-to-r from-[#e8f4fc] to-[#d4f5f0] text-gray-800 p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-xl"></span>
                                                <span className="font-bold ">
                                                    تم تطبيق خصم  <span className="font-bold text-3xl ms-1">
                                                        %{(((totalPrice - totalPriceAfterDicount()) / totalPrice) * 100).toFixed(0)}
                                                    </span>
                                                </span>
                                                <span className="text-xl"></span>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div>
                                        {
                                            offersList.some((offer) => {

                                                offer.status === 'نشط' && offer.offer_type === 'coupon' ?
                                                    (

                                                        <div className="p-4 border-b border-gray-100">
                                                            <button
                                                                onClick={() => setShowCoupon(!showCoupon)}
                                                                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 group"
                                                            >
                                                                <span className="text-lg">🏷️</span>
                                                                <span>هل لديك كوبون خصم؟</span>
                                                                <span className={`transition-transform duration-300 text-xs ${showCoupon ? 'rotate-180' : ''}`}>▼</span>
                                                            </button>

                                                            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${showCoupon ? 'max-h-[200px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                                                                    <div className="flex gap-2 items-center" dir="ltr">
                                                                        <input
                                                                            type="text"
                                                                            value={couponCode}
                                                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                                            placeholder="ادخل كود الخصم"
                                                                            dir="rtl"
                                                                            disabled={!!appliedCouponCode}
                                                                            className="flex-1 px-4 py-2.5 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium text-gray-700 placeholder-gray-400 transition-all duration-200 bg-white disabled:opacity-50"
                                                                        />
                                                                        <button
                                                                            onClick={handleApplyCoupon}
                                                                            disabled={!!appliedCouponCode}
                                                                            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50"
                                                                        >
                                                                            تطبيق
                                                                        </button>
                                                                    </div>
                                                                    {appliedCouponCode && (
                                                                        <div className="flex items-center justify-between gap-2 mt-2">
                                                                            <button
                                                                                onClick={() => { setAppliedCouponCode(''); setCouponCode(''); localStorage.removeItem('appliedCouponCode'); }}
                                                                                className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer"
                                                                            >
                                                                                حذف
                                                                            </button>
                                                                            <p className="text-xs text-green-600 font-bold">تم تطبيق: <span>{appliedCouponCode}</span></p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                    : ("")
                                            }
                                            )
                                        }

                                    </div>


                                    {/* Price Details */}
                                    <div className="p-4 bg-white  space-y-3 rounded-xl  border-[0.7px] border-blue-200 ">
                                        {Math.round(totalPrice - totalPriceAfterDicount()) > 0 && (
                                            <>
                                                <div className="flex justify-between items-center text-lg">
                                                    <div className='flex gap-2 font-bold'>

                                                        <span className="">جنيه</span>
                                                        <span className=" ">{totalPrice} </span>
                                                    </div>
                                                    <span className="text-gray-600">الاجمالي قبل الخصم  </span>
                                                </div>
                                                <div className="flex gap-2 text-orange-600 justify-between items-center text-lg">
                                                    <div className='flex gap-2'>

                                                        <span className="font-bold">
                                                            جنيه
                                                        </span>
                                                        <span className="font-bold">
                                                            {Math.round(totalPrice - totalPriceAfterDicount())} -
                                                        </span>
                                                    </div>
                                                    <span className="">قيمه الخصم</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="border-t-2  text-green-600 border-gray-300 pt-3 flex gap-2 justify-between items-center">
                                            <div className='flex gap-2 '>

                                                <span className="font-bold text-2xl">
                                                    جنيه
                                                </span>
                                                <span className="font-bold text-2xl">
                                                    {Math.round(totalPriceAfterDicount())}
                                                </span>
                                            </div>
                                            <span className=" font-bold text-xl">الإجمالي النهائي</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 w-full max-w-md">
                                <button
                                    onClick={handleCheckout}
                                    disabled={Productloading || isCheckingOut}
                                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl py-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                                >
                                    {isCheckingOut ? <span>جاري التحقق...</span> : <span className=' flex gap-2 justify-center items-center'> <IoArrowBackOutline /> ادخل بيانات التوصيل </span>}
                                </button>
                            </div>
                        </div>
                        :
                        <div className="card-body cart mt-[120px]">
                            <div className="mt-10 col-sm-12 empty-cart-cls text-center !flex sm:justify-center gap-5 sm:!items-center flex-col !justify-center !items-center p-[40px] bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
                                <div className="animate-bounce">
                                    <img src="https://i.imgur.com/dCdflKN.png" width="170" height="170" className="img-fluid" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800">العربة فارغة</h3>
                                <h4 className="text-xl text-gray-600">العربية فاضية 😢… يلا نضيف كتب دراسية ونظبط مذاكرتك! 📚✏️</h4>
                                <Link
                                    to={'/'}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    🛍️ ابدأ التسوق الآن
                                </Link>
                            </div>
                        </div>
            }
        </div >
    )