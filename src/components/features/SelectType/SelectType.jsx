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
            gradient: 'from-[var(--teal-400)] to-[var(--teal-500)]'
        },
        {
            id: 'revision',
            name: 'مراجعة نهائية',
            path: `/sf/${level}/b/${level2}?ty=rev`,
            icon: '🎯',
            gradient: 'from-[var(--teal-500)] to-[var(--teal-600)]'
        }
    ];

    return (
        <div
            className='min-h-screen mt-10'
            style={{ background: 'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)' }}
        >
            <div className='max-w-4xl mx-auto px-6 mt-[150px] pb-24'>
                <div className='grid grid-cols-2 mt-5 md:grid-cols-2 gap-8'>
                    {types.map((type) => (
                        <Link
                            key={type.id}
                            to={type.path}
                            className='group relative bg-white rounded-3xl shadow-xl hover:shadow-xl transition duration-300 overflow-hidden border hover:-translate-y-1'
                            style={{ borderColor: 'var(--color-card-border)' }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            <div className='relative p-8 flex flex-col items-center text-center gap-6'>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition duration-300 shadow-lg text-5xl`}>
                                    {type.icon}
                                </div>

                                <div>
                                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                                        {type.name}
                                    </h2>
                                </div>
                            </div>

                            <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${type.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`} />
                        </Link>
                    ))}
                </div>

                <div
                    className='mt-16 rounded-2xl p-8 border'
                    style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--teal-200)' }}
                >
                    <div className='flex items-center gap-4'>
                        <span className='text-4xl'>📘</span>
                        <div>
                            <h3 className='text-xl font-bold' style={{ color: 'var(--teal-800)' }}>مكتبة الأمل</h3>
                            <p className='font-medium' style={{ color: 'var(--teal-700)' }}>
                                كل ما تحتاجه للتميز في الدراسة في مكان واحد
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectType;
