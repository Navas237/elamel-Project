import {useQuery} from "@tanstack/react-query"
import { supabase } from "../services/SupabaseClient"


  export const useShipping = () => {
    return useQuery({
        queryKey : ["shipping"],
            queryFn : async () => {
            const { data, error } = await supabase
                .from('shipping')
                .select('*')

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
 };