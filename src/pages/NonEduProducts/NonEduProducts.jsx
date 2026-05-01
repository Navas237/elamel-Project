import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatagory } from '../../hooks/useCatagory';
import { useProducts } from '../../hooks/useProducts';
import LifestyleHero from './components/LifestyleHero';
import LifestyleCategoryTabs from './components/LifestyleCategoryTabs';
import LifestyleProductGrid from './components/LifestyleProductGrid';
import Filter from '../products/uiComponents/Filter';
import { IconPackage, IconZap } from '../../lib/icons';

const NonEduProducts = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const navigate = useNavigate();
  const { data: categories, isLoading: isCatLoading } = useCatagory();
  
  // Filter for tools/lifestyle categories
  const lifestyleCategories = useMemo(() => {
    return categories?.filter(cat => cat.type === 'tools') || [];
  }, [categories]);

  // Sync state with URL params
  const activeCategory = useMemo(() => {
    if (categorySlug) {
      return lifestyleCategories.find(c => c.slug === categorySlug);
    }
    return lifestyleCategories[0];
  }, [lifestyleCategories, categorySlug]);

  const activeSubCategory = useMemo(() => {
    if (subCategorySlug && activeCategory) {
      return activeCategory.grades?.find(g => g.slug === subCategorySlug);
    }
    return activeCategory?.grades?.[0];
  }, [activeCategory, subCategorySlug]);

  // Fetch products using the hook as requested
  const { data: products, isLoading: isProductsLoading, error } = useProducts(
    activeCategory?.slug,
    activeSubCategory?.slug
  );

  // Filter States (like Books.jsx)
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Prepare Filter Options
  const companyOptions = useMemo(() => {
    if (!products) return [{ value: 'all', label: 'الماركة', icon: IconPackage }];
    const unique = [...new Set(products.map(p => p.company).filter(Boolean))].sort();
    return [
      { value: 'all', label: 'الماركة', icon: IconPackage },
      ...unique.map(c => ({ value: c, label: c, icon: IconPackage }))
    ];
  }, [products]);

  const typeOptions = useMemo(() => {
    if (!products) return [{ value: 'all', label: 'النوع', icon: IconZap }];
    const unique = [...new Set(products.map(p => p.typebook).filter(Boolean))].sort();
    return [
      { value: 'all', label: 'النوع', icon: IconZap },
      ...unique.map(t => ({ value: t, label: t, icon: IconZap }))
    ];
  }, [products]);

  // Apply filters to product list
  const filteredProducts = useMemo(() => {
    return products?.filter((p) => {
      const matchesCompany = selectedCompany === 'all' || p.company === selectedCompany;
      const matchesType = selectedType === 'all' || p.typebook === selectedType;
      return matchesCompany && matchesType;
    });
  }, [products, selectedCompany, selectedType]);

  const handleCategoryChange = (catId) => {
    const cat = lifestyleCategories.find(c => c.id === catId);
    if (cat) {
      const firstSub = cat.grades?.[0]?.slug || 'all';
      navigate(`/t/${cat.slug}/${firstSub}`);
    }
  };

  const handleSubCategoryChange = (subSlug) => {
    if (activeCategory) {
      navigate(`/t/${activeCategory.slug}/${subSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24" dir="rtl">
      {/* <LifestyleHero /> */}
      
      {/* <LifestyleCategoryTabs 
        categories={lifestyleCategories} 
        activeCategoryId={activeCategory?.id}
        onCategoryChange={handleCategoryChange}
      /> */}

      <div className="max-w-6xl mx-auto px-4">
        {/* Subcategories (Grades) if any */}
        {activeCategory?.grades?.length > 1 && (
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {activeCategory.grades.map((grade) => (
              <button
                key={grade.id}
                onClick={() => handleSubCategoryChange(grade.slug)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all duration-300 border
                  ${activeSubCategory?.slug === grade.slug
                    ? 'bg-[var(--teal-50)] border-[var(--teal-200)] text-[var(--teal-600)] shadow-sm'
                    : 'bg-white border-gray-100 text-slate-400 hover:border-[var(--teal-100)] hover:text-slate-600'
                  }`}
              >
                {grade.name}
              </button>
            ))}
          </div>
        )}

        {/* Filter Section (Like the normal products page) */}
        {!isCatLoading && (
          <Filter 
            companyOptions={companyOptions}
            typebookOptions={typeOptions}
            selectedCompany={selectedCompany}
            selectedTypebook={selectedType}
            setSelectedCompany={setSelectedCompany}
            setSelectedTypebook={setSelectedType}
          />
        )}

        {/* Section Title */}
        <div className="flex items-center justify-between mt-12 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[var(--teal-600)] to-[var(--teal-400)] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              {activeCategory?.name || 'المنتجات'}
              {activeSubCategory && activeCategory?.grades?.length > 1 && (
                <span className="text-[var(--teal-500)] mr-2">— {activeSubCategory.name}</span>
              )}
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-slate-400 font-bold text-sm">
            <span>{filteredProducts?.length || 0} منتج</span>
          </div>
        </div>

        <LifestyleProductGrid 
          products={filteredProducts} 
          isLoading={isProductsLoading || isCatLoading} 
        />
      </div>
    </div>
  );
};

export default NonEduProducts;
