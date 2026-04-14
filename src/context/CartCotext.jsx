
import { Children, createContext, useEffect, useState } from "react";
import { supabase } from "../services/SupabaseClient";
import Swal from 'sweetalert2'
import { set } from "zod";
import toast from "react-hot-toast";



export const cartcontext = createContext()


export const CartContextProvider = (({ children }) => {


  const [cartIds, setCartIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cartIdes')
      return saved ? JSON.parse(saved) : {}
    } catch (e) {
      return {}
    }
  })
  const [cartloading, setCartloading] = useState({})
  const [cartError, setCartError] = useState(false)


  const [ProductData, setProductData] = useState([])
  const [ProductError, setProductError] = useState(null)
  const [Productloading, setProductloading] = useState(false)

  const [confirmOrderLoading, setconfirmOrderLoading] = useState(false)

  const trackAddToCart = (productId, quantity, productData) => {
    if (window.fbq && productData) {
      window.fbq('track', 'AddToCart', {
        content_ids: [productId],
        content_type: 'product',
        value: Number(productData.price * quantity).toFixed(2),
        currency: 'EGP',
        content_name: productData.name || 'Book'
      });
    }
  };


  const trackPurchase = (orderData, totalAmount, products = ProductData, userData = {}, externalEventID = null) => {
    if (window.fbq && orderData) {

      if (!window.trackedOrders) {
        window.trackedOrders = new Set();
      }

      const eventID = externalEventID || 'order_' + new Date().getTime() + '_' + Math.round().toString(36).substr(2, 9);

      if (externalEventID && window.trackedOrders.has(externalEventID)) {
        console.warn('⚠️ Purchase event blocked by global deduplication:', eventID);
        return;
      }

      if (externalEventID) {
        window.trackedOrders.add(externalEventID);
      }

      const advancedMatchingData = {
        em: userData.email ? userData.email.toLowerCase().trim() : undefined,
        ph: userData.phone ? userData.phone.replace(/^0/, '+20') : undefined,
        fn: userData.name ? userData.name.split(' ')[0].toLowerCase().trim() : undefined,
        ln: userData.name ? userData.name.split(' ').slice(1).join(' ').toLowerCase().trim() : undefined,
        ct: userData.center ? userData.center.toLowerCase().trim() : undefined,
        st: userData.gover ? userData.gover.toLowerCase().trim() : undefined,
        country: 'eg'
      };

      Object.keys(advancedMatchingData).forEach(key => advancedMatchingData[key] === undefined && delete advancedMatchingData[key]);

      window.fbq('init', '1154855260177771', advancedMatchingData);

      // Standardize parameters for Purchase event
      const pixelValue = Number(totalAmount) || 0;

      if (pixelValue <= 0) {
        console.warn('⚠️ Facebook Pixel Purchase value is 0 or invalid, skipping event.');
        return;
      }

      window.fbq('track', 'Purchase', {
        content_ids: products.map(item => String(item.id)),
        content_type: 'product',
        contents: products.map(item => ({
          id: String(item.id),
          quantity: Number(item.quantity) || 1
        })),
        value: pixelValue,
        currency: 'EGP',
        num_items: products.length
      }, { eventID: eventID });
    }
  };





  const getIds = async (id, stoke) => {
    setCartIds(prev => {
      const currentQty = prev[id] || 0;
      if (stoke !== undefined && currentQty >= stoke) {
        toast.error('عذراً، لقد نفذت الكمية المتوفرة');
        return prev;
      }

      const updated = { ...prev, [id]: currentQty + 1 };
      localStorage.setItem('cartIdes', JSON.stringify(updated));


      if (currentQty > 0) {
        toast.success(`لديك الان ${updated[id]} من هذا الكتاب في العربه `);
      } else {
        toast.success(`تمت الإضافة للعربة بنجاح`);
        // Swal.fire({
        //   title: "تم الاضافه الي العربه بنجاح",
        //   icon: "success",
        //   draggable: true
        // });
      }
      return updated;
    });
  }


  const getProdectData = async () => {


    const allIds = Object.keys(cartIds)




    try {


      setProductloading(true)

      const { data, error } = await supabase
        .from('products')
        .select('name, price, stoke, id , company , category , level')
        .in('id', allIds)

      if (error) {
        console.log(error?.message);

      } else {

        setProductData(data)

      }
    } catch (error) {

      setProductError(error?.message)


    } finally {
      setProductloading(false)

      setProductData(val =>
        val.map(product => ({
          ...product,
          quantity: cartIds[product.id] || 0,
          totalPrice: (cartIds[product.id] || 0) * product.price
        }))
      );
    }










  }


  const deletCart = (pro) => {






    Swal.fire({
      title: "هل انت متاكد؟",
      text: "سوف يتم الحذف من العربه",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2E9E98",
      cancelButtonColor: "#d33",
      cancelButtonText: "لا",
      confirmButtonText: "نعم"
    }).then((result) => {
      if (result.isConfirmed) {

        setCartIds(prev => {
          const updated = { ...prev };
          delete updated[pro.id];
          localStorage.setItem('cartIdes', JSON.stringify(updated));
          return updated;
        });

        let newCartdata = ProductData.filter(el => el.id !== pro.id)
        setProductData(newCartdata)

        Swal.fire({
          title: "تم الحذف!",
          text: "",
          icon: "success"

        });
      }
    });
  }



  const confirmOrder = async (details, swall) => {
    const { name, phone, address, gover, center, whats } = details



    const fulladress = `${gover}(${center}) - ${address} `

    try {
      setconfirmOrderLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          name,
          phone,
          whats,
          address: fulladress,
          cart_items: ProductData,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        console.error("❌ Order insert failed:", error)
        return
      }

      setCartIds([])
    } catch (err) {
      console.error("❌ Connection error:", err)
    } finally {
      setTimeout(() => {
        setconfirmOrderLoading(false)
        swall()


      }, 1500)
    }
  }










  return <cartcontext.Provider value={{ getIds, getProdectData, setProductData, setCartIds, confirmOrderLoading, cartloading, cartIds, ProductData, deletCart, Productloading, ProductError, confirmOrder, setProductloading, trackAddToCart, trackPurchase }}>
    {children}
  </cartcontext.Provider>
})
