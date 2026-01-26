const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes (Placeholders for now)
app.get('/', (req, res) => {
    res.json({ message: 'API Punto de Venta Running' });
});

// Import entity routes
const usuarioRoutes = require('./routes/usuarioRoutes');
const piezaRoutes = require('./routes/piezaRoutes');
const ordenRoutes = require('./routes/ordenRoutes');
const tipoUsuarioRoutes = require('./routes/tipoUsuarioRoutes');
const categoriaPiezaRoutes = require('./routes/categoriaPiezaRoutes');
const estadoPiezaRoutes = require('./routes/estadoPiezaRoutes');
const tipoPiezaRoutes = require('./routes/tipoPiezaRoutes');
const equiposCompatiblesRoutes = require('./routes/equiposCompatiblesRoutes');
const estadoOrdenRoutes = require('./routes/estadoOrdenRoutes');
const detalleOrdenRoutes = require('./routes/detalleOrdenRoutes');
const atributosAdicionalesRoutes = require('./routes/atributosAdicionalesRoutes');
const piezaEquipoRoutes = require('./routes/piezaEquipoRoutes');
const valorAtributoRoutes = require('./routes/valorAtributoRoutes');
const listaDeseosRoutes = require('./routes/listaDeseosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/piezas', piezaRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/tipos-usuario', tipoUsuarioRoutes);
app.use('/api/categorias-pieza', categoriaPiezaRoutes);
app.use('/api/estados-pieza', estadoPiezaRoutes);
app.use('/api/tipos-pieza', tipoPiezaRoutes);
app.use('/api/equipos-compatibles', equiposCompatiblesRoutes);
app.use('/api/estados-orden', estadoOrdenRoutes);
app.use('/api/detalles-orden', detalleOrdenRoutes);
app.use('/api/atributos-adicionales', atributosAdicionalesRoutes);
app.use('/api/pieza-equipo', piezaEquipoRoutes);
app.use('/api/valor-atributo', valorAtributoRoutes);
app.use('/api/lista-deseos', listaDeseosRoutes);
app.use('/api/carrito', carritoRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
