import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Nick",
    age: "25",
  };

  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        name: "Larry",
        age: "26",
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
