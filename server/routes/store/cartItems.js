const express = require("express"),
  router = express.Router(),
  responseConstants = require("../../config/constants"),
  CartItem = require("../../models/CartItem");

router
  .route("/")
  .get(function(req, res) {
    CartItem.find(function(err, cartItems) {
      if (err) {
        console.log("Carts find error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        items: cartItems
      });
    });
  })
  .post(function(req, res) {
    const cartItem = new CartItem(req.body);

    cartItem.save(function(err) {
      if (err) {
        console.log("cart save error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      } else {
        res.status(201).json({
          code: responseConstants.SUCCESS_CODE,
          item: cartItem
        });
      }
    });
  });

router
  .route("/:id")
  .get(function(req, res) {})
  .put(function(req, res) {})
  .delete(function(req, res) {
      const { id } = req.params;

      CartItem.findByIdAndRemove(id, function(err, cartItem) {
        if (err) {
          console.log(err);
          return res.status(200).json({
            ...responseConstants.SERVER_ERROR_OBJECT
          });
        }

        return res.status(200).json({
          code: responseConstants.SUCCESS_CODE,
          item: cartItem
        });
      });
  });

module.exports = router;
