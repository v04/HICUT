const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const { checkAuth } = require('../middlewares/auth');
const { calculateDistance } = require('../utils/geo');

router.post('/request', checkAuth, async (req, res) => {
  try {
    const { from, to, hitchhiker } = req.body;
    const ride = new Ride({ from, to, hitchhiker, status: 'requested' });
    await ride.save();
    // Notify nearby pilots (using GeoFire or similar)
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/accept', checkAuth, async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    ride.pilot = req.user.id;
    ride.status = 'accepted';
    await ride.save();
    // Notify hitchhiker via FCM
    res.json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/complete', checkAuth, async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    if (ride.pilot.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only the pilot can complete the ride' });
    }
    ride.status = 'completed';
    await ride.save();
    res.json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*router.post('/request', checkAuth, async (req, res) => {
  try {
    const { from, to, hitchhiker } = req.body;
    const ride = new Ride({ from, to, hitchhiker, status: 'requested' });
    await ride.save();
    // Notify nearby pilots (using GeoFire or similar)
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

router.get('/history', checkAuth, async (req, res) => {
  try {
    const rides = await Ride.find({
      $or: [{ pilot: req.user.id }, { hitchhiker: req.user.id }]
    }).populate('pilot hitchhiker');
    res.json(rides);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;