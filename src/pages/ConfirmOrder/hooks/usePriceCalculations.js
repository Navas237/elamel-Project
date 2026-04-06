import { useState, useEffect, useMemo } from 'react';
import { calculateDiscountData, calculateTotalPriceAfterDiscount } from '../../../utils/discountUtils';

export default function usePriceCalculations(ProductData, offersList, selectedCenter) {
    const [increasWight, setIncreasWight] = useState('');

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
        if (check !== "الزقازيق") {
            if (totalPrice) {
                if (totalPrice < 1800) setIncreasWight(0);
                else if (totalPrice < 2700) setIncreasWight(20);
                else if (totalPrice < 3000) setIncreasWight(25);
                else if (totalPrice < 4000) setIncreasWight(35);
                else if (totalPrice < 5000) setIncreasWight(45);
                else if (totalPrice > 5000) setIncreasWight(totalPrice * 2.3 / 100);
            }
        } else {
            setIncreasWight(0);
        }
    };

    useEffect(() => {
        increasWightt();
    }, [totalPrice, selectedCenter]);

    return {
        increasWight, setIncreasWight,
        increasWightt,
        totalPrice,
        discountData,
        totalPriceAfterDicount
    };
}
