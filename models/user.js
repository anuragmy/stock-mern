const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
module.exports = User;