const express = require('express');
const router = express.Router();
const atributosAdicionalesController = require('../controllers/atributosAdicionalesController');

router.get('/', atributosAdicionalesController.getAll);
router.get('/:id', atributosAdicionalesController.getById);
router.post('/', atributosAdicionalesController.create);
router.put('/:id', atributosAdicionalesController.update);
router.delete('/:id', atributosAdicionalesController.delete);

module.exports = router;
