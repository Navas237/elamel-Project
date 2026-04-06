import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Elsafe() {
  const { level } = useParams();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const stages = {
    'kg': [
      { name: 'كي جي 1', grade: '1', icon: '1️⃣', color: 'from-pink-500 to-pink-600' },
      { name: 'كي جي 2', grade: '2', icon: '2️⃣', color: 'from-pink-500 to-pink-600' },
    ],
    'prim': [
      { name: 'الأول الابتدائي', grade: '1', icon: '1️⃣', color: 'from-purple-500 to-purple-600' },
      { name: 'الثاني الابتدائي', grade: '2', icon: '2️⃣', color: 'from-blue-500 to-blue-600' },
      { name: 'الثالث الابتدائي', grade: '3', icon: '3️⃣', color: 'from-green-500 to-green-600' },
      { name: 'الرابع الابتدائي', grade: '4', icon: '4️⃣', color: 'from-yellow-500 to-yellow-600' },
      { name: 'الخامس الابتدائي', grade: '5', icon: '5️⃣', color: 'from-orange-500 to-orange-600' },
      { name: 'السادس الابتدائي', grade: '6', icon: '6️⃣', color: 'from-red-500 to-red-600' },
    ],
    'prep': [
      { name: 'الأول الإعدادي', grade: '1', icon: '1️⃣', color: 'from-purple-600 to-purple-800' },
      { name: 'الثاني الإعدادي', grade: '2', icon: '2️⃣', color: 'from-blue-600 to-blue-800' },
      { name: 'الثالث الإعدادي', grade: '3', icon: '3️⃣', color: 'from-green-600 to-green-800' },
    ],
    'sec': [
      { name: 'الأول الثانوي', grade: '1', icon: '1️⃣', color: 'from-purple-600 to-purple-800' },
      { name: 'الثاني الثانوي', grade: '2', icon: '2️⃣', color: 'from-blue-600 to-blue-800' },
      { name: 'الثالث الثانوي', grade: '3', icon: '3️⃣', color: 'from-green-600 to-green-800' },
    ],
  };

  const currentStages = stages[level] || [];
  const isElementary = level === 'primary';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Header Section */}
      {/* <div className="bg-gradient-to-r from-[#2d839b] via-[#2a7a90] to-[#2d839b] text-white  py-12 px-6 mt-34 md:mt-37 rounded-b-3xl shadow-xl">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-5xl mb-4">
            {level === 'الابتدائيه' ? '🎒' : level === 'الإعداديه' ? '📚' : '🎓'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            المرحلة {level === 'الابتدائيه' ? 'الابتدائية' : level === 'الإعداديه' ? 'الإعدادية' : 'الثانوية'}
          </h1>
          <p className="text-lg text-white/90">اختر الصف الدراسي المناسب</p>
        </div>
      </div> */}

      {/* Grades Grid */}
      <div className="max-w-6xl mt-25  flec  mx-auto px-6 pb-16">
        <div className={`grid ${isElementary ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6  `}>
          {currentStages.map((stage, index) => (
            <Link
              key={index}
              to={level === 'sec' && stage.grade === '3' ? `choice/${stage.grade}` : `b/${stage.grade}`}
              className="group relative self-center bg-white rounded-2xl shadow-lg   hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-5 flex flex-col items-center justify-center min-h-[180px]">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 border-4 border-white`}>
                  {stage.grade}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center group-hover:text-[#2d839b] transition-colors duration-300">
                  {stage.name}
                </h3>

                {/* Arrow Icon */}
                <div className="mt-4 text-[#2d839b] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Border Effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center shadow-lg">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2"></h3>
          <p className="text-gray-600 text-lg">
            اختر الصف الدراسي للاطلاع على الكتب المتاحة والمواد الدراسية
          </p>
        </div>
      </div>
    </div>
  );
}

export default Elsafe;