const Orden = require('../models/ordenModel');

const getAllOrdenes = async (req, res, next) => {
    try {
        const ordenes = await Orden.getAll();
        res.json(ordenes);
    } catch (error) {
        next(error);
    }
};

const getOrdenById = async (req, res, next) => {
    try {
        const orden = await Orden.getById(req.params.id);
        if (!orden) {
            return res.status(404).json({ message: 'Orden not found' });
        }
        res.json(orden);
    } catch (error) {
        next(error);
    }
};

const createOrden = async (req, res, next) => {
    try {
        if (req.body.Total === undefined) {
            req.body.Total = 0;
        }
        const newOrden = await Orden.create(req.body);
        res.status(201).json(newOrden);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOrdenes,
    getOrdenById,
    createOrden
};
