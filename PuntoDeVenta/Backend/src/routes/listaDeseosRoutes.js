const express = require('express');
const router = express.Router();
const listaDeseosController = require('../controllers/listaDeseosController');

// GET all items for a user
router.get('/:id_usuario', listaDeseosController.getWishlist);

// POST add item
router.post('/', listaDeseosController.addToWishlist);

// DELETE remove item
router.delete('/:id_usuario/:id_pieza', listaDeseosController.removeFromWishlist);

// GET check status (optional helper)
router.get('/check/:id_usuario/:id_pieza', listaDeseosController.checkWishlistStatus);

module.exports = router;
