const TipoPieza = require('../models/tipoPiezaModel');

const tipoPiezaController = {
    getAll: async (req, res) => {
        try {
            const data = await TipoPieza.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const data = await TipoPieza.getById(req.params.id);
            if (!data) return res.status(404).json({ error: 'Not found' });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await TipoPieza.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await TipoPieza.update(req.params.id, req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await TipoPieza.delete(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = tipoPiezaController;
