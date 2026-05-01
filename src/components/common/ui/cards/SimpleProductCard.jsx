import React, { useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getItemDiscount } from '../../../../utils/discountUtils';
import { supbasecontext } from '../../../../context/SupbaseContext';
import getOptimizedImage from '../../../../hooks/useOptimizedImage';
import {
  IconLoading, IconCheck, IconCart, IconPackage, IconFlame,
} from '../../../../lib/icons';

const TEAL = 'var(--gradient-brand)';
const GOLD_BG = { background: 'linear-gradient(135deg,var(--brand-accent),var(--brand-accent-dark))' };

function SimpleProductCard({ value, cartIds, cartloading, getIds, index, trackAddToCart }) {
  const { offersList } = useContext(supbasecontext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [showFly, setShowFly] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isInCart = !!cartIds[value.id];
  const isLoading = !!cartloading[value.id];
  const isOutOfStock = value.stoke <= 0 || cartIds[value.id] == value.stoke;

  // Uses existing discount util if applicable to standard products
  const discountInfo = useMemo(() => getItemDiscount(value, offersList), [value, offersList]);
  const priceAfter = Math.ceil(value.price - discountInfo.amount);
  const imageSrc = getOptimizedImage(value.image) || null;

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
    <div className="group relative  bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(78,196,189,0.12)] transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-auto mt-4">
      {/* ── Image ──────────────────────────────────────────── */}
      <div className={`relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4 ${isOutOfStock ? 'opacity-70' : ''}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${value.name || 'منتج'}`}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-contain transition duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-teal-300">
            <IconPackage size={56} strokeWidth={1.5} />
          </div>
        )}

        {/* Skeleton */}
        {imageSrc && !isLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* Badges */}
        {isInCart && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 text-xs font-bold shadow-md" style={{ background: TEAL }}>
            <IconCheck size={14} strokeWidth={2.5} />
            <span>في العربة</span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-10">
            <div className="text-gray-900 px-5 py-2.5 rounded-xl shadow-lg rotate-[-3deg] flex items-center gap-2 font-bold text-sm" style={GOLD_BG}>
              <span>نفذت الكمية ⏳</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Details ────────────────────────────────────────── */}
      <div className="p-4 md:p-5 flex flex-col flex-grow gap-3 text-right">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-snug line-clamp-2 min-h-[3rem]">
          {value.name}
        </h3>
        {value.company && (
          <p className="text-sm font-medium text-gray-500">{value.company}</p>
        )}

        {/* Price block */}
        <div className="flex flex-col items-end gap-1 mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-xl md:text-2xl text-[var(--teal-600)]">{priceAfter}</span>
            <span className="font-bold text-base md:text-lg text-[var(--teal-600)]">ج</span>
          </div>

          {discountInfo.percentage > 0 && (
            <div className="flex items-center gap-2">
              <del className="text-gray-400 text-sm">{value.price} ج</del>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-gray-900" style={GOLD_BG}>
                <IconFlame size={12} /> وفر {discountInfo.amount}
              </div>
            </div>
          )}
        </div>

        {/* Add to cart */}
        <motion.button
          whileTap={!isLoading && !isOutOfStock && !showFly ? { scale: 0.95 } : {}}
          whileHover={!isLoading && !isOutOfStock && !showFly ? { scale: 1.02 } : {}}
          className={`w-full h-11 md:h-12 mt-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition duration-200 ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : (isLoading || showFly) ? 'opacity-70 cursor-wait' : 'cursor-pointer shadow-sm hover:shadow-md'
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
          onClick={(e) => { handleAddToCart(e); trackAddToCart?.(value.id, 1, value); }}
        >
          {(isLoading || showFly) ? (
            <IconLoading size={20} className="animate-spin" />
          ) : isOutOfStock ? (
            <span>غير متوفر</span>
          ) : isInCart ? (
            <><IconCheck size={18} strokeWidth={2.5} /><span>أضف المزيد</span></>
          ) : (
            <><IconCart size={18} /><span>إضافة للسلة</span></>
          )}
        </motion.button>

        {/* Flying animate */}
        <AnimatePresence>
          {showFly && clickCoords && (
            <motion.div
              key={animationKey}
              initial={{ position: 'fixed', left: clickCoords.x - 10, top: clickCoords.y - 10, opacity: 1, scale: 1.2, zIndex: 9999 }}
              animate={{ left: window.innerWidth / 2, top: window.innerHeight - 50, opacity: [1, 1, 0], scale: [1.2, 0.8, 0.3], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none"
            >
              <div className="bg-white p-2 md:p-3 rounded-full shadow-2xl border flex items-center justify-center" style={{ borderColor: 'var(--teal-400)' }}>
                <IconPackage size={20} style={{ color: 'var(--teal-500)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default SimpleProductCard;
