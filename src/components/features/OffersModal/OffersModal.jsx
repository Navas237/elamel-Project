import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";

const OffersModal = ({ isOpen, onClose }) => {
    const offers = [
        { discount: '11%', condition: ' علي أي كتاب', icon: '📘', amount: '' },
        { discount: '12%', condition: 'عند الشراء بـ', icon: '💸', amount: '500', egp: 'ج', more: 'او اكثر' },
        { discount: '13%', condition: 'عند الشراء بـ', icon: '🎯', amount: '1000', egp: 'ج', more: 'او اكثر' },
        { discount: '14%', condition: 'عند الشراء بـ', icon: '🎁', amount: '2000', egp: 'ج', more: 'او اكثر' },
        { discount: '15%', condition: 'عند الشراء بـ', icon: '🥇', amount: '3000', egp: 'ج', more: 'او اكثر' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header / Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-10 pointer-events-none" />

                        <div className="relative p-5">
                            {/* Close Button - Top Right */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors cursor-pointer z-10"
                            >
                                <IoClose size={28} />
                            </button>

                            {/* Title Section */}
                            <div className="text-center mb-6 pt-2">
                                <motion.div
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="inline-block p-2 bg-blue-50 rounded-xl mb-3"
                                >
                                    <span className="text-3xl text-blue-600">✨</span>
                                </motion.div>
                                <h2 className="text-lg md:text-xl font-extrabold text-gray-800 mb-2"> متنساش عروضنا علي جميع الكتب 🔥</h2>
                                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
                            </div>

                            {/* Offers List */}
                            <div className="space-y-2.5">
                                {offers.map((offer, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * index + 0.3 }}
                                        className="flex flex-row-reverse items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="flex flex-row-reverse items-center gap-3">
                                            <span className="text-xl group-hover:scale-110 transition-transform">{offer.icon}</span>
                                            <div className="text-right">
                                                <p className="text-gray-500 text-[10px] font-medium leading-none mb-1">{offer.condition}</p>
                                                <div className="text-gray-900 flex flex-row-reverse gap-2 font-bold text-xs md:text-sm leading-tight">
                                                   <div>  
                                                    {offer.amount && 
                                                    <div className='flex flex-row gap-1'>

                                                        <span>{offer.egp}  </span> 
                                                        <span> {offer.amount}</span>
                                                        
                                                        </div>
                                                        }

                                                    </div> 
                                                    <div>
                                                        {offer.more && <span className="text-blue-600">{offer.more}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-2.5 py-1 rounded-lg text-sm font-black shadow-lg shadow-blue-200">
                                            {offer.discount}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full mt-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold text-sm shadow-xl hover:from-black hover:to-black transition-all cursor-pointer"
                            >
                                تصفح الكتب الآن 🚀
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OffersModal;
