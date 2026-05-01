import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';


export function useCatagory(){
    return useQuery({
        queryKey : ["catagory"],
        queryFn : async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name,  order, type, slug, grades(id, name, slug, category_id)')
                .order('order', { ascending: true });

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        staleTime: 24 * 60 * 60 * 1000,
    });
}