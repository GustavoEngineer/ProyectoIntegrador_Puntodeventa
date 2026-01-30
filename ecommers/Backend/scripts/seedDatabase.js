const supabase = require('../src/config/supabase');
require('dotenv').config();

async function seedDatabase() {
    console.log('🌱 Iniciando inserción de datos...\n');

    try {
        // 1. Insertar Categorías
        console.log('📦 Insertando Categorías de Piezas...');
        const categorias = [
            { Descripcion: 'Rayos X / DR' },
            { Descripcion: 'Tomografía (CT)' },
            { Descripcion: 'Resonancia Magnética (MRI)' },
            { Descripcion: 'Ultrasonido' },
            { Descripcion: 'Mastografía' },
            { Descripcion: 'Componentes Electrónicos' },
            { Descripcion: 'Accesorios y Consumibles' }
        ];
        const { data: catData, error: catError } = await supabase
            .from('CategoriaPieza')
            .insert(categorias)
            .select();
        if (catError) throw catError;
        console.log(`✅ ${catData.length} categorías insertadas`);

        // 2. Insertar Estados
        console.log('\n📊 Insertando Estados de Piezas...');
        const estados = [
            { Descripcion: 'Nuevo' },
            { Descripcion: 'Reacondicionado' },
            { Descripcion: 'Usado - Excelente' },
            { Descripcion: 'Usado - Bueno' }
        ];
        const { data: estData, error: estError } = await supabase
            .from('EstadoPieza')
            .insert(estados)
            .select();
        if (estError) throw estError;
        console.log(`✅ ${estData.length} estados insertados`);

        // 3. Insertar Tipos
        console.log('\n🔧 Insertando Tipos de Piezas...');
        const tipos = [
            { Descripcion: 'Tubo' },
            { Descripcion: 'Detector/Panel' },
            { Descripcion: 'Cable' },
            { Descripcion: 'Fuente de Poder' },
            { Descripcion: 'Ventilador/Enfriamiento' },
            { Descripcion: 'Transductor/Sonda' },
            { Descripcion: 'Colimador' },
            { Descripcion: 'Batería' },
            { Descripcion: 'Bobina' },
            { Descripcion: 'Generador' },
            { Descripcion: 'UPS' },
            { Descripcion: 'Accesorios' }
        ];
        const { data: tipoData, error: tipoError } = await supabase
            .from('TipoPieza')
            .insert(tipos)
            .select();
        if (tipoError) throw tipoError;
        console.log(`✅ ${tipoData.length} tipos insertados`);

        // 4. Insertar Equipos Compatibles
        console.log('\n🏥 Insertando Equipos Compatibles...');
        const equipos = [
            { Nombre: 'GE Healthcare - Varios modelos' },
            { Nombre: 'Siemens Healthineers' },
            { Nombre: 'Philips Medical' },
            { Nombre: 'Canon Medical' },
            { Nombre: 'Fujifilm Medical' },
            { Nombre: 'Carestream' },
            { Nombre: 'Hologic' },
            { Nombre: 'Mindray' },
            { Nombre: 'Esaote' },
            { Nombre: 'Universal/Genérico' }
        ];
        const { data: eqData, error: eqError } = await supabase
            .from('EquiposCompatibles')
            .insert(equipos)
            .select();
        if (eqError) throw eqError;
        console.log(`✅ ${eqData.length} equipos compatibles insertados`);

        // 5. Insertar Piezas
        console.log('\n🔩 Insertando Piezas Médicas...');
        const piezas = [
            { Nombre: 'Tubo de Rayos X 150kHU', Descripcion: 'Tubo de rayos X alta capacidad 150kHU, compatible con equipos GE Healthcare. Número de parte: XRT-1001', Garantia: 12, Precio: 5200.00, Cantidad: 3, Id_CategoriaPieza: catData[0].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[0].Id_TipoPieza },
            { Nombre: 'Panel DR 24x17 pulgadas', Descripcion: 'Panel detector digital de radiografía 24x17", compatible con sistemas GE. P/N: DRP-2417', Garantia: 18, Precio: 7800.00, Cantidad: 2, Id_CategoriaPieza: catData[0].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[1].Id_TipoPieza },
            { Nombre: 'Cable HV 90kV - Siemens', Descripcion: 'Cable de alto voltaje 90kV para equipos Siemens. P/N: HV-CBL-90', Garantia: 6, Precio: 650.00, Cantidad: 10, Id_CategoriaPieza: catData[5].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[2].Id_TipoPieza },
            { Nombre: 'Fuente 24V 500W Philips', Descripcion: 'Fuente de alimentación 24V 500W para equipos Philips Medical. P/N: PSU-24V-500W', Garantia: 12, Precio: 240.00, Cantidad: 12, Id_CategoriaPieza: catData[5].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[3].Id_TipoPieza },
            { Nombre: 'Ventilador CT 120mm Canon', Descripcion: 'Ventilador de enfriamiento 120mm para tomógrafos Canon Medical. P/N: CT-FAN-120', Garantia: 6, Precio: 85.00, Cantidad: 20, Id_CategoriaPieza: catData[1].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[4].Id_TipoPieza },
            { Nombre: 'Transductor US C5-2 Fujifilm', Descripcion: 'Transductor/sonda de ultrasonido convex C5-2 MHz, Fujifilm. P/N: US-PROBE-C5-2', Garantia: 12, Precio: 4200.00, Cantidad: 1, Id_CategoriaPieza: catData[3].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[5].Id_TipoPieza },
            { Nombre: 'Colimador Hologic MG', Descripcion: 'Colimador para mastógrafo Hologic Selenia. P/N: MG-COLLIM', Garantia: 12, Precio: 980.00, Cantidad: 4, Id_CategoriaPieza: catData[4].Id_CategoriaPieza, Id_EstadoPieza: estData[2].Id_EstadoPieza, Id_TipoPieza: tipoData[6].Id_TipoPieza },
            { Nombre: 'Batería Panel DR Carestream', Descripcion: 'Batería recargable para panel detector digital Carestream. P/N: DR-BATT', Garantia: 6, Precio: 120.00, Cantidad: 8, Id_CategoriaPieza: catData[0].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[7].Id_TipoPieza },
            { Nombre: 'Fuente US 19V Mindray', Descripcion: 'Fuente de alimentación 19V para equipos de ultrasonido Mindray. P/N: US-PSU', Garantia: 12, Precio: 160.00, Cantidad: 7, Id_CategoriaPieza: catData[3].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[3].Id_TipoPieza },
            { Nombre: 'Bobina RM 8 Canales Esaote', Descripcion: 'Bobina de resonancia magnética 8 canales, Esaote. P/N: MR-COIL-8CH', Garantia: 18, Precio: 5600.00, Cantidad: 2, Id_CategoriaPieza: catData[2].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[8].Id_TipoPieza },
            { Nombre: 'Tubo CT 6.3 MHU Universal', Descripcion: 'Tubo de tomografía computarizada 6.3 MHU, compatible con múltiples marcas. P/N: CT-TUBE-6.3MHU', Garantia: 12, Precio: 14500.00, Cantidad: 1, Id_CategoriaPieza: catData[1].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[0].Id_TipoPieza },
            { Nombre: 'Gel Conductor Ultrasonido 5L', Descripcion: 'Gel conductor para ultrasonido, presentación 5 litros. P/N: US-GEL-5L', Garantia: 0, Precio: 25.00, Cantidad: 30, Id_CategoriaPieza: catData[6].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[11].Id_TipoPieza },
            { Nombre: 'Generador RX 65kW', Descripcion: 'Generador de rayos X alta frecuencia 65kW, compatible con múltiples marcas. P/N: XR-GENERATOR', Garantia: 18, Precio: 3900.00, Cantidad: 1, Id_CategoriaPieza: catData[0].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[9].Id_TipoPieza },
            { Nombre: 'UPS 2 kVA Médico', Descripcion: 'Sistema de alimentación ininterrumpida 2 kVA grado médico. P/N: UPS-2KVA', Garantia: 24, Precio: 650.00, Cantidad: 3, Id_CategoriaPieza: catData[5].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[10].Id_TipoPieza },
            { Nombre: 'Detector DEXA Densitometría', Descripcion: 'Detector para equipo de densitometría ósea. P/N: DEXA-DETECTOR', Garantia: 12, Precio: 4300.00, Cantidad: 1, Id_CategoriaPieza: catData[0].Id_CategoriaPieza, Id_EstadoPieza: estData[2].Id_EstadoPieza, Id_TipoPieza: tipoData[1].Id_TipoPieza },
            { Nombre: 'Paletas Compresión Mastografía', Descripcion: 'Juego de paletas de compresión para mastógrafo, varios tamaños. P/N: MG-PADDLE', Garantia: 6, Precio: 110.00, Cantidad: 10, Id_CategoriaPieza: catData[4].Id_CategoriaPieza, Id_EstadoPieza: estData[0].Id_EstadoPieza, Id_TipoPieza: tipoData[11].Id_TipoPieza },
            { Nombre: 'Transductor Lineal L12-5 MHz', Descripcion: 'Transductor lineal de alta frecuencia 12-5 MHz para ultrasonido. Compatible múltiples marcas', Garantia: 12, Precio: 3800.00, Cantidad: 2, Id_CategoriaPieza: catData[3].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[5].Id_TipoPieza },
            { Nombre: 'Panel Detector CT Multi-slice', Descripcion: 'Panel detector para tomógrafo multi-corte. Compatible Siemens y Canon', Garantia: 18, Precio: 12500.00, Cantidad: 1, Id_CategoriaPieza: catData[1].Id_CategoriaPieza, Id_EstadoPieza: estData[1].Id_EstadoPieza, Id_TipoPieza: tipoData[1].Id_TipoPieza }
        ];

        const { data: piezaData, error: piezaError } = await supabase
            .from('Pieza')
            .insert(piezas)
            .select();
        
        if (piezaError) throw piezaError;
        console.log(`✅ ${piezaData.length} piezas médicas insertadas`);

        console.log('\n✨ ¡Base de datos poblada exitosamente!');
        console.log(`\n📊 Resumen:`);
        console.log(`   - ${catData.length} categorías`);
        console.log(`   - ${estData.length} estados`);
        console.log(`   - ${tipoData.length} tipos`);
        console.log(`   - ${eqData.length} equipos compatibles`);
        console.log(`   - ${piezaData.length} piezas médicas`);

    } catch (error) {
        console.error('\n❌ Error al insertar datos:', error.message);
        if (error.details) console.error('Detalles:', error.details);
        if (error.hint) console.error('Sugerencia:', error.hint);
    }
}

seedDatabase();
