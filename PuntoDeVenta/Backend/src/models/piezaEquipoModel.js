const supabase = require('../config/supabase');

const PiezaEquipo = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('Pieza_Equipo')
            .select('*');
        if (error) throw error;
        return data;
    },

    create: async (relation) => {
        const { Id_Pieza, Id_EquipoCompatible } = relation;
        const { data, error } = await supabase
            .from('Pieza_Equipo')
            .insert([{ Id_Pieza, Id_EquipoCompatible }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (oldIdPieza, oldIdEquipo, newRelation) => {
        const { Id_Pieza, Id_EquipoCompatible } = newRelation;
        const { data, error } = await supabase
            .from('Pieza_Equipo')
            .update({ Id_Pieza, Id_EquipoCompatible })
            .match({ Id_Pieza: oldIdPieza, Id_EquipoCompatible: oldIdEquipo })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (idPieza, idEquipo) => {
        const { data, error } = await supabase
            .from('Pieza_Equipo')
            .delete()
            .match({ Id_Pieza: idPieza, Id_EquipoCompatible: idEquipo })
            .select();

        if (error) throw error;
        return data;
    }
};

module.exports = PiezaEquipo;
