import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function SelectType() {
    const { level, level2 } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const types = [
        {
            id: 'regular',
            name: 'شرح وأسئلة',
            path: `/sf/${level}/b/${level2}?ty=exam`,
            icon: '📖',
            desc: 'الكتب الدراسية، الشرح، والتمارين ',
            gradient: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 'revision',
            name: 'مراجعة نهائية',
            path: `/sf/${level}/b/${level2}?ty=rev`,
            icon: '🎯',
            desc: 'المراجعات النهائية، بنوك الأسئلة، والامتحانات',
            gradient: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-50'
        }
    ];

    return (
        <div className='min-h-screen bg-gradient-to-b mt-10 from-gray-50 to-white'>
            <div className='max-w-4xl mx-auto px-6 mt-[150px] pb-24'>
                

                <div className='grid grid-cols-2 mt-5 md:grid-cols-2 gap-8'>
                    {types.map((type) => (
                        <Link
                            key={type.id}
                            to={type.path}
                            className='group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-transparent hover:-translate-y-3'
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Card Content */}
                            <div className='relative p-8 flex flex-col items-center text-center gap-6'>
                                {/* Icon Container */}
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg text-5xl`}>
                                    {type.icon}
                                </div>

                                {/* Type Name */}
                                <div>
                                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                                        {type.name}
                                    </h2>
                                    {/* <p className='text-gray-600 leading-relaxed font-medium'>
                                        {type.desc}
                                    </p> */}
                                </div>

                                {/* Large Arrow Icon */}
                                {/* <div className='text-blue-600 opacity-60 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 mt-4'>
                                    <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                    </svg>
                                </div> */}
                            </div>

                            {/* Bottom Border on Hover */}
                            <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${type.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`}></div>
                        </Link>
                    ))}
                </div>

                {/* Info Box */}
                <div className='mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-r-8 border-blue-500 rounded-2xl p-8 shadow-inner'>
                    <div className='flex items-center gap-4'>
                        <span className='text-4xl'>📚</span>
                        <div>
                            <h3 className='text-xl font-bold text-blue-900'>مكتبة الأمل</h3>
                            <p className='text-blue-800 font-medium'>
                                كل ما تحتاجه للتميز في  الدراسه في مكان واحد
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectType;
