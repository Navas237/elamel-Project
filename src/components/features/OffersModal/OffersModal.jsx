import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";

const OffersModal = ({ isOpen, onClose }) => {
    const offers = [
        { discount: '11%', condition: 'على أي كتاب', icon: '📚', amount: '' },
        { discount: '12%', condition: 'عند الشراء بـ', icon: '💸', amount: '500', egp: 'ج', more: 'أو أكثر' },
        { discount: '13%', condition: 'عند الشراء بـ', icon: '🎯', amount: '1000', egp: 'ج', more: 'أو أكثر' },
        { discount: '14%', condition: 'عند الشراء بـ', icon: '🎁', amount: '2000', egp: 'ج', more: 'أو أكثر' },
        { discount: '15%', condition: 'عند الشراء بـ', icon: '🏅', amount: '3000', egp: 'ج', more: 'أو أكثر' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[380px] overflow-hidden rounded-3xl border bg-white shadow-xl"
                        style={{ borderColor: 'var(--color-card-border)' }}
                    >
                        <div
                            className="absolute top-0 left-0 h-24 w-full opacity-10 pointer-events-none"
                            style={{ background: 'var(--color-primary-button)' }}
                        />

                        <div className="relative p-5">
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 z-10 cursor-pointer text-gray-500 transition-colors hover:text-red-500"
                            >
                                <IoClose size={28} />
                            </button>

                            <div className="mb-6 pt-2 text-center">
                                <motion.div
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="mb-3 inline-block rounded-xl p-2"
                                    style={{ background: 'var(--teal-50)' }}
                                >
                                    <span className="text-3xl" style={{ color: 'var(--teal-500)' }}>✨</span>
                                </motion.div>
                                <h2 className="mb-2 text-lg font-extrabold text-gray-800 md:text-xl">متنساش عروضنا على جميع الكتب</h2>
                                <div className="mx-auto h-1 w-16 rounded-full" style={{ background: 'var(--color-primary-button)' }} />
                            </div>

                            <div className="space-y-2.5">
                                {offers.map((offer, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * index + 0.3 }}
                                        className="group flex items-center justify-between rounded-xl border p-2.5 transition duration-300 hover:bg-white hover:shadow-md"
                                        style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-card-border)' }}
                                    >
                                        <div className="flex flex-row-reverse items-center gap-3">
                                            <span className="text-xl transition-transform group-hover:scale-105">{offer.icon}</span>
                                            <div className="text-right">
                                                <p className="mb-1 text-[10px] font-medium leading-none text-gray-500">{offer.condition}</p>
                                                <div className="flex flex-row-reverse gap-2 text-xs font-bold leading-tight text-gray-900 md:text-sm">
                                                    <div>
                                                        {offer.amount && (
                                                            <div className="flex flex-row gap-1">
                                                                <span>{offer.egp}</span>
                                                                <span>{offer.amount}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {offer.more && <span style={{ color: 'var(--teal-500)' }}>{offer.more}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="rounded-lg px-2.5 py-1 text-sm font-black text-white shadow-lg"
                                            style={{ background: 'var(--color-primary-button)', boxShadow: '0 10px 20px rgba(29,122,117,0.20)' }}
                                        >
                                            {offer.discount}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="mt-5 w-full rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 py-3 text-sm font-bold text-white shadow-xl transition hover:from-black hover:to-black"
                            >
                                تصفح الكتب الآن
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OffersModal;
