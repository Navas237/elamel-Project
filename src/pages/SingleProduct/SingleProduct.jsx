import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../services/SupabaseClient'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaArrowRight } from 'react-icons/fa6'
import { supbasecontext } from '../../context/SupbaseContext'
import { cartcontext } from '../../context/CartCotext'
import { getItemDiscount } from '../../utils/discountUtils';
import { FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import { IoBookSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';


function SingleProduct() {


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });


  }, [])

  const { id } = useParams()
  const [prodeuctData, setprodeuctData] = useState({})
  const { getIds, cartloading, cartIds, trackAddToCart } = useContext(cartcontext)
  const { offersList } = useContext(supbasecontext);

  const [discountInfo, setDiscountInfo] = useState({ percentage: 0, amount: 0 });

  const [clickCoords, setClickCoords] = useState(null);
  const [showFly, setShowFly] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isInCart = cartIds[prodeuctData?.id];
  const isLoading = cartloading[prodeuctData?.id];
  const isOutOfStock = prodeuctData?.stoke <= 0 || cartIds[prodeuctData?.id] == prodeuctData?.stoke;

  const handleAddToCart = (e) => {
    setShowFly(false);
    requestAnimationFrame(() => {
      setClickCoords({ x: e.clientX, y: e.clientY });
      setAnimationKey(prev => prev + 1);
      setShowFly(true);

      setTimeout(() => {
        setShowFly(false);
        getIds(prodeuctData?.id, prodeuctData?.stoke);
      }, 800);
    });
  };

  const getSingleData = async () => {
    try {

      //  setprodectLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)


      if (error) {
        console.log(error?.message);
        //    setprodectError(error)

      } else {
        setprodeuctData(data[0])


      }

    } catch (error) {
      console.log(error?.message);

    } finally {
      //    setprodectLoading(false)
    }
  }

  useEffect(() => {
    getSingleData()
  }, [id])

  // recalc discount whenever product or offers change
  useEffect(() => {
    if (prodeuctData && offersList) {
      setDiscountInfo(getItemDiscount(prodeuctData, offersList));
    }
  }, [prodeuctData, offersList]);


  return (
    <div className='bg-gradient-to-br h-[auto]     shadow-2xl w-auto flex !items-center !justify-center mt-[80px] rounded-2xl  mx-auto border border-gray-200'>
      <div className="card relative  !h-[auto]  text-[16px] sm:text-[23px] w-[100%] sm:w-[50%] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300  border border-gray-100 hover:-translate-y-2 group">

        <div className="flex lg:flex-row  flex-col gap-4 !items-end !justify-end p-5">

          {/* Image Section */}
          <div className={(prodeuctData.stoke <= 0 || cartIds[prodeuctData.id] == prodeuctData.stoke) ? "opacity-75 img h-auto w-[100%] flex-center rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative " : 'img h-auto w-[100%] flex-center rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative'}>
            <img
              src={prodeuctData.image}
              alt={prodeuctData.name}
              // loading='lazy' 
              className={(prodeuctData.stoke <= 0 || cartIds[prodeuctData.id] == prodeuctData.stoke) ? "opacity-75" : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'}
            />
          </div>

          {/* Details Section */}
          <div className="detiles w-[100%] flex flex-col !items-end !justify-start">

            {/* Book Name */}
            <h3 className='text-[18px] md:text-[22px]  font-bold  text-right min-h-[1.5rem] md:min-h-[auto] line-clamp-2 '>
              {prodeuctData?.company}
            </h3>
            <div className='text-[14px] md:text-[18px] font-bold text-gray-800 text-right leading-tight p-0 m-0 line-clamp-2 '>
              {prodeuctData.name}
              <span className=""> </span>
              {/* <sub className='shrink-0 text-[10px] md:text-[14px] rounded backdrop-blur-sm mt-0.5 '>
                {prodeuctData.term && `(${prodeuctData.term})`}
              </sub> */}
            </div>

            {/* Price Section */}
            <div className='flex flex-col items-end gap-2 mb-5 bg-gradient-to-l from-blue-50 to-transparent p-4 rounded-xl w-full'>

              {/* Discounted Price (dynamic) */}
              <div className='flex items-center gap-3'>
                <div className='flex gap-1'>
                  <span className='text-green-600 font-extrabold text-2xl sm:text-3xl'>ج</span>
                  <span className='text-green-600 font-extrabold text-2xl sm:text-3xl'>
                    {prodeuctData?.price
                      ? Math.ceil(prodeuctData.price - discountInfo.amount)
                      : ''}
                  </span>
                </div>
                <span className='text-gray-700 text-2xl font-semibold'>السعر</span>
              </div>

              {/* Original Price */}
              <div className='flex items-center gap-3'>
                <div className='flex gap-1'>
                  <del className='text-red-500 font-bold text-2xl sm:text-2xl'>ج</del>
                  <del className='text-red-500 font-bold text-2xl sm:text-2xl'>{prodeuctData?.price}</del>
                </div>
                <span className='text-gray-500  text-2xl'>بدلاً من</span>
              </div>

              {/* Discount Badge (only if there is one) */}
              {discountInfo.percentage > 0 && (
                <div className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md'>
                  🔥 وفّر {discountInfo.amount} ج ({discountInfo.percentage}%)
                </div>
              )}

              {/* Out of Stock Badge */}
              {prodeuctData.stoke <= 0 && (
                <div className='absolute inset-0  top-[-170px] flex items-center justify-center  bg-opacity-0 ]'>
                  <div className='bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-[-5deg] flex items-center gap-3'>
                    <span className='text-2xl'>⏳</span>
                    <span className='font-bold text-lg'>سوف يتوفر قريباً</span>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className='w-[100%]'>
              <motion.button
                whileTap={!isLoading && !isOutOfStock && !showFly ? { scale: 0.92 } : {}}
                whileHover={!isLoading && !isOutOfStock && !showFly ? { scale: 1.02 } : {}}
                className={`w-full h-[42px] md:h-[52px] mt-auto rounded-lg md:rounded-xl font-bold text-xs md:text-base transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 shadow-sm hover:shadow-md cursor-pointer ${isOutOfStock
                  ? 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-500'
                  : isInCart
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  } ${(isLoading || showFly) ? 'opacity-70 cursor-not-allowed' : !isOutOfStock ? 'hover:-translate-y-0.5' : ''}`}
                disabled={isLoading || isOutOfStock || showFly}
                onClick={(e) => {
                  handleAddToCart(e);
                  // Ensure trackAddToCart exists before calling, or handle if it's optional
                  if (trackAddToCart) trackAddToCart(prodeuctData?.id, 1, prodeuctData);
                }}
              >
                {(isLoading || showFly) ? (
                  <AiOutlineLoading3Quarters className='text-sm md:text-xl animate-spin' />
                ) : prodeuctData?.stoke <= 0 ? (
                  <span className='whitespace-nowrap'>غير متوفر</span>
                ) : isInCart ? (
                  <>
                    {prodeuctData?.stoke == cartIds[prodeuctData?.id] ? (
                      <span className='text-red-500 whitespace-nowrap'>نفذت الكمية  لقد</span>
                    ) : (
                      <>
                        <FiCheckCircle className='text-sm md:text-xl' />
                        <span>أضف المزيد</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <FiShoppingCart className='text-sm md:text-xl' />
                    <span>إضافة للسلة</span>
                  </>
                )}
              </motion.button>

              {/* Flying Book Animation */}
              <AnimatePresence mode="wait">
                {showFly && clickCoords && (
                  <motion.div
                    key={animationKey}
                    initial={{
                      position: 'fixed',
                      left: clickCoords.x - 10,
                      top: clickCoords.y - 10,
                      opacity: 1,
                      scale: 1.2,
                      zIndex: 9999
                    }}
                    animate={{
                      left: window.innerWidth / 2,
                      top: window.innerHeight - 50,
                      opacity: [1, 1, 0],
                      scale: [1.2, 0.8, 0.3],
                      rotate: 360
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                    className="pointer-events-none text-blue-500"
                  >
                    <div className="bg-white p-1 rounded-full shadow-lg border border-blue-200">
                      <IoBookSharp className="text-xl md:text-2xl" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>


        </div>

        {/* Bottom Accent Line */}
        <div className='h-1 bg-gradient-to-r from-[#2d839b] to-[#1e5a6b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right'></div>

      </div>
    </div>
  )
}

export default SingleProduct