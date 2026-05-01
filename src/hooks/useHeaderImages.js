import { useQuery } from "@tanstack/react-query"; 
import { supabase } from "../services/SupabaseClient";


export const useHeaderImages = () => {
    return useQuery({
        queryKey : ["headerImages"],
            queryFn : async () => {
            const { data, error } = await supabase
                .from('ImhHeader')
                .select('id, imgUrl')

            if (error) {
                throw new Error(error.message);
            }

            // Optimize URLs
            return data.map(img => ({
                ...img,
                imgUrl: `https://wsrv.nl/?url=${encodeURIComponent(img.imgUrl)}&w=1500&output=webp&q=100`
            }));
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    });
 };

 