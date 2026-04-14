import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';
import { useDebounce } from 'use-debounce';
import { normalizeArabic } from '../utiles/arabicNormalization'; 

export const useSearchProducts = (searchTerm) => {
  const [debouncedSearch] = useDebounce(searchTerm, 400);

  return useQuery({
    queryKey: ['searchProducts', debouncedSearch],
    queryFn: async () => {
      const cleanSearchTerm = normalizeArabic(debouncedSearch);

      const { data, error } = await supabase
        .from('products')
        .select('id, name, company, level, stuts, price') 
        .ilike('normalized_search_text', `%${cleanSearchTerm}%`)
        .limit(20);

      if (error) {
        console.error("Supabase Search Error:", error.message);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!debouncedSearch && debouncedSearch.trim() !== '',
    staleTime: 2 * 60 * 1000,
  });
};
