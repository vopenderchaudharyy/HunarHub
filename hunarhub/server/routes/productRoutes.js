const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getMyProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/', protect, createProduct);
router.get('/my-products', protect, getMyProducts);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
