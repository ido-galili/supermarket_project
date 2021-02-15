const express = require("express"),
  router = express.Router(),
  Category = require("../../models/Category"),
  responseConstants = require("../../config/constants");

router
  .route("/")
  /**
   * @swagger
   * /api/store/categories:
   *    get: return all products categories
   */
  .get(function(req, res) {
    Category.find(function(err, categories) {
      if (err) {
        console.log("Category find error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        items: categories
      });
    });
  })
  /**
   * @swagger
   * /api/store/categories:
   *    post:
   *      description: insert a new category
   *      params:
   *        test - number
   *
   */
  .post(function(req, res) {
    const category = new Category(req.body);

    category.save(function(err) {
      if (err) {
        console.log("category save", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      } else {
        res.status(201).json({
          code: responseConstants.SUCCESS_CODE,
          item: category
        });
      }
    });
  });

router
  .route("/:id")
  /**
   * @swagger
   * /api/store/categories/<category-id>:
   *    get:
   *      description: return category by Id
   */
  .get(function(req, res) {
    Category.findById(req.params.id, function(err, category) {
      if (err) {
        console.log("Get category by id Error", err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: category
      });
    });
  })
  /**
   * @swagger
   * /users:
   *    get:
   *      description: This should return all users
   */
  .put(function(req, res) {
    const { _id } = req.params;

    Category.findByIdAndUpdate(_id, req.body, { new: true }, function(
      err,
      category
    ) {
      if (err) {
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: category
      });
    });
  })
  /**
   * @swagger
   * /users:
   *    get:
   *      description: This should return all users
   */
  .delete(function(req, res) {
    const { _id } = req.params;

    Category.findByIdAndRemove(_id, function(err, category) {
      if (err) {
        console.log(err);
        return res.status(200).json({
          ...responseConstants.SERVER_ERROR_OBJECT
        });
      }

      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE,
        item: category
      });
    });
  });

module.exports = router;
