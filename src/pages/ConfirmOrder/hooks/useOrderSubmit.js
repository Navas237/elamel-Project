import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { supabase } from '../../../services/SupabaseClient';
import { updateProduct } from '../../../services/productService';

export default function useOrderSubmit(
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
) {
    const [confirmOrderLoading, setconfirmOrderLoading] = useState(false);
    const [orderForInvoice, setOrderForInvoice] = useState(null);

    // console.log(increasWight);
    

    const navigate = useNavigate();
    const purchaseTrackedRef = useRef(false);
    const isSubmittingRef = useRef(false);
    const invoiceRef = useRef(null);

    const generateOrderNumber = () => {
        return Math.round(1000000 + Math.random() * 9000000);
    };

    const uploadInvoiceToStorage = async (orderNum, base64Image) => {
        try {
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const fileName = `${orderNum}.png`;

            const { data, error } = await supabase.storage
                .from('invoices')
                .upload(fileName, blob, {
                    contentType: 'image/png',
                    upsert: true
                });

            if (error) {
                console.error('❌ Invoice upload failed:', error);
                return null;
            }
            return data;
        } catch (err) {
            console.error('❌ Invoice upload error:', err);
            return null;
        }
    };

    const generateInvoiceImage = async (orderData) => {
        setOrderForInvoice(orderData);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (invoiceRef.current && orderData.order_num) {
            try {
                const imageData = await invoiceRef.current.generateInvoiceImage();
                if (imageData) {
                    await uploadInvoiceToStorage(orderData.order_num, imageData);
                }
            } catch (err) {
                console.error('❌ Invoice generation error:', err);
            }
        }
    };

    const getformData = async (data) => {
        const shippingDetails = getShippingDetails();
        const shippingCost = Number(shippingDetails.cost) || 0;
        const extraWeight = Math.ceil(Number(increasWight));
        const deliveryDuration = shippingDetails.duration.trim();
        const currentDiscount = Number(totalPrice) - Number(totalPriceAfterDicount());
        const NetTotal = Math.ceil(totalPriceAfterDicount() + shippingCost + Number(increasWight));
        // console.log(NetTotal, 'NetTotal');
        // console.log(shippingCost, 'shippingCost');
        // console.log(totalPriceAfterDicount(), 'total');

        const orderData = {
            ...data,
            totalPrice: totalPrice,
            discount: currentDiscount,
            priceAfterDiscount: Number(totalPriceAfterDicount()),
            shipping: shippingCost,
            extraWeight,
            deliveryDuration,
            net: NetTotal,
            Deliver: Number(increasWight) === 0
                ? `${shippingCost}`
                : `${shippingCost} + ${extraWeight} = ${shippingCost + extraWeight}`
        };

        const { name, phone, address, gover, center, whats, mantaq, Deliver, net, totalPrice: finalTotalPrice, discount: finalDiscount, priceAfterDiscount: finalPriceAfterDiscount } = orderData;
        const locationSuffix = mantaq ? ` - ${mantaq}` : '';
        const fullAddress = `${gover}(${center}${locationSuffix}) - ${address}`;

        const submitOrder = async () => {
            if (isSubmittingRef.current || confirmOrderLoading) return;
            isSubmittingRef.current = true;

            try {
                setconfirmOrderLoading(true);
                const orderNum = generateOrderNumber();

                const { data: insertedData, error } = await supabase
                    .from('orders')
                    .insert([{
                        name, phone, whats, Deliver,
                        address: fullAddress,
                        cart_items: ProductData,
                        created_at: new Date().toISOString(),
                        total_price: finalTotalPrice,
                        discount: finalDiscount,
                        price_dis: finalPriceAfterDiscount,
                        totalAfter_deliver: net,
                        status: 'new',
                        order_num: orderNum
                    }])
                    .select();

                if (error) {
                    console.error("❌ Order insert failed:", error);
                    setconfirmOrderLoading(false);
                    isSubmittingRef.current = false;
                    return;
                }

                for (const order of insertedData) {
                    if (!order.cart_items || !Array.isArray(order.cart_items)) continue;
                    for (const item of order.cart_items) {
                        await updateProduct(item.id, item.quantity);
                    }
                }

                if (!purchaseTrackedRef.current) {
                    trackPurchase(orderData, net, ProductData, {
                        name, phone, gover: selectedGovernorate, center: selectedCenter
                    });
                    purchaseTrackedRef.current = true;
                }

                setCartIds({});

                const savedOrders = JSON.parse(localStorage.getItem("products")) || [];
                savedOrders.push({
                    date: new Date().toLocaleString(),
                    items: ProductData,
                    orderDetils: orderData
                });
                localStorage.setItem("products", JSON.stringify(savedOrders));
                localStorage.setItem('cartIdes', JSON.stringify({}));

                Swal.fire({
                    title: "تمام كدا الأوردر اتسجل",
                    html: deliveryDuration ? `<p class="font-bold">${deliveryDuration}</p> 
                    <p class=""> يرجي ترك الهاتف متاح خلال فتره الشحن</p>` : undefined,
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonText: "طلباتي ",
                    confirmButtonColor: "var(--teal-500)",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/myorder');
                    }
                });

                setconfirmOrderLoading(false);

            } catch (err) {
                console.error("❌ Connection error:", err);
                setconfirmOrderLoading(false);
                isSubmittingRef.current = false;
            }
        };

        if (increasWight > 0) {
            const result = await Swal.fire({
                title: "",
                text: `تم اضافة ${Math.ceil(increasWight)}ج رسوم اضافية نظرا لوزن الاوردر ليصبح الاجمالي ${net} لتأكيد ذلك اضغط "تأكيد"`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--teal-500)",
                cancelButtonColor: "#d33",
                cancelButtonText: "الغاء",
                confirmButtonText: "تاكيد"
            });

            if (result.isConfirmed) {
                await submitOrder();
            }
        } else {
            await submitOrder();
        }
    };

    return {
        confirmOrderLoading,
        invoiceRef,
        orderForInvoice,
        getformData
    };
}
