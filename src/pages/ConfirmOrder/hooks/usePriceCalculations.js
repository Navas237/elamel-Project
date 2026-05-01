import { useState, useEffect, useMemo } from 'react';
import { calculateDiscountData, calculateTotalPriceAfterDiscount } from '../../../utils/discountUtils';
import { useIncreasingWeight } from '../../../hooks/useIncreasingWeight';

export default function usePriceCalculations(ProductData, offersList, selectedCenter) {
    const [increasWight, setIncreasWight] = useState('');
    const { calculateIncreaseWeight, weightRules } = useIncreasingWeight();

    const totalPrice = useMemo(() => {
        return ProductData?.reduce((a, b) => {
            const total = b.price * b.quantity;
            return total + a;
        }, 0) || 0;
    }, [ProductData]);

    const appliedCouponCode = useMemo(() => localStorage.getItem('appliedCouponCode') || '', []);

    const discountData = useMemo(
        () => calculateDiscountData(offersList, ProductData, totalPrice, appliedCouponCode),
        [offersList, ProductData, totalPrice, appliedCouponCode]
    );

    const totalPriceAfterDicount = () => {
        return calculateTotalPriceAfterDiscount(totalPrice, discountData.amount, true);
    };

    const increasWightt = (val) => {
        const check = val !== undefined ? val : selectedCenter;
        const fee = calculateIncreaseWeight(totalPriceAfterDicount(), check);
        setIncreasWight(fee);
    };

    useEffect(() => {
        increasWightt();
    }, [totalPrice, selectedCenter, weightRules]);

    return {
        increasWight, setIncreasWight,
        increasWightt,
        totalPrice,
        discountData,
        totalPriceAfterDicount
    };
}
