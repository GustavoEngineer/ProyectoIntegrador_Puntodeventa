const { Pool } = require('pg');
require('dotenv').config();

async function addImagenUrlColumn() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    console.log('🔧 Agregando columna ImagenUrl a la tabla Pieza...\n');

    try {
        // Agregar columna ImagenUrl
        await pool.query(`
            ALTER TABLE "Pieza" 
            ADD COLUMN IF NOT EXISTS "ImagenUrl" TEXT;
        `);
        
        console.log('✅ Columna ImagenUrl agregada correctamente\n');
        
        // Actualizar con imágenes específicas
        const actualizaciones = [
            { nombre: 'Tubo de Rayos X 150kHU', url: 'https://images.unsplash.com/photo-1581093458791-9d42e3e8e0e4?w=500&h=500&fit=crop' },
            { nombre: 'Panel DR 24x17 pulgadas', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' },
            { nombre: 'Cable HV 90kV - Siemens', url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop' },
            { nombre: 'Fuente 24V 500W Philips', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop' },
            { nombre: 'Ventilador CT 120mm Canon', url: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=500&h=500&fit=crop' },
            { nombre: 'Transductor US C5-2 Fujifilm', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop' },
            { nombre: 'Colimador Hologic MG', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&h=500&fit=crop' },
            { nombre: 'Batería Panel DR Carestream', url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop' },
            { nombre: 'Fuente US 19V Mindray', url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop' },
            { nombre: 'Bobina RM 8 Canales Esaote', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' },
            { nombre: 'Tubo CT 6.3 MHU Universal', url: 'https://images.unsplash.com/photo-1581093458791-9d42e3e8e0e4?w=500&h=500&fit=crop' },
            { nombre: 'Gel Conductor Ultrasonido 5L', url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop' },
            { nombre: 'Generador RX 65kW', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop' },
            { nombre: 'UPS 2 kVA Médico', url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop' },
            { nombre: 'Detector DEXA Densitometría', url: 'https://images.unsplash.com/photo-1579154204845-0f5b95c88120?w=500&h=500&fit=crop' },
            { nombre: 'Paletas Compresión Mastografía', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&h=500&fit=crop' },
            { nombre: 'Transductor Lineal L12-5 MHz', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop' },
            { nombre: 'Panel Detector CT Multi-slice', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' }
        ];

        console.log('🖼️  Actualizando imágenes...\n');
        
        for (const item of actualizaciones) {
            await pool.query(
                `UPDATE "Pieza" SET "ImagenUrl" = $1 WHERE "Nombre" = $2`,
                [item.url, item.nombre]
            );
            console.log(`✅ ${item.nombre}`);
        }

        console.log(`\n✨ ¡Completado! ${actualizaciones.length} piezas actualizadas con imágenes relevantes`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

addImagenUrlColumn();
