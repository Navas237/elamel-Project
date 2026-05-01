import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowRight, IconBookOpen, IconSparkles } from '../../../lib/icons';
import { useCatagory } from '../../../hooks/useCatagory';

function Elsafe() {
  const { level } = useParams();
  const { data: categories, isLoading } = useCatagory();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Find the current category and its grades
  const currentCategory = categories?.find(cat => cat.slug === level);
  const currentStages = currentCategory?.grades || [];
  const isElementary = level === 'prim';

  const palettes = [
    { bg: 'linear-gradient(135deg,var(--teal-300),var(--teal-400))', hoverBg: 'rgba(102, 203, 189, 0.1)', border: 'var(--teal-300)' },
    { bg: 'var(--gradient-brand)', hoverBg: 'rgba(78, 196, 189, 0.1)', border: 'var(--teal-400)' },
    { bg: 'var(--color-primary-button)', hoverBg: 'rgba(46, 158, 152, 0.1)', border: 'var(--teal-500)' },
    { bg: 'linear-gradient(135deg,var(--teal-600),var(--teal-700))', hoverBg: 'rgba(29, 122, 117, 0.1)', border: 'var(--teal-600)' },
    { bg: 'linear-gradient(135deg,var(--teal-700),var(--teal-800))', hoverBg: 'rgba(19, 92, 88, 0.1)',   border: 'var(--teal-700)' },
    { bg: 'linear-gradient(135deg,var(--teal-800),#093331)', hoverBg: 'rgba(13, 74, 71, 0.1)',    border: 'var(--teal-800)' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-6xl mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6" >
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-40 bg-slate-100 animate-pulse rounded-2xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)' }}>

      <div className="max-w-6xl mt-25 mx-auto px-4 md:px-6">
        {/* Grid System: 2 columns on mobile, 3+ on desktop */}
        <div className={`grid grid-cols-2 ${isElementary ? 'lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-8` } style={{direction : 'rtl'}}>
          {currentStages.map((stage, index) => {
            const p = palettes[index % palettes.length];
            return (
              <Link
                key={index}
                to={stage.slug === '3' ? `choice/${stage.slug}` : `b/${stage.slug}`}
                className={`group animate-fadeup relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 
                  ${index === currentStages.length - 1 && currentStages.length % 2 !== 0 ? 'col-span-2 lg:col-span-1' : 'col-span-1'}`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  borderColor: 'var(--teal-100)'
                }}
              >
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-12 -mt-12 opacity-20 group-hover:scale-150 transition-transform duration-500" />
                
                {/* Hover Tint Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: p.hoverBg }}
                />

                {/* Content Container */}
                <div className="relative p-4 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[220px]">
                  
                  {/* Number Badge with Premium Styling */}
                  <div 
                    className="w-12 h-12 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white text-xl md:text-4xl font-black shadow-lg mb-3 md:mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 border-2 md:border-4 border-white"
                    style={{ 
                      background: p.bg,
                      boxShadow: `0 8px 16px -4px ${p.border}40`
                    }}
                  >
                    {index + 1}
                  </div>
                  
                  <h3 className="text-base md:text-2xl font-extrabold text-gray-800 text-center leading-tight transition-colors duration-300" 
                      style={{ color: 'var(--teal-800)' }}>
                    {stage.name}
                  </h3>

                  {/* Subtle Interactive Element */}
                  <div 
                    className="mt-3 md:mt-6 flex items-center gap-2 text-xs md:text-sm font-bold opacity-0 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    style={{ color: p.border }}
                  >
                    <span>عرض الكتب</span>
                    <IconArrowRight size={18} />
                  </div>
                </div>

                {/* Glassy Animated Bottom Bar */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1.5 md:h-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: p.bg }}
                />
              </Link>
            );
          })}
        </div>

        {/* Info Card - Enhanced for mobile */}
       
      </div>
    </div>
  );
}

export default Elsafe;
