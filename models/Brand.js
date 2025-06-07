const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rewardType: String,
  stock: Number,
  city: String
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);