const Carrito = require('../models/carritoModel');

const getCart = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const cart = await Carrito.getByUsuario(id_usuario);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

const addToCart = async (req, res, next) => {
    try {
        const { Id_Usuario, Id_Pieza, Cantidad, Precio } = req.body;

        if (!Id_Usuario || !Id_Pieza || !Cantidad || !Precio) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const item = await Carrito.add(Id_Usuario, Id_Pieza, Cantidad, Precio);
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        const { Cantidad } = req.body;

        if (Cantidad === undefined || Cantidad <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const item = await Carrito.update(id_usuario, id_pieza, Cantidad);
        res.json(item);
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const { id_usuario, id_pieza } = req.params;
        await Carrito.remove(id_usuario, id_pieza);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        await Carrito.clear(id_usuario);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
