import { Outlet, useLocation } from 'react-router-dom'
import Navpar from '../common/Navbar/Navpar'
import Footer from '../common/Footer/Footer'
import BottomNav from '../common/BottomNav/BottomNav'
import { useContext, useEffect, useState } from 'react'
import FloatingCart from '../features/FloatingCart/FloatingCart'
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

  // useEffect(() => {
  //   const hasSeenOffers = sessionStorage.getItem('hasSeenOffers');
  //   if (!hasSeenOffers) {
  //     const timer = setTimeout(() => {
  //       setShowOffers(true);
  //       sessionStorage.setItem('hasSeenOffers', 'true');
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  return (
    <div className=' relative'>
      <div className=' fixed top-[-20px] md:top-[0px] left-0 z-[999999] w-[100%]'>
        <Navpar />
        {!isHomePage && <BottomNav />}
      </div>
      <div className="h-[70px] md:h-[80px]"></div>
      <Outlet />
      <FloatingCart />
      <Footer />
      {/* <OffersModal isOpen={showOffers} onClose={() => setShowOffers(false)} /> */}
    </div>
  )
}


export default Layout