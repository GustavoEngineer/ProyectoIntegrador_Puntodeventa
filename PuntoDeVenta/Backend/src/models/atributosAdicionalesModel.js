const supabase = require('../config/supabase');

const AtributosAdicionales = {
    getAll: async () => {
        const { data, error } = await supabase.from('AtributosAdicionales').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('AtributosAdicionales').select('*').eq('Id_Atributo', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Nombre } = item;
        const { data, error } = await supabase.from('AtributosAdicionales').insert([{ Nombre }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Nombre } = item;
        const { data, error } = await supabase.from('AtributosAdicionales').update({ Nombre }).eq('Id_Atributo', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('AtributosAdicionales').delete().eq('Id_Atributo', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = AtributosAdicionales;
