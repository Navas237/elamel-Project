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
      className="BottomNav h-[80px] pt-6 shadow-3xl flex items-center w-full border-t"
      style={{ background: 'var(--color-bottomnav)', borderColor: '#cccccc', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center px-4 gap-3 w-full h-full">

        {/* ← رجوع */}
        <button
          onClick={() => { navigate(-1); setTimeout(() => window.scrollTo(0, 0), 100); }}
          className="flex gap-2 items-center font-semibold text-sm group transition duration-200"
          style={{ color: 'var(--teal-600)' }}
        >
          {/* circle icon container — teal on hover */}
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center transition duration-250 group-hover:scale-105"
            style={{ background: 'var(--teal-50)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-100)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal-50)'; }}
          >
            <IconArrowRight size={18} color="var(--teal-500)" />
          </span>
          <span className="hidden sm:inline group-hover:opacity-70 transition-opacity duration-200">
            الرجوع للصفحة السابقة
          </span>
          <span className="sm:hidden group-hover:opacity-70 transition-opacity duration-200">
            رجوع
          </span>
        </button>

        {/* Divider */}
        {children && <div className="h-5 w-px mx-1" style={{ background: '#cccccc' }} />}

        {/* Children */}
        {children && (
          <span className="font-semibold text-sm truncate" style={{ color: 'var(--gray-700)' }}>{children}</span>
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
