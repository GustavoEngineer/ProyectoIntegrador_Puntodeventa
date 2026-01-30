const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// GET cart for a user
router.get('/:id_usuario', carritoController.getCart);

// POST add item to cart
router.post('/', carritoController.addToCart);

// PUT update item quantity
router.put('/:id_usuario/:id_pieza', carritoController.updateCartItem);

// DELETE remove item from cart
router.delete('/:id_usuario/:id_pieza', carritoController.removeFromCart);

// DELETE clear cart
router.delete('/:id_usuario', carritoController.clearCart);

module.exports = router;
