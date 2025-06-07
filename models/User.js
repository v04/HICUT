// hitchhike-backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true }, // Ensure password field is required
  role: { type: String, enum: ['hitchhiker', 'pilot', 'admin'], required: true },
  profile: {
    name: String,
    avatar: String,
    verified: { type: Boolean, default: false }
  },
  rideHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);