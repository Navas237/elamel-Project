import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';
import { supbasecontext } from '../../../context/SupbaseContext';
import { useCatgory } from './Service/useCatgory';
import {
  IconBook, IconGraduation, IconBookmark, IconSparkles,
  IconFlame, IconGift, IconPhone, IconWhatsapp, IconFacebook,
  IconShipping, IconDiscount, IconCheck, IconStar, IconArrowLeft
} from '../../../lib/icons';
import { useCatagory } from '../../../hooks/useCatagory';

/* ─────────────────────────────────────────────────────────── */
/* Stage cards — Standardized White-first styling              */
/* ─────────────────────────────────────────────────────────── */
const stages = [
  {
    name: 'الابتدائية', path: 'sf/prim',
    Icon: IconBook,
    gradient:  'linear-gradient(135deg,var(--teal-400),var(--teal-500))',
  },
  {
    name: 'الحضانة', path: 'sf/kg',
    Icon: IconStar,
    gradient:  'linear-gradient(135deg,var(--teal-300),var(--teal-400))',
  },
  {
    name: 'الثانوية', path: 'sf/sec',
    Icon: IconGraduation,
    gradient:  'linear-gradient(135deg,var(--teal-500),var(--teal-600))',
  },
  {
    name: 'الإعدادية', path: 'sf/prep',
    Icon: IconBookmark,
    gradient:  'linear-gradient(135deg,var(--teal-600),var(--teal-700))',
  },
];



/* ─────────────────────────────────────────────────────────── */
function Category() {
  const { offersList } = useContext(supbasecontext);
  const { catergoryList } = useCatgory();

  const {data , error  ,  isLoading } = useCatagory();
  

    const stagess = data?.filter(sta => sta.books == true)
    const moreCat = data?.filter(sta => sta.books == false)
    // console.log(moreCat);
    
       

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
    <div className="pb-4 bg-white">

      {/* ── Educational Stages ─────────────────────────────── */}
      <div id="books-section" className="max-w-5xl mx-auto px-3 pb-4 pt-20 -mt-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:gap-6">
          {stages.map((stage, i) => (
            <Link
              key={i}
              to={stage.path}
              className="group relative bg-white overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1.5 border border-gray-200"
            >
              {/* Icon circle */}
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'var(--teal-50)' }}
              >
                <stage.Icon size={28} color="var(--teal-500)" strokeWidth={1.8} />
              </div>

              {/* Label & Action Arrow */}
              <p className="text-xs font-medium text-center mb-0.5 text-gray-400">المرحلة</p>
              <div className="flex items-center justify-center gap-2">
                <p className="font-extrabold text-lg md:text-2xl text-center text-gray-900 group-hover:text-[var(--teal-600)] transition-colors">
                  {stage.name}
                </p>
                <IconArrowLeft 
                  size={20} 
                  className="text-[var(--teal-600)] opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300"
                />
              </div>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
                style={{ background: stage.gradient }}
              />
            </Link>
          ))}
        </div>
      </div>

    

    

    </div>
  );
}

export default Category;