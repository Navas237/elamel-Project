import React, { useEffect } from 'react'
import MySwiper from '../../../../SwIPER/Swiper'

function Header() {
  useEffect(() => { window.scroll({ top: 0 }) }, [])

  return (
    <div className='flex flex-col mt-[-15px]'>
      {/* Hero Swiper */}
      <div className='w-full h-auto'>
        <MySwiper />
      </div>

      {/* Brand Banner */}
      <div
        className="text-white py-4 px-4 mb-8 rounded-b-[3rem] shadow-2xl"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-3 mt-2 animate-bounce select-none">📖</div>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            مكتبة الأمل
          </h1>
          <p className="text-lg md:text-2xl text-white/85 font-medium">
            شريكك في النجاح الدراسي
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-4 mb-1">
            {[1,2,3].map(i => (
              <span
                key={i}
                className="block rounded-full"
                style={{
                  width: i === 2 ? 24 : 8,
                  height: 8,
                  backgroundColor: i === 2 ? 'var(--brand-accent)' : 'rgba(255,255,255,0.4)',
                  transition: 'width 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header