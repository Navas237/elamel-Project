import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('products')
        .select("*")
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
