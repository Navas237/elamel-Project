import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { IconCart, IconArrowLeft } from '../../../lib/icons';
import { cartcontext } from '../../../context/CartCotext';

function FloatingCart() {
    const { cartIds } = useContext(cartcontext);
    const location    = useLocation();

    const totalItems = Object.values(cartIds).reduce((acc, qty) => acc + qty, 0);
    const showCart   = totalItems > 0
        && location.pathname !== '/cart'
        && location.pathname !== '/confirmorder';

    return (
        <AnimatePresence>
            {showCart && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0,   opacity: 1 }}
                    exit={{ y: 100,    opacity: 0 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                    className="fixed bottom-5 left-0 right-0 z-[1000] px-3 pointer-events-none"
                >
                    <div className="max-w-lg mx-auto pointer-events-auto">
                        <Link
                            to="/cart"
                            className="flex items-center justify-between px-4 py-3 rounded-2xl hover:scale-[1.02] active:scale-[0.97] transition duration-200"
                            style={{
                                background: 'var(--gradient-brand)',
                                boxShadow: '0 8px 28px rgba(78,196,189,0.42)',
                            }}
                        >
                            {/* Left info */}
                            <div className="flex items-center gap-3">
                                {/* Icon + badge */}
                                <div className="relative bg-white/20 p-2.5 rounded-xl">
                                    <IconCart size={22} className="text-white" />
                                    <span
                                        className="absolute -top-2 -right-2 text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow"
                                        style={{ background: 'var(--brand-accent)', color: '#1A2B35' }}
                                    >
                                        {totalItems}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <p className="font-extrabold text-white text-sm leading-tight">سلة المشتريات</p>
                                    <p className="text-white/75 text-xs mt-0.5">
                                        {totalItems} {totalItems === 1 ? 'كتاب' : 'كتب'}
                                    </p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-2 rounded-xl font-bold text-white text-sm">
                                <span>عرض السلة</span>
                                <IconArrowLeft size={16} />
                            </div>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default FloatingCart;
