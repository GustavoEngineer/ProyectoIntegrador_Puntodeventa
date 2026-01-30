const Usuario = require('../models/usuarioModel');

const getAllUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

const getUsuarioById = async (req, res, next) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

const createUsuario = async (req, res, next) => {
    try {
        // Default Id_TipoUsuario to 2 unless explicitly set to 1
        let { Id_TipoUsuario } = req.body;
        const roleId = Number(Id_TipoUsuario);

        if (roleId === 1) {
            req.body.Id_TipoUsuario = 1;
        } else {
            req.body.Id_TipoUsuario = 2;
        }

        const newUsuario = await Usuario.create(req.body);
        res.status(201).json(newUsuario);
    } catch (error) {
        next(error);
    }
};

const updateUsuario = async (req, res, next) => {
    try {
        const updatedUsuario = await Usuario.update(req.params.id, req.body);
        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json(updatedUsuario);
    } catch (error) {
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
    try {
        const deletedUsuario = await Usuario.delete(req.params.id);
        if (!deletedUsuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json({ message: 'Usuario deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const usuario = await Usuario.getByEmail(email);

        if (!usuario) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // WARNING: In a production environment, you must use hashing (bcrypt, etc.)
        // This compares plain text as requested for this integration level
        if (usuario.Contraseña !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return user data (excluding sensitive info if possible, but keeping it simple for now)
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login
};
