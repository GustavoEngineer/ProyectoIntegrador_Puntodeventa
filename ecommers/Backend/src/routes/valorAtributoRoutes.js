const express = require('express');
const router = express.Router();
const valorAtributoController = require('../controllers/valorAtributoController');

router.get('/', valorAtributoController.getAllValores);
router.get('/pieza/:idPieza', valorAtributoController.getValoresByPieza); // Get all values for a piece
router.get('/:idPieza/:idAtributo', valorAtributoController.getValorById);
router.post('/', valorAtributoController.createValor);
router.put('/:idPieza/:idAtributo', valorAtributoController.updateValor);
router.delete('/:idPieza/:idAtributo', valorAtributoController.deleteValor);

module.exports = router;
