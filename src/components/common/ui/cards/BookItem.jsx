import React, { useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getItemDiscount } from '../../../../utils/discountUtils';
import { supbasecontext } from '../../../../context/SupbaseContext';
import getOptimizedImage from '../../../../hooks/useOptimizedImage';
import {
  IconLoading, IconCheck, IconCart, IconBook, IconFlame,
} from '../../../../lib/icons';

/* ── Brand tokens ─────────────────────────────────────────── */
const TEAL     = 'linear-gradient(135deg,#4EC4BD,#2E9E98)';
const GOLD_BG  = { background: 'linear-gradient(135deg,#FFD43B,#F0B800)' };
const TEAL_SOFT = { background: '#E6F7F6', color: '#2E9E98' };

function BookItem({ value, cartIds, cartloading, getIds, index, trackAddToCart }) {
  const { offersList } = useContext(supbasecontext);
  const [isLoaded,     setIsLoaded]     = useState(false);
  const [clickCoords,  setClickCoords]  = useState(null);
  const [showFly,      setShowFly]      = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isInCart     = !!cartIds[value.id];
  const isLoading    = !!cartloading[value.id];
  const isOutOfStock = value.stoke <= 0 || cartIds[value.id] == value.stoke;

  const discountInfo = useMemo(() => getItemDiscount(value, offersList), [value, offersList]);
  const priceAfter   = Math.ceil(value.price - discountInfo.amount);
  const imageSrc     = getOptimizedImage(value.image) || null;

  const handleAddToCart = (e) => {
    setShowFly(false);
    requestAnimationFrame(() => {
      setClickCoords({ x: e.clientX, y: e.clientY });
      setAnimationKey(k => k + 1);
      setShowFly(true);
      setTimeout(() => {
        setShowFly(false);
        getIds(value.id, value.stoke);
      }, 600);
    });
  };

  return (
    <div className="group relative bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-auto mt-4 md:mt-8">

      {/* ── Image ──────────────────────────────────────────── */}
      <div className={`relative h-52 sm:h-64 md:h-90 lg:h-100 overflow-hidden bg-gray-50 flex items-center justify-center ${isOutOfStock ? 'opacity-70' : ''}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={value.name}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ color: '#4EC4BD' }}>
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
      <div className="p-2 md:p-4 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-[16px] md:text-[20px] font-bold text-right min-h-[1.5rem] line-clamp-2 text-gray-800">
          {value.company}
        </h3>
        <div className="text-[13px] md:text-[17px] font-semibold text-gray-600 text-right leading-tight line-clamp-2 mb-1">
          {value.name}
        </div>

        {/* Price block */}
        <div className="flex flex-col gap-1 items-end mb-2 p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50">
          {/* Current price */}
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-[18px] md:text-2xl" style={{ color: '#2E9E98' }}>
              {priceAfter}
            </span>
            <span className="font-bold text-[15px] md:text-xl" style={{ color: '#2E9E98' }}>ج</span>
            <span className="text-gray-500 text-[14px] md:text-[17px]">السعر</span>
          </div>

          {/* Original price (strikethrough) */}
          {discountInfo.percentage > 0 && (
            <div className="flex items-baseline gap-2">
              <del className="text-gray-400 text-[14px] md:text-[18px] font-medium">{value.price} ج</del>
              <span className="text-gray-400 text-[13px] md:text-[16px]">بدلاً من</span>
            </div>
          )}

          {/* Discount badge */}
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
          className={`w-full h-[42px] md:h-[50px] mt-auto rounded-lg md:rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-200 ${
            isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-default'
              : (isLoading || showFly)
                ? 'opacity-70 cursor-not-allowed'
                : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          }`}
          style={!isOutOfStock ? { background: TEAL, color: '#fff' } : {}}
          disabled={isLoading || isOutOfStock || showFly}
          onClick={(e) => { handleAddToCart(e); trackAddToCart?.(value.id, 1, value); }}
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
              <div className="bg-white p-2 rounded-full shadow-lg border-2" style={{ borderColor: '#4EC4BD' }}>
                <IconBook size={22} style={{ color: '#4EC4BD' }} />
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
