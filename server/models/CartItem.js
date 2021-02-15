const mongoose = require("mongoose"),
      autopopulate = require('mongoose-autopopulate')

const CartItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      autopopulate: true
    },
    quantity: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

CartItemSchema.plugin(autopopulate);
module.exports = mongoose.model("CartItem", CartItemSchema);
