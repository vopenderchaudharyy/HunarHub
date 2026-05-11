const express = require('express');
const router = express.Router();
const {
  getSellers, getSeller, createSellerProfile,
  updateSellerProfile, getFeaturedSellers, getMySellerProfile
} = require('../controllers/sellerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSellers);
router.get('/featured', getFeaturedSellers);
router.get('/my-profile', protect, getMySellerProfile);
router.post('/', protect, createSellerProfile);
router.get('/:id', getSeller);
router.put('/:id', protect, updateSellerProfile);

module.exports = router;
