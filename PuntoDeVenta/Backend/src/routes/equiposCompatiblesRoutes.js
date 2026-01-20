const express = require('express');
const router = express.Router();
const equiposCompatiblesController = require('../controllers/equiposCompatiblesController');

router.get('/', equiposCompatiblesController.getAll);
router.get('/:id', equiposCompatiblesController.getById);
router.post('/', equiposCompatiblesController.create);
router.put('/:id', equiposCompatiblesController.update);
router.delete('/:id', equiposCompatiblesController.delete);

module.exports = router;
