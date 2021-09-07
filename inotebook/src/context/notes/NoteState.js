import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDUwNWIxZTEzZjAxMjU4ZjYxZTdiIn0sImlhdCI6MTYzMDgyNTMwNH0.HyDERyG2Xo2d3B46ljSMpPPlJSlgoRmqvhuDn202P2k",
      },
      body: JSON.stringify({ title, description, tag }),
    });
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

  // Get All Notes
  const fetchAllNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDUwNWIxZTEzZjAxMjU4ZjYxZTdiIn0sImlhdCI6MTYzMDgyNTMwNH0.HyDERyG2Xo2d3B46ljSMpPPlJSlgoRmqvhuDn202P2k",
      },
    });

    const json = await response.json();
    
    setNotes(json);
  };

  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDUwNWIxZTEzZjAxMjU4ZjYxZTdiIn0sImlhdCI6MTYzMDgyNTMwNH0.HyDERyG2Xo2d3B46ljSMpPPlJSlgoRmqvhuDn202P2k",
      },
    });
    const json = await response.json()
    if (json.status === 200) {
      const newNote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNote);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(
      `${host}/api/notes/update/613472899281408dd0c95aeb`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDUwNWIxZTEzZjAxMjU4ZjYxZTdiIn0sImlhdCI6MTYzMDgyNTMwNH0.HyDERyG2Xo2d3B46ljSMpPPlJSlgoRmqvhuDn202P2k",
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
