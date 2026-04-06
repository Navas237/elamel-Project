import React, { useContext, useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import './Books.css';
import { supbasecontext } from '../../context/SupbaseContext';
import { getItemDiscount } from '../../utils/discountUtils';
import { useParams, useSearchParams } from 'react-router-dom';
import { cartcontext } from '../../context/CartCotext';
import Lottie from 'lottie-react';
import lotieError from '../../assets/lotiefiles/Errorlotie.json';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import { IoBookSharp } from "react-icons/io5";
import BottomNav from '../../components/common/BottomNav/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';

const BookSkeleton = () => {
  return (
    <div className='bg-white rounded-xl mt-10 md:rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden flex flex-col h-full'>
      {/* ... (rest of skeleton) */}
      <div className='h-52 sm:h-64 md:h-72 lg:h-80 bg-gray-200 relative overflow-hidden'>
        <div className='absolute inset-0 skeleton-shimmer'></div>
      </div>
      <div className='p-3 md:p-4 space-y-3 flex-grow'>
        <div className='h-4 md:h-6 bg-gray-200 rounded-lg w-3/4 mr-auto'></div>
        <div className='h-4 md:h-5 bg-gray-200 rounded-lg w-1/2 mr-auto'></div>
        <div className='bg-gray-50 p-2 md:p-3 rounded-xl space-y-2 mt-4'>
          <div className='h-3 md:h-4 bg-gray-200 rounded w-1/3 mr-auto'></div>
          <div className='h-3 md:h-4 bg-gray-200 rounded w-1/4 mr-auto'></div>
        </div>
      </div>
      <div className='p-3 md:p-4 mt-auto'>
        <div className='h-10 md:h-12 bg-gray-200 rounded-xl w-full'></div>
      </div>
    </div>
  );
};

const getOptimizedImage = (url) => {
  if (!url) return url;
  if (url.startsWith('data:') || url.startsWith('/') || url.includes('localhost')) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=900&output=webp&q=90`;
};

const BookItem = ({ value, cartIds, cartloading, getIds, index, trackAddToCart }) => {
  const { offersList } = useContext(supbasecontext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [showFly, setShowFly] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isInCart = cartIds[value.id];
  const isLoading = cartloading[value.id];
  const isOutOfStock = value.stoke <= 0 || cartIds[value.id] == value.stoke;

  const discountInfo = useMemo(() => getItemDiscount(value, offersList), [value, offersList]);
  const priceAfter = Math.ceil(value.price - discountInfo.amount);

  const handleAddToCart = (e) => {

    setShowFly(false);


    requestAnimationFrame(() => {
      setClickCoords({ x: e.clientX, y: e.clientY });
      setAnimationKey(prev => prev + 1);
      setShowFly(true);

      setTimeout(() => {
        setShowFly(false);
        getIds(value.id, value.stoke);
      }, 600);
    });

  };

  return (
    <div
      key={value.id}
      className='group relative bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-auto mt-4 md:mt-8'
    >

      <div className={`relative h-52 sm:h-64 md:h-90 lg:h-100 overflow-hidden bg-gray-50 flex items-center justify-center ${isOutOfStock ? 'opacity-75' : ''}`}>
        <img
          src={getOptimizedImage(value.image)}
          alt={value.name}
          loading={index < 4 ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
            } ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
        />


        {!isLoaded && (
          <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>
        )}


        {isInCart && (
          <div className='absolute top-2 left-2 md:top-4 md:left-4 bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1 md:gap-2 z-10'>
            <FiCheckCircle className='text-xs md:text-xl' />
            <span className='font-semibold text-[10px] md:text-sm'>في العربة</span>
          </div>
        )}


        {isOutOfStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10'>
            <div className='bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-2xl shadow-xl transform rotate-[-5deg] flex items-center gap-1.5 md:gap-3 border border-white/20'>
              <span className='font-bold text-xs md:text-lg whitespace-nowrap'>سوف يتوفر قريباً</span>
              <span className='text-sm md:text-2xl'>⏳</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='p-2 md:p-4 flex flex-col flex-grow'>
        {/* Book Name - Keep exact same sizes */}

        <h3 className='text-[16px] md:text-[22px]  font-bold  text-right min-h-[1.5rem] md:min-h-[auto] line-clamp-2 '>
          {value.company}
        </h3>
        <div className='text-[14px] md:text-[18px] font-bold text-gray-800 text-right leading-tight p-0 m-0 line-clamp-2 '>
          {value.name}
          <span className=""> </span>
          {/* <sub className='shrink-0 text-[10px] md:text-[14px] rounded backdrop-blur-sm mt-0.5 '>
            {value.term && `(${value.term})`}
          </sub> */}
        </div>

        {/* Price Section - Keep exact same sizes */}
        <div className='flex flex-col gap-1 items-end md:gap-1.5 mb-1 md:mb-2 bg-gradient-to-l from-slate-50 to-transparent p-2 md:p-3 rounded-lg md:rounded-xl'>
          <div className='flex items-center gap-3 text-xl md:text-2xl'>
            <div className='flex gap-0.5 md:gap-1 items-baseline'>
              <span className='text-green-600 font-bold text-[17px] md:text-2xl'>ج</span>
              <span className='text-green-600 font-extrabold text-[17px] md:text-2xl'>{priceAfter}</span>
            </div>
            <span className='text-gray-600 text-[18px] md:text-2xl font-bold'>السعر</span>
          </div>
            
             {discountInfo.percentage > 0 && ( 
          <div className='flex items-center gap-3 text-[17px] md:text-2xl'>
            <div className='flex gap-0.5 md:gap-1 items-baseline'>
              <del className='text-red-400'>ج</del>
              <del className='text-red-400 font-bold'>{value.price}</del>
            </div>
            <span className='text-gray-500 text-[18px] md:text-2xl'>بدلاً من</span>
          </div> ) }

          {discountInfo.percentage > 0 && (
            <div className='flex items-center gap-3'>
              <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                وفّر {discountInfo.amount} ج 🔥
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart Button - Keep exact same sizes */}
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
            trackAddToCart(value.id, 1, value);
          }}
        >
          {(isLoading || showFly) ? (
            <AiOutlineLoading3Quarters className='text-sm md:text-xl animate-spin' />
          ) : value.stoke <= 0 ? (
            <span className='whitespace-nowrap'>غير متوفر</span>
          ) : isInCart ? (
            <>
              {value.stoke == cartIds[value.id] ? (
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
                <IoBookSharp className="text-3xl md:text-3xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Accent Line */}
      <div className='h-1 bg-gradient-to-r from-blue-600 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
    </div>
  );
};

function Books() {
  const { prodects, Displayprodect, prodectsError, prodectsLoading } = useContext(supbasecontext);
  const { getIds, cartloading, cartIds, trackAddToCart } = useContext(cartcontext);
  const { level, level2 } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('ty');
  const [subType, setSubType] = useState('rev');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedTypebook, setSelectedTypebook] = useState('all');


  useEffect(() => {
    if (!level || !level2) return;
    Displayprodect(level, level2);
  }, [level, level2]);

  const isSec3Revision = level === 'sec' && level2 === '3' && type === 'rev';
  const isSec3Exam = level === 'sec' && level2 === '3' && type === 'exam';

  // 1. Get the base products for this specific section (before company/material filters)
  const baseProducts = useMemo(() => {
    return prodects?.filter(value => {
      if (value.stuts === "لسه مش نزل") return false;
      if (isSec3Revision) return value.stutsd === subType;
      if (isSec3Exam) return value.stutsd === 'exam';
      return true;
    });
  }, [prodects, isSec3Revision, isSec3Exam, subType]);

  // 2. Prepare Options for react-select (Stable)
  const companyOptions = useMemo(() => {
    const unique = [...new Set(baseProducts?.map(p => p.company).filter(Boolean))].sort();
    return [{ value: 'all', label: ' اسم الكتاب ' }, ...unique.map(c => ({ value: c, label: c }))];
  }, [baseProducts]);

  const typebookOptions = useMemo(() => {
    const unique = [...new Set(baseProducts?.map(p => p.typebook).filter(Boolean))].sort();
    return [{ value: 'all', label: ' الماده ' }, ...unique.map(t => ({ value: t, label: t }))];
  }, [baseProducts]);

  // 3. Final Filtered Products (Applying selection)
  const filteredProducts = useMemo(() => {
    return baseProducts?.filter(value => {
      const matchesCompany = selectedCompany === 'all' || value.company === selectedCompany;
      const matchesType = selectedTypebook === 'all' || value.typebook === selectedTypebook;
      return matchesCompany && matchesType;
    });
  }, [baseProducts, selectedCompany, selectedTypebook]);

  // Custom Select Styling
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: '#fff',
      border: state.isFocused ? '1px solid #3b82f6' : '1px solid #e1e4e8',
      boxShadow: state.isFocused ? '0 4px 12px rgba(59, 130, 246, 0.15)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
      },
      transition: 'all 0.3s ease',
      textAlign: 'right',
      direction: 'rtl',
      minHeight: '45px',
    }),
    placeholder: (base) => ({ ...base, textAlign: 'right', color: '#64748b' }),
    singleValue: (base) => ({ ...base, textAlign: 'right', fontWeight: 'bold', color: '#374151' }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      zIndex: 100,
      textAlign: 'right'
    }),
    option: (base, state) => ({
      ...base,
      textAlign: 'right',
      fontSize: '14px',
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : '#fff',
      color: state.isSelected ? '#fff' : '#334155',
      padding: '10px 15px',
      fontWeight: state.isSelected ? 'bold' : 'normal',
    }),
  };

  return (
    <div className='books min-h-screen  mt-15 bg-gradient-to-br from-gray-50 to-gray-100 pb-20'>


      <div className='max-w-7xl mx-auto px-1 mt-[-10px] pt-4   md:pt-8 pb-4 md:pb-8'>
        {/* Filters UI - Sticky and Side-by-Side */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sticky top-[100px] md:top-[125px] z-30 bg-gray-50/90 backdrop-blur-md py-2 px-1 mb-6 border-b border-gray-100 shadow-sm"
        >
          <div className="flex flex-row-reverse items-center justify-center gap-2 max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-1/2 md:w-72"
            >
              <Select
                options={companyOptions}
                value={companyOptions.find(o => o.value === selectedCompany)}
                onChange={(val) => setSelectedCompany(val.value)}
                styles={customSelectStyles}
                placeholder="اسم الكتاب"
                isSearchable={false}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-1/2 md:w-72"
            >
              <Select
                options={typebookOptions}
                value={typebookOptions.find(o => o.value === selectedTypebook)}
                onChange={(val) => setSelectedTypebook(val.value)}
                styles={customSelectStyles}
                placeholder="المادة"
                isSearchable={false}
              />
            </motion.div>

          </div>
        </motion.div>


        {prodectsLoading ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6'>
            {Array(10).fill(0).map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        ) : prodectsError ? (
          <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
            <Lottie animationData={lotieError} className='w-48 md:w-64' />
            <div className='bg-red-50 border-r-4 border-red-500 rounded-xl p-6 mt-6 max-w-md'>
              <h3 className='text-red-800 text-xl font-bold mb-2 text-center'>
                ⚠️ حدث خطأ
              </h3>
              <p className='text-red-600 text-center text-lg'>
                يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى
              </p>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-2   sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-3 md:gap-6'>
            {filteredProducts?.map((value, index) => (
              <BookItem
                key={value.id}
                value={value}
                cartIds={cartIds}
                cartloading={cartloading}
                getIds={getIds}
                trackAddToCart={trackAddToCart}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!prodectsLoading && !prodectsError && level && level2 && filteredProducts?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6 animate-bounce">📚</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">
              لا توجد كتب متاحة حالياً
            </h3>
            <p className="text-gray-500 text-base sm:text-lg text-center">
              جرب اختيار مرحلة دراسية أخرى
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;