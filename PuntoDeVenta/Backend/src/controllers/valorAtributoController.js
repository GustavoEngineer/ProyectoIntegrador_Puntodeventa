const ValorAtributo = require('../models/valorAtributoModel');

const getAllValores = async (req, res, next) => {
    try {
        const valores = await ValorAtributo.getAll();
        res.json(valores);
    } catch (error) {
        next(error);
    }
};

const getValorById = async (req, res, next) => {
    try {
        const { idPieza, idAtributo } = req.params;
        const valor = await ValorAtributo.getById(idPieza, idAtributo);
        if (!valor) {
            return res.status(404).json({ message: 'Value not found' });
        }
        res.json(valor);
    } catch (error) {
        next(error);
    }
};

const getValoresByPieza = async (req, res, next) => {
    try {
        const valores = await ValorAtributo.getByPiezaId(req.params.idPieza);
        res.json(valores);
    } catch (error) {
        next(error);
    }
};

const createValor = async (req, res, next) => {
    try {
        const newValor = await ValorAtributo.create(req.body);
        res.status(201).json(newValor);
    } catch (error) {
        if (error.code === '23505') { // Unique violation
            return res.status(400).json({ message: 'Value for this attribute already exists for this part' });
        }
        next(error);
    }
};

const updateValor = async (req, res, next) => {
    try {
        const { idPieza, idAtributo } = req.params;
        const updatedValor = await ValorAtributo.update(idPieza, idAtributo, req.body);
        if (!updatedValor) {
            return res.status(404).json({ message: 'Value not found' });
        }
        res.json(updatedValor);
    } catch (error) {
        next(error);
    }
};

const deleteValor = async (req, res, next) => {
    try {
        const { idPieza, idAtributo } = req.params;
        const deletedValor = await ValorAtributo.delete(idPieza, idAtributo);
        if (!deletedValor) {
            return res.status(404).json({ message: 'Value not found' });
        }
        res.json({ message: 'Value deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllValores,
    getValorById,
    getValoresByPieza,
    createValor,
    updateValor,
    deleteValor
};
