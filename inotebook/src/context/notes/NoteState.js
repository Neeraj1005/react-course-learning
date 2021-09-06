import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const note = [
    {
      id: "1",
      user: "6134505b1e13f01258f61e7b",
      title: "My First Note on web",
      description: "THis is my first note description",
      tag: "react",
      date: "2021-09-05T07:32:25.493Z",
      __v: 0,
    },
    {
      id: "2",
      user: "6134505b1e13f01258f61e7b",
      title: "My Second Note on web",
      description: "THis is my first note description",
      tag: "youtube",
      date: "2021-09-05T07:32:25.493Z",
      __v: 0,
    },
    {
      id: "3",
      user: "6134505b1e13f01258f61e7b",
      title: "My third Note on web",
      description: "THis is my first note description",
      tag: "helo world",
      date: "2021-09-05T07:32:25.493Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(note);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
