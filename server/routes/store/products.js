const express = require("express"),
  router = express.Router(),
  responseConstants = require("../../config/constants"),
  Product = require('../../models/Product');

router
  .route("/")
  // Get All Products
  // Accept filter by category id
  .get(function(req, res) {
    const { category } = req.body;

    // All products
    Product.find(function(err, products) {
      if (err) {
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        items: products
      });
    });
  })
  // Insert a new product
  .post(function(req, res) {
    const {categoryId, image, name, price} = req.body;
    const product = new Product({
      categoryId,
      image,
      name,
      price
    });

    product.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(201).json({
        code: responseConstants.SUCCESS_CODE,
        item: product
      });
    });
  });

router
  .route("/:id")
  // Get product by id
  .get(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
      if (err) {
        console.log("Get Products by id Error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: product
      });
    });
  })
  .put(function(req, res) {
    const { id } = req.params;
    
    console.log("id", id);

    Product.findByIdAndUpdate(id, req.body, { new: true }, function(
      err,
      product
    ) {
      if (err) {
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: product
      });
    });
  })
  .delete(function(req, res) {
    const { _id } = req.params;

    Product.findByIdAndRemove(_id, function(err, product) {
      if (err) {
        console.log(err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: product
      });
    });
  });

module.exports = router;
