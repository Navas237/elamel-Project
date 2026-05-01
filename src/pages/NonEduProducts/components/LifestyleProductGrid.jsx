import React from 'react';
import LifestyleProductCard from './LifestyleProductCard';
import { IconPackage } from '../../../lib/icons';

const LifestyleProductGrid = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 animate-pulse">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl" />
            <div className="h-6 w-2/3 bg-gray-100 rounded-lg" />
            <div className="h-10 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-[var(--teal-50)] flex items-center justify-center mb-6 text-[var(--teal-200)]">
          <IconPackage size={48} strokeWidth={1} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">لا توجد منتجات حالياً</h3>
        <p className="text-slate-400 font-medium">نعمل على إضافة المزيد من المنتجات الرائعة قريباً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
      {products.map((product, index) => (
        <LifestyleProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default LifestyleProductGrid;
