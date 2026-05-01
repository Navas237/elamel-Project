import {useQuery} from "@tanstack/react-query"
import { supabase } from "../services/SupabaseClient"


  export const useShipping = () => {
    return useQuery({
        queryKey : ["shipping"],
            queryFn : async () => {
            const { data, error } = await supabase
                .from('shipping')
                .select('id, governorate, shipping_cost, delivery_duration, centers')

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        staleTime: 24 * 60 * 60 * 1000,
        retry: 2,
    });
 };