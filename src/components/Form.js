import React, { useState } from "react";

export default function Form() {
  const [text, setText] = useState("Enter Text Here");

  const handleOnChange = (e) => {
      console.log(e.target.value)
    setText(e.target.value)
  }
  return (
    <>
      <div className="mb-3">
        <label htmlFor="texareaBox" className="form-label">
          Enter Text Here
        </label>
        <textarea className="form-control" value={text} onChange={handleOnChange} id="texareaBox" rows="3"></textarea>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary" onClick={() => setText(text.toUpperCase())}>
          Change To UpperCase
        </button>
        <button type="submit" className="btn btn-secondary m-2" onClick={() => setText(text.toLowerCase())}>
          Change To UpperCase
        </button>
      </div>
    </>
  );
}
