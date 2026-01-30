const supabase = require('../config/supabase');

const TipoPieza = {
    getAll: async () => {
        const { data, error } = await supabase.from('TipoPieza').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('TipoPieza').select('*').eq('Id_TipoPieza', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('TipoPieza').insert([{ Descripcion }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('TipoPieza').update({ Descripcion }).eq('Id_TipoPieza', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('TipoPieza').delete().eq('Id_TipoPieza', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = TipoPieza;
