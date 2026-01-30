const express = require('express');
const router = express.Router();
const estadoOrdenController = require('../controllers/estadoOrdenController');

router.get('/', estadoOrdenController.getAll);
router.get('/:id', estadoOrdenController.getById);
router.post('/', estadoOrdenController.create);
router.put('/:id', estadoOrdenController.update);
router.delete('/:id', estadoOrdenController.delete);

module.exports = router;
