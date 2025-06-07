const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
  pilot: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  hitchhiker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  distance: Number,
  duration: Number,
  coordinates: [[Number]], // Array of [lat, lng] for route
  rideHash: { type: String, unique: true },
  status: { type: String, enum: ['requested', 'accepted', 'completed', 'cancelled'], default: 'requested' }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);