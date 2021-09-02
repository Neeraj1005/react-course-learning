const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// create a user using: POST "api/auth". Register User
router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("must be at least 4 chars long"),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  async (req, res) => {
    // validation error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check user email is already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    try {
      user = await Userd.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({
        status: 200,
        message: "success",
        username: user.name,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error Occured");
    }
  }
);

module.exports = router;
