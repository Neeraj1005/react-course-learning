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
      // destructuring the object
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

// PUT/PATCH: update notes "/api/notes/update". Login Required
router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    // destructuring the object
    const { title, description, tag } = req.body;

    // create a newnote object
    const newNoteObject = {};

    if(title){newNoteObject.title = title}
    if(description){newNoteObject.description = description}
    if(tag){newNoteObject.tag = tag}

    // Find a note to be udated or update it
    // First find Note by id is exist or Not
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    // check logged user id is match with note user_id
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("User Not Authorized") 
    }
    // Now if all true above update the note
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNoteObject}, {new:true})

    // return success response
    res.json({
      status: 200,
      data: note,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE: delete note "/api/notes/destroy". Login Required
router.delete("/destroy/:id", fetchUser, async (req, res) => {
  try {
    // Find a note to be delete and delete it
    // First find Note by id is exist or Not
    let note = await Note.findById(req.params.id);
    
    if(!note){
        return res.status(404).send("Not Found")
    }
    // check logged user id is match with note user_id
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("User Not Authorized") 
    }
    // Now if all true above delete the note
    note = await Note.findByIdAndDelete(req.params.id)

    // return success response
    res.json({
      status: 200,
      note: note,
      message: "Note has been successfully deleted"
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
