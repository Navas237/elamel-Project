import React from 'react';
import { Link } from 'react-router-dom';
import { IconPackage, IconArrowLeft } from '../../../lib/icons';

function OtherCategorySection({ category }) {
  if (!category) return null;

  return (
    <div id={category.name || category.id} className="max-w-5xl mx-auto px-4 mb-12 pt-2 mt-4" style={{ direction: "rtl" }}>
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--teal-800)]">
          {category.name}
        </h2>
      </div>

      {/* Subcategories Grid */}
      {category.grades && category.grades.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:gap-6">
          {category.grades.map((sub) => (
            <Link 
              key={sub.id} 
              to={`/t/${category.slug}/${sub.slug}`}
              className="group relative bg-white overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1.5 border border-gray-200"
            >
              {/* Icon Placeholder */}
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'var(--teal-50)' }}
              >
                <IconPackage size={24} color="var(--teal-500)" strokeWidth={1.8} />
              </div>

              {/* Label & Action Arrow */}
              {/* <p className="text-[10px] md:text-xs font-medium text-center mb-0.5 text-gray-400">قسم فرعي</p> */}
              <div className="flex items-center justify-center gap-2">
                <p className="font-extrabold text-sm md:text-xl text-center text-gray-900 group-hover:text-[var(--teal-600)] transition-colors">
                  {sub.name}
                </p>
                <IconArrowLeft 
                  size={18} 
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
      ) : (
        <p className="text-slate-400 text-center py-4">لا توجد أقسام فرعية متاحة</p>
      )}
    </div>
  );
}

export default OtherCategorySection;
