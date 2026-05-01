import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LifestyleCategoryTabs = ({ categories, activeCategoryId, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="sticky top-[58px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 mb-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 min-w-max pb-1">
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap active:scale-95
                    ${isActive 
                      ? 'text-white' 
                      : 'text-slate-500 hover:text-[var(--teal-600)] hover:bg-[var(--teal-50)]'
                    }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="lifestyle-nav-pill"
                        className="absolute inset-0 bg-gradient-to-br from-[var(--teal-600)] to-[var(--teal-400)] shadow-md"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        style={{ borderRadius: 9999 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleCategoryTabs;
