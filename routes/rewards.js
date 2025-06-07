// hitchhike-backend/routes/rewards.js
const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const Ride = require('../models/Ride');
const Brand = require('../models/Brand');
const User = require('../models/User');
const { checkAuth } = require('../middlewares/auth');

router.get('/progress', checkAuth, async (req, res) => {
  try {
    const rides = await Ride.countDocuments({
      $or: [{ pilot: req.user.id }, { hitchhiker: req.user.id }],
      status: 'completed'
    });
    const rewards = await Reward.find({ user: req.user.id });
    const points = rides * 10; // 10 points per ride
    res.json({ rides, points, rewards });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/claim', checkAuth, async (req, res) => {
  try {
    const { brandId } = req.body;
    if (!brandId) return res.status(400).json({ error: 'brandId is required' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const brand = await Brand.findById(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    const rides = await Ride.countDocuments({
      $or: [{ pilot: user._id }, { hitchhiker: user._id }],
      status: 'completed'
    });
    const points = rides * 10;
    if (points < 50) return res.status(400).json({ error: 'Need 50 points to claim' });
    if (brand.stock < 1) return res.status(400).json({ error: 'Reward out of stock' });
    const reward = new Reward({
      user: user._id,
      brand: brand._id,
      pointsRedeemed: 50,
      rewardType: brand.rewardType,
      status: 'pending'
    });
    brand.stock -= 1;
    await brand.save();
    await reward.save();
    user.rewards.push(reward._id);
    await user.save();
    // Notify user via FCM
    res.status(201).json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/offers', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;