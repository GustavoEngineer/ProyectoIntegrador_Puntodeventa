const ValorAtributo = require('../models/valorAtributoModel');

async function testFetch() {
    console.log('Testing getByPiezaId for id=22...');
    try {
        const result = await ValorAtributo.getByPiezaId(22);
        console.log('Success! Result count:', result.length);
        console.log('First item:', JSON.stringify(result[0], null, 2));
    } catch (err) {
        console.error('Error fetching:', err);
    }
}

testFetch();
