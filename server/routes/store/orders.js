const express = require("express"),
  router = express.Router(),
  Order = require("../../models/Order"),
  responseConstants = require("../../config/constants");

// /**
//  * @swagger
//  * /api/store/orders:
//  *    get:
//  *     description: Get all orders
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *      - name: username
//  *        description: Username email.
//  *        required: true
//  *        type: string
//  *     responses:
//  *       200:
//  *         description: An array of orders
//  *         schema:
//  *           $ref: '#/definitions/Orders'
//  *         examples:
//  *          application/json: {
//  *            code: "SUCCESS",
//  *            items: []
//  *          }
//  */

/**
 * @swagger
 * definitions:
 *   Order:
 *     required:
 *       - customer
 *       - cart
 *       - totalPrice
 *       - deliveryCity
 *       - deliveryDate
 *       - creditCardLastDigits
 *     properties:
 *       customer:
 *         type: string
 *         example: customer ID
 *       cart:
 *         type: string
 *         example: cart ID
 *       totalPrice:
 *         type: number
 *       deliveryCity:
 *         type: string
 *       deliveryAddress:
 *         type: string
 *       deliveryDate:
 *         type: string
 *         format: date
 *       creditCardLastDigits:
 *         type: number
 *   Orders:
 *     properties:
 *       code:
 *         type: string
 *       items:
 *         type: array
 */

router
  .route("/")
  /**
   * @swagger
   * /api/store/orders:
   *    get:
   *     summary: Get all orders
   *     description: Get all orders
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of orders
   *         schema:
   *           $ref: '#/definitions/Orders'
   *         examples:
   *          application/json: {
   *            code: "SUCCESS",
   *            items: []
   *          }
   *       500:
   *         description: Server Error
   *         examples:
   *          application/json: {
   *            code: "ERROR",
   *            title: "Server connection error",
   *            message: "Please try again."
   *          }
   */
  .get(function(req, res) {
    Order.find(function(err, orders) {
      if (err) {
        console.log("Orders find error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        items: orders
      });
    });
  })
  /**
   * @swagger
   * /api/store/orders:
   *    post:
   *     summary: insert new order
   *     description: insert new order
   *     consumes:
   *      - application/json
   *     parameters:
   *       - in: body
   *         name: order
   *         description: The order to create.
   *         schema:
   *          $ref: '#/definitions/Order'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Succeful order insert
   *         schema:
   *           $ref: '#/definitions/Order'
   *         examples:
   *          application/json: {
   *            code: "SUCCESS",
   *            item: {}
   *          }
   *       500:
   *         description: Server Error
   *         examples:
   *          application/json: {
   *            code: "ERROR",
   *            title: "Server connection error",
   *            message: "Please try again."
   *          }
   */
  .post(function(req, res) {
    const { deliveryDate } = req.body;

    Order.find({ deliveryDate: deliveryDate }, function(err, items) {
      if (err) {
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      } else if (Array.isArray(items) && items.length >= 3) {
        return res.status(200).json({
          error: "ERROR",
          title: "Can't deliver in this date",
          message: "Please pick another date"
        });
      } else {
        const order = new Order(req.body);

        order.save(function(err) {
          if (err) {
            console.log("order save error", err);
            return res.status(200).json({
              ...responseConstants.SERVER_ERROR_OBJECT
            });
          } else {
            res.status(201).json({
              code: responseConstants.SUCCESS_CODE,
              item: order
            });
          }
        });
      }
    });
  });

// router
//   .route("/:id")
//   .get(function(req, res) {
//     const { id } = req.params;

//   })
//   .put(function(req, res) {})
//   .delete(function(req, res) {});

module.exports = router;
