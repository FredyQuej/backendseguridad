const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  countProducts,
  sumPrices,
  sumInventoryValue
} = require('../../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProducts);
router.post('/', protect, createProduct);

router.get('/count', protect, countProducts);
router.get('/sum/prices', protect, sumPrices);
router.get('/sum/inventory', protect, sumInventoryValue);

module.exports = router;

