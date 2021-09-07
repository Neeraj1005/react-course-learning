import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteInitials = [];

  const [notes, setNotes] = useState(noteInitials);

  // Add a note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    const note = {
      _id: "1",
      user: "6134505b1e13f01258f61e7b",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-05T07:32:25.493Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // // Delete a note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log('note deleted ' + id)
    const newNote = notes.filter((note) => {return note._id !== id})
    setNotes(newNote);
  };

  // // Edit a note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
