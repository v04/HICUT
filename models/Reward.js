const mongoose = require('mongoose');
const rewardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  points: { type: Number, default: 0 },
  claimed: { type: Boolean, default: false },
  offer: String
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);