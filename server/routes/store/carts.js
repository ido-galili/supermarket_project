const express = require("express"),
  router = express.Router(),
  responseConstants = require("../../config/constants"),
  Cart = require("../../models/Cart");

router
  .route("/")
  .get(function(req, res) {
    Cart.find(function(err, carts) {
      if (err) {
        console.log("Carts find error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        items: carts
      });
    });
  })
  .post(function(req, res) {
    const cart = new Cart(req.body);

    cart.save(function(err) {
      if (err) {
        console.log("cart save error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      } else {
        res.status(201).json({
          code: responseConstants.SUCCESS_CODE,
          item: cart
        });
      }
    });
  });

// router
//   .route("/:id")
//   .get(function(req, res) {})
//   .put(function(req, res) {})
//   .delete(function(req, res) {});

module.exports = router;
