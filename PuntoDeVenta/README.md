# MediParts - Sistema de Punto de Venta para Piezas Médicas

Plataforma web para la gestión y venta de piezas médicas especializadas para equipos biomédicos. Sistema completo con autenticación, catálogo de productos, carrito de compras y gestión de pedidos.

## 🔐 Credenciales de Administrador

Para acceder al sistema con privilegios de administrador:

- **Correo:** `roberto.aguirre@gmail.com`
- **Contraseña:** `BioMed2026!`

## 🚀 Tecnologías Utilizadas

### Backend
- Node.js + Express
- Supabase (PostgreSQL)
- API REST

### Frontend
- React 18 + Vite
- Context API (estado global)
- CSS personalizado
- Sistema de temas (claro/oscuro)

## 📦 Instalación

### Backend

```bash
cd Backend
npm install
npm run dev
```

El servidor correrá en `http://localhost:3000`

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

La aplicación correrá en `http://localhost:3001`

## 🎨 Características Implementadas

### ✅ Sistema de Autenticación
- Registro de usuarios (solo Gmail)
- Inicio de sesión con persistencia en localStorage
- Cuenta de administrador predefinida
- Protección de rutas

### ✅ Catálogo de Productos
- Visualización de piezas médicas
- Filtrado por categorías
- Búsqueda y navegación
- Badges de estado y stock

### ✅ Carrito de Compras
- Agregar/eliminar productos
- Ajustar cantidades
- Cálculo de IVA (16%)
- Resumen del pedido
- Checkout funcional

### ✅ Gestión de Cuenta
- **Perfil:** Edición de información personal (nombre, teléfono, empresa, dirección)
- **Pedidos:** Historial completo con detalles
- **Configuración:** Notificaciones, cambio de contraseña, cerrar sesión

### ✅ Sistema de Categorías
- 7 categorías principales (Rayos X/DR, CT, MRI, Ultrasonido, Mastografía, Electrónicos, Accesorios)
- Iconos SVG profesionales
- Contador de piezas por categoría
- Filtrado por categoría

### ✅ Modo Claro/Oscuro
- Toggle funcional con iconos SVG
- Persistencia en localStorage
- Variables CSS para todos los componentes
- Transiciones suaves

### ✅ Navegación
- Sistema de navegación sin React Router
- Indicadores visuales de página activa
- Sombreado en links activos
- Breadcrumb visual

## 🐛 Bug Conocido - Productos no se Recargan

### Descripción del Problema
Después de agregar productos al carrito y hacer clic en "Seguir comprando", la página del catálogo muestra el mensaje "No hay piezas disponibles en este momento" aunque los productos existen en la base de datos.

### Posibles Causas

1. **Problema de Estado en React**
   - El componente `CatalogPage` no se desmonta correctamente al navegar
   - El estado `piezas` mantiene un array vacío después de volver del carrito
   - Los `key` props pueden no estar forzando el remontaje del componente

2. **Race Condition en useEffect**
   - El `useEffect` puede estar ejecutándose antes de que el estado `currentView` se actualice
   - Múltiples llamadas al API pueden estar interfiriendo entre sí
   - El `retryCount` no está disparando el efecto correctamente

3. **Problema con la Conexión del Backend**
   - El backend (puerto 3000) puede no estar respondiendo
   - CORS puede estar bloqueando las peticiones
   - La respuesta del API puede estar retornando vacío

4. **Cache del Navegador**
   - El navegador puede estar cacheando la respuesta vacía
   - localStorage puede tener datos corruptos
   - Service Workers pueden estar interfiriendo

### Soluciones Intentadas
- ✅ Agregado de `key` props únicos a cada vista
- ✅ Implementado `retryCount` en el estado
- ✅ Agregado botón "Recargar" en estado vacío
- ✅ Mejorado manejo de errores con try-catch

### Soluciones Pendientes
- 🔄 Forzar limpieza del estado en `onBack`
- 🔄 Implementar `useCallback` para `fetchPiezas`
- 🔄 Agregar timestamp al `key` del CatalogPage
- 🔄 Implementar debounce en las peticiones
- 🔄 Agregar logs de debugging en consola

## 🎯 Mejoras Recientes

### Interfaz de Usuario
- ✨ Removido emoji del hospital del logo
- ✨ Iconos SVG profesionales en categorías (en lugar de emojis)
- ✨ Icono de sol con rayos para modo claro
- ✨ Icono de luna creciente para modo oscuro
- ✨ Animación de rotación en botón de tema
- ✨ Sombreado visual en links de navegación activos

### Carrito de Compras
- ✨ Textos más visibles y legibles
- ✨ Badges de categoría con fondo morado y texto blanco
- ✨ Precios y garantía con mayor contraste
- ✨ Botón "Vaciar carrito" con estilo distintivo (borde rojo, fondo blanco)
- ✨ Mejor contraste en modo oscuro

### Contenido
- ✨ Removida palabra "Disponibles" del título del catálogo
- ✨ Título simplificado: "Piezas de Equipos Médicos"

### Modo Oscuro
- ✨ Colores optimizados para lectura nocturna
- ✨ Contraste mejorado en todos los componentes
- ✨ Variables CSS específicas para tema oscuro
- ✨ Transiciones suaves entre temas

## 📁 Estructura del Proyecto

```
PuntoDeVenta/
├── Backend/
│   ├── src/
│   │   ├── config/         # Configuración de Supabase
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── models/         # Modelos de datos
│   │   └── routes/         # Endpoints de API
│   ├── scripts/            # Scripts de utilidad (seedDatabase.js)
│   └── docs/               # Documentación y SQL
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # Componentes reutilizables (Button, ProductCard)
│   │   │   └── layout/     # Layout (Header, MainLayout)
│   │   ├── context/        # Context API (Auth, Cart, Theme)
│   │   ├── pages/          # Páginas principales
│   │   └── assets/         # Recursos estáticos
│   └── public/
│
└── README.md
```

## 🗄️ Base de Datos

### Tablas Principales
- `Pieza` - Piezas médicas disponibles
- `CategoriaPieza` - Categorías de equipos médicos
- `EstadoPieza` - Estados (Nuevo, Reacondicionado, etc.)
- `TipoPieza` - Tipos de componentes
- `EquiposCompatibles` - Equipos compatibles con cada pieza
- `Orden` - Órdenes de compra
- `Usuario` - Usuarios del sistema

### Datos Precargados
- 18 piezas médicas
- 7 categorías
- 4 estados
- 12 tipos de piezas
- 10 equipos compatibles

## 🔒 Seguridad

- Validación de correos Gmail en registro
- Contraseñas mínimo 6 caracteres
- Cuenta de administrador con credenciales predefinidas
- Persistencia segura en localStorage
- Protección de rutas (requiere autenticación)

## 📝 Notas Adicionales

- El sistema está diseñado para ingenieros biomédicos
- Los precios incluyen IVA del 16%
- Todas las piezas incluyen garantía
- El historial de pedidos se guarda por usuario
- El modo oscuro se persiste entre sesiones

## 🤝 Contribución

Este es un proyecto integrador académico. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso académico.

---

**Desarrollado como Proyecto Integrador - 2026**
