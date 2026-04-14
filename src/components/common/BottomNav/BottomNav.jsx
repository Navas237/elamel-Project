import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight } from '../../../lib/icons';

/*
  BottomNav — درجة teal-600 (var(--teal-600))
  أغمق من الـ buttons (teal-500) وأخف من الـ Navbar sidebar (teal-800)
  —— يعني في الشاشة عندنا طبقات:
     Navbar top  → teal-700/800 (أغمق)
     BottomNav   → teal-600     (وسط)
     Buttons     → teal-400/500 (أفتح)
     Cards bg    → teal-100/50  (أخف)
*/
function BottomNav({ children }) {
  const navigate = useNavigate();

  return (
    <div
      className="BottomNav h-[58px] flex items-center w-full shadow-[0_-4px_20px_rgba(0,0,0,0.12)]"
      style={{ background: 'var(--color-bottomnav)' }}
    >
      <div className="flex items-center px-4 gap-3 w-full h-full">

        {/* ← رجوع */}
        <button
          onClick={() => { navigate(-1); setTimeout(() => window.scrollTo(0, 0), 100); }}
          className="flex gap-2 items-center font-semibold text-sm group transition duration-200"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          {/* دائرة الأيقونة بـ Gold عند الـ hover */}
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center transition duration-250 group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.12)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,212,59,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          >
            <IconArrowRight size={18} color="#fff" />
          </span>
          <span className="hidden sm:inline group-hover:text-yellow-300 transition-colors duration-200">
            الرجوع للصفحة السابقة
          </span>
          <span className="sm:hidden group-hover:text-yellow-300 transition-colors duration-200">
            رجوع
          </span>
        </button>

        {/* Divider */}
        {children && <div className="h-5 w-px mx-1" style={{ background: 'rgba(255,255,255,0.2)' }} />}

        {/* Children */}
        {children && (
          <span className="text-white/85 font-semibold text-sm truncate">{children}</span>
        )}

        {/* Gold accent dot — يبرز اللون الثاني بشكل خفيف */}
        <div className="mr-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-accent)' }} />
          <span className="w-1 h-1 rounded-full opacity-60" style={{ background: 'var(--brand-accent)' }} />
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
