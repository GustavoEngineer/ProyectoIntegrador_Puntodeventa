const express = require('express');
const router = express.Router();
const piezaEquipoController = require('../controllers/piezaEquipoController');

router.get('/', piezaEquipoController.getAllPiezaEquipos);
router.get('/pieza/:idPieza', piezaEquipoController.getPiezaEquipos);
router.post('/', piezaEquipoController.createPiezaEquipo);
router.put('/:idPieza/:idEquipo', piezaEquipoController.updatePiezaEquipo);
router.delete('/:idPieza/:idEquipo', piezaEquipoController.deletePiezaEquipo);

module.exports = router;
