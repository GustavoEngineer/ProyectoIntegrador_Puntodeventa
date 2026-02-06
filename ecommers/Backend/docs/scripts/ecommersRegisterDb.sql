-- =============================================
-- 1. TipoUsuario
-- =============================================
INSERT INTO "TipoUsuario" ("Descripcion") VALUES
  ('Administrador'),
  ('Cliente externo');

-- =============================================
-- 2. Usuario (admin con ID = 1)
-- =============================================
INSERT INTO "Usuario" (
  "Id_Usuario", "Correo", "Contraseña", "Nombre", "A_Paterno", "A_Materno", "Telefono", "Id_TipoUsuario"
) VALUES (
  1, 'admin@biomedmx.com', 'admin', 'Admin', 'Biomed', 'MX', '+52 55 1234 5678', 1
);

-- =============================================
-- 3. CategoriaPieza
-- =============================================
INSERT INTO "CategoriaPieza" ("Descripcion") VALUES
  ('Sensor'),
  ('Batería'),
  ('Cable o conector'),
  ('Placa electrónica'),
  ('Transductor'),
  ('Módulo funcional'),
  ('Fusible o componente'),
  ('Accesorio mecánico');

-- =============================================
-- 4. TipoPieza (estado legal)
-- =============================================
INSERT INTO "TipoPieza" ("Descripcion") VALUES
  ('Nueva OEM'),
  ('Reacondicionada Certificada'),
  ('Seminueva (Certified Pre-Owned)'),
  ('Remanufacturada'),
  ('Usada');

-- =============================================
-- 5. EstadoPieza (estado operativo)
-- =============================================
INSERT INTO "EstadoPieza" ("Descripcion") VALUES
  ('Disponible'),
  ('Agotado'),
  ('Casi agotado'),
  ('En promoción'),
  ('Baja temporal');

-- =============================================
-- 6. EstadoOrden
-- =============================================
INSERT INTO "EstadoOrden" ("Descripcion") VALUES
  ('Borrador'),
  ('Confirmada'),
  ('Cancelada'),
  ('Completada');

-- =============================================
-- 7. EquiposCompatibles
-- =============================================
INSERT INTO "EquiposCompatibles" ("Nombre") VALUES
  ('Monitor multiparamétrico Philips MP70'),
  ('Monitor multiparamétrico GE Carescape'),
  ('Ventilador mecánico Dräger Evita V500'),
  ('Ventilador mecánico Hamilton G5'),
  ('Ecógrafo portátil Mindray M9'),
  ('Ecógrafo cart-based GE Voluson E10'),
  ('Desfibrilador ZOLL X Series'),
  ('Desfibrilador Philips HeartStart MRx'),
  ('Bomba de infusión B. Braun Space ISS'),
  ('Electrobisturí Erbe VIO 3');

-- =============================================
-- 8. Pieza (50 piezas)
-- =============================================
INSERT INTO "Pieza" ("Nombre", "Descripcion", "Garantia", "Precio", "Cantidad", "Id_CategoriaPieza", "Id_EstadoPieza", "Id_TipoPieza")
VALUES
-- Philips MP70 (1-5)
('Sensor SpO2 Philips MP70', 'Sensor de saturación de oxígeno, compatible con MP70', 12, 3800.00, 2, 1, 1, 2),
('Batería recargable MP70', 'Batería Li-ion, 85% capacidad restante', 6, 2200.00, 1, 2, 1, 2),
('Cable ECG premium', 'Cable de 3 derivaciones, conectores dorados', 6, 850.00, 3, 3, 1, 2),
('Placa de interfaz USB', 'Placa de comunicación USB para MP70', 12, 4500.00, 1, 4, 1, 2),
('Transductor de presión arterial', 'Transductor invasivo, calibrado IEC 60601', 12, 5200.00, 1, 5, 1, 2),

-- GE Carescape (6-10)
('Sensor temperatura GE B850', 'Sensor cutáneo, rango -10°C a 50°C', 12, 1900.00, 2, 1, 1, 2),
('Batería portátil B850', 'Batería de repuesto, 90% de vida útil', 6, 2800.00, 1, 2, 1, 2),
('Cable de pulsioximetría', 'Cable con sensor integrado, 2m', 6, 1100.00, 2, 3, 1, 2),
('Placa de control principal', 'Mainboard B850, firmware v3.2', 12, 7500.00, 1, 4, 1, 2),
('Módulo de alarma acústica', 'Módulo de sonido para alertas', 6, 1400.00, 2, 6, 1, 2),

-- Dräger Evita V500 (11-15)
('Bomba de infusión V500', 'Bomba peristáltica, calibrada', 12, 6800.00, 1, 6, 1, 2),
('Sensor de flujo espiratorio', 'Sensor de caudal, prueba IEC 60601', 12, 4200.00, 1, 1, 1, 2),
('Cable de alimentación médico', 'Cable de 1.8m, clase II', 6, 650.00, 3, 3, 1, 2),
('Placa de potencia V500', 'Fuente de alimentación interna', 12, 5900.00, 1, 4, 1, 2),
('Fusible de protección', 'Fusible T6.3A 250V, original Dräger', 6, 220.00, 5, 7, 1, 2),

-- Hamilton G5 (16-20)
('Transductor ultrasónico G5', 'Transductor para monitorización de volumen', 12, 3900.00, 1, 5, 1, 2),
('Batería G5 portátil', 'Batería de litio, 75% capacidad', 6, 2500.00, 2, 2, 1, 2),
('Cable de sensores múltiples', 'Cable de 5 canales, blindado', 6, 1300.00, 2, 3, 1, 2),
('Placa de comunicaciones', 'Ethernet + USB, firmware actualizado', 12, 4800.00, 1, 4, 1, 2),
('Módulo de humidificador', 'Módulo interno, sin fugas', 12, 3600.00, 1, 6, 1, 2),

-- Mindray M9 (21-25)
('Transductor lineal M9', 'Transductor 7.5 MHz, reparado y calibrado', 12, 8200.00, 1, 5, 1, 2),
('Batería M9', 'Batería de 4 celdas, 80% capacidad', 6, 3100.00, 2, 2, 1, 2),
('Cable de datos USB-C', 'Cable de sincronización, 1.5m', 6, 450.00, 4, 3, 1, 2),
('Placa de procesamiento', 'GPU y CPU integradas, firmware v2.1', 12, 9500.00, 1, 4, 1, 2),
('Accesorio de soporte', 'Soporte magnético para transductor', 6, 780.00, 3, 8, 1, 2),

-- GE Voluson E10 (26-30)
('Transductor convexo E10', 'Transductor 3.5 MHz, reacondicionado', 12, 12500.00, 1, 5, 1, 2),
('Batería de respaldo E10', 'Batería de emergencia, 6 meses vida útil', 6, 4200.00, 1, 2, 1, 2),
('Cable de video HDMI', 'Salida de imagen HD, 2m', 6, 580.00, 2, 3, 1, 2),
('Placa de control táctil', 'Pantalla táctil con driver actualizado', 12, 6700.00, 1, 4, 1, 2),
('Carcaza frontal E10', 'Carcaza de aluminio, sin daños', 6, 1800.00, 2, 8, 1, 2),

-- ZOLL X Series (31-35)
('Batería ZOLL X Series', 'Batería de litio, 92% capacidad', 12, 3400.00, 2, 2, 1, 2),
('Electrodo adulto ZOLL', 'Electrodo adhesivo, 2 unidades por paquete', 6, 1200.00, 5, 1, 1, 2),
('Cable de carga rápido', 'Cable USB-C para batería', 6, 320.00, 4, 3, 1, 2),
('Placa de control ZOLL', 'Mainboard con firmware v4.3', 12, 8900.00, 1, 4, 1, 2),
('Módulo de análisis ECG', 'Módulo de interpretación automática', 12, 5600.00, 1, 6, 1, 2),

-- Philips MRx (36-40)
('Batería MRx', 'Batería de repuesto, 85% capacidad', 12, 2900.00, 2, 2, 1, 2),
('Sensor de pulso MRx', 'Sensor de pulso periférico', 6, 1600.00, 2, 1, 1, 2),
('Cable de electrodos', 'Cable de 2 electrodos, estéril', 6, 890.00, 3, 3, 1, 2),
('Placa de diagnóstico', 'Placa de autodiagnóstico y pruebas', 12, 4700.00, 1, 4, 1, 2),
('Fusible de seguridad MRx', 'Fusible 10A, certificado', 6, 180.00, 6, 7, 1, 2),

-- B. Braun ISS (41-45)
('Módulo de bomba ISS', 'Módulo peristáltico reacondicionado', 12, 5300.00, 1, 6, 1, 2),
('Sensor de flujo ISS', 'Sensor óptico de detección de burbujas', 12, 2800.00, 1, 1, 1, 2),
('Cable de comunicación RS232', 'Interfaz con sistema hospitalario', 6, 720.00, 2, 3, 1, 2),
('Placa de control ISS', 'CPU y memoria, firmware v1.8', 12, 6100.00, 1, 4, 1, 2),
('Accesorio de montaje', 'Soporte para carro móvil', 6, 950.00, 3, 8, 1, 2),

-- Erbe VIO 3 (46-50)
('Generador de RF VIO 3', 'Unidad principal, calibrado', 12, 14500.00, 1, 4, 1, 2),
('Cable de electrodo activo', 'Cable de 3m, con conector Lemo', 6, 2100.00, 2, 3, 1, 2),
('Sensor de temperatura VIO', 'Sensor térmico para seguridad', 12, 3700.00, 1, 1, 1, 2),
('Batería de respaldo VIO', 'Batería de emergencia, 30 min', 6, 2600.00, 1, 2, 1, 2),
('Fusible de alta corriente', 'Fusible 15A, clase médica', 6, 290.00, 4, 7, 1, 2);

-- =============================================
-- 9. AtributosAdicionales (76 atributos)
-- =============================================
INSERT INTO "AtributosAdicionales" ("Nombre") VALUES
  ('Número de serie'),
  ('Lote o batch'),
  ('Fecha de fabricación original'),
  ('Fecha de reacondicionamiento'),
  ('Horas de uso acumulado'),
  ('Ciclos de carga (baterías)'),
  ('Capacidad restante (%)'),
  ('Voltaje nominal'),
  ('Corriente máxima'),
  ('Impedancia'),
  ('Precisión del sensor (%)'),
  ('Rango de medición'),
  ('Tipo de conector'),
  ('Longitud del cable (m)'),
  ('Material del aislante'),
  ('Clase de protección eléctrica'),
  ('Fuga de corriente medida (μA)'),
  ('Resultado prueba IEC 60601'),
  ('Firmware versión'),
  ('Software de calibración'),
  ('Fecha última calibración'),
  ('Próxima calibración requerida'),
  ('Temperatura operación mínima (°C)'),
  ('Temperatura operación máxima (°C)'),
  ('Resistencia a fluidos'),
  ('Esterilizable'),
  ('Método de esterilización compatible'),
  ('Presión máxima soportada'),
  ('Frecuencia ultrasónica (MHz)'),
  ('Profundidad de penetración (cm)'),
  ('Tipo de cristal (transductor)'),
  ('Compatibilidad OEM'),
  ('Modelo de equipo compatible'),
  ('Marca del equipo compatible'),
  ('Registro sanitario COFEPRIS'),
  ('Fecha emisión registro COFEPRIS'),
  ('Fecha caducidad registro COFEPRIS'),
  ('Exento de registro sanitario'),
  ('Motivo de exención'),
  ('Certificado OEM adjunto'),
  ('Número de certificado'),
  ('Entidad emisora del certificado'),
  ('Fecha emisión certificado'),
  ('Garantía extendida disponible'),
  ('Tiempo promedio entre fallas (MTBF)'),
  ('Tasa histórica de fallos (%)'),
  ('Origen de la pieza'),
  ('Proyecto hospitalario de origen'),
  ('Hospital de origen'),
  ('Ingeniero responsable'),
  ('Herramienta de diagnóstico usada'),
  ('Multímetro modelo'),
  ('Osciloscopio modelo'),
  ('Analizador de seguridad modelo'),
  ('Prueba de fugas realizada'),
  ('Prueba de funcionalidad realizada'),
  ('Prueba de SpO2 realizada'),
  ('Prueba de presión realizada'),
  ('Prueba de temperatura realizada'),
  ('Prueba de ECG realizada'),
  ('Resultado prueba eléctrica'),
  ('Resultado prueba mecánica'),
  ('Resultado prueba de software'),
  ('Estado físico general'),
  ('Desgaste visual'),
  ('Daños estructurales'),
  ('Reemplazo de componentes internos'),
  ('Componentes reemplazados'),
  ('Partes nuevas utilizadas'),
  ('Partes reacondicionadas utilizadas'),
  ('Documentación técnica incluida'),
  ('Manual de usuario incluido'),
  ('Guía de instalación incluida');

-- =============================================
-- 10. Pieza_Equipo (50 relaciones)
-- =============================================
INSERT INTO "Pieza_Equipo" ("Id_Pieza", "Id_EquipoCompatible")
SELECT 
  p."Id_Pieza",
  CASE 
    WHEN p."Id_Pieza" BETWEEN 1 AND 5 THEN 1
    WHEN p."Id_Pieza" BETWEEN 6 AND 10 THEN 2
    WHEN p."Id_Pieza" BETWEEN 11 AND 15 THEN 3
    WHEN p."Id_Pieza" BETWEEN 16 AND 20 THEN 4
    WHEN p."Id_Pieza" BETWEEN 21 AND 25 THEN 5
    WHEN p."Id_Pieza" BETWEEN 26 AND 30 THEN 6
    WHEN p."Id_Pieza" BETWEEN 31 AND 35 THEN 7
    WHEN p."Id_Pieza" BETWEEN 36 AND 40 THEN 8
    WHEN p."Id_Pieza" BETWEEN 41 AND 45 THEN 9
    WHEN p."Id_Pieza" BETWEEN 46 AND 50 THEN 10
  END AS equipo_id
FROM "Pieza" p
WHERE p."Id_Pieza" BETWEEN 1 AND 50;

-- =============================================
-- 11. ValorAtributo (10 ejemplos iniciales)
-- =============================================
-- Nota: Aquí van solo 10 ejemplos. Para los 100 completos, usa el script largo anterior ajustando IDs a 1-50.
INSERT INTO "ValorAtributo" ("Id_Pieza", "Id_Atributo", "Valor")
VALUES
(1, 1, 'SPO2-MP70-2025-087'),
(1, 11, '±2%'),
(1, 12, '0–100% SpO2'),
(1, 18, 'IEC 60601-2-27: Aprobado'),
(1, 19, 'v4.2.1'),
(2, 1, 'BAT-MP70-2025-112'),
(2, 2, 'LOT-MP70-BAT-2024Q4'),
(2, 7, '85'),
(2, 8, '11.1'),
(2, 9, '320');