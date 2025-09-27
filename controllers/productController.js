const prisma = require('../db');

// Obtener todos los productos (opcional paginado)
const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.products.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Crear producto
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const created = await prisma.products.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock || 0),
        category: categoryId ? { connect: { id: Number(categoryId) } } : undefined,
        user: req.user ? { connect: { id: req.user.id } } : undefined
      }
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// Conteo de todos los productos
const countProducts = async (req, res, next) => {
  try {
    const count = await prisma.products.count();
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

// Sumatoria del costo (precio * stock) o solo sumatoria de price según se pida
const sumPrices = async (req, res, next) => {
  try {
    // sumatoria solo de precios
    const result = await prisma.products.aggregate({
      _sum: { price: true },
    });
    // Si quieres sum(price * stock) debes hacerlo a nivel de query raw
    const sumPrice = result._sum.price || 0;
    res.json({ sumPrice: sumPrice.toString() });
  } catch (error) {
    next(error);
  }
};

// Sumatoria del valor total de inventario: SUM(price * stock)
const sumInventoryValue = async (req, res, next) => {
  try {
    const raw = await prisma.$queryRawUnsafe(`
      SELECT COALESCE(SUM(price * stock), 0)::numeric(10,2) as total
      FROM products;
    `);
    // raw devuelve array en Postgres prisma -> tomar raw[0].total
    const total = raw[0] ? raw[0].total : '0.00';
    res.json({ inventoryValue: total.toString() });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  countProducts,
  sumPrices,
  sumInventoryValue,
};
