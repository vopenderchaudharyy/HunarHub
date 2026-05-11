const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getSellerOrders, updateOrderStatus, getOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/seller-orders', getSellerOrders);
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
