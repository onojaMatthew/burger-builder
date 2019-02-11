const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  salad: { type: Number },
  bacon: { type: Number },
  cheese: { type: Number },
  meat: { type: Number },
  totalPrice: { type: Number },
  customer: {
    name: { type: String },
    email: { type: String },
    deliveryMethod: { type: String },
    address: {
      street: { type: String },
      zipCode: { type: String },
      country: { type: String }
    }
  }
});

const Order = mongoose.model("Order", OrderSchema);

exports.Order = Order;

