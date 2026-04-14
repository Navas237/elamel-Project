import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { lazy, Suspense, useContext, useEffect } from 'react';
import Lottie from "lottie-react";
import Loadunglotie from '../src/assets/lotiefiles/Loading animation blue.json';
import Errorlotie from '../src/assets/lotiefiles/Errorlotie.json';

const Home = lazy(() => import('./pages/Home/Home'));
const Layout = lazy(() => import('./components/layout/MainLayout'));
const SelectLang = lazy(() => import('./components/features/SelectLang/SelcectLang'));
const Books = lazy(() => import('./pages/products/Books'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Elsafe = lazy(() => import('./components/features/Elsafe/Elsafe'));
const ConfirmOrder = lazy(() => import('./pages/ConfirmOrder/ConfirmOrder'));
const SingleProduct = lazy(() => import('./pages/SingleProduct/SingleProduct'));
const MyOrders = lazy(() => import('./pages/myOrders/MyOrders'));
const SelectType = lazy(() => import('./components/features/SelectType/SelectType'));
import toast, { Toaster } from 'react-hot-toast';
import ProtuctedRoute from './pages/myOrders/ProtuctedRoute';
import ProtectedRoute from './pages/ConfirmOrder/ProtectedRoute';
import ScrollToTop from './ScrollToTop';
import { supbasecontext } from './context/SupbaseContext';
import Button from './components/common/ui/Button';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const FB_PIXEL_ID = '1154855260177771';

const queryClient = new QueryClient()

function App() {
  const { areHeaderImagesReady, getImgHeader, headerImages } = useContext(supbasecontext);

  useEffect(() => {
    getImgHeader();
  }, [getImgHeader]);

  useEffect(() => {
    if (!FB_PIXEL_ID || FB_PIXEL_ID === 'YOUR_PIXEL_ID') {
      console.warn('⚠️ Facebook Pixel ID is not set!');
      return;
    }

    if (window.fbq) {
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
      return;
    }

    const fbPixelScript = document.createElement('script');
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbPixelScript);

    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      if (fbPixelScript.parentNode) {
        document.head.removeChild(fbPixelScript);
      }
      if (noscript.parentNode) {
        document.body.removeChild(noscript);
      }
    };
  }, []);

  const handelLoadingloite = () => {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Lottie animationData={Loadunglotie} className='w-40' loop={true} />
      </div>
    );
  };

  const handelErrorloite = () => {
    return (
      <div className='flex items-center justify-center h-screen flex-col gap-5'>
        <Lottie animationData={Errorlotie} className='w-40' loop={true} />
        <Link to='/'>
          <Button className='rounded-lg'>
            back to home page
          </Button>
        </Link>
      </div>
    );
  }

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: (
          <Suspense fallback={handelLoadingloite()}>

            <Layout />
            <ScrollToTop />
          </Suspense>
        ),
        children: [
          { path: '/', element: <Home /> },
          { path: '/sf/:level/selectlang/:level2', element: <SelectLang /> },
          { path: '/sf/:level/choice/:level2', element: <SelectType /> },
          { path: '/sf/:level', element: <Elsafe /> },
          { path: '/sf/:level/b/:level2', element: <Books /> },
          { path: '/cart', element: <Cart /> },
          { path: '/confirmorder', element: <ProtectedRoute><ConfirmOrder /></ProtectedRoute> },
          { path: '/singleprodeuct/:id', element: <SingleProduct /> },
          {
            path: '/myorder',
            element: (

              <MyOrders />

            )
          },
        ],
        errorElement: handelErrorloite()
      },
    ],
  );

  if (!areHeaderImagesReady) {
    return handelLoadingloite();
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster
        containerStyle={{
          zIndex: 99999999,
        }}
      />
    </>
  );
}



export default App;
