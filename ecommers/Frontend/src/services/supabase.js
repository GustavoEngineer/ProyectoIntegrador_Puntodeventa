
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example generic function to fetch data from a table
export const fetchData = async (tableName, select = '*') => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select(select);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${tableName}:`, error.message);
        throw error;
    }
};

// Example generic function to insert into a table
export const insertData = async (tableName, payload) => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .insert(payload)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error inserting data into ${tableName}:`, error.message);
        throw error;
    }
};

// Example generic function to update data in a table
export const updateData = async (tableName, id, payload) => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .update(payload)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error updating data in ${tableName} with id ${id}:`, error.message);
        throw error;
    }
};


// Example generic function to delete data from a table
export const deleteData = async (tableName, id) => {
    try {
        const { error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error(`Error deleting data from ${tableName} with id ${id}:`, error.message);
        throw error;
    }
};

export default supabase;
