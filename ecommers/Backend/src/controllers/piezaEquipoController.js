const PiezaEquipo = require('../models/piezaEquipoModel');

const getAllPiezaEquipos = async (req, res, next) => {
    try {
        const relations = await PiezaEquipo.getAll();
        res.json(relations);
    } catch (error) {
        next(error);
    }
};

const createPiezaEquipo = async (req, res, next) => {
    try {
        const newRelation = await PiezaEquipo.create(req.body);
        res.status(201).json(newRelation);
    } catch (error) {
        if (error.code === '23505') { // Unique violation
            return res.status(400).json({ message: 'Relation already exists' });
        }
        next(error);
    }
};

const updatePiezaEquipo = async (req, res, next) => {
    try {
        const { idPieza, idEquipo } = req.params;
        const updatedRelation = await PiezaEquipo.update(idPieza, idEquipo, req.body);
        if (!updatedRelation) {
            return res.status(404).json({ message: 'Relation not found' });
        }
        res.json(updatedRelation);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'Target relation key already exists' });
        }
        next(error);
    }
};

const deletePiezaEquipo = async (req, res, next) => {
    try {
        const { idPieza, idEquipo } = req.params;
        await PiezaEquipo.delete(idPieza, idEquipo);
        res.json({ message: 'Relation deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getPiezaEquipos = async (req, res, next) => {
    try {
        const { idPieza } = req.params;
        const relations = await PiezaEquipo.getByPiezaId(idPieza);
        res.json(relations);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPiezaEquipos,
    getPiezaEquipos,
    createPiezaEquipo,
    updatePiezaEquipo,
    deletePiezaEquipo
};
