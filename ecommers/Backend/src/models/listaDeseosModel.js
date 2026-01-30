const supabase = require('../config/supabase');

const ListaDeseos = {
    getAllByUsuario: async (idUsuario) => {
        // Fetch wishlist items and join with Pieza to get details
        const { data, error } = await supabase
            .from('ListaDeseos')
            .select(`
                *,
                Pieza:Id_Pieza (*)
            `)
            .eq('Id_Usuario', idUsuario);

        if (error) throw error;
        return data;
    },

    add: async (idUsuario, idPieza) => {
        const { data, error } = await supabase
            .from('ListaDeseos')
            .insert([{ Id_Usuario: idUsuario, Id_Pieza: idPieza }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    remove: async (idUsuario, idPieza) => {
        const { data, error } = await supabase
            .from('ListaDeseos')
            .delete()
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .select() // Optional: return deleted item
            .maybeSingle(); // Use maybeSingle in case it's already gone or multiple (shouldn't be multiple due to PK)

        if (error) throw error;
        return data;
    },

    removeAll: async (idUsuario) => {
        const { data, error } = await supabase
            .from('ListaDeseos')
            .delete()
            .eq('Id_Usuario', idUsuario)
            .select();

        if (error) throw error;
        return data;
    },

    check: async (idUsuario, idPieza) => {
        const { data, error } = await supabase
            .from('ListaDeseos')
            .select('*')
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .maybeSingle();

        if (error) throw error;
        return data; // Returns object if found, null if not
    }
};

module.exports = ListaDeseos;
