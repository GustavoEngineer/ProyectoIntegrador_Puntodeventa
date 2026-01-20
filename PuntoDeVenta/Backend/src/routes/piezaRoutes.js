const express = require('express');
const router = express.Router();
const piezaController = require('../controllers/piezaController');

router.get('/', piezaController.getAllPiezas);
router.get('/:id', piezaController.getPiezaById);
router.post('/', piezaController.createPieza);
router.put('/:id', piezaController.updatePieza);
router.delete('/:id', piezaController.deletePieza);

module.exports = router;
