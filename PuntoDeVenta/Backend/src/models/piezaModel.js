const supabase = require('../config/supabase');

const Pieza = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('Pieza')
            .select(`
                *,
                Categoria:CategoriaPieza(Descripcion),
                Estado:EstadoPieza(Descripcion),
                Tipo:TipoPieza(Descripcion)
            `);

        if (error) throw error;

        // Map to match original flattened structure
        return data.map(p => ({
            ...p,
            Categoria: p.Categoria?.Descripcion,
            Estado: p.Estado?.Descripcion,
            Tipo: p.Tipo?.Descripcion
        }));
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('Pieza')
            .select(`
                *,
                Categoria:CategoriaPieza(Descripcion),
                Estado:EstadoPieza(Descripcion),
                Tipo:TipoPieza(Descripcion)
            `)
            .eq('Id_Pieza', id)
            .single();

        if (error) throw error;

        return {
            ...data,
            Categoria: data.Categoria?.Descripcion,
            Estado: data.Estado?.Descripcion,
            Tipo: data.Tipo?.Descripcion
        };
    },

    create: async (pieza) => {
        const { Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza } = pieza;
        const { data, error } = await supabase
            .from('Pieza')
            .insert([{ Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, pieza) => {
        const { Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza } = pieza;
        const { data, error } = await supabase
            .from('Pieza')
            .update({ Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza })
            .eq('Id_Pieza', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { data, error } = await supabase.from('Pieza').delete().eq('Id_Pieza', id).select().single();
        if (error) throw error;
        return data;
    }
};

module.exports = Pieza;
