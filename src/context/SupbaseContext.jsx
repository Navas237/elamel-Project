import { Children, createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { supabase } from "../services/SupabaseClient";


export const supbasecontext = createContext()

export const DisplayProdectProvider = ({ children }) => {

  const [prodects, setprodect] = useState([])
  const [prodectsSerch, setprodectSerch] = useState([])
  const [prodectsError, setprodectError] = useState(null)
  const [prodectsLoading, setprodectLoading] = useState(false)
  const [headerImages, setHeaderImages] = useState([])
  const [offersList, setOffersList] = useState([])
  const [shippingList, setShippingList] = useState([])
  const [catergoryList, setCatergoryList] = useState([])
  const [headerLoading, setHeaderLoading] = useState(false)
  const [headerError, setHeaderError] = useState(null)
  const [areHeaderImagesReady, setAreHeaderImagesReady] = useState(false)

  useEffect(() => {
    getOffers()
    getSpipping()

  }, [])

  const Displayprodect = useCallback(async (level, level2) => {
    if (!level || !level2) return;


    try {

      setprodectLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', level)
        .eq('level', level2)
        .order("index", { ascending: true })


      if (error) {
        setprodectError(error)

      } else {
        setprodect(data)


      }

    } catch (error) {




    } finally {
      setprodectLoading(false)
    }






  }, [])

  const serchplayprodect = useCallback(async (force = false) => {
    



    try {

      setprodectLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')



      if (error) {
        setprodectError(error)

      } else {
        setprodectSerch(data)


      }

    } catch (error) {


    } finally {
      setprodectLoading(false)
    }






  }, [])

  const updateProduct = useCallback(async (id, quantity) => {

    try {

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      //  console.log(data);



      const newStock = data.stoke - quantity;


      const { data: updated, error: updateError } = await supabase
        .from("products")
        .update({ stoke: newStock })
        .eq("id", id)
        .select();

      if (updateError) throw updateError;

      //  console.log("✅ Updated successfully:", updated);
      return updated;

    } catch (err) {
      console.error("❌ Error updating products:", err.message);
    }
  }, []);


  const getImgHeader = useCallback(async () => {
    try {
      setHeaderLoading(true);
      setAreHeaderImagesReady(false);
      const { data, error } = await supabase
        .from('ImhHeader')
        .select('*');

      if (error) {
        setHeaderError(error.message);
        setAreHeaderImagesReady(true);
      } else {
        // Optimize URLs
        const optimizedData = data.map(img => ({
          ...img,
          imgUrl: `https://wsrv.nl/?url=${encodeURIComponent(img.imgUrl)}&w=1200&output=webp&q=80`
        }));
        setHeaderImages(optimizedData);

        // Preload images
        if (optimizedData.length === 0) {
          setAreHeaderImagesReady(true);
          return;
        }

        let loadedCount = 0;
        optimizedData.forEach(img => {
          const image = new Image();
          image.src = img.imgUrl;
          image.onload = () => {
            loadedCount++;
            if (loadedCount === optimizedData.length) {
              setAreHeaderImagesReady(true);
            }
          };
          image.onerror = () => {
            loadedCount++;
            if (loadedCount === optimizedData.length) {
              setAreHeaderImagesReady(true);
            }
          };
        });
      }
    } catch (error) {
      setHeaderError(error.message);
      setAreHeaderImagesReady(true);
    } finally {
      setHeaderLoading(false);
    }
  }, [])

  const getOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('status', 'نشط')
        .order('created_at', { ascending: false });

      if (error) {
        console.log("getOffers Error:", error);
      } else {
        setOffersList(data || []);
      }
    } catch (error) {
      console.log("getOffers Exception:", error?.message);
    }
  };

  const getSpipping = async () => {
    try {
      const { data, error } = await supabase
        .from('shipping')
        .select('*')


      if (error) {
        console.log("getOffers Error:", error);
      } else {
        // console.log('done');

        setShippingList(data || []);
      }
    } catch (error) {
      console.log("getOffers Exception:", error?.message);
    }
  };


  const getCatergory = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')


      if (error) {
        console.log("getOffers Error:", error);
      } else {
        // console.log('done');

        setCatergoryList(data || []);
      }
    } catch (error) {
      console.log("getOffers Exception:", error?.message);
    }
  };



  return <supbasecontext.Provider value={{
    prodects,
    prodectsSerch,
    Displayprodect,
    updateProduct,
    serchplayprodect,
    prodectsError,
    prodectsLoading,
    headerImages,
    getImgHeader,
    headerLoading,
    headerError,
    areHeaderImagesReady,
    getOffers,
    offersList,
    shippingList,
    getSpipping, 
    catergoryList,
    getCatergory
  }} >

    {children}
  </supbasecontext.Provider>
}