const express = require("express");
const userControl = require("../controllers/userController.js");
const { body, validationResult } = require("express-validator");
const { login, createUser, getUser,updateUser } = userControl;
const router = express.Router();

router.post(
  "/createuser",
  [
    body("username", "Username must be 4 characters long.").isLength({
      min: 4,
    }),
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password should be atleast 5 characters long."),
    body(
      "first_name",
      "First name must be atleast 2 characters long."
    ).isLength({ min: 2 }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("username", "Username canot be empty.").exists(),
    body("password", "Password cannot be blank.").exists(),
  ],
  login
);

router.post(
  "/getuser",
  [
    body("username", "Username canot be empty.").exists(),
  ],
  getUser
);

router.post("/update",[
  body("username", "Username must be 4 characters long.").isLength({
    min: 4,
  }),
  body("email", "Please enter a valid email.").isEmail(),
  body("password", "Password should be atleast 5 characters long."),
  body(
    "first_name",
    "First name must be atleast 2 characters long."
  ).isLength({ min: 2 }),
],updateUser)

module.exports = router;
