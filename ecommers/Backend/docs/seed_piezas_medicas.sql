-- Script para insertar piezas de equipos médicos de ejemplo
-- Basado en piezas reales de mantenimiento de equipos médicos

-- Insertar Categorías de Piezas
INSERT INTO "CategoriaPieza" ("Descripcion") VALUES
('Rayos X / DR'),
('Tomografía (CT)'),
('Resonancia Magnética (MRI)'),
('Ultrasonido'),
('Mastografía'),
('Componentes Electrónicos'),
('Accesorios y Consumibles');

-- Insertar Estados de Piezas
INSERT INTO "EstadoPieza" ("Descripcion") VALUES
('Nuevo'),
('Reacondicionado'),
('Usado - Excelente'),
('Usado - Bueno');

-- Insertar Tipos de Piezas
INSERT INTO "TipoPieza" ("Descripcion") VALUES
('Tubo'),
('Detector/Panel'),
('Cable'),
('Fuente de Poder'),
('Ventilador/Enfriamiento'),
('Transductor/Sonda'),
('Colimador'),
('Batería'),
('Bobina'),
('Generador'),
('UPS'),
('Accesorios');

-- Insertar Equipos Compatibles
INSERT INTO "EquiposCompatibles" ("Nombre") VALUES
('GE Healthcare - Varios modelos'),
('Siemens Healthineers'),
('Philips Medical'),
('Canon Medical'),
('Fujifilm Medical'),
('Carestream'),
('Hologic'),
('Mindray'),
('Esaote'),
('Universal/Genérico');

-- Insertar Piezas Médicas
-- Nota: Ajusta los Id según los generados en tu base de datos

-- 1. Tubo de Rayos X 150kHU - GE
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Tubo de Rayos X 150kHU',
  'Tubo de rayos X alta capacidad 150kHU, compatible con equipos GE Healthcare. Número de parte: XRT-1001',
  12,
  5200.00,
  3,
  1, -- Rayos X / DR
  2, -- Reacondicionado
  1  -- Tubo
);

-- 2. Panel DR 24x17
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Panel DR 24x17 pulgadas',
  'Panel detector digital de radiografía 24x17", compatible con sistemas GE. P/N: DRP-2417',
  18,
  7800.00,
  2,
  1, -- Rayos X / DR
  1, -- Nuevo
  2  -- Detector/Panel
);

-- 3. Cable de Alto Voltaje 90kV
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Cable HV 90kV - Siemens',
  'Cable de alto voltaje 90kV para equipos Siemens. P/N: HV-CBL-90',
  6,
  650.00,
  10,
  6, -- Componentes Electrónicos
  1, -- Nuevo
  3  -- Cable
);

-- 4. Fuente de Poder 24V 500W
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Fuente 24V 500W Philips',
  'Fuente de alimentación 24V 500W para equipos Philips Medical. P/N: PSU-24V-500W',
  12,
  240.00,
  12,
  6, -- Componentes Electrónicos
  1, -- Nuevo
  4  -- Fuente de Poder
);

-- 5. Ventilador para CT 120mm
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Ventilador CT 120mm Canon',
  'Ventilador de enfriamiento 120mm para tomógrafos Canon Medical. P/N: CT-FAN-120',
  6,
  85.00,
  20,
  2, -- Tomografía (CT)
  1, -- Nuevo
  5  -- Ventilador/Enfriamiento
);

-- 6. Transductor Ultrasonido C5-2
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Transductor US C5-2 Fujifilm',
  'Transductor/sonda de ultrasonido convex C5-2 MHz, Fujifilm. P/N: US-PROBE-C5-2',
  12,
  4200.00,
  1,
  4, -- Ultrasonido
  2, -- Reacondicionado
  6  -- Transductor/Sonda
);

-- 7. Colimador para Mastógrafo
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Colimador Hologic MG',
  'Colimador para mastógrafo Hologic Selenia. P/N: MG-COLLIM',
  12,
  980.00,
  4,
  5, -- Mastografía
  3, -- Usado - Excelente
  7  -- Colimador
);

-- 8. Batería Panel DR
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Batería Panel DR Carestream',
  'Batería recargable para panel detector digital Carestream. P/N: DR-BATT',
  6,
  120.00,
  8,
  1, -- Rayos X / DR
  1, -- Nuevo
  8  -- Batería
);

-- 9. Fuente Ultrasonido 19V
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Fuente US 19V Mindray',
  'Fuente de alimentación 19V para equipos de ultrasonido Mindray. P/N: US-PSU',
  12,
  160.00,
  7,
  4, -- Ultrasonido
  1, -- Nuevo
  4  -- Fuente de Poder
);

-- 10. Bobina de Resonancia 8 Canales
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Bobina RM 8 Canales Esaote',
  'Bobina de resonancia magnética 8 canales, Esaote. P/N: MR-COIL-8CH',
  18,
  5600.00,
  2,
  3, -- Resonancia Magnética
  2, -- Reacondicionado
  9  -- Bobina
);

-- 11. Tubo CT 6.3 MHU
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Tubo CT 6.3 MHU Universal',
  'Tubo de tomografía computarizada 6.3 MHU, compatible con múltiples marcas. P/N: CT-TUBE-6.3MHU',
  12,
  14500.00,
  1,
  2, -- Tomografía (CT)
  2, -- Reacondicionado
  1  -- Tubo
);

-- 12. Tarjeta Control RF
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Tarjeta Control RF Universal',
  'Tarjeta de control RF para equipos de fluoroscopía. P/N: RF-BOARD-CTRL',
  12,
  900.00,
  5,
  6, -- Componentes Electrónicos
  3, -- Usado - Excelente
  12 -- Accesorios
);

-- 13. Gel Conductor 5L
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Gel Conductor Ultrasonido 5L',
  'Gel conductor para ultrasonido, presentación 5 litros. P/N: US-GEL-5L',
  0,
  25.00,
  30,
  7, -- Accesorios y Consumibles
  1, -- Nuevo
  12 -- Accesorios
);

-- 14. Generador de Rayos X 65kW
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Generador RX 65kW',
  'Generador de rayos X alta frecuencia 65kW, compatible con múltiples marcas. P/N: XR-GENERATOR',
  18,
  3900.00,
  1,
  1, -- Rayos X / DR
  2, -- Reacondicionado
  10 -- Generador
);

-- 15. UPS 2 kVA
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'UPS 2 kVA Médico',
  'Sistema de alimentación ininterrumpida 2 kVA grado médico. P/N: UPS-2KVA',
  24,
  650.00,
  3,
  6, -- Componentes Electrónicos
  1, -- Nuevo
  11 -- UPS
);

-- 16. Detector DEXA
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Detector DEXA Densitometría',
  'Detector para equipo de densitometría ósea. P/N: DEXA-DETECTOR',
  12,
  4300.00,
  1,
  1, -- Rayos X / DR
  3, -- Usado - Excelente
  2  -- Detector/Panel
);

-- 17. Paletas de Compresión MG
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Paletas Compresión Mastografía',
  'Juego de paletas de compresión para mastógrafo, varios tamaños. P/N: MG-PADDLE',
  6,
  110.00,
  10,
  5, -- Mastografía
  1, -- Nuevo
  12 -- Accesorios
);

-- 18. Transductor Lineal US
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Transductor Lineal L12-5 MHz',
  'Transductor lineal de alta frecuencia 12-5 MHz para ultrasonido. Compatible múltiples marcas',
  12,
  3800.00,
  2,
  4, -- Ultrasonido
  2, -- Reacondicionado
  6  -- Transductor/Sonda
);

-- 19. Cable Paciente ECG
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Cable Paciente ECG 12 Derivaciones',
  'Cable de paciente ECG 12 derivaciones, compatible con múltiples monitores',
  6,
  95.00,
  15,
  7, -- Accesorios y Consumibles
  1, -- Nuevo
  3  -- Cable
);

-- 20. Panel Detector CT
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza") 
VALUES (
  'Panel Detector CT Multi-slice',
  'Panel detector para tomógrafo multi-corte. Compatible Siemens y Canon',
  18,
  12500.00,
  1,
  2, -- Tomografía (CT)
  2, -- Reacondicionado
  2  -- Detector/Panel
);

-- Nota: Después de ejecutar este script, puedes vincular las piezas 
-- con equipos compatibles usando la tabla Pieza_Equipo si es necesario.
