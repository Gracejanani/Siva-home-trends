const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getRelatedProducts,
  searchProducts,
} = require('../controllers/productController');

// Named / special endpoints BEFORE /:id wildcard
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/search', searchProducts);

// Collection
router.get('/', getProducts);

// Single product
router.get('/:id', getProductById);

// Related products
router.get('/:id/related', getRelatedProducts);

module.exports = router;
