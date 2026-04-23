import React, { useEffect } from 'react'
import MySwiper from '../../../../SwIPER/Swiper'
import { IconBookOpen } from '../../../lib/icons'

function Header() {
  useEffect(() => { window.scroll({ top: 0 }) }, [])

  return (
    <div className='flex flex-col mt-[-15px]'>
      {/* Hero Swiper */}
      <div className='w-full h-auto'>
        <MySwiper />
      </div>

      {/* Brand Banner - Clean Overlapping Card */}
      <div className="relative -mt-10 md:-mt-16 z-20 px-4 mb-16">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-[var(--teal-500)] shadow-sm">
              <IconBookOpen size={36} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900 tracking-tight">
            مكتبة الأمل
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-lg mx-auto">
            شريكك الأول في النجاح والتفوق الدراسي، نوفر لك كل ما تحتاجه من كتب.
          </p>

          {/* Decorative dots using brand color subtly */}
          <div className="flex justify-center gap-2 mt-6">
            {[1,2,3].map(i => (
              <span
                key={i}
                className="block rounded-full"
                style={{
                  width: i === 2 ? 24 : 8,
                  height: 8,
                  backgroundColor: i === 2 ? 'var(--teal-500)' : 'var(--gray-200)',
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