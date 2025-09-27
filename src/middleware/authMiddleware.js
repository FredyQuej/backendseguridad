const jwt = require('jsonwebtoken');
const prisma = require('../../db');

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.users.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true },
      });
      if (!req.user) {
        res.status(401);
        throw new Error('No autorizado, usuario no encontrado.');
      }
      return next();
    }
    res.status(401);
    throw new Error('No autorizado, no se proporcionó un token.');
  } catch (error) {
    res.status(401);
    next(new Error('No autorizado, el token falló.'));
  }
};

module.exports = { protect };
