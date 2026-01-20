const supabase = require('../config/supabase');

const EstadoOrden = {
    getAll: async () => {
        const { data, error } = await supabase.from('EstadoOrden').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('EstadoOrden').select('*').eq('Id_EstadoOrden', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('EstadoOrden').insert([{ Descripcion }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('EstadoOrden').update({ Descripcion }).eq('Id_EstadoOrden', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('EstadoOrden').delete().eq('Id_EstadoOrden', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = EstadoOrden;
