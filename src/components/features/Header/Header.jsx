import React, { useEffect } from 'react'
import MySwiper from '../../../../SwIPER/Swiper'

function Header() {
  useEffect(() => {

    window.scroll({ top: 0 })

  }, [])
  return (
    <div className='flex flex-col mt-[-15px]'>

      <div className='header w-full h-auto'>
        <MySwiper />
      </div>
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-3 px-4 mb-8 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4 mt-3 animate-bounce">📖</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">مكتبة الأمل</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            شريكك في النجاح الدراسي
          </p>

        </div>
      </div>
    </div>
  )
}

export default Header