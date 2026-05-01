import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getItemDiscount } from '../../../utils/discountUtils';
import getOptimizedImage from '../../../hooks/useOptimizedImage';
import { useOffer } from '../../../hooks/useOffer';
import { useCartStore } from '../../../store/useCartStore';
import {
  IconLoading, IconCheck, IconCart, IconPackage, IconGift, IconSparkles, IconFlame
} from '../../../lib/icons';

const TEAL_GRADIENT = 'var(--gradient-brand)';
const GOLD_GRADIENT = 'linear-gradient(135deg, var(--brand-accent), var(--brand-accent-dark))';

const LifestyleProductCard = ({ product, index }) => {
  const { data: offersList } = useOffer();
  const { cartIds, cartloading, addToCart } = useCartStore();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFly, setShowFly] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);

  const isInCart = !!cartIds[product.id];
  const isLoading = !!cartloading[product.id];
  const isOutOfStock = product.stoke <= 0 || (cartIds[product.id] >= product.stoke);

  const discountInfo = useMemo(() => getItemDiscount(product, offersList || []), [product, offersList]);
  const priceAfter = Math.ceil(product.price - discountInfo.amount);
  const imageSrc = getOptimizedImage(product.image);

  const handleAddToCart = (e) => {
    if (isOutOfStock || isLoading || showFly) return;
    
    setClickCoords({ x: e.clientX, y: e.clientY });
    setShowFly(true);
    
    setTimeout(() => {
      setShowFly(false);
      addToCart(product.id, product.stoke, product);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
      dir="rtl"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
          />
        ) : (
          <div className="text-[var(--teal-200)]">
            <IconPackage size={64} strokeWidth={1} />
          </div>
        )}

        {/* Shimmer Overlay */}
        {!isLoaded && imageSrc && <div className="absolute inset-0 skeleton" />}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {discountInfo.percentage > 0 && (
            <div className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <IconFlame size={12} />
              <span>وفر {discountInfo.percentage}%</span>
            </div>
          )}
          {product.isNew && (
            <div className="bg-[var(--teal-500)] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <IconSparkles size={12} />
              <span>جديد</span>
            </div>
          )}
        </div>

      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] font-bold text-[var(--teal-500)] uppercase tracking-wider bg-[var(--teal-50)] px-2 py-0.5 rounded-md">
            {product.company}
          </span>
          {isInCart && (
            <div className="text-[var(--teal-500)] bg-[var(--teal-50)] p-1 rounded-full">
              <IconCheck size={14} strokeWidth={3} />
            </div>
          )}
        </div>

        <h3 className="text-sm md:text-lg font-extrabold text-slate-800 mb-2 line-clamp-2 group-hover:text-[var(--teal-600)] transition-colors h-[2.5em] md:h-auto">
          {product.name}
        </h3>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5 md:gap-1">
              <span className="text-lg md:text-2xl font-black text-slate-900">{priceAfter}</span>
              <span className="text-[10px] md:text-xs font-bold text-slate-400">ج.م</span>
            </div>
            {discountInfo.percentage > 0 && (
              <del className="text-xs text-slate-300 font-bold decoration-slate-300">
                {product.price} ج.م
              </del>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isLoading}
            className={`p-2.5 md:p-3 rounded-2xl transition-all duration-300 ${
              isOutOfStock 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-[var(--teal-500)] text-white shadow-lg active:scale-90 hover:bg-[var(--teal-600)]'
            }`}
          >
            {isLoading ? <IconLoading className="animate-spin" size={18} /> : <IconCart size={18} />}
          </button>
        </div>
      </div>

      {/* Flying Animation */}
      <AnimatePresence>
        {showFly && clickCoords && (
          <motion.div
            initial={{ position: 'fixed', left: clickCoords.x, top: clickCoords.y, opacity: 1, scale: 1, zIndex: 100 }}
            animate={{ left: window.innerWidth / 2, top: 0, opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.8, ease: "circIn" }}
            className="pointer-events-none"
          >
            <div className="bg-[var(--teal-500)] p-3 rounded-full text-white shadow-2xl">
              <IconGift size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-[var(--teal-600)] to-[var(--teal-400)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
    </motion.div>
  );
};

export default LifestyleProductCard;
