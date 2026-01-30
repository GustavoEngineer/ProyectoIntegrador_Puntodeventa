const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// GET reviews for a piece
router.get('/pieza/:id_pieza', resenaController.getReviewsByPieza);

// GET reviews for a user
router.get('/usuario/:id_usuario', resenaController.getReviewsByUsuario);

// POST create a review
router.post('/', resenaController.createReview);

// PUT update a review
router.put('/:id_usuario/:id_pieza', resenaController.updateReview);

// DELETE delete a review
router.delete('/:id_usuario/:id_pieza', resenaController.deleteReview);

module.exports = router;
