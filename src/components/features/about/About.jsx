import React, { useContext } from 'react'
import {
  IconBook, IconGraduation, IconBookmark, IconSparkles,
  IconFlame, IconGift, IconPhone, IconWhatsapp, IconFacebook,
  IconShipping, IconDiscount, IconCheck, IconStar, IconArrowLeft
} from '../../../lib/icons';
import { supbasecontext } from '../../../context/SupbaseContext';

function About() {

      const { offersList } = useContext(supbasecontext);
    
    

    const features = [
      { Icon: IconDiscount, title: 'خصومات تصل إلى 15%', desc: 'أسعار تنافسية' },
      { Icon: IconShipping, title: 'توصيل لجميع المحافظات', desc: 'شحن سريع وآمن' },
      { Icon: IconCheck,    title: 'كتب أصلية معتمدة', desc: 'جودة مضمونة' },
      { Icon: IconPhone,    title: 'دعم على مدار الساعة', desc: 'خدمة عملاء ممتازة' },
    ];
 
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
    <div>

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
                        return (
                          <div
                            key={i}
                            className="w-[calc(50%-0.375rem)] md:w-[calc(20%-0.8rem)] bg-white rounded-2xl p-4 text-center transition duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(78,196,189,0.15)] border border-gray-200 cursor-default"
                          >
                            <div className="flex justify-center mb-2">
                               <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                                 <offer.Icon size={24} color="var(--teal-500)" />
                               </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: 'var(--teal-600)' }}>
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
   
               {/* Feature cards — Clean white style */}
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                 {features.map((f, i) => {
                   return (
                     <div
                       key={i}
                       className="p-5 rounded-2xl text-center hover:scale-105 transition duration-300 bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(78,196,189,0.1)]"
                     >
                       <f.Icon size={30} color="var(--teal-500)" className="mx-auto mb-3" strokeWidth={1.5} />
                       <h3 className="font-bold text-sm mb-1 text-gray-800">{f.title}</h3>
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
  )
}

export default About