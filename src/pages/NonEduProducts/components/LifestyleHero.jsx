import React from 'react';
import { motion } from 'framer-motion';
import { IconSparkles, IconPackage } from '../../../lib/icons';

const LifestyleHero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-4 bg-white" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[var(--teal-50)] rounded-full blur-[120px] opacity-60 z-0" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-[var(--brand-accent-light)] rounded-full blur-[100px] opacity-40 z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--teal-50)] border border-[var(--teal-100)] text-[var(--teal-600)] font-bold text-sm mb-6 shadow-sm">
            <IconSparkles size={16} />
            <span>منتجات مميزة لنمط حياة عصري</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-[var(--teal-800)] leading-[1.15]">
            اكتشف <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--teal-600)] to-[var(--teal-400)]">الإبداع</span> 
            <br />
            في كل زاوية
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
            مجموعة مختارة بعناية من الأدوات المكتبية، الهدايا، والمستلزمات التي تضيف لمسة من الجمال والتميز ليومك.
          </p>

          {/* Stats / Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            {[
              { icon: IconPackage, label: 'خامات متميزة', desc: 'أعلى معايير الجودة' },
              { icon: IconSparkles, label: 'تصميمات فريدة', desc: 'لمسة إبداعية خاصة' },
              { icon: IconSparkles, label: 'تشكيلة واسعة', desc: 'تناسب جميع الأذواق' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--teal-50)] flex items-center justify-center mb-3 text-[var(--teal-500)]">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{feature.label}</h3>
                <p className="text-[10px] md:text-xs text-slate-400 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleHero;
