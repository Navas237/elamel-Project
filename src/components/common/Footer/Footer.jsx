import React, { useEffect } from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import logo from '../../../images/Logo.png';

function Footer() {
  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  };

  useEffect(() => {
    getYear();
  }, []);

  const socialLinks = [
    {
      name: 'فيسبوك',
      icon: <FaFacebook />,
      url: 'https://www.facebook.com/Amaleducationalstore?locale=ar_AR',
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'واتساب',
      icon: <IoLogoWhatsapp />,
      url: 'https://api.whatsapp.com/send?phone=201069571111',
      color: 'hover:text-green-500',
      bgColor: 'hover:bg-green-50'
    }
  ];

  return (
    <div id="contact" className="mt-20">
      
      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-gray-400 to-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            
            {/* Logo & Description   */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-48 mb-6">
                <img 
                  src={logo} 
                  alt="مكتبة الأمل" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-gray-600 text-center md:text-right text-lg leading-relaxed">
                مكتبة الأمل - وجهتك الأولى للكتب الدراسية بجودة عالية وأسعار تنافسية
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-[#2d839b] mb-6 flex items-center gap-2">
                <FaPhone className="text-xl" />
                تواصل معنا
              </h3>
              
              <div className="space-y-4 w-full">
                <a 
                  href="tel:01069571111"
                  className="flex items-center gap-3 text-gray-700 hover:text-[#2d839b] transition-colors duration-300 text-lg group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2d839b] to-[#2a7a90] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-sm" />
                  </div>
                  <span className="font-semibold">01069571111</span>
                </a>

                <div className="flex items-center gap-3 text-gray-700 text-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2d839b] to-[#2a7a90] flex items-center justify-center text-white">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <span>جميع محافظات مصر</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-[#2d839b] mb-6">
                تابعنا على
              </h3>
              
              <div className="space-y-4 w-full">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${link.bgColor} group`}
                  >
                    <div className={`text-3xl text-gray-600 ${link.color} transition-colors duration-300`}>
                      {link.icon}
                    </div>
                    <span className={`text-lg font-semibold text-gray-700 ${link.color} transition-colors duration-300`}>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            

            <div className='flex flex-col items-end'>
              <h4 className="font-bold text-[#2d839b] mb-3 text-lg">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/" className="hover:text-[#2d839b] transition-colors">الرئيسية</a></li>
                <li><a href="/#books" className="hover:text-[#2d839b] transition-colors">الكتب</a></li>
                <li><a href="/myorder" className="hover:text-[#2d839b] transition-colors">طلباتي</a></li>
              </ul>
            </div>

          

            

              <div className='flex flex-col items-end'>
              <h4 className="font-bold text-[#2d839b] mb-3 text-lg">خدماتنا</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">✓ توصيل سريع</li>
                <li className="flex items-center gap-2">✓ خصومات مميزة</li>
                <li className="flex items-center gap-2">✓ جودة مضمونة</li>
              </ul>
            </div>


            <div className='flex flex-col items-end'>
              <h4 className="font-bold text-[#2d839b] mb-3 text-lg">المراحل الدراسية</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/#books" className="hover:text-[#2d839b] transition-colors">الابتدائية</a></li>
                <li><a href="/#books" className="hover:text-[#2d839b] transition-colors">الإعدادية</a></li>
                <li><a href="/#books" className="hover:text-[#2d839b] transition-colors">الثانوية</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="bg-gradient-to-r from-[#2d839b] via-[#2a7a90] to-[#2d839b] py-6 mt-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex gap-4 text-white/80 text-sm">
                <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
              </div>
              <p className="text-white text-center md:text-right text-lg font-semibold">
                © {getYear()} مكتبة الأمل – جميع الحقوق محفوظة
              </p>
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;