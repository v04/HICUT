// hitchhike-backend/routes/brands.js
const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const { checkAuth, checkAdmin } = require('../middlewares/auth');

router.post('/', checkAuth, checkAdmin, async (req, res) => {
  try {
    const { name, rewardType, stock, city } = req.body;
    const brand = new Brand({ name, rewardType, stock, city });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/reward', checkAuth, async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand || brand.stock <= 0) return res.status(400).json({ error: 'Reward unavailable' });
    brand.stock -= 1;
    await brand.save();
    // Create reward logic here (e.g., save to Reward model)
    res.json({ message: 'Reward claimed', brand });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;