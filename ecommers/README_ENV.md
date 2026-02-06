# 🔐 Guía de Configuración de Variables de Entorno

Esta guía te ayudará a configurar correctamente las variables de entorno para el proyecto **MediParts**.

## 📋 Requisitos Previos

- Node.js instalado
- Cuenta de Supabase (gratuita)
- Git configurado

## 🚀 Configuración Rápida

### 1. Backend

```bash
cd Backend
cp .env.example .env
```

Edita el archivo `.env` y completa con tus credenciales de Supabase:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key_aqui
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3001
```

### 2. Frontend

```bash
cd Frontend
cp .env.example .env
```

El archivo `.env` del frontend ya está configurado para desarrollo local:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🔑 Obtener Credenciales de Supabase

### Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta gratuita
3. Click en **"New Project"**
4. Completa los datos:
   - **Name**: mediparts-pos (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña en lugar seguro
   - **Region**: Elige la más cercana a tu ubicación
5. Click en **"Create new project"** (tarda ~2 minutos)

### Paso 2: Obtener las Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (⚙️ en la barra lateral)
2. Click en **API**
3. Copia los siguientes valores:

   - **Project URL** → Usar como `SUPABASE_URL`
   - **anon public** (en API Keys) → Usar como `SUPABASE_KEY`

### Paso 3: Configurar la Base de Datos

La base de datos ya tiene el schema definido en [`Backend/docs/posdb.sql`](file:///Users/uzielcastillo/Development/ProyectoIntegrador_Puntodeventa/ecommers/Backend/docs/posdb.sql). Para cargarla:

1. En Supabase, ve a **SQL Editor**
2. Click en **"New query"**
3. Copia y pega el contenido de `posdb.sql`
4. Click en **"Run"**

Alternativamente, puedes usar el script de seed:

```bash
cd Backend
node scripts/seedDatabase.js
```

## 🛡️ Seguridad - Mejores Prácticas

### ✅ HACER

- ✅ Mantener `.env` en `.gitignore`
- ✅ Usar `.env.example` como plantilla sin datos sensibles
- ✅ Usar variables de entorno diferentes para desarrollo y producción
- ✅ Rotar las API keys regularmente
- ✅ Usar HTTPS en producción

### ❌ NO HACER

- ❌ NUNCA commitear archivos `.env` al repositorio
- ❌ NUNCA compartir credenciales en chat, email, o documentos públicos
- ❌ NUNCA usar las mismas credenciales en múltiples ambientes
- ❌ NUNCA hardcodear API keys en el código fuente

## 🏃 Ejecutar el Proyecto

### Backend

```bash
cd Backend
npm install
npm run dev
```

Deberías ver:
```
Server running on port 3000
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Deberías ver:
```
  ➜  Local:   http://localhost:3001/
```

## 🔍 Troubleshooting

### Error: "SUPABASE_URL or SUPABASE_KEY not found"

**Causa**: El archivo `.env` no existe o las variables están mal configuradas.

**Solución**:
1. Verifica que el archivo `.env` existe en la carpeta `Backend/`
2. Asegúrate que las variables `SUPABASE_URL` y `SUPABASE_KEY` estén definidas
3. NO debe haber espacios alrededor del `=`
4. Reinicia el servidor después de editar `.env`

### Error: CORS al hacer peticiones desde el frontend

**Causa**: El backend no está permitiendo peticiones desde el origen del frontend.

**Solución**:
1. Verifica que `ALLOWED_ORIGINS` en `Backend/.env` incluya `http://localhost:3001`
2. Si usas un puerto diferente, actualiza la variable
3. Reinicia el backend

### Frontend no se conecta al backend

**Causa**: La URL del backend está mal configurada.

**Solución**:
1. Verifica que `VITE_API_URL` en `Frontend/.env` sea `http://localhost:3000/api`
2. Asegúrate que el backend esté corriendo en puerto 3000
3. Reinicia Vite después de cambiar variables de entorno

### Las variables de Vite no se actualizan

**Causa**: Vite cachea las variables de entorno al iniciar.

**Solución**:
1. Detén el servidor de Vite (Ctrl+C)
2. Reinicia con `npm run dev`
3. Las variables con prefijo `VITE_` son las únicas accesibles en el cliente

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Variables de Entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)
- [dotenv Documentation](https://github.com/motdotla/dotenv#readme)

## 🆘 Soporte

Si tienes problemas con la configuración:

1. Verifica que todas las dependencias estén instaladas
2. Revisa los logs de consola para errores específicos
3. Asegúrate de estar en las carpetas correctas al ejecutar comandos
4. Verifica que ambos servidores (backend y frontend) estén corriendo

---

**Última actualización**: 2026-02-04
