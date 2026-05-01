import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/SupabaseClient';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartIds: {}, // { productId: quantity }
      cartloading: {}, // Tracking loading state for individual items
      ProductData: [],
      loading: false,
      error: null,
      confirmOrderLoading: false,

      // Actions
      setCartIds: (ids) => set({ cartIds: ids }),
      setProductData: (data) => set({ ProductData: data }),

      addToCart: (id, stoke, productData) => {
        const { cartIds, ProductData, trackAddToCart } = get();
        const currentQty = cartIds[id] || 0;

        if (stoke !== undefined && currentQty >= stoke) {
          toast.error('عذراً، لقد نفذت الكمية المتوفرة');
          return;
        }

        const newQty = currentQty + 1;
        const updatedCartIds = { ...cartIds, [id]: newQty };
        
        // Sync ProductData if the item exists there
        const updatedProductData = ProductData.map(p => 
          p.id === id ? { ...p, quantity: newQty, totalPrice: p.price * newQty } : p
        );

        set({ cartIds: updatedCartIds, ProductData: updatedProductData });

        // Automatic tracking if productData is provided
        if (productData) {
          trackAddToCart(id, 1, productData);
        }

        if (currentQty > 0) {
          toast.success(`لديك الان ${newQty} من هذا الكتاب في العربه `);
        } else {
          toast.success(`تمت الإضافة للعربة بنجاح`);
        }
      },

      // Alias for backward compatibility
      getIds: (id, stoke) => get().addToCart(id, stoke),

      updateQuantity: (id, quantity) => {
        const { cartIds, ProductData } = get();
        let updatedCartIds = { ...cartIds };
        let updatedProductData = [...ProductData];

        if (quantity <= 0) {
          delete updatedCartIds[id];
          updatedProductData = updatedProductData.filter(p => p.id !== id);
        } else {
          updatedCartIds[id] = quantity;
          updatedProductData = updatedProductData.map(p => 
            p.id === id ? { ...p, quantity, totalPrice: p.price * quantity } : p
          );
        }

        set({ cartIds: updatedCartIds, ProductData: updatedProductData });
      },

      getProductData: async () => {
        const { cartIds } = get();
        const allIds = Object.keys(cartIds);

        if (allIds.length === 0) {
          set({ ProductData: [] });
          return;
        }

        try {
          set({ loading: true });

          const { data, error: fetchError } = await supabase
            .from('products')
            .select('id, name, price, stoke, company, category, level, image')
            .in('id', allIds);

          if (fetchError) {
            console.error(fetchError.message);
            set({ error: fetchError.message });
          } else {
            const enrichedData = data.map(product => ({
              ...product,
              quantity: cartIds[product.id] || 0,
              totalPrice: (cartIds[product.id] || 0) * product.price
            }));
            set({ ProductData: enrichedData });
          }
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      removeFromCart: (productId) => {
        Swal.fire({
          title: "هل انت متاكد؟",
          text: "سوف يتم الحذف من العربه",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--teal-500)",
          cancelButtonColor: "#d33",
          cancelButtonText: "لا",
          confirmButtonText: "نعم"
        }).then((result) => {
          if (result.isConfirmed) {
            const { cartIds, ProductData } = get();
            const updatedCartIds = { ...cartIds };
            delete updatedCartIds[productId];
            
            const updatedProductData = ProductData.filter(el => el.id !== productId);
            
            set({ cartIds: updatedCartIds, ProductData: updatedProductData });

            Swal.fire({
              title: "تم الحذف!",
              text: "",
              icon: "success"
            });
          }
        });
      },

      confirmOrder: async (details, swall) => {
        const { name, phone, address, gover, center, whats } = details;
        const fulladress = `${gover}(${center}) - ${address} `;
        const { ProductData } = get();

        try {
          set({ confirmOrderLoading: true });
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
            .select();

          if (error) {
            console.error("❌ Order insert failed:", error);
            return;
          }

          set({ cartIds: {} });
        } catch (err) {
          console.error("❌ Connection error:", err);
        } finally {
          setTimeout(() => {
            set({ confirmOrderLoading: false });
            swall();
          }, 1500);
        }
      },

      // Tracking helpers (ported from context)
      trackAddToCart: (productId, quantity, productData) => {
        if (window.fbq && productData) {
          window.fbq('track', 'AddToCart', {
            content_ids: [productId],
            content_type: 'product',
            value: Number(productData.price * quantity).toFixed(2),
            currency: 'EGP',
            content_name: productData.name || 'Book'
          });
        }
      },

      trackPurchase: (orderData, totalAmount, products = get().ProductData, userData = {}, externalEventID = null) => {
        if (window.fbq && orderData) {
          if (!window.trackedOrders) {
            window.trackedOrders = new Set();
          }

          const eventID = externalEventID || 'order_' + new Date().getTime() + '_' + Math.round(Math.random() * 1000).toString(36).substr(2, 9);

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
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cartIds: state.cartIds }), // Only persist cartIds
    }
  )
);
