const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  shippingCharge: {
    type: Number,
  },
  productImg: [
    {
      type: String,
    },
  ],
  total:{
    type:Number
  }
});

module.exports = ProductModel = mongoose.model("Product", productSchema);
