const supabase = require('../config/supabase');

const CategoriaPieza = {
    getAll: async () => {
        const { data, error } = await supabase.from('CategoriaPieza').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('CategoriaPieza').select('*').eq('Id_CategoriaPieza', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('CategoriaPieza').insert([{ Descripcion }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('CategoriaPieza').update({ Descripcion }).eq('Id_CategoriaPieza', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('CategoriaPieza').delete().eq('Id_CategoriaPieza', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = CategoriaPieza;
