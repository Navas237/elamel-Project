import {useQuery} from "@tanstack/react-query"
import { supabase } from "../services/SupabaseClient"


export const useOffer = () => {
    return useQuery({
        queryKey : ["offer"],
            queryFn : async () => {
            const { data, error } = await supabase
                .from('offers')
                .select('*')
                .eq('status', 'نشط')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        staleTime: 5 * 60 * 1000,
    });
 };