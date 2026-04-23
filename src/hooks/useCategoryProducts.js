import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';

export const useCategoryProducts = (categoryName) => {
  return useQuery({
    queryKey: ['categoryProducts', categoryName],
    queryFn: async () => {
      if (!categoryName) return [];

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryName)
        // You might want to order by created_at or index if available
        .order("index", { ascending: true, nullsFirst: false }); 

      // Fallback order, or ignore index if Some products don't have it.
      // Usually, we can just do .select('*').eq('category', categoryName)

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!categoryName,
    staleTime: 5 * 60 * 1000,
  });
};
