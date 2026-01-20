const supabase = require('../config/supabase');

const TipoUsuario = {
    getAll: async () => {
        const { data, error } = await supabase.from('TipoUsuario').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('TipoUsuario').select('*').eq('Id_TipoUsuario', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('TipoUsuario').insert([{ Descripcion }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('TipoUsuario').update({ Descripcion }).eq('Id_TipoUsuario', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('TipoUsuario').delete().eq('Id_TipoUsuario', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = TipoUsuario;
