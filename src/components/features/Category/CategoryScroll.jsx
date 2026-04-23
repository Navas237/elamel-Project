import React from 'react';
import { useCatagory } from '../../../hooks/useCatagory';

function CategoryScroll() {
  const { data, isLoading, error } = useCatagory();

  if (isLoading || error || !data) return null;

  // Filter logic based on user request
  // 1. Any category with books == true grouped into ONE
  const hasBooks = data.some((cat) => cat.books === true);
  
  // 2. Any category with books == false displayed normally
  const otherCategories = data.filter((cat) => cat.books === false);

  // Combine them
  const displayCategories = [];
  if (hasBooks) {
    displayCategories.push({
      id: 'books-section', // Arbitrary ID to match home page section
      name: 'كتب خارجية',
    });
  }
  displayCategories.push(...otherCategories.map(cat => ({
    id: cat.name || cat.id, // using name or id for scroll target
    name: cat.name,
  })));

  const handleScrollTo = (id) => {
    // Assuming there are sections with these IDs in the Home page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // In case they don't have exactly an ID, maybe try navigating or let the user add the IDs later
      console.warn(`Section with id ${id} not found`);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 py-3 sticky top-0 z-40 overflow-hidden shadow-sm">
      <div className="max-w-5xl mx-auto px-4 overflow-x-auto scrollbar-hide">
        <ul className="flex items-center gap-3 w-max mx-auto md:mx-0">
          {displayCategories.map((cat, i) => (
            <li key={i}>
              <button
                onClick={() => handleScrollTo(cat.id)}
                className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-700 bg-white hover:bg-teal-50 hover:text-[var(--teal-600)] hover:border-teal-100 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-95 whitespace-nowrap"
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CategoryScroll;
