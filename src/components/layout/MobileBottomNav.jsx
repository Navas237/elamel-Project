import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cartcontext } from '../../context/CartCotext';
import { IconHome, IconOrders, IconPhone, IconCart } from '../../lib/icons';

function MobileBottomNav() {
  const { cartIds } = useContext(cartcontext);
  const location = useLocation();

  const totalItems = Object.values(cartIds).reduce((acc, qty) => acc + qty, 0);

  const scrollHome = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'الرئيسية', to: '/', icon: IconHome, onClick: scrollHome },
    { label: 'طلباتي', to: '/myorder', icon: IconOrders },
    { label: 'السلة', to: '/cart', icon: IconCart, count: totalItems },
    { label: 'تواصل معنا', href: '#contact', icon: IconPhone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white/90 backdrop-blur-lg border-t border-gray-200 sm:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-[68px] px-2 pb-safe">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.href && location.hash === item.href);
          
          const content = (
            <div className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${isActive ? 'text-[var(--teal-600)] scale-105' : 'text-gray-500 hover:text-gray-900'}`}>
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                {item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[var(--brand-accent)] text-[#1A2B35] text-[10px] font-extrabold rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-sm">
                    {item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </div>
          );

          if (item.href) {
            return (
              <a key={i} href={item.href} className="w-1/4 h-full flex justify-center cursor-pointer">
                {content}
              </a>
            );
          }

          return (
            <Link key={i} to={item.to} onClick={item.onClick} className="w-1/4 h-full flex justify-center cursor-pointer">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MobileBottomNav;
