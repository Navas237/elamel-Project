import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/SupabaseClient';

export const useIncreasingWeight = () => {
  const { data: weightRules, isLoading, isError } = useQuery({
    queryKey: ['increasingWeight'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('increasingWeight')
        .select('min_price, weight_percentage , type')
        // Sort descending so the highest min_price is checked first
        .order('min_price', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    retry: 1, // Retry once if connection fails
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const calculateIncreaseWeight = (totalPrice, selectedCenter) => {
    // If location is Zagazig, no extra weight fee
    if (selectedCenter === "الزقازيق") {
      return 0;
    }

    if (!weightRules || weightRules.length === 0 || !totalPrice || totalPrice <= 0) {
      return 0;
    }

    // Find rules based on totalPrice thresholds
    const applicableRule = weightRules.find(rule => totalPrice >= rule.min_price && rule.type === "percentage");
    const valueIncrease = weightRules.find(rule => totalPrice >= rule.min_price && rule.type !== "percentage");
  
    let totalIncrease = 0;
    
    if (applicableRule) {
      const rulePriceApplyIncrease = totalPrice - applicableRule.min_price;
      totalIncrease += (rulePriceApplyIncrease * applicableRule.weight_percentage) / 100;
    }
    
    if (valueIncrease) {
      totalIncrease += valueIncrease.weight_percentage;
    }

    return totalIncrease;
  };

  return { calculateIncreaseWeight, isLoading, weightRules };
};
