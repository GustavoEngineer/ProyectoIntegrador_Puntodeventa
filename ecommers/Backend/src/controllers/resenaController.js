const Resena = require('../models/resenaModel');

const getReviewsByPieza = async (req, res, next) => {
    try {
        const { id_pieza } = req.params;
        const reviews = await Resena.getByPieza(id_pieza);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

const getReviewsByUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const reviews = await Resena.getByUsuario(id_usuario);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

const createReview = async (req, res, next) => {
    try {
        const { Id_Usuario, Id_Pieza, Calificacion, Comentario } = req.body;

        if (!Id_Usuario || !Id_Pieza || !Calificacion) {
            return res.status(400).json({ message: 'Missing required fields: Id_Usuario, Id_Pieza, Calificacion' });
        }

        if (Calificacion < 1 || Calificacion > 5) {
            return res.status(400).json({ message: 'Calificacion must be between 1 and 5' });
        }

        const newReview = await Resena.create({ Id_Usuario, Id_Pieza, Calificacion, Comentario });
        res.status(201).json(newReview);
    } catch (error) {
        // Check for duplicate key error (code 23505 in Postgres, but Supabase might return different error structure)
        if (error.code === '23505') {
            return res.status(409).json({ message: 'User has already reviewed this product' });
        }
        next(error);
    }
};

const updateReview = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        const { Calificacion, Comentario } = req.body;

        if (!Calificacion && !Comentario) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        if (Calificacion && (Calificacion < 1 || Calificacion > 5)) {
            return res.status(400).json({ message: 'Calificacion must be between 1 and 5' });
        }

        const updatedReview = await Resena.update(id_usuario, id_pieza, { Calificacion, Comentario });
        res.json(updatedReview);
    } catch (error) {
        next(error);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        await Resena.delete(id_usuario, id_pieza);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReviewsByPieza,
    getReviewsByUsuario,
    createReview,
    updateReview,
    deleteReview
};
