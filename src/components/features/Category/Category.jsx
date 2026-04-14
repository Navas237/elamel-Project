import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';
import { supbasecontext } from '../../../context/SupbaseContext';
import { useCatgory } from './Service/useCatgory';
import {
  IconBook, IconGraduation, IconBookmark, IconSparkles,
  IconFlame, IconGift, IconPhone, IconWhatsapp, IconFacebook,
  IconShipping, IconDiscount, IconCheck, IconStar,
} from '../../../lib/icons';

/* ─────────────────────────────────────────────────────────── */
/* Stage cards — each uses a different Teal shade for variety  */
/* ─────────────────────────────────────────────────────────── */
const stages = [
  {
    name: 'الابتدائية', path: 'sf/prim',
    Icon: IconBook,
    /* teal-400 + teal-500 */
    gradient:  'var(--gradient-brand)',
    iconColor: '#fff',
    cardBg:    'var(--teal-50)',
    border:    'var(--teal-200)',
    textColor: 'var(--teal-600)',
  },
  {
    name: 'الحضانة', path: 'sf/kg',
    Icon: IconStar,
    /* teal-300 + teal-400 */
    gradient:  'linear-gradient(135deg,var(--teal-300),var(--teal-400))',
    iconColor: '#fff',
    cardBg:    'var(--teal-50)',
    border:    'var(--teal-200)',
    textColor: 'var(--teal-500)',
  },
  {
    name: 'الثانوية', path: 'sf/sec',
    Icon: IconGraduation,
    /* teal-500 + teal-600 */
    gradient:  'var(--color-primary-button)',
    iconColor: '#fff',
    cardBg:    '#E8F6F5',
    border:    'var(--teal-300)',
    textColor: 'var(--teal-700)',
  },
  {
    name: 'الإعدادية', path: 'sf/prep',
    Icon: IconBookmark,
    /* teal-600 + teal-700 */
    gradient:  'linear-gradient(135deg,var(--teal-600),var(--teal-700))',
    iconColor: 'var(--brand-accent)',
    cardBg:    '#E0F2F1',
    border:    'var(--teal-400)',
    textColor: 'var(--teal-800)',
  },
];

const features = [
  { Icon: IconDiscount, title: 'خصومات تصل إلى 15%', desc: 'أسعار تنافسية' },
  { Icon: IconShipping, title: 'توصيل لجميع المحافظات', desc: 'شحن سريع وآمن' },
  { Icon: IconCheck,    title: 'كتب أصلية معتمدة', desc: 'جودة مضمونة' },
  { Icon: IconPhone,    title: 'دعم على مدار الساعة', desc: 'خدمة عملاء ممتازة' },
];

/* ─────────────────────────────────────────────────────────── */
function Category() {
  const { offersList } = useContext(supbasecontext);
  const { catergoryList } = useCatgory();

  useEffect(() => { window.scroll({ top: 200 }); }, []);

  const offerIcons = [IconFlame, IconGift, IconSparkles, IconStar, IconDiscount, IconFlame, IconGift];

  const formattedOffers = offersList
    ?.filter(o => o.status === 'نشط' && o.offer_type === 'discount' && o.hidden !== true)
    .map((offer, i) => ({
      discount:  `${offer.discount_value}%`,
      condition: offer.description,
      Icon:      offerIcons[i % offerIcons.length],
      amount:    offer.min_purchase || '',
      egp:       offer.min_purchase ? 'ج' : '',
      more:      offer.min_purchase ? 'أو أكثر' : '',
      id:        offer.id,
    })) || [];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--gradient-surface)' }}>

      {/* ── Educational Stages ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-3 pb-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:gap-6">
          {stages.map((stage, i) => (
            <Link
              key={i}
              to={stage.path}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1.5 border-2"
              style={{ background: stage.cardBg, borderColor: stage.border }}
            >
              {/* Icon circle */}
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ background: stage.gradient }}
              >
                <stage.Icon size={28} color={stage.iconColor} strokeWidth={1.8} />
              </div>

              {/* Label */}
              <p className="text-xs font-medium text-center mb-0.5" style={{ color: 'var(--teal-300)' }}>المرحلة</p>
              <p className="font-extrabold text-lg md:text-2xl text-center" style={{ color: stage.textColor }}>
                {stage.name}
              </p>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
                style={{ background: stage.gradient }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Offers Section ─────────────────────────────────── */}
      {formattedOffers.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8">
            {/* Title */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <IconSparkles size={22} color="var(--brand-accent)" />
              <h2
                className="text-2xl md:text-3xl font-extrabold"
                style={{ color: 'var(--teal-800)' }}
              >
                العروض الحصرية
              </h2>
              <IconSparkles size={22} color="var(--brand-accent)" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {formattedOffers.map((offer, i) => {
                /* Alternate teal shades for visual variety */
                const shades = [
                  { bg: 'linear-gradient(135deg,var(--teal-50),var(--teal-100))', border: 'var(--teal-200)', text: 'var(--teal-600)' },
                  { bg: 'linear-gradient(135deg,var(--teal-100),var(--teal-50))', border: 'var(--teal-300)', text: 'var(--teal-700)' },
                ];
                const s = shades[i % 2];
                return (
                  <div
                    key={i}
                    className="w-[calc(50%-0.375rem)] md:w-[calc(20%-0.8rem)] rounded-2xl p-4 text-center transition duration-300 hover:scale-105 hover:shadow-lg border-2 cursor-default"
                    style={{ background: s.bg, borderColor: s.border }}
                  >
                    <div className="flex justify-center mb-2">
                      <offer.Icon size={26} color={s.text} />
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: s.text }}>
                      {offer.discount}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium leading-tight">
                      {offer.condition}
                    </div>
                    {offer.amount && (
                      <div className="text-sm font-bold mt-1.5" style={{ color: 'var(--teal-500)' }}>
                        {offer.egp} {offer.amount}
                        <span className="block text-xs">{offer.more}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── About Section ──────────────────────────────────── */}
      <div id="contact" className="max-w-5xl mx-auto px-4 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 inline-block relative">
            من نحن؟
            <span
              className="absolute bottom-0 right-0 left-0 h-[3px] rounded-full translate-y-2"
              style={{ background: 'linear-gradient(135deg,var(--teal-400),var(--brand-accent))' }}
            />
          </h2>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-10">
          <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-8 items-center">

            {/* Feature cards — 4 different teal shades */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((f, i) => {
                const cardShades = [
                  { bg: 'var(--teal-50)', icon: 'var(--teal-400)', title: 'var(--teal-600)' },
                  { bg: '#E8F6F5', icon: 'var(--teal-500)', title: 'var(--teal-700)' },
                  { bg: 'var(--teal-100)', icon: 'var(--teal-600)', title: 'var(--teal-800)' },
                  { bg: 'var(--teal-50)', icon: 'var(--teal-300)', title: 'var(--teal-500)' },
                ];
                const cs = cardShades[i % cardShades.length];
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl text-center hover:scale-105 transition duration-300 shadow-sm hover:shadow-md"
                    style={{ background: cs.bg }}
                  >
                    <f.Icon size={30} color={cs.icon} className="mx-auto mb-2" strokeWidth={1.8} />
                    <h3 className="font-bold text-xs md:text-sm mb-0.5" style={{ color: cs.title }}>{f.title}</h3>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* About text */}
            <div className="space-y-4 text-right">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                <span className="text-xl md:text-2xl font-extrabold" style={{ color: 'var(--teal-500)' }}>مكتبة الأمل</span>{' '}
                هي وجهتك الأولى للحصول على الكتب الدراسية بجودة عالية وأسعار تنافسية. نؤمن بأن التعليم حق للجميع.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                نقدم خدمة البيع الإلكتروني مع{' '}
                <strong style={{ color: 'var(--teal-500)' }}>توصيل سريع وآمن</strong>{' '}
                لجميع محافظات الجمهورية، وخصومات مميزة تصل إلى{' '}
                <strong className="text-2xl" style={{ color: 'var(--teal-400)' }}>15%</strong>.
              </p>

              {/* Social CTAs */}
              <div className="flex gap-3 justify-end flex-wrap pt-1">
                <a
                  href="https://api.whatsapp.com/send?phone=201069571111"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition duration-200"
                  style={{ background: '#25D366' }}
                >
                  <IconWhatsapp size={17} /> واتساب
                </a>
                <a
                  href="https://www.facebook.com/Amaleducationalstore?locale=ar_AR"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition duration-200"
                  style={{ background: '#1877F2' }}
                >
                  <IconFacebook size={17} /> فيسبوك
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Category;