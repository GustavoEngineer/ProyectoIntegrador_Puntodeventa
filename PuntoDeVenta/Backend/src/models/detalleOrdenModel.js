const supabase = require('../config/supabase');

const DetalleOrden = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('DetalleOrden')
            .select(`
                *,
                Orden:Orden(Id_Orden),
                Pieza:Pieza(Nombre)
            `);
        if (error) throw error;

        return data.map(d => ({
            ...d,
            NombrePieza: d.Pieza?.Nombre
        }));
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('DetalleOrden')
            .select(`
                *,
                Orden:Orden(Id_Orden),
                Pieza:Pieza(Nombre)
            `)
            .eq('Id_Detalle', id)
            .single();

        if (error) throw error;

        return {
            ...data,
            NombrePieza: data.Pieza?.Nombre
        };
    },

    create: async (detalle) => {
        let { Cantidad, PrecioUnitario, Id_Orden, Id_Pieza } = detalle;

        // 1. Fetch Price if not provided
        if (!PrecioUnitario) {
            const { data: piezaData, error: piezaError } = await supabase
                .from('Pieza')
                .select('Precio')
                .eq('Id_Pieza', Id_Pieza)
                .single();

            if (piezaError) throw piezaError;
            PrecioUnitario = piezaData.Precio;
        }

        // 2. Insert Detail
        const { data, error } = await supabase
            .from('DetalleOrden')
            .insert([{ Cantidad, PrecioUnitario, Id_Orden, Id_Pieza }])
            .select()
            .single();

        if (error) throw error;

        // 3. Update Order Total
        await DetalleOrden.updateOrdenTotal(Id_Orden);

        return data;
    },

    update: async (id, detalle) => {
        let { Cantidad, PrecioUnitario, Id_Orden, Id_Pieza } = detalle;

        // 1. If Id_Pieza is changing, update Price (optional logic, usually price locks in)
        // For now, let's respect provided Price if any, otherwise check if Pieza changed
        // But if simple quantity update, keep old price unless specified? 
        // User asked: "when *creating* order... put id... automatically looks for price"
        // User also asked: "when *updating* detail order, update total"
        // Let's assume if they pass Id_Pieza they might want new price, but let's stick to basics:
        // Recalculate total is the key requirement for update.

        const { data, error } = await supabase
            .from('DetalleOrden')
            .update({ Cantidad, PrecioUnitario, Id_Orden, Id_Pieza })
            .eq('Id_Detalle', id)
            .select()
            .single();

        if (error) throw error;

        // 3. Update Order Total (Note: if Id_Orden changed, we might need to update OLD and NEW order totals, 
        // but that's an edge case. Assuming Id_Orden doesn't change usually).
        // To be safe, we should use the Id_Orden from the updated record.
        await DetalleOrden.updateOrdenTotal(data.Id_Orden);

        return data;
    },

    delete: async (id) => {
        // 1. Get Id_Orden before delete
        const { data: existing, error: fetchError } = await supabase
            .from('DetalleOrden')
            .select('Id_Orden')
            .eq('Id_Detalle', id)
            .single();

        if (fetchError) throw fetchError;
        const idOrden = existing.Id_Orden;

        // 2. Delete
        const { data, error } = await supabase
            .from('DetalleOrden')
            .delete()
            .eq('Id_Detalle', id)
            .select()
            .single();

        if (error) throw error;

        // 3. Update Order Total
        await DetalleOrden.updateOrdenTotal(idOrden);

        return data;
    },

    getByOrdenId: async (idOrden) => {
        const { data, error } = await supabase
            .from('DetalleOrden')
            .select(`
                *,
                Pieza:Pieza(Nombre)
            `)
            .eq('Id_Orden', idOrden);

        if (error) throw error;

        return data.map(d => ({
            ...d,
            NombrePieza: d.Pieza?.Nombre
        }));
    },

    // Helper: Recalculate and Update Order Total
    updateOrdenTotal: async (idOrden) => {
        // A. Get all details for this order
        const { data: detalles, error: detailsError } = await supabase
            .from('DetalleOrden')
            .select('Cantidad, PrecioUnitario')
            .eq('Id_Orden', idOrden);

        if (detailsError) throw detailsError;

        // B. Calculate Sum
        let newTotal = 0;
        detalles.forEach(d => {
            newTotal += (d.Cantidad * d.PrecioUnitario);
        });

        // C. Update Order
        const { error: updateError } = await supabase
            .from('Orden')
            .update({ Total: newTotal })
            .eq('Id_Orden', idOrden);

        if (updateError) throw updateError;
    }
};

module.exports = DetalleOrden;
