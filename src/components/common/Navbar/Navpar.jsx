import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cartcontext } from '../../../context/CartCotext';
import logo from '../../../images/Logo.png';
import './Navpar.css';
import { useSearchProducts } from '../../../hooks/useSearchProducts';
import {
  IconSearch, IconHome, IconMenu, IconClose,
  IconOrders, IconWhatsapp, IconFacebook, IconPhone,
  IconCart, IconBook,
} from '../../../lib/icons';

const BRAND = 'var(--color-navbar)';
const DARK  = 'var(--gradient-dark)';

function Navpar() {
  const [menustat,  setmenustat]  = useState(false);
  const [serchstat, setserchstat] = useState(false);
  const [serchKey,  setserchKey]  = useState('');
  const { cartIds } = useContext(cartcontext);

  const inputRef = useRef();
  const dropMenu = useRef();

  const { data: filterProducts = [], isLoading } = useSearchProducts(serchKey);

  // Close search on outside click
  useEffect(() => {
    const h = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setserchstat(false); setserchKey('');
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const h = (e) => {
      if (dropMenu.current && !dropMenu.current.contains(e.target)) setmenustat(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const location = useLocation();
  const scrollHome = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mobileLinks = [
    { label: 'الرئيسية', to: '/',         icon: IconHome,     onClick: scrollHome },
    { label: 'طلباتي',   to: '/myorder',  icon: IconOrders },
    { label: 'واتساب',   href: 'https://api.whatsapp.com/send?phone=201069571111', icon: IconWhatsapp },
    { label: 'فيسبوك',   href: 'https://www.facebook.com/Amaleducationalstore?locale=ar_AR', icon: IconFacebook },
  ];

  const navCls = 'flex items-center gap-1.5 text-white font-semibold text-[15px] transition-all duration-200 hover:text-yellow-300 hover:-translate-y-0.5';

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 shadow-lg" style={{ background: BRAND }}>
        <div className="w-full px-4 md:px-8 py-2.5 flex justify-between items-center gap-3">

          {/* LEFT — Search */}
          <div ref={inputRef} className="relative flex items-center">
            {!serchstat ? (
              <button
                onClick={() => setserchstat(true)}
                className="text-white transition-all duration-200 hover:text-yellow-300 hover:scale-110 p-1"
                aria-label="بحث"
              >
                <IconSearch size={22} />
              </button>
            ) : (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="ابحث عن كتاب..."
                  value={serchKey}
                  onChange={(e) => setserchKey(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(255, 212, 59, 0.32), 0 10px 24px rgba(13, 74, 71, 0.18)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(255, 212, 59, 0.18), 0 8px 18px rgba(13, 74, 71, 0.12)'
                  }}
                  className="w-44 md:w-64 px-4 py-1.5 rounded-full text-sm outline-none shadow-md bg-white transition-all duration-200"
                  style={{ boxShadow: '0 0 0 3px rgba(255, 212, 59, 0.18), 0 8px 18px rgba(13, 74, 71, 0.12)' }}
                />
              </motion.div>
            )}

            {/* Dropdown */}
            <AnimatePresence>
              {serchKey && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 border"
                  style={{ borderColor: 'var(--color-card-border)' }}
                >
                  {isLoading ? (
                    <p className="text-gray-400 text-sm text-center py-4">جاري البحث...</p>
                  ) : filterProducts.length > 0 ? (
                    filterProducts.map((p, i) => (
                      <Link
                        key={i}
                        to={`/singleprodeuct/${p.id}`}
                        onClick={() => { setserchstat(false); setserchKey(''); }}
                        className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 transition-colors duration-150"
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-outline-soft)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                      >
                        <IconBook size={16} className="shrink-0" style={{ color: 'var(--teal-400)' }} />
                        <p className="text-gray-800 text-sm font-medium text-right leading-tight">
                          {`${p.company ?? ''} ${p.name}`}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-4">لا توجد نتائج</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER — Logo */}
          <a href="#home" onClick={scrollHome} className="flex items-center gap-2.5 md:ml-20 lg:ml-28 shrink-0">
            <img src={logo} alt="مكتبة الأمل"
              className="w-11 h-11 md:w-[52px] md:h-[52px] hover:scale-105 transition-transform duration-300 drop-shadow-md" />
            <span className="text-white hidden md:block font-bold text-lg tracking-wide">مكتبة الأمل</span>
          </a>

          {/* RIGHT — Desktop links */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-5">
            <Link to={location.pathname === '/' ? '#home' : '/#home'} onClick={scrollHome} className={navCls}>
              <IconHome size={18} /><span>الرئيسية</span>
            </Link>
            <a href="#contact" className={navCls}>
              <IconPhone size={18} /><span>تواصل معنا</span>
            </a>
            <Link to="/myorder" className={navCls}>
              <IconOrders size={18} /><span>طلباتي</span>
            </Link>
          </div>

          {/* MOBILE — Hamburger */}
          <button
            onClick={() => setmenustat(!menustat)}
            className="sm:hidden text-white transition-all duration-200 hover:text-yellow-300"
            aria-label="القائمة"
          >
            <IconMenu size={26} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Panel ───────────────────────────────────── */}
      <AnimatePresence>
        {menustat && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setmenustat(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              ref={dropMenu}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full shadow-2xl z-50 overflow-y-auto"
              style={{ background: DARK }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-white/10">
                <button onClick={() => setmenustat(false)}
                  className="text-white hover:text-red-400 transition-colors duration-200">
                  <IconClose size={26} />
                </button>
                <img src={logo} alt="Logo" className="w-12 h-12 drop-shadow-md" />
              </div>

              {/* Links */}
              <ul className="p-5 space-y-2">
                {mobileLinks.map((link, i) => {
                  const Icon = link.icon;
                  const cls = "flex items-center justify-end gap-3 text-white text-base font-semibold hover:text-yellow-300 transition-colors duration-200 p-3 rounded-xl hover:bg-white/10";
                  return (
                    <motion.li key={i}
                      initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer"
                          onClick={() => setmenustat(false)} className={cls}>
                          <span>{link.label}</span>
                          <Icon size={20} />
                        </a>
                      ) : (
                        <Link to={link.to}
                          onClick={() => { setmenustat(false); link.onClick?.(); }}
                          className={cls}>
                          <span>{link.label}</span>
                          <Icon size={20} />
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/5">
                <p className="text-white/60 text-center text-xs">مكتبة الأمل دائماً في خدمتكم ❤️</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14 md:h-[58px]" />
    </>
  );
}

export default Navpar;
