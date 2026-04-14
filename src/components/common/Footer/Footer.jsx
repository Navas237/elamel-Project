import React from 'react';
import logo from '../../../images/Logo.png';
import {
  IconPhone, IconWhatsapp, IconFacebook,
  IconLocation, IconHome, IconBook, IconOrders,
  IconShipping, IconDiscount, IconCheck, IconHeart,
} from '../../../lib/icons';

/*
  Footer — درجة teal-800 (#0D4A47) للـ header bar
  وتدريج من teal-700 لـ teal-800 للخلفية الرئيسية
  أغمق درجة في الموقع كله — يكمل هرم الألوان:
  ┌────────────────────────────────────────┐
  │ Navbar top  → teal-700/800 (أغمق top) │
  │ BottomNav   → teal-600     (وسط)      │
  │ Buttons     → teal-400/500 (أفتح)     │
  │ Filter bar  → teal-50      (خفيف جداً)│
  │ Footer      → teal-800     (base dark)│
  └────────────────────────────────────────┘
*/

const GOLD = '#FFD43B';
const quickLinks = [
  { label: 'الرئيسية', href: '/',        Icon: IconHome },
  { label: 'الكتب',    href: '/#books',  Icon: IconBook },
  { label: 'طلباتي',  href: '/myorder', Icon: IconOrders },
];

const services = [
  { label: 'توصيل سريع لجميع المحافظات', Icon: IconShipping },
  { label: 'خصومات تصل إلى 15%',          Icon: IconDiscount },
  { label: 'كتب أصلية جودة مضمونة',       Icon: IconCheck },
];

const stages = [
  { label: 'المرحلة الابتدائية', href: '/sf/prim' },
  { label: 'المرحلة الإعدادية', href: '/sf/prep' },
  { label: 'المرحلة الثانوية',  href: '/sf/sec'  },
  { label: 'مرحلة الحضانة',     href: '/sf/kg'   },
];

function Footer() {
  const year = new Date().getFullYear();

  /* shared link style inside dark footer */
  const linkCls = 'flex items-center gap-2 text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm py-0.5';
  const headingStyle = { color: GOLD };

  return (
    <footer id="contact" style={{ background: 'var(--color-footer)' }}>

      {/* ── Top divider accent ─────────────────────────────── */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#4EC4BD,#FFD43B,#4EC4BD)' }} />

      {/* ── Main content ───────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">

          {/* ① Brand ─────────────────────────────────────── */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
            <div className="w-24 mb-4 drop-shadow-lg">
              <img src={logo} alt="مكتبة الأمل" className="w-full object-contain hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="font-extrabold text-white text-lg mb-2">مكتبة الأمل</h2>
            <p className="text-white/60 text-sm leading-relaxed text-center md:text-right">
              وجهتك الأولى للكتب الدراسية بجودة عالية وأسعار تنافسية لجميع المراحل.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/Amaleducationalstore?locale=ar_AR"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ background: '#1877F2' }}
                title="فيسبوك"
              >
                <IconFacebook size={17} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=201069571111"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ background: '#25D366' }}
                title="واتساب"
              >
                <IconWhatsapp size={17} />
              </a>
              <a
                href="tel:01069571111"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#4EC4BD,#2E9E98)' }}
                title="اتصل بنا"
              >
                <IconPhone size={17} />
              </a>
            </div>
          </div>

          {/* ② Quick Links ───────────────────────────────── */}
          <div className="flex flex-col items-end">
            <h4 className="font-bold text-base mb-4" style={headingStyle}>روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className={linkCls}>
                    <Icon size={14} className="shrink-0" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ③ Services ─────────────────────────────────── */}
          <div className="flex flex-col items-end">
            <h4 className="font-bold text-base mb-4" style={headingStyle}>خدماتنا</h4>
            <ul className="space-y-2">
              {services.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-2 text-white/70 text-sm py-0.5">
                  <Icon size={14} className="shrink-0" style={{ color: GOLD }} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ④ Stages ───────────────────────────────────── */}
          <div className="flex flex-col items-end">
            <h4 className="font-bold text-base mb-4" style={headingStyle}>المراحل الدراسية</h4>
            <ul className="space-y-2">
              {stages.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkCls}>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact number */}
            <div className="mt-5 flex items-center gap-2 text-white/80">
              <a
                href="tel:01069571111"
                className="flex items-center gap-2 text-sm font-bold hover:text-yellow-300 transition-colors duration-200"
              >
                <IconPhone size={14} style={{ color: GOLD }} />
                <span dir="ltr">01069571111</span>
              </a>
            </div>
            <div className="mt-1 flex items-center gap-2 text-white/60 text-xs">
              <IconLocation size={13} style={{ color: '#66CBBD' }} />
              <span>جميع محافظات مصر</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div
        className="border-t py-4 px-5"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.18)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="text-white/50 text-xs">
            © {year} مكتبة الأمل — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <span>صُنع بـ</span>
            <IconHeart size={12} style={{ color: GOLD }} />
            <span>لطلاب مصر</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
