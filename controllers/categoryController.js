const prisma = require('../db');

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const cat = await prisma.categories.create({
      data: { name, description },
    });
    res.status(201).json(cat);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const cats = await prisma.categories.findMany({
      include: { products: true },
    });
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getCategories };
