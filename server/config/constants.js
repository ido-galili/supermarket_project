const responseConstants = {
  INVALID_EMAIL: "Invalid Email",
  USER_EXISTS: "User already registerd. please go to login.",
  INVALID_PASSWORD: "Password must be at least 6 characters long.",

  SUCCESS_CODE: "SUCCESS",
  ERROR_CODE: "ERROR",
  MISSING_PARAMS: "MISSING_PARAMS",

  SERVER_ERROR_TITLE: "Server connection error",
  SERVER_ERROR_MESSAGE: "Please try again.",

  ROLE_ADMIN: 1,
  ROLE_CUSTOMER: 2,

  SERVER_ERROR_OBJECT: {
    error: "ERROR",
    title: "Server connection error",
    message: "Please try again."
  }
};

module.exports = responseConstants;
