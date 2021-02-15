const express = require("express"),
  router = express.Router(),
  productsRoutes = require("./store/products"),
  ordersRoutes = require("./store/orders"),
  categoriesRoutes = require("./store/categories"),
  cartItemsRoutes = require("./store/cartItems"),
  cartsRoutes = require("./store/carts"),
  Product = require("../models/Product"),
  Order = require("../models/Order"),
  CartItem = require("../models/CartItem"),
  responseConstants = require("../config/constants"),
  fs = require('fs');

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/carts", cartsRoutes);
router.use("/cart-items", cartItemsRoutes);

router.get("/search", function(req, res) {
  const { phrase } = req.query;

  Product.find(
    { $text: { $search: phrase } },
  function(err, result) {
    if (err) {
      return res.status(200).json({
        ...responseConstants.SERVER_ERROR_OBJECT
      });
    }

    return res.status(200).json({
      code: responseConstants.SUCCESS_CODE,
      items: result
    });
  });
});

router.get("/productsByCategory/:categoryId", function(req, res) { 
  const { categoryId } = req.params;

  Product.find({ categoryId: categoryId }, function(err, docs) {
    if (err) {
      console.log("Get Products by category id Error", err);
      return res.status(200).json({
        ...responseConstants.SERVER_ERROR_OBJECT
      });
    }

    return res.status(200).json({
      code: responseConstants.SUCCESS_CODE,
      items: docs
    });
  });
});

router.get("/total_products", function(req, res) {
  Product.estimatedDocumentCount(function(err, count) {
    if (err) {
      console.log("Products count error", err);
      return res.status(200).json({
        ...responseConstants.SERVER_ERROR_OBJECT
      });
    }

    return res.status(200).json({
      code: responseConstants.SUCCESS_CODE,
      count: count
    });
  });
});

router.get("/total_orders", function(req, res) {
  Order.estimatedDocumentCount(function(err, count) {
    if (err) {
      console.log("Orders count error", err);
      return res.status(200).json({
        ...responseConstants.SERVER_ERROR_OBJECT
      });
    }

    return res.status(200).json({
      code: responseConstants.SUCCESS_CODE,
      count: count
    });
  });
});

router.get("/order_receipt/:cartId", async function(req, res){
  const {cartId} = req.params;
  let totalCart = 0;
  const fileName = `receipt-${cartId}.txt`;

  fs.open(fileName, "w", function(err, file) {
    if (err) throw err;
    console.log("Saved!");
  });

  const header = "   |       Name       |   Price   |  Quantity  |  Total-Price\n\n"

  fs.appendFile(fileName, header, function(err) {
    if (err) throw err;
  });

  await CartItem.find({cart: cartId}, function(err, items){
    console.log("ITEMS, items", items);
    if(err) throw(err);

    items.forEach(function(item ,index) {
      const price = item.product.price;
      const name = item.product.name;
      const quantity = item.quantity
      totalCart += price;

      const str = `${index}   |   ${name}    |    ${price}    |   ${quantity}  |  ${quantity * price}\n`
      fs.appendFile(fileName, str, function(err) {
        if (err) throw err;
      });
    })
  })

  const totalStr = `\n\nTotal: ${totalCart} NIS`;
  fs.appendFile(fileName, totalStr, function(err) {
    if (err) throw err;
  }); 

  fs.open(fileName, 'r', function(err, file){
    if(err) {
      console.log("ERROR")
    } else {
      res.download(`./${fileName}`);
    }
  })
  
  
})

module.exports = router;
