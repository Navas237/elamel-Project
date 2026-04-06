export const calculateDiscountData = (offersList, ProductData, totalPrice, appliedCouponCode = '') => {
    if (!offersList || offersList.length === 0 || !ProductData || ProductData.length === 0) {
        return { amount: 0, percentage: 0, itemPercentages: {}, itemHiddenPercentages: {}, activeOfferIds: [] };
    }

    // 1. Filter active offers and calculate eligible total for each to check minimum purchase
    const validOffers = [];
    const validCoupons = [];
    for (const offer of offersList) {
        if (offer.status !== 'نشط') continue;
        if (offer.offer_type !== 'discount' && offer.offer_type !== 'coupon') continue;

        let eligibleTotal = 0;
        let isEligible = (item) => false;

        if (offer.target_type === 'all') {
            eligibleTotal = totalPrice;
            isEligible = (item) => true;
        } else if (offer.target_type === 'year') {
            const allowedYears = offer.target_value ? offer.target_value.split(' و ') : [];
            isEligible = (item) => allowedYears.includes(`${item.category}_${item.level}`);
            ProductData.forEach(item => {
                if (isEligible(item)) eligibleTotal += (item.price * item.quantity);
            });
        } else if (offer.target_type === 'category') {
            const allowedCats = offer.category ? offer.category.split(' و ') : [];
            isEligible = (item) => allowedCats.includes(item.category);
            ProductData.forEach(item => {
                if (isEligible(item)) eligibleTotal += (item.price * item.quantity);
            });
        } else if (offer.target_type === 'product') {
            // Support for single product specific discount
            isEligible = (item) => String(offer.target_value) === String(item.id);
            ProductData.forEach(item => {
                if (isEligible(item)) eligibleTotal += (item.price * item.quantity);
            });
        }

        // If the offer matches the minimum purchase requirement, it's valid
        if (!offer.min_purchase || eligibleTotal >= offer.min_purchase) {
            if (offer.offer_type === 'discount') {
                validOffers.push({ ...offer, isEligible });
            } else if (offer.offer_type === 'coupon' && appliedCouponCode && offer.coupon_code === appliedCouponCode) {
                validCoupons.push({ ...offer, isEligible });
            }
        }
    }

    // 2. For each product in cart, find highest discount percentage from valid offers
    let totalDiscountAmount = 0;
    let totalCouponAmount = 0;
    const itemPercentages = {};
    const itemHiddenPercentages = {};
    const activeOfferIds = new Set();

    ProductData.forEach(item => {
        let maxPercentageForItem = 0;
        let appliedOffer = null;

        for (const offer of validOffers) {
            if (offer.isEligible(item)) {
                const discountVal = Number(offer.discount_value) || 0;
                if (discountVal > maxPercentageForItem) {
                    maxPercentageForItem = discountVal;
                    appliedOffer = offer;
                }
            }
        }

        let maxCouponPercentage = 0;
        let appliedCoupon = null;

        for (const coupon of validCoupons) {
            if (coupon.isEligible(item)) {
                const discountVal = Number(coupon.discount_value) || 0;
                if (discountVal > maxCouponPercentage) {
                    maxCouponPercentage = discountVal;
                    appliedCoupon = coupon;
                }
            }
        }

        if (appliedOffer && maxPercentageForItem > 0) {
            activeOfferIds.add(appliedOffer.id);
        }
        if (appliedCoupon && maxCouponPercentage > 0) {
            activeOfferIds.add(appliedCoupon.id);
        }

        itemPercentages[item.id] = maxPercentageForItem + maxCouponPercentage;
        itemHiddenPercentages[item.id] = (appliedOffer && appliedOffer.hidden === true) || (appliedCoupon && appliedCoupon.hidden === true);

        const itemDiscount = (item.price * item.quantity) * (maxPercentageForItem / 100);
        const itemCouponDiscount = (item.price * item.quantity) * (maxCouponPercentage / 100);

        totalDiscountAmount += Math.round(itemDiscount);
        totalCouponAmount += Math.round(itemCouponDiscount);
    });

    const totalAmountCombined = totalDiscountAmount + totalCouponAmount;
    const overallPercentage = totalPrice > 0 ? ((totalAmountCombined / totalPrice) * 100) : 0;

    return {
        amount: totalAmountCombined,
        percentage: overallPercentage.toFixed(0),
        itemPercentages: itemPercentages,
        itemHiddenPercentages: itemHiddenPercentages,
        activeOfferIds: Array.from(activeOfferIds)
    };
};

export const calculateTotalPriceAfterDiscount = (totalPrice, discountAmount, useRounding = false) => {
    let finalAmount = Number(totalPrice) - Number(discountAmount);
    return useRounding ? Math.round(finalAmount) : finalAmount;
};

// helper to calculate highest discount for a single product based on offers list
export function getItemDiscount(item, offersList) {
    if (!offersList || !item) return { percentage: 0, amount: 0 };

    let maxPerc = 0;

    for (const offer of offersList) {
        if (offer.status !== 'نشط') continue;
        if (offer.offer_type !== 'discount') continue;

        let eligible = false;
        if (offer.target_type === 'all') {
            eligible = true;
        } else if (offer.target_type === 'year') {
            const allowedYears = offer.target_value ? offer.target_value.split(' و ') : [];
            eligible = allowedYears.includes(`${item.category}_${item.level}`);
        } else if (offer.target_type === 'category') {
            const allowedCats = offer.category ? offer.category.split(' و ') : [];
            eligible = allowedCats.includes(item.category);
        } else if (offer.target_type === 'product') {
            eligible = String(offer.target_value) === String(item.id);
        }

        if (!eligible) continue;

        const eligibleTotal = (item.price || 0) * (item.quantity || 1);
        // Ignore min_purchase for single item preview as they might add more items later
        // if (offer.min_purchase && eligibleTotal < offer.min_purchase) continue;

        const perc = Number(offer.discount_value) || 0;
        if (perc > maxPerc) maxPerc = perc;
    }

    const amount = Math.ceil((item.price || 0) * (maxPerc / 100));
    return { percentage: maxPerc, amount };
}
