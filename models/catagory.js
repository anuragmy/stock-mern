const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxlength: 32,
  },
}, { timestamps: true });

const Catagory = mongoose.model("catagory", catagorySchema);
module.exports = Catagory;