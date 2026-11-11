const express = require('express');
const router = express.Router();

const { createOrder, getOrderById, getUserOrders, trackOrder } = require('../controllers/orderController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// Track order by order number (public — no auth required)
router.get('/track/:orderNumber', trackOrder);

// My orders — authenticated
router.get('/my-orders', requireAuth, getUserOrders);

// Place a new order (optionalAuth: attaches user_id when logged in)
router.post('/', optionalAuth, createOrder);

// Order detail (optionalAuth: verifies ownership if logged in)
router.get('/:id', optionalAuth, getOrderById);

module.exports = router;
