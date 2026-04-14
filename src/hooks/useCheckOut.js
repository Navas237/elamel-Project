import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { supabase } from '../services/SupabaseClient';
import { useMinimum } from './useMinmum';

export const useCheckOut = ({ cartIds, setCartIds, ProductData, setProductData, totalPriceAfterDicount }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = useCallback(async (e) => {
        e?.preventDefault();
        try {
            setIsCheckingOut(true);
            const allIds = Object.keys(cartIds);

            if (allIds.length === 0) {
                Swal.fire('العربة فارغة', 'يرجى إضافة منتجات إلى العربة أولاً', 'info');
                return;
            }

            // Fetch current stock from Supabase
            const { data, error } = await supabase
                .from('products')
                .select('id, name, stoke')
                .in('id', allIds);

            if (error) throw error;

            // Check minimum order amount using the existing useMinimum function
            const minimum = useMinimum(totalPriceAfterDicount());
            if (!minimum) return;

            // Vulnerability Fix: Validate inventory against the requested quantities
            // Before, it only checked if stoke <= 0. Now it also checks if ordered quantity > stoke
            const outOfStockItems = [];
            const insufficientStockItems = [];

            data.forEach(item => {
                const requestedQuantity = cartIds[item.id];
                if (item.stoke <= 0) {
                    outOfStockItems.push(item);
                } else if (requestedQuantity > item.stoke) {
                    insufficientStockItems.push(item);
                }
            });

            if (outOfStockItems.length > 0 || insufficientStockItems.length > 0) {
                const newCartIds = { ...cartIds };
                
                // Remove items that are completely out of stock
                outOfStockItems.forEach(item => {
                    delete newCartIds[item.id];
                });

                // Adjust quantities for items that don't have enough stock to meet the request
                insufficientStockItems.forEach(item => {
                    newCartIds[item.id] = item.stoke;
                });

                setCartIds(newCartIds);
                localStorage.setItem('cartIdes', JSON.stringify(newCartIds));

                // Update ProductData state to reflect these realistic inventory changes
                const updatedProductCart = ProductData.filter(item =>
                    !outOfStockItems.some(osi => osi.id === item.id)
                ).map(item => {
                    const insufficientItem = insufficientStockItems.find(isi => isi.id === item.id);
                    if (insufficientItem) {
                        return { ...item, quantity: insufficientItem.stoke };
                    }
                    return item;
                });

                setProductData(updatedProductCart);

                // Build a combined warning message for the user based on the scenario
                let alertText = '';
                if (outOfStockItems.length > 0) {
                    const removedNames = outOfStockItems.map(i => i.name).join(' و ');
                    alertText += `تم إزالة (${removedNames}) لأن الكمية نفدت بالكامل من المخزون. \n`;
                }
                if (insufficientStockItems.length > 0) {
                    const adjustedNames = insufficientStockItems.map(i => i.name).join(' و ');
                    alertText += `تم تقليل كمية الدفع لـ (${adjustedNames}) لتناسب أقصى مخزون متاح حالياً.`;
                }

                Swal.fire({
                    title: 'تنبيه بخصوص المخزون المتاح',
                    text: alertText,
                    icon: 'warning',
                    confirmButtonText: 'متابعة وتأكيد الكميات المتوفرة'
                }).then((result) => {
                    if (result.isConfirmed && updatedProductCart.length > 0) {
                        navigate('/confirmorder');
                    }
                });
            } else {
                // If everything is perfectly in stock
                navigate('/confirmorder');
            }

        } catch (err) {
            console.error('Error checking stock:', err);
            Swal.fire('خطأ', 'حدث خطأ أثناء التحقق من المخزون', 'error');
        } finally {
            setIsCheckingOut(false);
        }
    }, [cartIds, setCartIds, ProductData, setProductData, totalPriceAfterDicount, navigate]);

    return { isCheckingOut, handleCheckout };
};
