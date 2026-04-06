export const contrallSpipping = (shippingList, governorate, center, area) => {
    if (!Array.isArray(shippingList) || shippingList.length === 0 || !governorate) {
        return null
    }

    const filteredShipping = shippingList.find(
        shipping => shipping.governorate === governorate
    )

    if (!filteredShipping) {
        return null
    }

    const fallbackResult = {
        cost: Number(filteredShipping.shipping_cost) || 0,
        duration: filteredShipping.delivery_duration || ''
    }

    if (!center) {
        return fallbackResult
    }

    const filteredCenter = filteredShipping.centers?.find(
        item => item?.name === center
    )

    if (!filteredCenter || !area || !Array.isArray(filteredCenter.areas)) {
        return fallbackResult
    }

    const filteredArea = filteredCenter.areas.find(
        item => item?.name === area
    )

    if (!filteredArea || filteredArea.shipping_cost === null || filteredArea.shipping_cost === undefined) {
        return fallbackResult
    }

    return {
        cost: Number(filteredArea.shipping_cost) || 0,
        duration: filteredArea.delivery_duration || fallbackResult.duration
    }
}
