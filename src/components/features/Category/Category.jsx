import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';
import { supbasecontext } from '../../../context/SupbaseContext';
import { useCatgory } from './Service/useCatgory';

function Category() {
  const { offersList } = useContext(supbasecontext);
  const {catergoryList} = useCatgory()
  // console.log(catergoryList);
  

  useEffect(() => {
    window.scroll({ top: 200 });
  }, []);

  const formattedOffers = offersList?.filter(o => o.status === 'نشط' && o.offer_type === 'discount' && o.hidden !== true).map((offer, index) => {
    const icons = ['📘', '💸', '🎯', '🎁', '🥇', '🌟', '💥'];
    const pIcon = icons[index % icons.length];
    // console.log(offer);/

    return {
      discount: `${offer.discount_value}%`,
      // condition: offer.min_purchase ? 'عند الشراء بـ' : offer.target_type === 'all' ? ' علي أي كتاب' : offer.target_type === 'category' ? 'على فئات محددة' : 'على مراحل محددة',
      condition: offer.description,
      icon: pIcon,
      amount: offer.min_purchase ? offer.min_purchase : '',
      egp: offer.min_purchase ? 'ج' : '',
      more: offer.min_purchase ? 'او اكثر' : '',
      id: offer.id
    };
  }) || [];

  const stages = [
    {
      name: 'الابتدائية',
      path: 'sf/prim',
      icon: '🎒',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:border-purple-500',
    },
    {
      name: 'الحضانه',
      path: 'sf/kg',
      icon: '🧸',
      color: 'from-pink-500 to-pink-700',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:border-pink-500',
    },
    {
      name: 'الثانوية',
      path: 'sf/sec',
      icon: '🎓',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:border-green-500',
    },

    {
      name: 'الإعدادية',
      path: 'sf/prep',
      icon: '📚',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:border-blue-500',
    },

  ];

  const features = [
    { icon: '💰', title: 'خصومات تصل إلى %15', desc: 'أسعار تنافسية' },
    { icon: '🚚', title: 'توصيل لجميع المحافظات', desc: 'شحن سريع وآمن' },
    { icon: '✅', title: 'كتب أصلية معتمدة', desc: 'جودة مضمونة' },
    { icon: '📞', title: 'دعم على مدار الساعة', desc: 'خدمة عملاء ممتازة' },
  ];

  return (
    <div className="category  min-h-screen bg-gradient-to-b from-gray-50 to-white">








      {/* Educational Stages Section */}
      <div className="max-w-6xl mx-auto px-2 pb-20">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 inline-block relative">
            اختر المرحلة الدراسية
            <span className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform translate-y-2"></span>
          </h2>

        </div> */}

        <div className="grid grid-cols-2 gap-6">
          {stages.map((stage, index) => (
            <Link
              key={index}
              to={stage.path}
              className={`bg-white ${stage.bgColor} border-4 border-transparent ${stage.hoverColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 group`}
            >
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stage.icon}
                </div>
                <div className="text-lg font-bold mb-4 text-gray-800">
                  المرحلة
                  <p className=' font-bold text-2xl'>
                    {stage.name}

                  </p>
                </div>
                {/* <div className={`inline-block bg-gradient-to-r ${stage.color} text-white px-8 py-3 rounded-full font-bold text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                  ← عرض الكتب
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>



      {/* Offers Section */}
      <div>
        {formattedOffers.length > 0 &&

          <div className="max-w-6xl mx-auto px-4 mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8">
              <div className="text-center mb-4 ">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text p-2 text-transparent ">
                  {/* <span className="text-4xl">🎉</span> */}
                  العروض الحصرية
                  {/* <span className="text-4xl">🎉</span> */}
                </h2>
                {/* <p className="text-gray-600 text-lg">فاتور</p> */}
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {formattedOffers.map((offer, index) => (
                  <div
                    key={index}
                    className="w-[calc(50%-0.375rem)] md:w-[calc(20%-0.8rem)] bg-gradient-to-br dir-rtl from-purple-50 to-blue-50 rounded-2xl p-4 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-purple-300"
                  >
                    <div className="text-3xl mb-2">{offer.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                      {offer.discount}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                      {offer.condition}
                    </div>
                    {offer.amount && (
                      <div className="text-sm md:text-base font-bold text-blue-600 mt-1">
                        <div className='flex gap-1 justify-center'>
                          <span>{offer.egp}</span>
                          {offer.amount}

                        </div>
                        <span>   {offer.more}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>






      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 inline-block relative">
            من نحن؟
            <span className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform translate-y-2"></span>
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-8 items-center">

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-sm mb-1 text-gray-800">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6 text-right">
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="text-3xl font-bold text-purple-600">مكتبة الأمل</span> هي وجهتك الأولى للحصول على الكتب الدراسية بجودة عالية وأسعار تنافسية. نؤمن بأن التعليم حق للجميع، ولذلك نسعى لتوفير كل ما يحتاجه الطالب.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                نقدم خدمة البيع الإلكتروني مع <strong className="text-purple-600">توصيل سريع وآمن</strong> لجميع محافظات الجمهورية، مع ضمان جودة المنتجات وخصومات مميزة تصل إلى <strong className="text-purple-600 text-2xl">15%</strong> على مختلف الكتب.
              </p>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
}

export default Category;