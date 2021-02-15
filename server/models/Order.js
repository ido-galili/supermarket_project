const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryCity: {
        type: String,
        required: true 
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    creditCardLastDigits: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", OrderSchema);
