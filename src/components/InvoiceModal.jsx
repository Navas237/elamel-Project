import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import logoSrc from "../images/logo_transparent_fixed.png";

const InvoiceModal = forwardRef(({ order, time }, ref) => {
    const invoiceRef = useRef(null);
    const [logoBase64, setLogoBase64] = useState(null);

    
    useEffect(() => {
        const convertToBase64 = async () => {
            try {
                const response = await fetch(logoSrc);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setLogoBase64(reader.result);
                };
                reader.readAsDataURL(blob);
            } catch (err) {
                console.error('Logo conversion error:', err);
            }
        };
        convertToBase64();
    }, []);

    const calculateTotalBeforeDis = (items) => {
        return items?.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0) || 0;
    };

    const calculateDelivery = (deliver) => {
        if (!deliver) return 0;
        if (typeof deliver === 'string' && deliver.includes("=")) {
            const partes = deliver.split("=");
            return Number(partes[1] ? partes[1].trim() : "0");
        }
        return Number(deliver);
    };

    useImperativeHandle(ref, () => ({
        generateInvoiceImage: async () => {
            if (invoiceRef.current) {
                try {
                   
                    await document.fonts.ready;

                    return await toPng(invoiceRef.current, {
                        cacheBust: true,
                        backgroundColor: "#ffffff",
                        pixelRatio: 2,
                        skipFonts: true, // Skip external font embedding to avoid CORS
                        style: {
                            fontFamily: 'Tajawal, Arial, sans-serif'
                        }
                    });
                } catch (err) {
                    console.error('Invoice image generation error:', err);
                    return null;
                }
            }
            return null;
        }
    }));

    if (!order) return null;

    const totalBeforeDis = calculateTotalBeforeDis(order.cart_items);
    const discount = order.discount || 0;
    const totalAfterDis = totalBeforeDis - discount;
    const delivery = calculateDelivery(order.Deliver);
    const totalInAll = order.totalAfter_deliver || order.net || (totalAfterDis + delivery);

    const fontStyle = {
        fontFamily: 'Tajawal, Arial, sans-serif'
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1
        }}>
            <div
                ref={invoiceRef}
                className="bg-white shadow-sm border border-gray-100 p-8 rounded-lg text-right"
                dir="rtl"
                style={{ width: "400px", margin: "0 auto", ...fontStyle }}
            >

                <div className="text-center flex justify-center items-center mb-1 h-[170px]">
                    {logoBase64 ? (
                        <img src={logoBase64} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <img src={logoSrc} alt="Logo" className="w-full h-full object-cover" />
                    )}
                </div>

                <div className="mb-6 space-y-1 border-b border-gray-100 pb-4" style={fontStyle}>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-700">العميل</span>
                        <span className="text-gray-600">{order.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-700">رقم العميل</span>
                        <span className="text-gray-600" dir="ltr">{order.phone}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm mt-1">
                        <span className="font-bold text-gray-700 shrink-0">العنوان</span>
                        <span className="text-gray-600 mr-2 text-left">{order.address}</span>
                    </div>
                </div>

                <table className="w-full text-sm mb-6" style={fontStyle}>
                    <thead>
                        <tr className="border-b-2 border-gray-100 text-gray-500">
                            <th className="pb-2 px-2 text-right">الصنف</th>
                            <th className="pb-2 px-2 text-center">السعر</th>
                            <th className="pb-2 px-2 text-center">الكمية</th>
                            <th className="pb-2 px-2 text-center">المجموع</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {order.cart_items?.map((item, idx) => (
                            <tr key={idx} className="text-gray-600">
                                <td className="py-2  text-right">{`${item.company || ''} ${item.name}`}</td>
                                <td className="py-2 text-center">{item.price}</td>
                                <td className="py-2 text-center">{item.quantity}</td>
                                <td className="py-2 text-center">{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="space-y-2 border-t-2 border-gray-100 pt-4" style={fontStyle}>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                        <span>الإجمالي قبل الخصم</span>
                        <span>{totalBeforeDis} جنيه</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-orange-600 font-bold">
                        <span>قيمة الخصم</span>
                        <span>-{discount} جنيه</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                        <span>الإجمالي بعد الخصم</span>
                        <span>{totalAfterDis} جنيه</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                        <span>مصاريف الشحن</span>
                        <span>{delivery} جنيه</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-black text-green-600 pt-2 border-t border-gray-50">
                        <span>الاجمالي النهائي</span>
                        <span>{totalInAll} جنيه</span>
                    </div>
                </div>

                <div className="mt-8 text-center" style={fontStyle}>
                    <p className="text-[18px] font-bold text-gray-400">🚚 {time}</p>
                </div>
            </div>
        </div>
    );

});

export default InvoiceModal;

