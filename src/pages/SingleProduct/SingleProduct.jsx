import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import BookItem from '../../components/common/ui/cards/BookItem';
import Lottie from "lottie-react";
import Loadunglotie from '../../assets/lotiefiles/Loading animation blue.json';

function SingleProduct() {
  const { id } = useParams();
  const { data: productData, isLoading, isError } = useProduct(id);

  useEffect(() => { 
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); 
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Lottie animationData={Loadunglotie} className='w-40' loop={true} />
      </div>
    );
  }

  if (isError || !productData) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className="text-xl font-bold text-gray-600">عذراً، المنتج غير موجود</p>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center px-3 mt-15 pb-12"
      style={{ background: 'var(--gradient-surface)' }}>
      <BookItem 
        value={productData} 
        index={0} 
        isSingleProduct={true} 
      />
    </div>
  );
}

export default SingleProduct;