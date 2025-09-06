const { PrismaClient } = require('@prisma/client');

// Se crea una única instancia del cliente de Prisma para ser usada en toda la aplicación.
const prisma = new PrismaClient();

module.exports = prisma;
