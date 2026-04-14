import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';

export const useProducts = (level, level2) => {
  return useQuery({
    queryKey: ['products', level, level2],
    queryFn: async () => {
      // إيقاف التنفيذ إذا لم يتم تمرير المعاملات
      if (!level || !level2) return [];

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', level)
        .eq('level', level2)
        .order("index", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!level && !!level2,
    staleTime: 5 * 60 * 1000,
  });
};