const express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  withAuth = require("../middleware/auth"),
  User = require("../models/User.js"),
  responseConstants = require("../config/constants"),
  validator = require("validator"),
  SECRET = "thisismysecret@dsad12sd!@";

// GET route - check if

router.post("/check-credentials", function(req, res) {
  const { idNumber, email, password } = req.body;

  let errors = [];
  let missingParams = [];

  // Checks if user already registered
  User.findOne({ $or: [{ idNumber: idNumber }, { email: email }] }, function(
    err,
    user
  ) {
    console.log("check-credentials findOne", user);
    if (err) {
      return res.status(200).send({
        error: responseConstants.ERROR_CODE,
        title: responseConstants.SERVER_ERROR_TITLE,
        message: responseConstants.SERVER_ERROR_MESSAGE
      });
    }

    if (user) {
      errors.push(responseConstants.USER_EXISTS);
      console.log("errors", errors);
    }

    if (!idNumber) {
      missingParams.push("idNumber");
    }

    if (!email) {
      missingParams.push("email");
    } else if (!validator.isEmail(email)) {
      errors.push(responseConstants.INVALID_EMAIL);
    }

    if (!password) {
      missingParams.push("password");
    } else if (password.length < 6) {
      errors.push(responseConstants.INVALID_PASSWORD);
    }

    if (missingParams.length > 0) {
      return res.status(200).json({
        code: responseConstants.MISSING_PARAMS,
        title: "Missing Parameters",
        message: "Please fill all required fields.",
        required: missingParams
      });
    } else if (errors.length > 0) {
      return res.status(200).json({
        code: responseConstants.ERROR_CODE,
        title: "Error",
        message: errors.join(". ")
      });
    } else {
      return res.status(200).json({
        code: responseConstants.SUCCESS_CODE
      });
    }
  });
});

// POST route to register a user
router.post("/register", function(req, res) {
  const { idNumber, email } = req.body;
  console.log("register body", req.body);

  User.findOne({ $or: [{ idNumber: idNumber }, { email: email }] }, function(
    err,
    user
  ) {
    console.log("idNumber REGISTER", idNumber);
    console.log("user REGISTER", user);
    if (err) {
      console.log("Auth register error", err);
      return res.status(200).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      const user = new User(req.body);
      console.log("USER", user);
      user.save(function(err) {
        if (err) {
          console.log("USER SAVE Error", err);
          return res.status(200).json({
            error: responseConstants.ERROR_CODE,
            title: responseConstants.SERVER_ERROR_TITLE,
            message: responseConstants.SERVER_ERROR_MESSAGE
          });
        } else {
          return res.status(200).json({
            code: responseConstants.SUCCESS_CODE,
            title: "Welcome!",
            message: "Jump in and start shopping"
          });
        }
      });
    } else {
      return res.status(200).json({
        code: responseConstants.ERROR_CODE,
        title: "Error",
        message: responseConstants.USER_EXISTS
      });
    }
  });
});

router.post("/login", function(req, res) {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(200).json({
      error: responseConstants.ERROR_CODE,
      title: "Email invalid.",
      message: "Please enter a valid email address."
    });
  }

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      console.error(err);
      return res.status(200).json({
        error: responseConstants.ERROR_CODE,
        title: responseConstants.SERVER_ERROR_TITLE,
        message: responseConstants.SERVER_ERROR_MESSAGE
      });
    } else if (!user) {
      return res.status(200).json({
        error: responseConstants.ERROR_CODE,
        title: "User not registered.",
        message: "Please register first."
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          return res.status(200).json({
            error: responseConstants.ERROR_CODE,
            title: responseConstants.SERVER_ERROR_TITLE,
            message: responseConstants.SERVER_ERROR_MESSAGE
          });
        } else if (!same) {
          return res.status(200).json({
            error: responseConstants.ERROR_CODE,
            title: "Credentials error",
            message: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { 
            email: user.email, 
            admin: user.role === 1 
          };
          console.log("payload", payload);
          const token = jwt.sign(payload, SECRET, {
            expiresIn: "5h"
          });
          req.session.token = token;

          return res
            .cookie("token", token, { maxAge: 9000000, httpOnly: true })
            .status(200)
            .json({
              code: responseConstants.SUCCESS_CODE,
              message: "User logged in!",
              user: user
            });
        }
      });
    }
  });
});

router.get("/checkToken", withAuth, function(req, res) {
  return res.status(200).json({ code: responseConstants.SUCCESS_CODE });
});

module.exports = router;
