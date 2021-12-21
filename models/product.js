const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxlength: 32,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean,
    required: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
  },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catagory',
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);
module.exports = Product;