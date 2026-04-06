import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";


function BottomNav({ children }) {
  const navigate = useNavigate();

  return (
    <div className='BottomNav h-[70px] z-[-1] flex items-center w-full bg-gradient-to-r from-[#2d839b] via-[#2a7a90] to-[#2d839b] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]'>
      
      <div className='flex items-center text-base p-3 pt-5 gap-3'>
        
        <Link 
          onClick={() => {
            navigate(-1);
            setTimeout(() => window.scrollTo(0, 0), 100);
          }} 
          className='flex gap-2 items-center text-white font-semibold hover:text-yellow-300 transition-all duration-300 group'
        >
          <span className='text-xl bg-white/10 p-2 rounded-full group-hover:bg-yellow-300/20 group-hover:rotate-[-12deg] transition-all duration-300'>
            <IoArrowBackOutline />
          </span>
          <span className=' sm:inline text-sm'>الرجوع للصفحة السابقة</span>
          {/* <span className='sm:hidden text-sm'>رجوع</span> */}
        </Link>

        {/* Optional Children Content */}
        {children && (
          <b className='text-white font-bold text-sm hidden md:block'>{children}</b>
        )}
        
      </div>

    </div>
  );
}

export default BottomNav;