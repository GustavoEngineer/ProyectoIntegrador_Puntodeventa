-- Agregar columna ImagenUrl a la tabla Pieza
ALTER TABLE "Pieza" ADD COLUMN IF NOT EXISTS "ImagenUrl" TEXT;

-- Actualizar imágenes de las piezas con URLs relevantes de Unsplash
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1581093458791-9d42e3e8e0e4?w=500&h=500&fit=crop' WHERE "Nombre" = 'Tubo de Rayos X 150kHU';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' WHERE "Nombre" = 'Panel DR 24x17 pulgadas';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop' WHERE "Nombre" = 'Cable HV 90kV - Siemens';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop' WHERE "Nombre" = 'Fuente 24V 500W Philips';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=500&h=500&fit=crop' WHERE "Nombre" = 'Ventilador CT 120mm Canon';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop' WHERE "Nombre" = 'Transductor US C5-2 Fujifilm';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&h=500&fit=crop' WHERE "Nombre" = 'Colimador Hologic MG';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop' WHERE "Nombre" = 'Batería Panel DR Carestream';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop' WHERE "Nombre" = 'Fuente US 19V Mindray';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' WHERE "Nombre" = 'Bobina RM 8 Canales Esaote';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1581093458791-9d42e3e8e0e4?w=500&h=500&fit=crop' WHERE "Nombre" = 'Tubo CT 6.3 MHU Universal';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop' WHERE "Nombre" = 'Gel Conductor Ultrasonido 5L';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop' WHERE "Nombre" = 'Generador RX 65kW';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop' WHERE "Nombre" = 'UPS 2 kVA Médico';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1579154204845-0f5b95c88120?w=500&h=500&fit=crop' WHERE "Nombre" = 'Detector DEXA Densitometría';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&h=500&fit=crop' WHERE "Nombre" = 'Paletas Compresión Mastografía';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop' WHERE "Nombre" = 'Transductor Lineal L12-5 MHz';
UPDATE "Pieza" SET "ImagenUrl" = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop' WHERE "Nombre" = 'Panel Detector CT Multi-slice';

-- Verificar las actualizaciones
SELECT "Nombre", "ImagenUrl" FROM "Pieza" LIMIT 5;
