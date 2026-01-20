const supabase = require('../config/supabase');

const EstadoPieza = {
    getAll: async () => {
        const { data, error } = await supabase.from('EstadoPieza').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('EstadoPieza').select('*').eq('Id_EstadoPieza', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('EstadoPieza').insert([{ Descripcion }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Descripcion } = item;
        const { data, error } = await supabase.from('EstadoPieza').update({ Descripcion }).eq('Id_EstadoPieza', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('EstadoPieza').delete().eq('Id_EstadoPieza', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = EstadoPieza;
