const Pieza = require('../models/piezaModel');

const getAllPiezas = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 25;
        const categoryId = req.query.category;
        const equipoId = req.query.equipo;
        const searchQuery = req.query.search;

        const { data, count } = await Pieza.getAll(page, limit, { categoryId, equipoId, searchQuery });

        res.json({
            data,
            meta: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

const getPiezaById = async (req, res, next) => {
    try {
        const pieza = await Pieza.getById(req.params.id);
        if (!pieza) {
            return res.status(404).json({ message: 'Pieza not found' });
        }
        res.json(pieza);
    } catch (error) {
        next(error);
    }
};

const createPieza = async (req, res, next) => {
    try {
        const newPieza = await Pieza.create(req.body);
        res.status(201).json(newPieza);
    } catch (error) {
        next(error);
    }
};

const updatePieza = async (req, res, next) => {
    try {
        const updatedPieza = await Pieza.update(req.params.id, req.body);
        if (!updatedPieza) {
            return res.status(404).json({ message: 'Pieza not found' });
        }
        res.json(updatedPieza);
    } catch (error) {
        next(error);
    }
};

const deletePieza = async (req, res, next) => {
    try {
        const deletedPieza = await Pieza.delete(req.params.id);
        if (!deletedPieza) {
            return res.status(404).json({ message: 'Pieza not found' });
        }
        res.json({ message: 'Pieza deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPiezas,
    getPiezaById,
    createPieza,
    updatePieza,
    deletePieza
};
