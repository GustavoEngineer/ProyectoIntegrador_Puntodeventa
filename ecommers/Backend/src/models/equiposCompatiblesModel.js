const supabase = require('../config/supabase');

const EquiposCompatibles = {
    getAll: async () => {
        const { data, error } = await supabase.from('EquiposCompatibles').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id) => {
        const { data, error } = await supabase.from('EquiposCompatibles').select('*').eq('Id_EquipoCompatible', id).single();
        if (error) throw error;
        return data;
    },
    create: async (item) => {
        const { Nombre } = item;
        const { data, error } = await supabase.from('EquiposCompatibles').insert([{ Nombre }]).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id, item) => {
        const { Nombre } = item;
        const { data, error } = await supabase.from('EquiposCompatibles').update({ Nombre }).eq('Id_EquipoCompatible', id).select().single();
        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { data, error } = await supabase.from('EquiposCompatibles').delete().eq('Id_EquipoCompatible', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = EquiposCompatibles;
