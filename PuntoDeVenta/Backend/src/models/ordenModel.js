const supabase = require('../config/supabase');

const Orden = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('Orden')
            .select(`
                *,
                Usuario:Usuario(Correo),
                Estado:EstadoOrden(Descripcion)
            `)
            .order('Fecha', { ascending: false });

        if (error) throw error;

        return data.map(o => ({
            ...o,
            UsuarioCorreo: o.Usuario?.Correo,
            Estado: o.Estado?.Descripcion
        }));
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('Orden')
            .select(`
                *,
                Usuario:Usuario(Correo),
                Estado:EstadoOrden(Descripcion),
                Detalles:DetalleOrden(
                    Id_Detalle,
                    Cantidad,
                    PrecioUnitario,
                    Id_Pieza,
                    Pieza:Pieza(Nombre)
                )
            `)
            .eq('Id_Orden', id)
            .single();

        if (error) throw error;

        // Map details to match original structure
        const Detalles = data.Detalles.map(d => ({
            Id_Detalle: d.Id_Detalle,
            Cantidad: d.Cantidad,
            PrecioUnitario: d.PrecioUnitario,
            Id_Pieza: d.Id_Pieza,
            NombrePieza: d.Pieza?.Nombre
        }));

        return {
            ...data,
            UsuarioCorreo: data.Usuario?.Correo,
            Estado: data.Estado?.Descripcion,
            Detalles
        };
    },

    create: async (ordenData) => {
        const { Id_Usuario, Id_EstadoOrden, Total, Detalles } = ordenData;

        // 1. Create Order
        const { data: orden, error: ordenError } = await supabase
            .from('Orden')
            .insert([{ Id_Usuario, Id_EstadoOrden, Total }])
            .select()
            .single();

        if (ordenError) throw ordenError;

        const newOrdenId = orden.Id_Orden;

        // 2. Create Details
        if (Detalles && Detalles.length > 0) {
            const detallesToInsert = Detalles.map(d => ({
                Id_Orden: newOrdenId,
                Id_Pieza: d.Id_Pieza,
                Cantidad: d.Cantidad,
                PrecioUnitario: d.PrecioUnitario
            }));

            const { error: detallesError } = await supabase
                .from('DetalleOrden')
                .insert(detallesToInsert);

            if (detallesError) {
                // Try to rollback order (best effort)
                await supabase.from('Orden').delete().eq('Id_Orden', newOrdenId);
                throw detallesError;
            }
        }

        return { Id_Orden: newOrdenId, ...ordenData };
    }
};

module.exports = Orden;
