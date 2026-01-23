const ListaDeseos = require('../models/listaDeseosModel');

const getWishlist = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const wishlist = await ListaDeseos.getAllByUsuario(id_usuario);
        res.json(wishlist);
    } catch (error) {
        next(error);
    }
};

const addToWishlist = async (req, res, next) => {
    try {
        const { Id_Usuario, Id_Pieza } = req.body;

        if (!Id_Usuario || !Id_Pieza) {
            return res.status(400).json({ message: 'Id_Usuario and Id_Pieza are required' });
        }

        // Check if already exists to avoid unique constraint error if preferred, 
        // or just let it fail. Let's check first for cleaner response.
        const existing = await ListaDeseos.check(Id_Usuario, Id_Pieza);
        if (existing) {
            return res.status(409).json({ message: 'Item already in wishlist' });
        }

        const newItem = await ListaDeseos.add(Id_Usuario, Id_Pieza);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

const removeFromWishlist = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        await ListaDeseos.remove(id_usuario, id_pieza);
        res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
        next(error);
    }
};

const checkWishlistStatus = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        const item = await ListaDeseos.check(id_usuario, id_pieza);
        res.json({ inWishlist: !!item });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkWishlistStatus
};
