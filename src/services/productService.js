import { supabase } from "./SupabaseClient";

/**
 * Updates product stock in the database.
 * NOTE: This is currently called sequentially for each item in an order.
 * @param {string} id - Product ID
 * @param {number} quantity - Quantity to subtract from stock
 */
export const updateProduct = async (id, quantity) => {
    try {
        const { data: currentProduct, error: fetchError } = await supabase
            .from('products')
            .select('stoke')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const newStock = (currentProduct?.stoke || 0) - quantity;

        const { error: updateError } = await supabase
            .from('products')
            .update({ stoke: newStock })
            .eq('id', id);

        if (updateError) throw updateError;

        return { success: true };
    } catch (error) {
        console.error('Error updating product stock:', error);
        return { success: false, error };
    }
};
