const supabase = require('../config/supabase');

async function checkData() {
    console.log('Checking ValorAtributo table...');
    const { data, error } = await supabase
        .from('ValorAtributo')
        .select(`
            *,
            Atributo:AtributosAdicionales(Nombre),
            Pieza:Pieza(Nombre)
        `)
        .limit(10);

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        if (data && data.length > 0) {
            console.log('Keys of first item:', Object.keys(data[0]));
            console.log('First item sample:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('No data found in ValorAtributo.');
        }
    }
}

checkData();
