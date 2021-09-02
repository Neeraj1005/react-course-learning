const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// create a user using: POST "api/auth". Doesn't require AUTH
router.post(
  "/",
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("must be at least 4 chars long"),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        res.json({
          error: 'please enter unique values for email',
          message: err.message
        });
      });
  }
);

module.exports = router;
