import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../services/SupabaseClient';
import { supbasecontext } from '../../context/SupbaseContext';
import { cartcontext } from '../../context/CartCotext';
import { getItemDiscount } from '../../utils/discountUtils';
import {
  IconLoading, IconCart, IconCheck, IconBook,
  IconFlame, IconArrowLeft,
} from '../../lib/icons';

/* ── Brand tokens ─────────────────────────────────────────── */
const TEAL    = 'var(--gradient-brand)';
const GOLD_BG = { background: 'linear-gradient(135deg,var(--brand-accent),var(--brand-accent-dark))' };

function SingleProduct() {
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, []);

  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const { getIds, cartloading, cartIds, trackAddToCart } = useContext(cartcontext);
  const { offersList } = useContext(supbasecontext);
  const [discountInfo,  setDiscountInfo]  = useState({ percentage: 0, amount: 0 });
  const [clickCoords,   setClickCoords]   = useState(null);
  const [showFly,       setShowFly]       = useState(false);
  const [animationKey,  setAnimationKey]  = useState(0);
  const [imgLoaded,     setImgLoaded]     = useState(false);

  const isInCart     = !!cartIds[productData?.id];
  const isLoading    = !!cartloading[productData?.id];
  const isOutOfStock = productData?.stoke <= 0 || cartIds[productData?.id] == productData?.stoke;

  const handleAddToCart = (e) => {
    setShowFly(false);
    requestAnimationFrame(() => {
      setClickCoords({ x: e.clientX, y: e.clientY });
      setAnimationKey(k => k + 1);
      setShowFly(true);
      setTimeout(() => {
        setShowFly(false);
        getIds(productData?.id, productData?.stoke);
      }, 800);
    });
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id);
      if (!error && data?.[0]) setProductData(data[0]);
    })();
  }, [id]);

  useEffect(() => {
    if (productData && offersList) {
      setDiscountInfo(getItemDiscount(productData, offersList));
    }
  }, [productData, offersList]);

  const priceAfter = productData?.price
    ? Math.ceil(productData.price - discountInfo.amount)
    : null;

  return (
    <div className="min-h-screen flex items-start justify-center px-3 pb-12"
      style={{ background: 'var(--gradient-surface)' }}>

      <div className="w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* ── Image ─────────────────────────────────────────── */}
        <div className={`relative w-full aspect-[4/3] overflow-hidden bg-gray-50 ${isOutOfStock ? 'opacity-75' : ''}`}>
          {productData.image ? (
            <>
              <img
                src={productData.image}
                alt={`${productData.company || 'كتاب'} - ${productData.name || ''}`}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              />
              {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            </>
          ) : (
            <div className="flex items-center justify-center h-full" style={{ color: 'var(--teal-400)' }}>
              <IconBook size={72} strokeWidth={1} />
            </div>
          )}

          {/* Out-of-stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex items-center justify-center">
              <div className="px-6 py-3 rounded-2xl shadow-xl rotate-[-5deg] flex items-center gap-2 font-bold text-gray-900 text-base" style={GOLD_BG}>
                <span>⏳</span><span>سوف يتوفر قريباً</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Details ───────────────────────────────────────── */}
        <div className="p-5 md:p-7 flex flex-col gap-5 text-right">

          {/* Title */}
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 leading-snug">
              {productData?.company}
            </h1>
            <p className="text-base md:text-lg font-semibold text-gray-600 mt-1 leading-tight">
              {productData?.name}
            </p>
          </div>

          {/* Price block */}
          <div className="rounded-xl md:rounded-2xl p-4 bg-gray-50 flex flex-col items-end gap-2">
            {/* Current price */}
            <div className="flex items-baseline gap-2">
              <span className="font-black text-3xl md:text-4xl" style={{ color: 'var(--teal-500)' }}>
                {priceAfter ?? '—'}
              </span>
              <span className="font-bold text-xl" style={{ color: 'var(--teal-500)' }}>ج</span>
              <span className="text-gray-500 text-lg">السعر</span>
            </div>

            {/* Original price */}
            {discountInfo.percentage > 0 && (
              <div className="flex items-baseline gap-2">
                <del className="text-gray-400 text-lg font-medium">{productData?.price} ج</del>
                <span className="text-gray-400 text-base">بدلاً من</span>
              </div>
            )}

            {/* Discount badge */}
            {discountInfo.percentage > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-gray-900 shadow-sm text-sm" style={GOLD_BG}>
                <IconFlame size={14} />
                <span>وفّر {discountInfo.amount} ج ({discountInfo.percentage}%)</span>
              </div>
            )}
          </div>

          {/* CTA button */}
          <motion.button
            whileTap={!isLoading && !isOutOfStock && !showFly ? { scale: 0.95 } : {}}
            whileHover={!isLoading && !isOutOfStock && !showFly ? { scale: 1.02 } : {}}
            className={`w-full h-14 rounded-xl md:rounded-2xl font-extrabold text-base md:text-lg flex items-center justify-center gap-2.5 transition duration-200 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-default'
                : (isLoading || showFly)
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:shadow-lg hover:-translate-y-0.5'
            }`}
            style={!isOutOfStock ? { background: TEAL, color: '#fff' } : {}}
            disabled={isLoading || isOutOfStock || showFly}
            onClick={(e) => {
              handleAddToCart(e);
              if (trackAddToCart) trackAddToCart(productData?.id, 1, productData);
            }}
          >
            {(isLoading || showFly) ? (
              <IconLoading size={20} className="animate-spin" />
            ) : productData?.stoke <= 0 ? (
              <span>غير متوفر</span>
            ) : isOutOfStock ? (
              <span>نفذت الكمية</span>
            ) : isInCart ? (
              <><IconCheck size={20} strokeWidth={2.5} /><span>أضف المزيد للسلة</span></>
            ) : (
              <><IconCart size={20} /><span>إضافة للسلة</span></>
            )}
          </motion.button>

        </div>

        {/* Flying animation */}
        <AnimatePresence mode="wait">
          {showFly && clickCoords && (
            <motion.div
              key={animationKey}
              initial={{ position: 'fixed', left: clickCoords.x - 14, top: clickCoords.y - 14, opacity: 1, scale: 1.2, zIndex: 9999 }}
              animate={{ left: window.innerWidth / 2, top: window.innerHeight - 60, opacity: [1, 1, 0], scale: [1.2, 0.8, 0.3], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="pointer-events-none"
            >
              <div className="bg-white p-2.5 rounded-full shadow-xl border-2" style={{ borderColor: 'var(--teal-400)' }}>
                <IconBook size={24} style={{ color: 'var(--teal-400)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent */}
        <div className="h-1" style={{ background: TEAL }} />
      </div>
    </div>
  );
}

export default SingleProduct;