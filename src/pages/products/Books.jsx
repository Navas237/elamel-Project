import React, { useEffect, useContext, useMemo, useState } from 'react';
import './Books.css';
import { supbasecontext } from '../../context/SupbaseContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { cartcontext } from '../../context/CartCotext';
import Lottie from 'lottie-react';
import lotieError from '../../assets/lotiefiles/Errorlotie.json';
import BookSkeleton from './uiComponents/BookSkeleton';
import BookItem from '../../components/common/ui/cards/BookItem';
import Filter from './uiComponents/Filter';
import { useProducts } from '../../hooks/useProducts';
import { IconBook, IconPackage, IconBookOpen } from '../../lib/icons';



function Books() {
  const { getIds, cartloading, cartIds, trackAddToCart } = useContext(cartcontext);
  const { level, level2 } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('ty');
  const [subType] = useState('rev');
  const [selectedCompany, setSelectedCompany]     = useState('all');
  const [selectedTypebook, setSelectedTypebook]   = useState('all');

  const { data, error, isLoading } = useProducts(level, level2);

  const isSec3Revision = level === 'sec' && level2 === '3' && type === 'rev';
  const isSec3Exam     = level === 'sec' && level2 === '3' && type === 'exam';

  const baseProducts = useMemo(() => {
    return data?.filter((value) => {
      if (value.stuts === 'لسه مش نزل') return false;
      if (isSec3Revision) return value.stutsd === subType;
      if (isSec3Exam)     return value.stutsd === 'exam';
      return true;
    });
  }, [data, isSec3Revision, isSec3Exam, subType]);

  const companyOptions = useMemo(() => {
    const unique = [...new Set(baseProducts?.map(p => p.company).filter(Boolean))].sort();
    return [{ value: 'all', label: 'اسم الكتاب', icon: IconPackage }, ...unique.map(c => ({ value: c, label: c, icon: IconPackage }))];
  }, [baseProducts]);

  const typebookOptions = useMemo(() => {
    const unique = [...new Set(baseProducts?.map(p => p.typebook).filter(Boolean))].sort();
    return [{ value: 'all', label: 'المادة', icon: IconBookOpen }, ...unique.map(t => ({ value: t, label: t, icon: IconBookOpen }))];
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    return baseProducts?.filter((value) => {
      const matchesCompany = selectedCompany === 'all' || value.company === selectedCompany;
      const matchesType    = selectedTypebook === 'all' || value.typebook === selectedTypebook;
      return matchesCompany && matchesType;
    });
  }, [baseProducts, selectedCompany, selectedTypebook]);

  return (
    <div className="books min-h-screen mt-15 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-1 mt-[-10px] pt-0 pb-4 md:pb-8">

        <Filter
          companyOptions={companyOptions}
          typebookOptions={typebookOptions}
          selectedCompany={selectedCompany}
          selectedTypebook={selectedTypebook}
          setSelectedCompany={setSelectedCompany}
          setSelectedTypebook={setSelectedTypebook}
        />

        {/* Loading skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 md:gap-6">
            {Array(10).fill(0).map((_, i) => <BookSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <Lottie animationData={lotieError} className="w-48 md:w-64" />
            <div className="rounded-xl p-6 mt-6 max-w-md border" style={{ background: 'var(--brand-danger-light)', borderColor: 'var(--brand-danger)' }}>
              <h3 className="text-red-700 text-xl font-bold mb-2 text-center">حدث خطأ</h3>
              <p className="text-red-600 text-center">يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 md:gap-6">
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

        {/* Empty state */}
        {!isLoading && !error && level && level2 && filteredProducts?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
              style={{ background: 'var(--gradient-brand)' }}
            >
              <IconBook size={36} color="#fff" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center" style={{ color: 'var(--teal-600)' }}>
              لا توجد كتب متاحة حاليًا
            </h3>
            <p className="text-center" style={{ color: 'var(--teal-300)' }}>
              جرّب اختيار مرحلة دراسية أخرى
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
