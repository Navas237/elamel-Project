import React, { useContext } from 'react';
import { useCategoryProducts } from '../../../hooks/useCategoryProducts';
import SimpleProductCard from '../../common/ui/cards/SimpleProductCard';
import { cartcontext } from '../../../context/CartCotext';
import BookSkeleton from '../../../pages/products/uiComponents/BookSkeleton';

function OtherCategorySection({ category }) {
  const { data: products, isLoading, error } = useCategoryProducts(category?.value, category?.stages[0]?.value);
  const { getIds, cartloading, cartIds, trackAddToCart } = useContext(cartcontext);

  if (isLoading) {
    return (
      <div id={category.name || category.id} className="max-w-5xl mx-auto px-4 mb-16 pt-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] text-right mb-6">{category.name}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:gap-6">
          {Array(4).fill(0).map((_, i) => <BookSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return null; // Don't show the section if no products or error
  }

  return (
    <div id={category.name || category.id} className="max-w-5xl mx-auto px-4 mb-16 pt-2 mt-2 " style={{direction : "rtl"}}>
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--teal-800)]">
          {category.name}
        </h2>
        {/* Optional: Add a "See All" link if there's a dedicated page */}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:gap-6">
        {products.map((item, index) => (
          <SimpleProductCard
            key={item.id}
            value={item}
            index={index}
            cartIds={cartIds}
            cartloading={cartloading}
            getIds={getIds}
            trackAddToCart={trackAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default OtherCategorySection;
