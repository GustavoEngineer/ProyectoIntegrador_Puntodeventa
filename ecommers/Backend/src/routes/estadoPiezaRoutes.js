const express = require('express');
const router = express.Router();
const estadoPiezaController = require('../controllers/estadoPiezaController');

router.get('/', estadoPiezaController.getAll);
router.get('/:id', estadoPiezaController.getById);
router.post('/', estadoPiezaController.create);
router.put('/:id', estadoPiezaController.update);
router.delete('/:id', estadoPiezaController.delete);

module.exports = router;
