const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "#learnreact";

const router = express.Router();

// create a user using: POST "api/auth/register". Register User
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
      // encypt the password using salt bcrypt method
      const salt = await bcrypt.genSalt(10);
      var secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // generate token and send
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({
        status: 200,
        message: "success",
        username: user.name,
        token: authtoken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Login a user using: POST "api/auth/login". Login User
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password")
      .exists()
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  async (req, res) => {
    // validation error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.json({
          error: "please try to login with correct credentials",
        });
      }

      // if above all true send token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({
        status: 200,
        token: authtoken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get logged user details using: POST "api/auth/getuser". Authentication Required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
