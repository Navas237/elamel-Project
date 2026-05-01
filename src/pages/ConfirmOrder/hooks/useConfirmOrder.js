import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDynamicSchema } from '../../../schemas/ConfirmOrderValidation';

// Import split hooks and utils
import useLocationSelection from './useLocationSelection';
import usePriceCalculations from './usePriceCalculations';
import useOrderSubmit from './useOrderSubmit';
import { normalizeArabicNumbers, customSelectStyles, textFieldStyle } from '../utils/formStylesAndUtils';
import { useCartStore } from '../../../store/useCartStore';
import { useOffer } from '../../../hooks/useOffer';
import { useShipping } from '../../../hooks/useShipping';

export default function useConfirmOrder() {
    const { ProductData, cartIds, setCartIds, trackPurchase, getProductData } = useCartStore();
    const { data: offersList } = useOffer();
    const { data: shippingList } = useShipping();

    // 1. Location Selection & Shipping Logic
    const {
        selectedGovernorate, setSelectedGovernorate,
        selectedCenter, setSelectedCenter,
        selectedArea, setSelectedArea,
        msarefElchange, longOfCharge,
        governorateOptions, centerOptions, areaOptions,
        getShippingDetails
    } = useLocationSelection(shippingList || []);

    const schemaResolver = useMemo(() => zodResolver(getDynamicSchema(areaOptions?.length > 0)), [areaOptions?.length]);

    // 2. Form Initialization & Validation
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: schemaResolver,
        mode: "all",
        defaultValues: {
            name: '',
            phone: '',
            whats: '',
            gover: '',
            center: '',
            mantaq: '',
            address: ''
        }
    });

    // Auto-scroll to first error
    useEffect(() => {
        const firstError = Object.keys(errors)[0];
        if (firstError) {
            const element = document.getElementsByName(firstError)[0] ||
                document.querySelector(`[name="${firstError}"]`) ||
                document.getElementById(firstError);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [errors]);

    // Initial load: Fetch product data if cart has items but data is empty
    useEffect(() => {
        window.scroll({ top: 0 });
        if (ProductData.length === 0 && Object.keys(cartIds).length > 0) {
            getProductData();
        }
    }, [ProductData.length, cartIds, getProductData]);

    // 3. Price, Discount & Weight Calculations
    const {
        increasWight,
        increasWightt,
        totalPrice,
        discountData,
        totalPriceAfterDicount
    } = usePriceCalculations(ProductData, offersList || [], selectedCenter);

    // 4. Order Submission Layer
    const {
        confirmOrderLoading,
        invoiceRef,
        orderForInvoice,
        getformData
    } = useOrderSubmit(
        ProductData,
        cartIds,
        setCartIds,
        trackPurchase,
        selectedGovernorate,
        selectedCenter,
        getShippingDetails,
        msarefElchange,
        increasWight,
        longOfCharge,
        totalPrice,
        totalPriceAfterDicount
    );

    // 5. Expose specific context needed by the UI
    return {
        // Form specific
        register,
        handleSubmit,
        control,
        setValue,
        errors,
        getformData,

        // Utils specific
        normalizeArabicNumbers,
        textFieldStyle,
        customSelectStyles,

        // Location specific
        governorateOptions,
        centerOptions,
        areaOptions,
        selectedGovernorate,
        setSelectedGovernorate,
        selectedCenter,
        setSelectedCenter,
        selectedArea,
        setSelectedArea,

        // Pricing specific
        increasWightt,
        totalPrice,
        discountData,
        totalPriceAfterDicount,
        msarefElchange,
        increasWight,
        longOfCharge,

        // Submit specific
        confirmOrderLoading,
        invoiceRef,
        orderForInvoice
    };
}
