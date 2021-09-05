const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// GET: get all the notes "/api/notes/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// POST: store notes "/api/notes/store". Login Required
router.post(
  "/store",
  fetchUser,
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  async (req, res) => {
    try {
      // destructuring the objec
      const { title, description, tag } = req.body;

      // validation error check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Notes object create
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // save note to database
      const savedNote = await note.save();

      // return success response
      res.json({
        status: 200,
        data: savedNote,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
