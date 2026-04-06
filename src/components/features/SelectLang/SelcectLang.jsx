import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// أيقونة الكتاب
const BookIcon = () => (
  <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
  </svg>
);

// أيقونة الكرة الأرضية
const GlobeIcon = () => (
  <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' />
  </svg>
);

// بيانات اللغات
const languages = [
  {
    id: 'arabic',
    name: 'عـــــــرَبـــــــي',
    path: 'books/عربي',
    icon: BookIcon,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'languages',
    name: 'لــــــغـــــــات',
    path: 'books/لغات',
    icon: GlobeIcon,
    gradient: 'from-blue-500 to-indigo-600'
  }
];

function SelectLang() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className='category'>
      {/* Header with Gradient */}
      {/* <div className='bg-gradient-to-r mt-[150px] from-[#2d839b] to-[#1e5a6b] py-12 px-6 rounded-b-3xl shadow-lg mb-12'>
        <h1 className='text-center text-white text-4xl md:text-5xl font-bold'>
          اختر اللغة
        </h1>
        <p className='text-center text-white/90 mt-3 text-lg'>
          اختر اللغة المناسبة لك للبدء في التعلم
        </p>
      </div> */}

      {/* Language Cards Container */}
      <div className='max-w-4xl mx-auto px-6  mt-[200px] pb-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {languages.map((lang) => {
            return (
              <Link
                key={lang.id}
                to={lang.path}
                className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-transparent hover:-translate-y-2'
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className='relative p-4 flex flex-col items-center gap-6'>
                  {/* Icon Container */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${lang.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <lang.icon />
                  </div>

                  {/* Language Name */}
                  <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2d839b] group-hover:to-[#1e5a6b] transition-all duration-300'>
                    {lang.name}
                  </h2>

                  {/* Arrow Icon */}
                  <div className='opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300'>
                    <svg className='w-8 h-8 text-[#2d839b]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M15 19l-7-7 7-7' />
                    </svg>
                  </div>
                </div>

                {/* Bottom Border on Hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${lang.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`}></div>
              </Link>
            );
          })}
        </div>

        {/* Info Card */}
        <div className='mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500 rounded-xl p-6 shadow-md'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-xl font-bold'>💡</span>
            </div>
            <div>
              <h3 className='text-lg font-bold text-amber-900 mb-2'>نصيحة مهمة</h3>
              <p className='text-amber-800 leading-relaxed'>
                اختر اللغة التي تدرس بها في المدرسة للحصول على المحتوى المناسب والكتب الدراسية الصحيحة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectLang;