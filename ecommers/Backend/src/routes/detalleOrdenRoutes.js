const express = require('express');
const router = express.Router();
const detalleOrdenController = require('../controllers/detalleOrdenController');

router.get('/', detalleOrdenController.getAllDetalles);
router.get('/:id', detalleOrdenController.getDetalleById);
router.get('/orden/:idOrden', detalleOrdenController.getDetallesByOrdenId); // Get details for a specific order
router.post('/', detalleOrdenController.createDetalle);
router.put('/:id', detalleOrdenController.updateDetalle);
router.delete('/:id', detalleOrdenController.deleteDetalle);

module.exports = router;
