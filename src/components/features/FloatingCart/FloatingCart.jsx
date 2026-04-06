import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { IoCartOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { cartcontext } from '../../../context/CartCotext';

function FloatingCart() {
    const { cartIds } = useContext(cartcontext);
    const location = useLocation();

    const totalItems = Object.values(cartIds).reduce((acc, qty) => acc + qty, 0);

    // Don't show on the cart page itself or if the cart is empty
    const isCartPage = location.pathname === '/cart';
    const isConfirmPage = location.pathname === '/confirmorder';
    const showCart = totalItems > 0 && !isCartPage && !isConfirmPage;

    return (
        <AnimatePresence>
            {showCart && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-0 right-0 z-[1000] px-2 md:px-4 pointer-events-none"
                >
                    <div className="max-w-xl mx-auto pointer-events-auto">
                        <Link
                            to="/cart"
                            className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative bg-white/20 p-2 rounded-xl">
                                    <IoCartOutline className="text-2xl" />
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-tight">سلة المشتريات</p>
                                    <p className="text-white/80 text-sm">لديك {totalItems} من الكتب</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 font-bold text-lg bg-white/20 px-2 py-2 rounded-xl">
                                <span>عرض السلة</span>
                                <IoArrowForwardOutline className="text-xl rotate-180" />
                            </div>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default FloatingCart;
