const supabase = require('../config/supabase');

const Resena = {
    // Get all reviews for a specific piece (product)
    getByPieza: async (idPieza) => {
        const { data, error } = await supabase
            .from('Reseña')
            .select(`
                *,
                Usuario:Id_Usuario (Nombre, Correo)
            `)
            .eq('Id_Pieza', idPieza)
            .order('Fecha', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get all reviews written by a specific user
    getByUsuario: async (idUsuario) => {
        const { data, error } = await supabase
            .from('Reseña')
            .select(`
                *,
                Pieza:Id_Pieza (Nombre, Descripcion)
            `)
            .eq('Id_Usuario', idUsuario)
            .order('Fecha', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create a new review
    create: async (resena) => {
        const { Id_Usuario, Id_Pieza, Calificacion, Comentario } = resena;

        // Supabase will enforce the PRIMARY KEY constraint (Id_Usuario, Id_Pieza)
        // implying a user can only review a product once.
        const { data, error } = await supabase
            .from('Reseña')
            .insert([{
                Id_Usuario,
                Id_Pieza,
                Calificacion,
                Comentario
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update an existing review
    update: async (idUsuario, idPieza, updateData) => {
        const { Calificacion, Comentario } = updateData;
        const { data, error } = await supabase
            .from('Reseña')
            .update({
                Calificacion,
                Comentario,
                Fecha: new Date().toISOString() // Update timestamp on edit? Or keep original? usually keep original, but maybe update is better. SQL default is NOW() on insert.
            })
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete a review
    delete: async (idUsuario, idPieza) => {
        const { data, error } = await supabase
            .from('Reseña')
            .delete()
            .eq('Id_Usuario', idUsuario)
            .eq('Id_Pieza', idPieza)
            .select();

        if (error) throw error;
        return data;
    },

};

module.exports = Resena;
