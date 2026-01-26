const supabase = require('../config/supabase');

const Carrito = {
    // Get all items in user's cart
    getByUsuario: async (idUsuario) => {
        const { data, error } = await supabase
            .from('Carrito')
            .select(`
                *,
                Pieza:Id_Pieza (*)
            `)
            .eq('Id_Usuario', idUsuario);

        if (error) throw error;
        return data;
    },

    // Add item to cart or update quantity if exists (upsert logic could differ, but usually we check first)
    // For simplicity, we'll try to insert, if conflict/exists, logic should handle it in controller or here.
    // However, typical flow is check if exists -> update, else insert.
    add: async (idUsuario, idPieza, cantidad, precio) => {
        // First check if it exists
        const { data: existing, error: checkError } = await supabase
            .from('Carrito')
            .select('*')
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .maybeSingle();

        if (checkError) throw checkError;

        if (existing) {
            // Update quantity
            const newQuantity = existing.Cantidad + cantidad;
            const { data, error } = await supabase
                .from('Carrito')
                .update({ Cantidad: newQuantity, PrecioUnitarioEnCarrito: precio }) // Update price too just in case
                .eq('Id_Usuario', idUsuario)
                .eq('Id_Pieza', idPieza)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new
            const { data, error } = await supabase
                .from('Carrito')
                .insert([{
                    Id_Usuario: idUsuario,
                    Id_Pieza: idPieza,
                    Cantidad: cantidad,
                    PrecioUnitarioEnCarrito: precio
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },

    // Update specific item quantity
    update: async (idUsuario, idPieza, cantidad) => {
        const { data, error } = await supabase
            .from('Carrito')
            .update({ Cantidad: cantidad })
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Remove item
    remove: async (idUsuario, idPieza) => {
        const { data, error } = await supabase
            .from('Carrito')
            .delete()
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .select();

        if (error) throw error;
        return data;
    },

    // Clear cart (remove all for user)
    clear: async (idUsuario) => {
        const { data, error } = await supabase
            .from('Carrito')
            .delete()
            .eq('Id_Usuario', idUsuario)
            .select();

        if (error) throw error;
        return data;
    }
};

module.exports = Carrito;
