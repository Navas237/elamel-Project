import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';
import { supbasecontext } from '../../../context/SupbaseContext';
import {
  IconBook, IconArrowLeft
} from '../../../lib/icons';
import { useCatagory } from '../../../hooks/useCatagory';

/* ─────────────────────────────────────────────────────────── */
/* Stage cards — Standardized White-first styling              */
/* ─────────────────────────────────────────────────────────── */
// Educational stages are now fetched dynamically from the database



/* ─────────────────────────────────────────────────────────── */
function Category() {
  const { data: categories, isLoading } = useCatagory();
  


  // Filter for educational categories
  const educationalCategories = categories?.filter(cat => cat.type === 'education') || [];

  if (isLoading) return null;

  return (
    <div className="pb-4 bg-white">
      {/* ── Educational Stages (الكتب الخارجية) ─────────────────────────────── */}
      <div id="books-section" className="max-w-5xl mx-auto px-3 pb-4 pt-20 -mt-10">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3" style={{direction : 'rtl'}}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--teal-800)]">
            الكتب الخارجية
          </h2>
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4  sm:gap-6" style={{direction : "rtl"}}>
          {educationalCategories.map((stage) => (
            <Link
              key={stage.id}
              to={`/sf/${stage.slug}`}
              className="group relative bg-white overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1.5 border border-gray-200"
            >
              {/* Icon Placeholder */}
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'var(--teal-50)' }}
              >
                <IconBook size={28} color="var(--teal-500)" strokeWidth={1.8} />
              </div>

              {/* Label & Action Arrow */}
              <p className="text-xs font-medium text-center mb-0.5 text-gray-400">المرحلة</p>
              <div className="flex items-center justify-center gap-2">
                <p className="font-extrabold text-lg md:text-2xl text-center text-gray-900 group-hover:text-[var(--teal-600)] transition-colors">
                  {stage.name}
                </p>
                <IconArrowLeft 
                  size={20} 
                  className="text-[var(--teal-600)] opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300"
                />
              </div>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right bg-gradient-to-l from-[var(--teal-400)] to-[var(--teal-600)]"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;