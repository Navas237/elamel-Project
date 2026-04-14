import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowRight, IconBookOpen, IconSparkles } from '../../../lib/icons';

function Elsafe() {
  const { level } = useParams();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  /* 
    نظام الدرجات لأيقونات الصفوف: بنستخدم درجات الـ Teal المتدرجة 
    بشكل متناسق مع إضافة درجة Gold خفيفة لبعض البطاقات للتمييز 
  */
  const palettes = [
    { bg: 'linear-gradient(135deg,var(--teal-300),var(--teal-400))', hoverBg: 'rgba(102, 203, 189, 0.1)', border: 'var(--teal-300)' },
    { bg: 'var(--gradient-brand)', hoverBg: 'rgba(78, 196, 189, 0.1)', border: 'var(--teal-400)' },
    { bg: 'var(--color-primary-button)', hoverBg: 'rgba(46, 158, 152, 0.1)', border: 'var(--teal-500)' },
    { bg: 'linear-gradient(135deg,var(--teal-600),var(--teal-700))', hoverBg: 'rgba(29, 122, 117, 0.1)', border: 'var(--teal-600)' },
    { bg: 'linear-gradient(135deg,var(--teal-700),var(--teal-800))', hoverBg: 'rgba(19, 92, 88, 0.1)',   border: 'var(--teal-700)' },
    { bg: 'linear-gradient(135deg,var(--teal-800),#093331)', hoverBg: 'rgba(13, 74, 71, 0.1)',    border: 'var(--teal-800)' },
  ];

  const stages = {
    'kg': [
      { name: 'كي جي 1', grade: '1', p: palettes[0] },
      { name: 'كي جي 2', grade: '2', p: palettes[1] },
    ],
    'prim': [
      { name: 'الأول الابتدائي', grade: '1', p: palettes[0] },
      { name: 'الثاني الابتدائي', grade: '2', p: palettes[1] },
      { name: 'الثالث الابتدائي', grade: '3', p: palettes[2] },
      { name: 'الرابع الابتدائي', grade: '4', p: palettes[3] },
      { name: 'الخامس الابتدائي', grade: '5', p: palettes[4] },
      { name: 'السادس الابتدائي', grade: '6', p: palettes[5] },
    ],
    'prep': [
      { name: 'الأول الإعدادي', grade: '1', p: palettes[0] },
      { name: 'الثاني الإعدادي', grade: '2', p: palettes[1] },
      { name: 'الثالث الإعدادي', grade: '3', p: palettes[2] },
    ],
    'sec': [
      { name: 'الأول الثانوي', grade: '1', p: palettes[0] },
      { name: 'الثاني الثانوي', grade: '2', p: palettes[1] },
      { name: 'الثالث الثانوي', grade: '3', p: palettes[2] },
    ],
  };

  const currentStages = stages[level] || [];
  const isElementary = level === 'prim';

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)' }}>

      <div className="max-w-6xl mt-25 mx-auto px-6">
        <div className={`grid ${isElementary ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
          {currentStages.map((stage, index) => (
            <Link
              key={index}
              to={level === 'sec' && stage.grade === '3' ? `choice/${stage.grade}` : `b/${stage.grade}`}
              className="group relative self-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:-translate-y-2 border"
              style={{ borderColor: 'var(--teal-100)' }}
            >
              {/* Hover Tint Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: stage.p.hoverBg }}
              />

              {/* Content */}
              <div className="relative p-5 flex flex-col items-center justify-center min-h-[180px]">
                
                {/* Number Circle Badge */}
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 border-4 border-white"
                  style={{ background: stage.p.bg }}
                >
                  {stage.grade}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 text-center transition-colors duration-300" 
                    style={{ color: 'var(--teal-800)' }}>
                  {stage.name}
                </h3>

                {/* Arrow Icon */}
                <div 
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-2"
                  style={{ color: stage.p.border }}
                >
                  <IconArrowRight size={24} />
                </div>
              </div>

              {/* Animated Bottom Border */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
                style={{ background: stage.p.bg }}
              />
            </Link>
          ))}
        </div>

        {/* Info Card - No more blue/purple */}
        <div 
          className="mt-12 rounded-2xl p-8 text-center shadow-lg border"
          style={{ background: 'linear-gradient(135deg,#FFFFFF,#F6FBFB)', borderColor: 'var(--color-card-border-strong)' }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-brand)' }}>
               <IconBookOpen size={30} color="#fff" />
            </div>
          </div>
          <p className="text-lg md:text-xl font-bold" style={{ color: 'var(--teal-600)' }}>
            اختر الصف الدراسي للاطلاع على الكتب المتاحة والمواد الدراسية
          </p>
        </div>
      </div>
    </div>
  );
}

export default Elsafe;
