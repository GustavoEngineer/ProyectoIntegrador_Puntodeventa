const AtributosAdicionales = require('../models/atributosAdicionalesModel');

const atributosAdicionalesController = {
    getAll: async (req, res) => {
        try {
            const data = await AtributosAdicionales.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const data = await AtributosAdicionales.getById(req.params.id);
            if (!data) return res.status(404).json({ error: 'Not found' });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await AtributosAdicionales.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await AtributosAdicionales.update(req.params.id, req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await AtributosAdicionales.delete(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = atributosAdicionalesController;
