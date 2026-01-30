const supabase = require('../config/supabase');

const ValorAtributo = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('ValorAtributo')
            .select(`
                *,
                Pieza:Pieza(Nombre),
                Atributo:AtributosAdicionales(Nombre)
            `);
        if (error) throw error;

        return data.map(v => ({
            ...v,
            NombrePieza: v.Pieza?.Nombre,
            NombreAtributo: v.Atributo?.Nombre
        }));
    },

    // Get specific value by composite key
    getById: async (idPieza, idAtributo) => {
        const { data, error } = await supabase
            .from('ValorAtributo')
            .select(`
                *,
                Pieza:Pieza(Nombre),
                Atributo:AtributosAdicionales(Nombre)
            `)
            .match({ Id_Pieza: idPieza, Id_Atributo: idAtributo })
            .single();

        if (error) throw error;

        return {
            ...data,
            NombrePieza: data.Pieza?.Nombre,
            NombreAtributo: data.Atributo?.Nombre
        };
    },

    // Get all attributes for a specific piece
    getByPiezaId: async (idPieza) => {
        const { data, error } = await supabase
            .from('ValorAtributo')
            .select(`
                *,
                Atributo:AtributosAdicionales(Nombre)
            `)
            .eq('Id_Pieza', idPieza);

        if (error) throw error;

        return data.map(v => ({
            ...v,
            NombreAtributo: v.Atributo?.Nombre
        }));
    },

    create: async (valorAtributo) => {
        const { Id_Pieza, Id_Atributo, Valor } = valorAtributo;
        const { data, error } = await supabase
            .from('ValorAtributo')
            .insert([{ Id_Pieza, Id_Atributo, Valor }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (idPieza, idAtributo, valorData) => {
        const { Valor } = valorData;
        const { data, error } = await supabase
            .from('ValorAtributo')
            .update({ Valor })
            .match({ Id_Pieza: idPieza, Id_Atributo: idAtributo })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (idPieza, idAtributo) => {
        const { data, error } = await supabase
            .from('ValorAtributo')
            .delete()
            .match({ Id_Pieza: idPieza, Id_Atributo: idAtributo })
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

module.exports = ValorAtributo;
