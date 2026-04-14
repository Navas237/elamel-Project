import React from 'react'

function BookSkeleton() {

    

      return (
        <div className='bg-white rounded-xl mt-10 md:rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden flex flex-col h-full'>
          {/* ... (rest of skeleton) */}
          <div className='h-52 sm:h-64 md:h-72 lg:h-80 bg-gray-200 relative overflow-hidden'>
            <div className='absolute inset-0 skeleton-shimmer'></div>
          </div>
          <div className='p-3 md:p-4 space-y-3 flex-grow'>
            <div className='h-4 md:h-6 bg-gray-200 rounded-lg w-3/4 mr-auto'></div>
            <div className='h-4 md:h-5 bg-gray-200 rounded-lg w-1/2 mr-auto'></div>
            <div className='bg-gray-50 p-2 md:p-3 rounded-xl space-y-2 mt-4'>
              <div className='h-3 md:h-4 bg-gray-200 rounded w-1/3 mr-auto'></div>
              <div className='h-3 md:h-4 bg-gray-200 rounded w-1/4 mr-auto'></div>
            </div>
          </div>
          <div className='p-3 md:p-4 mt-auto'>
            <div className='h-10 md:h-12 bg-gray-200 rounded-xl w-full'></div>
          </div>
        </div>
      );
 
  
}

export default BookSkeleton