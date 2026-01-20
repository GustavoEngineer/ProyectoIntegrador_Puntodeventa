const express = require('express');
const router = express.Router();
const tipoPiezaController = require('../controllers/tipoPiezaController');

router.get('/', tipoPiezaController.getAll);
router.get('/:id', tipoPiezaController.getById);
router.post('/', tipoPiezaController.create);
router.put('/:id', tipoPiezaController.update);
router.delete('/:id', tipoPiezaController.delete);

module.exports = router;
