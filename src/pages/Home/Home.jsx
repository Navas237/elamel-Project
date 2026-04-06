
import React, { useEffect } from 'react'
import Header from '../../components/features/Header/Header'
import Category from '../../components/features/Category/Category'

function Home() {
  useEffect(() => {
    window.scroll({ top: 0 })
  }, [])

  return (
    <div >
      <Header />
      <Category />
    </div>
  )
}

export default Home