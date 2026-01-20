const DetalleOrden = require('../models/detalleOrdenModel');

const getAllDetalles = async (req, res, next) => {
    try {
        const detalles = await DetalleOrden.getAll();
        res.json(detalles);
    } catch (error) {
        next(error);
    }
};

const getDetalleById = async (req, res, next) => {
    try {
        const detalle = await DetalleOrden.getById(req.params.id);
        if (!detalle) {
            return res.status(404).json({ message: 'DetalleOrden not found' });
        }
        res.json(detalle);
    } catch (error) {
        next(error);
    }
};

const getDetallesByOrdenId = async (req, res, next) => {
    try {
        const detalles = await DetalleOrden.getByOrdenId(req.params.idOrden);
        res.json(detalles);
    } catch (error) {
        next(error);
    }
}

const createDetalle = async (req, res, next) => {
    try {
        const newDetalle = await DetalleOrden.create(req.body);
        res.status(201).json(newDetalle);
    } catch (error) {
        next(error);
    }
};

const updateDetalle = async (req, res, next) => {
    try {
        const updatedDetalle = await DetalleOrden.update(req.params.id, req.body);
        if (!updatedDetalle) {
            return res.status(404).json({ message: 'DetalleOrden not found' });
        }
        res.json(updatedDetalle);
    } catch (error) {
        next(error);
    }
};

const deleteDetalle = async (req, res, next) => {
    try {
        const deletedDetalle = await DetalleOrden.delete(req.params.id);
        if (!deletedDetalle) {
            return res.status(404).json({ message: 'DetalleOrden not found' });
        }
        res.json({ message: 'DetalleOrden deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDetalles,
    getDetalleById,
    getDetallesByOrdenId,
    createDetalle,
    updateDetalle,
    deleteDetalle
};
