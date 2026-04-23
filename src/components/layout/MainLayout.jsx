import { Outlet, useLocation } from 'react-router-dom'
import Navpar from '../common/Navbar/Navpar'
import Footer from '../common/Footer/Footer'
import BottomNav from '../common/BottomNav/BottomNav'
import MobileBottomNav from './MobileBottomNav'
import { useContext, useEffect, useState } from 'react'
import OffersModal from '../features/OffersModal/OffersModal'
import { supbasecontext } from '../../context/SupbaseContext'

function Layout() {
  const [showOffers, setShowOffers] = useState(false);
  const loaction = useLocation()
  const { headerImages, getImgHeader } = useContext(supbasecontext);

  const isHomePage = loaction.pathname === "/"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loaction.pathname]);

  return (
    <div className=' relative'>
      <div className=' fixed top-[-20px] md:top-[0px] left-0 z-[999999] w-[100%]'>
        <Navpar />
        {!isHomePage && <BottomNav />}
      </div>
      <div className="h-[70px] md:h-[80px]"></div>
      <Outlet />
      <Footer />
      {/* Mobile Bottom Navigation Menu */}
      <MobileBottomNav />
    </div>
  )
}

export default Layout