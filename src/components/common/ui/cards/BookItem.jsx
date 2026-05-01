import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getItemDiscount } from '../../../../utils/discountUtils';
import getOptimizedImage from '../../../../hooks/useOptimizedImage';
import { useOffer } from '../../../../hooks/useOffer';
import { useCartStore } from '../../../../store/useCartStore';
import {
  IconLoading, IconCheck, IconCart, IconBook, IconFlame,
} from '../../../../lib/icons';

/* ── Brand tokens ─────────────────────────────────────────── */
const TEAL = 'var(--gradient-brand)';
const GOLD_BG = { background: 'linear-gradient(135deg,var(--brand-accent),var(--brand-accent-dark))' };

function BookItem({ value, index, isSingleProduct = false }) {
  const { data: offersList } = useOffer();
  const { cartIds, cartloading, addToCart } = useCartStore();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [showFly, setShowFly] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isInCart = !!cartIds[value.id];
  const isLoading = !!cartloading[value.id];
  const isOutOfStock = value.stoke <= 0 || (cartIds[value.id] >= value.stoke);

  const discountInfo = useMemo(() => getItemDiscount(value, offersList || []), [value, offersList]);
  const priceAfter = Math.ceil(value.price - discountInfo.amount);
  const imageSrc = getOptimizedImage(value.image) || null;

  const handleAddToCart = (e) => {
    if (isOutOfStock || isLoading || showFly) return;
    
    setShowFly(false);
    requestAnimationFrame(() => {
      setClickCoords({ x: e.clientX, y: e.clientY });
      setAnimationKey(k => k + 1);
      setShowFly(true);
      setTimeout(() => {
        setShowFly(false);
        addToCart(value.id, value.stoke, value);
      }, 600);
    });
  };

  return (
    <div className={`group relative bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-auto mt-4 md:mt-8  ${isSingleProduct ? ' flex flex-col md:flex-row max-w-2xl mx-auto ' : ''}`}>

      {/* ── Image ──────────────────────────────────────────── */}
      <div className={`relative ${isSingleProduct ? 'h-90 sm:h-100 md:h-130 md:w-[60%]' : 'h-48 sm:h-60 md:h-90 lg:h-70'} overflow-hidden bg-gray-50 flex items-center justify-center ${isOutOfStock ? 'opacity-70' : ''}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${value.company || 'كتاب'} - ${value.name || ''}`}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${!isOutOfStock ? 'group-hover:scale-105' : ''}`} 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ color: 'var(--teal-400)' }}>
            <IconBook size={56} strokeWidth={1.5} />
          </div>
        )}

        {/* Skeleton */}
        {imageSrc && !isLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* "في العربة" badge */}
        {isInCart && (
          <div
            className="absolute top-2 left-2 md:top-3 md:left-3 text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10 text-[11px] md:text-sm font-bold"
            style={{ background: TEAL }}
          >
            <IconCheck size={13} strokeWidth={2.5} />
            <span>في العربة</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10">
            <div
              className="text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-xl rotate-[-5deg] flex items-center gap-2 font-bold text-xs md:text-base"
              style={GOLD_BG}
            >
              <span>سوف يتوفر قريباً</span>
              <span>⏳</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Details ────────────────────────────────────────── */}
      <div className={`p-2 md:p-4 flex flex-col flex-grow gap-2 md:gap-3  ${isSingleProduct ? 'md:w-[40%] md:justify-center md:mt-30' : ''}`}>

        {/* Title */}
        <h3 className="text-[16px] md:text-[20px] font-bold text-right min-h-[1.5rem] line-clamp-2 text-gray-800">
          {value.company}
        </h3>
        <div className="text-[13px] md:text-[17px] font-semibold text-gray-600 text-right leading-tight line-clamp-2">
          {value.name}
        </div>

        {/* Price block */}
        <div className="flex flex-col gap-1 items-end p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50">
          <div className="flex items-baseline gap-2">
            <div className='flex  gap-1'>
            <span className="font-bold text-[15px] md:text-xl" style={{ color: 'var(--teal-500)' }}>ج</span>
            <span className="font-extrabold text-[18px] md:text-2xl" style={{ color: 'var(--teal-500)' }}>
              {priceAfter}
            </span>
            </div>
            <span className="text-gray-500 text-[14px] md:text-[17px]">السعر</span>
          </div>

          {discountInfo.percentage > 0 && (
            <div className="flex items-baseline gap-2">
              <del className="text-gray-400 text-[14px]  flex  gap-1 md:text-[18px] font-medium">
             <span> ج</span>   
             <span> { value.price}  </span>
              </del>
              <span className="text-gray-400 text-[13px] md:text-[16px]">بدلاً من</span>
            </div>
          )}

          {discountInfo.percentage > 0 && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] md:text-sm font-bold text-gray-900 shadow-sm"
              style={GOLD_BG}
            >
              <IconFlame size={13} />
              <span>وفّر {discountInfo.amount} ج</span>
            </div>
          )}
        </div>

        {/* Add to cart button */}
        <motion.button
          whileTap={!isLoading && !isOutOfStock && !showFly ? { scale: 0.92 } : {}}
          whileHover={!isLoading && !isOutOfStock && !showFly ? { scale: 1.02 } : {}}
          className={`w-full h-[42px] md:h-[50px] mt-auto rounded-lg md:rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition duration-200 ${isOutOfStock
            ? 'bg-gray-100 text-gray-400 cursor-default'
            : (isLoading || showFly)
              ? 'opacity-70 cursor-not-allowed'
              : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
            }`}
          style={
            isOutOfStock ? {} :
              isInCart ? {
                background: 'linear-gradient(135deg, #FFFDF0 0%, #FFF1B8 100%)',
                color: '#854D0E',
                border: '1.5px solid #FFE082',
                boxShadow: 'none'
              } :
                { background: TEAL, color: '#fff' }
          }
          disabled={isLoading || isOutOfStock || showFly}
          onClick={handleAddToCart}
        >
          {(isLoading || showFly) ? (
            <IconLoading size={18} className="animate-spin" />
          ) : value.stoke <= 0 ? (
            <span>غير متوفر</span>
          ) : isOutOfStock ? (
            <span>نفذت الكمية</span>
          ) : isInCart ? (
            <><IconCheck size={17} strokeWidth={2.5} /><span>أضف المزيد</span></>
          ) : (
            <><IconCart size={17} /><span>إضافة للسلة</span></>
          )}
        </motion.button>

        {/* Flying animation */}
        <AnimatePresence mode="wait">
          {showFly && clickCoords && (
            <motion.div
              key={animationKey}
              initial={{ position: 'fixed', left: clickCoords.x - 10, top: clickCoords.y - 10, opacity: 1, scale: 1.2, zIndex: 9999 }}
              animate={{ left: window.innerWidth / 2, top: window.innerHeight - 50, opacity: [1, 1, 0], scale: [1.2, 0.8, 0.3], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="pointer-events-none"
            >
              <div className="bg-white p-2 rounded-full shadow-lg border-2" style={{ borderColor: 'var(--teal-400)' }}>
                <IconBook size={22} style={{ color: 'var(--teal-400)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right"
        style={{ background: TEAL }}
      />
    </div>
  );
}

export default BookItem;