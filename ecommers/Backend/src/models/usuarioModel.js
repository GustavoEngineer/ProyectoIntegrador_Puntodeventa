const supabase = require('../config/supabase');

const Usuario = {
    getAll: async () => {
        const { data, error } = await supabase.from('Usuario').select('*');
        if (error) throw error;
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase.from('Usuario').select('*').eq('Id_Usuario', id).single();
        if (error) throw error;
        return data;
    },

    getByEmail: async (email) => {
        const { data, error } = await supabase.from('Usuario').select('*').eq('Correo', email).single();
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "The result contains 0 rows"
        return data; // returns null if not found (and handled error) or data
    },

    create: async (usuario) => {
        const { Correo, Contraseña, Nombre, A_Paterno, A_Materno, Telefono, Id_TipoUsuario } = usuario;
        const { data, error } = await supabase
            .from('Usuario')
            .insert([{ Correo, Contraseña, Nombre, A_Paterno, A_Materno, Telefono, Id_TipoUsuario }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, usuario) => {
        const { Correo, Contraseña, Nombre, A_Paterno, A_Materno, Telefono, Id_TipoUsuario } = usuario;
        const { data, error } = await supabase
            .from('Usuario')
            .update({ Correo, Contraseña, Nombre, A_Paterno, A_Materno, Telefono, Id_TipoUsuario })
            .eq('Id_Usuario', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { data, error } = await supabase.from('Usuario').delete().eq('Id_Usuario', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = Usuario;
