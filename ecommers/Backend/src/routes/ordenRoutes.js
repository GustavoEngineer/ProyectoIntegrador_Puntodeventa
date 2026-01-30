const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

router.getAllOrdenes = ordenController.getAllOrdenes; // Hack for consistency if needed, but standard router below
router.get('/', ordenController.getAllOrdenes);
router.get('/:id', ordenController.getOrdenById);
router.post('/', ordenController.createOrden);

module.exports = router;
