import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    IconBookOpen,
    IconZap,
    IconArrowLeft,
    IconSparkles,
    IconBook
} from '../../../lib/icons';

/* ── Brand tokens ─────────────────────────────────────────── */
const TEAL = 'var(--gradient-brand)';
const GOLD_BG = { background: 'linear-gradient(135deg,var(--brand-accent),var(--brand-accent-dark))' };

function SelectType() {
    const { level, level2 } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const types = [
        {
            id: 'regular',
            name: 'شرح وأسئلة',
            desc: 'الكتب الدراسية والتدريبات اليومية',
            path: `/sf/${level}/b/${level2}?ty=exam`,
            icon: IconBookOpen,
            color: 'var(--teal-500)'
        },
        {
            id: 'revision',
            name: 'مراجعة نهائية',
            desc: 'ملخصات شاملة وتوقعات الامتحانات',
            path: `/sf/${level}/b/${level2}?ty=rev`,
            icon: IconBookOpen,
            color: 'var(--teal-500)'
        }
    ];

    return (
        <div className='min-h-screen pt-16 pb-20 px-4 flex items-center justify-center'
            style={{ background: 'var(--gradient-surface)' }}>

            <div className='max-w-3xl w-full mx-auto'>
                {/* Header Section */}
                {/* <div className='text-center mb-12 animate-fadeup'>
                    <h1 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
                        ماذا تبحث عنه اليوم؟
                    </h1>
                    <p className='text-gray-500 font-medium text-lg'>
                        اختر نوع الكتب الذي ترغب في تصفحه
                    </p>
                </div> */}

                {/* Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {types.map((type, idx) => (
                        <motion.div
                            key={type.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link
                                to={type.path}
                                className='group relative block bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 overflow-hidden text-right'
                            >
                                {/* Hover background effect */}
                                <div className='absolute inset-0 bg-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                <div className='relative flex flex-col items-end gap-6 '>
                                    {/* Icon Container */}
                                    <div className='w-14 h-14 rounded-xl flex items-center  justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition duration-300 '
                                        style={{
                                            background: 'var(--gradient-brand)',
                                            color: '#fff'
                                        }}>
                                        <type.icon size={28} strokeWidth={2} />
                                    </div>

                                    {/* Text Content */}
                                    <div className='space-y-2'>
                                        <h2 className='text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors'>
                                            {type.name}
                                        </h2>
                                        {/* <p className='text-gray-500 text-sm font-medium'>
                                            {type.desc}
                                        </p> */}
                                    </div>

                                    {/* Action Link */}
                                    <div className='flex items-center gap-2 text-teal-600 font-bold text-sm mt-2 transform group-hover:-translate-x-2 transition-transform duration-300'>
                                        <span>عرض الكتب</span>
                                        <IconArrowLeft size={16} />
                                    </div>
                                </div>

                                {/* Bottom Progress bar */}
                                <div className='absolute bottom-0 left-0 right-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right' />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='mt-12 rounded-2xl p-6 border border-teal-100 flex items-center justify-between gap-4 bg-white/50 backdrop-blur-sm'
                >
                    <div className='flex items-center gap-4 text-right'>
                        <div className='w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600'>
                            <IconBook size={20} />
                        </div>
                        <div>
                            <h3 className='text-md font-bold text-gray-800'>مكتبة الأمل</h3>
                            <p className='text-xs font-semibold text-gray-500'>
                                رفيقك الدائم في رحلة النجاح
                            </p>
                        </div>
                    </div>
                    <IconBook size={24} className='text-teal-200' />
                </motion.div> */}
            </div>
        </div>
    );
}

export default SelectType;
