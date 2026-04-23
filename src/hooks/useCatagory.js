import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';


export function useCatagory(){
    return useQuery({
        queryKey : ["catagory"],
        queryFn : async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                // .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}