const prisma = require('../db');

// @desc    Obtener todos los productos
const getProducts = async (req, res, next) => {
    try {
        // En una aplicación real, aquí iría la lógica para obtener productos
        res.json({ message: 'Ruta de productos protegida funcionando.', user: req.user });
    } catch (error) {
        next(error);
    }
};

// @desc    Crear un producto
const createProduct = async (req, res, next) => {
    try {
        // Lógica para crear un producto
        res.status(201).json({ message: 'Producto creado exitosamente por ' + req.user.email });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    createProduct,
};
