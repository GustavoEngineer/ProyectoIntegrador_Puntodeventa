const supabase = require('../config/supabase');

const Pieza = {
    getAll: async (page = 1, limit = 25, filters = {}) => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('Pieza')
            .select(`
                *,
                Categoria:CategoriaPieza(Descripcion),
                Estado:EstadoPieza(Descripcion),
                Tipo:TipoPieza(Descripcion)
            `, { count: 'exact' });

        if (filters.categoryId) {
            query = query.eq('Id_CategoriaPieza', filters.categoryId);
        }

        // Filter by Compatible Equipment
        if (filters.equipoId) {
            // We use !inner to perform an INNER JOIN, effectively filtering Piezas that have this specific relation
            // However, Supabase syntax for filtering on related tables usually requires structuring the select differently 
            // or using proper embedding filtering.
            // Standard way: .select('*, Pieza_Equipo!inner(Id_EquipoCompatible)') .eq('Pieza_Equipo.Id_EquipoCompatible', id)

            // We must preserve the other relations in the select string
            query = supabase
                .from('Pieza')
                .select(`
                    *,
                    Categoria:CategoriaPieza(Descripcion),
                    Estado:EstadoPieza(Descripcion),
                    Tipo:TipoPieza(Descripcion),
                    Pieza_Equipo!inner(Id_EquipoCompatible)
                `, { count: 'exact' })
                .eq('Pieza_Equipo.Id_EquipoCompatible', filters.equipoId);
        }

        if (filters.searchQuery) {
            query = query.ilike('Nombre', `%${filters.searchQuery}%`);
        }

        const { data, error, count } = await query.range(from, to);

        if (error) throw error;

        // Map to match original flattened structure
        const mappedData = data.map(p => {
            // Remove the extra Pieza_Equipo property from the result object if we want to keep it clean, 
            // though it might not hurt to leave it.
            // But existing frontend expects specific structure.
            const { Pieza_Equipo, ...rest } = p;
            return {
                ...rest,
                Categoria: p.Categoria?.Descripcion,
                Estado: p.Estado?.Descripcion,
                Tipo: p.Tipo?.Descripcion
            };
        });

        return { data: mappedData, count };
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
        const { Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza, CalificacionPromedio } = pieza;
        const { data, error } = await supabase
            .from('Pieza')
            .insert([{ Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza, CalificacionPromedio }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, pieza) => {
        const { Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza, CalificacionPromedio } = pieza;
        const { data, error } = await supabase
            .from('Pieza')
            .update({ Nombre, Descripcion, Garantia, Precio, Cantidad, Id_CategoriaPieza, Id_EstadoPieza, Id_TipoPieza, CalificacionPromedio })
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
