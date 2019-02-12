const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();

router.get("/order", (req, res, next) => {
  Order.find()
    .then(order => {
      res.json(order);
    })
    .catch(err => console.log(err.message));
});

router.post("/order", (req, res, next) => {
  const data = req.body
  console.log(data.orderData)

  let order = new Order();
  order.customer.name = data.orderData.name;
  order.customer.email = data.orderData.email;
  order.customer.address.country = data.orderData.country;
  order.customer.address.zipCode = data.orderData.zipCode;
  order.customer.address.street = data.orderData.street;
  order.salad = data.ingredients.salad;
  order.bacon = data.ingredients.bacon;
  order.cheese = data.ingredients.cheese;
  order.meat = data.ingredients.meat;
  order.totalPrice = data.totalPrice;

  return order.save()
    .then(order => {
      res.json(order);
    })
    .catch(err => console.log(err.message));
});

router.delete("/order/:id", (req, res, next) => {
  return Order.findByIdAndDelete(req.params.id)
    .then(order => {
      res.json(order);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
