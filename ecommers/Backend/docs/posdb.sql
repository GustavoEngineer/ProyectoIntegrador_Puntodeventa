-- 1. TipoUsuario
CREATE TABLE "TipoUsuario" (
  "Id_TipoUsuario" SERIAL PRIMARY KEY,
  "Descripcion" TEXT NOT NULL
);

-- 2. Usuario
CREATE TABLE "Usuario" (
  "Id_Usuario" SERIAL PRIMARY KEY,
  "Correo" TEXT NOT NULL UNIQUE,
  "Contraseña" TEXT NOT NULL,
  "Nombre" TEXT NOT NULL,
  "A_Paterno" TEXT NOT NULL,
  "A_Materno" TEXT,
  "Telefono" TEXT,
  "Id_TipoUsuario" INTEGER NOT NULL,
  CONSTRAINT fk_tipousuario FOREIGN KEY ("Id_TipoUsuario") REFERENCES "TipoUsuario"("Id_TipoUsuario") ON DELETE RESTRICT
);

-- 3. CategoriaPieza
CREATE TABLE "CategoriaPieza" (
  "Id_CategoriaPieza" SERIAL PRIMARY KEY,
  "Descripcion" TEXT NOT NULL
);

-- 4. EstadoPieza
CREATE TABLE "EstadoPieza" (
  "Id_EstadoPieza" SERIAL PRIMARY KEY,
  "Descripcion" TEXT NOT NULL
);

-- 5. TipoPieza
CREATE TABLE "TipoPieza" (
  "Id_TipoPieza" SERIAL PRIMARY KEY,
  "Descripcion" TEXT NOT NULL
);

-- 6. EquiposCompatibles
CREATE TABLE "EquiposCompatibles" (
  "Id_EquipoCompatible" SERIAL PRIMARY KEY,
  "Nombre" TEXT NOT NULL
);

-- 7. Pieza
CREATE TABLE "Pieza" (
  "Id_Pieza" SERIAL PRIMARY KEY,
  "Nombre" TEXT NOT NULL,
  "Descripcion" TEXT,
  "Garantia" INTEGER, -- en meses
  "Precio" NUMERIC(10,2),
  "Cantidad" INTEGER NOT NULL DEFAULT 0,
  "Id_CategoriaPieza" INTEGER NOT NULL,
  "Id_EstadoPieza" INTEGER NOT NULL,
  "Id_TipoPieza" INTEGER NOT NULL,
  "CalificacionPromedio" NUMERIC(2,1) CHECK ("CalificacionPromedio" >= 1.0 AND "CalificacionPromedio" <= 5.0),
  CONSTRAINT fk_categoria FOREIGN KEY ("Id_CategoriaPieza") REFERENCES "CategoriaPieza"("Id_CategoriaPieza") ON DELETE RESTRICT,
  CONSTRAINT fk_estado FOREIGN KEY ("Id_EstadoPieza") REFERENCES "EstadoPieza"("Id_EstadoPieza") ON DELETE RESTRICT,
  CONSTRAINT fk_tipo FOREIGN KEY ("Id_TipoPieza") REFERENCES "TipoPieza"("Id_TipoPieza") ON DELETE RESTRICT
);

-- 8. Pieza_Equipo (relación muchos a muchos)
CREATE TABLE "Pieza_Equipo" (
  "Id_Pieza" INTEGER,
  "Id_EquipoCompatible" INTEGER,
  PRIMARY KEY ("Id_Pieza", "Id_EquipoCompatible"),
  CONSTRAINT fk_pieza_eq FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE CASCADE,
  CONSTRAINT fk_equipo_eq FOREIGN KEY ("Id_EquipoCompatible") REFERENCES "EquiposCompatibles"("Id_EquipoCompatible") ON DELETE CASCADE
);

-- 9. EstadoOrden
CREATE TABLE "EstadoOrden" (
  "Id_EstadoOrden" SERIAL PRIMARY KEY,
  "Descripcion" TEXT NOT NULL
);

-- 10. Orden
CREATE TABLE "Orden" (
  "Id_Orden" SERIAL PRIMARY KEY,
  "Fecha" TIMESTAMPTZ DEFAULT NOW(),
  "Total" NUMERIC(12,2) NOT NULL,
  "Id_Usuario" INTEGER NOT NULL,
  "Id_EstadoOrden" INTEGER NOT NULL,
  CONSTRAINT fk_usuario_orden FOREIGN KEY ("Id_Usuario") REFERENCES "Usuario"("Id_Usuario") ON DELETE RESTRICT,
  CONSTRAINT fk_estado_orden FOREIGN KEY ("Id_EstadoOrden") REFERENCES "EstadoOrden"("Id_EstadoOrden") ON DELETE RESTRICT
);

-- 11. DetalleOrden
CREATE TABLE "DetalleOrden" (
  "Id_Detalle" SERIAL PRIMARY KEY,
  "Cantidad" INTEGER NOT NULL,
  "PrecioUnitario" NUMERIC(10,2) NOT NULL,
  "Id_Orden" INTEGER NOT NULL,
  "Id_Pieza" INTEGER NOT NULL,
  CONSTRAINT fk_orden_det FOREIGN KEY ("Id_Orden") REFERENCES "Orden"("Id_Orden") ON DELETE CASCADE,
  CONSTRAINT fk_pieza_det FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE RESTRICT
);

-- 12. AtributosAdicionales
CREATE TABLE "AtributosAdicionales" (
  "Id_Atributo" SERIAL PRIMARY KEY,
  "Nombre" TEXT NOT NULL
);

-- 13. ValorAtributo (EAV: Entidad-Atributo-Valor)
CREATE TABLE "ValorAtributo" (
  "Id_Pieza" INTEGER,
  "Id_Atributo" INTEGER,
  "Valor" TEXT NOT NULL,
  PRIMARY KEY ("Id_Pieza", "Id_Atributo"),
  CONSTRAINT fk_pieza_val FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE CASCADE,
  CONSTRAINT fk_atributo_val FOREIGN KEY ("Id_Atributo") REFERENCES "AtributosAdicionales"("Id_Atributo") ON DELETE CASCADE
);

-- 14. ListaDeseos
CREATE TABLE "ListaDeseos" (
  "Id_Usuario" INTEGER NOT NULL,
  "Id_Pieza" INTEGER NOT NULL,
  "FechaAgregado" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY ("Id_Usuario", "Id_Pieza"),
  CONSTRAINT fk_usuario_wish FOREIGN KEY ("Id_Usuario") REFERENCES "Usuario"("Id_Usuario") ON DELETE CASCADE,
  CONSTRAINT fk_pieza_wish FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE CASCADE
);

-- 15. Carrito
CREATE TABLE "Carrito" (
  "Id_Usuario" INTEGER NOT NULL,
  "Id_Pieza" INTEGER NOT NULL,
  "Cantidad" INTEGER NOT NULL CHECK ("Cantidad" > 0),
  "PrecioUnitarioEnCarrito" NUMERIC(10,2) NOT NULL,
  "FechaAgregado" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY ("Id_Usuario", "Id_Pieza"),
  CONSTRAINT fk_usuario_cart FOREIGN KEY ("Id_Usuario") REFERENCES "Usuario"("Id_Usuario") ON DELETE CASCADE,
  CONSTRAINT fk_pieza_cart FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE CASCADE
);

-- 16. Reseña
CREATE TABLE "Reseña" (
  "Id_Usuario" INTEGER NOT NULL,
  "Id_Pieza" INTEGER NOT NULL,
  "Calificacion" SMALLINT NOT NULL CHECK ("Calificacion" BETWEEN 1 AND 5),
  "Comentario" TEXT,
  "Fecha" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY ("Id_Usuario", "Id_Pieza"),
  CONSTRAINT fk_usuario_resena FOREIGN KEY ("Id_Usuario") REFERENCES "Usuario"("Id_Usuario") ON DELETE CASCADE,
  CONSTRAINT fk_pieza_resena FOREIGN KEY ("Id_Pieza") REFERENCES "Pieza"("Id_Pieza") ON DELETE CASCADE
);