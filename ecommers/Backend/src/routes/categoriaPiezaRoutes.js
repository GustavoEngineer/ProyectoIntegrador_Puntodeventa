const express = require('express');
const router = express.Router();
const categoriaPiezaController = require('../controllers/categoriaPiezaController');

router.get('/', categoriaPiezaController.getAll);
router.get('/:id', categoriaPiezaController.getById);
router.post('/', categoriaPiezaController.create);
router.put('/:id', categoriaPiezaController.update);
router.delete('/:id', categoriaPiezaController.delete);

module.exports = router;
