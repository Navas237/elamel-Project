
import React, { useEffect } from 'react';
import Header from '../../components/features/Header/Header';
import Category from '../../components/features/Category/Category';
import CategoryScroll from '../../components/features/Category/CategoryScroll';
import OtherCategorySection from '../../components/features/Category/OtherCategorySection';
import { useCatagory } from '../../hooks/useCatagory';
import About from '../../components/features/about/About';

function Home() {
  const { data: categories, isLoading, error } = useCatagory();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const otherCategories = categories?.filter((cat) => cat.books === false) || [];

  return (
    <div>
      <Header />
      <CategoryScroll />
      <Category />
      
      {/* Render Sections for Non-Book Categories */}
      {otherCategories.map((category) => (
        <OtherCategorySection key={category.id} category={category} />
      ))}

      <About/>
    </div>
  );
}

export default Home;