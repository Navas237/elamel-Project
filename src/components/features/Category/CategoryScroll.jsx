import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useCatagory } from '../../../hooks/useCatagory';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CategoryScroll Component - UI/UX Pro Max Version
 * - Intelligent Sticky Detection
 * - High-Precision IntersectionObserver Scroll-Sync
 * - Premium Glassmorphism & Animations
 */
function CategoryScroll() {
  const { data: categories, isLoading, error } = useCatagory();
  const [activeId, setActiveId] = useState(null);
  const [isStuck, setIsStuck] = useState(false);
  const containerRef = useRef(null);
  const isClickScrolling = useRef(false);

  const displayCategories = useMemo(() => {
    if (!categories) return [];

    const hasEducation = categories.some((cat) => cat.type === 'education');
    const otherCategories = categories.filter((cat) => cat.type !== 'education');

    const list = [];
    if (hasEducation) {
      list.push({
        id: 'books-section',
        name: 'الكتب الخارجية',
      });
    }

    otherCategories.forEach(cat => {
      list.push({
        id: cat.name || cat.id,
        name: cat.name,
      });
    });

    return list;
  }, [categories]);

  // Handle Sticky State and Active Section Tracking
  useEffect(() => {
    if (displayCategories.length === 0) return;

    // High-Precision Observer
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px', // Precise zone for triggering active state
      threshold: [0, 0.1, 0.5]
    };

    const handleIntersect = (entries) => {
      if (isClickScrolling.current) return;
      
      const intersectingEntries = entries.filter(e => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Find the one closest to the top of the viewport active zone
        const bestMatch = intersectingEntries.reduce((prev, curr) => {
          return Math.abs(curr.boundingClientRect.top - 150) < Math.abs(prev.boundingClientRect.top - 150) ? curr : prev;
        });
        setActiveId(bestMatch.target.id);
      } else {
        // If nothing is intersecting, and we are at the very top of the page, clear activeId
        if (window.pageYOffset < 200) {
          setActiveId(null);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    displayCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const navbarHeight = window.innerWidth < 768 ? 56 : 58;
        const stuck = rect.top <= navbarHeight + 5;
        if (stuck !== isStuck) setIsStuck(stuck);
        
        // If we scroll back to top, clear the active highlight
        if (window.pageYOffset < 100) {
          setActiveId(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayCategories, isStuck]);

  const handleScrollTo = (id) => {
    isClickScrolling.current = true;
    setActiveId(id);
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = window.innerWidth < 768 ? 135 : 155; 
      const rect = element.getBoundingClientRect();
      const offsetPosition = rect.top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };

  if (isLoading || error || !categories || displayCategories.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'sticky', 
        top: window.innerWidth < 768 ? '56px' : '58px',
        zIndex: 1000,
      }}
      className={`w-full transition-all duration-500 ease-in-out ${
        isStuck 
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] py-3 border-b border-gray-100 pt-6' 
          : 'bg-white/50 backdrop-blur-md py-6'
      }`} 
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <ul className="flex items-center gap-3 w-max md:mx-auto py-1 px-2">
            {displayCategories.map((cat) => (
              <li key={cat.id} className="relative">
                <button
                  onClick={() => handleScrollTo(cat.id)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap active:scale-95
                    ${activeId === cat.id 
                      ? 'text-white' 
                      : 'text-slate-500 hover:text-[var(--teal-600)] hover:bg-teal-50/50'
                    }`}
                >
                  <AnimatePresence>
                    {activeId === cat.id && (
                      <motion.div
                        layoutId="nav-pill-v2"
                        className="absolute inset-0 bg-gradient-to-br from-[var(--teal-600)] to-[var(--teal-500)] shadow-md"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        style={{ borderRadius: 9999 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{cat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default CategoryScroll;
