const jwt = require('jsonwebtoken');
const prisma = require('../db');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(process.env.JWT_SECRET);
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await prisma.users.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true },
            });

            if (!req.user) {
                res.status(401);
                throw new Error('No autorizado, usuario no encontrado.');
            }

            next();
        } catch (error) {
            res.status(401);
            next(new Error('No autorizado, el token falló.'));
        }
    }

    if (!token) {
        res.status(401);
        next(new Error('No autorizado, no se proporcionó un token.'));
    }
};

module.exports = { protect };