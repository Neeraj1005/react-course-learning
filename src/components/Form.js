import React, { useState } from "react";

export default function Form() {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    const copyText = document.getElementById("texareaBox");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const removeExtraSpaces = () => {
    const newText = text.split(/[ ]+/)
    setText(newText.join(" "))
  }
  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="texareaBox" className="form-label">
          Enter Text Here
        </label>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="texareaBox"
          rows="3"
        ></textarea>
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => setText(text.toUpperCase())}
        >
          UPPERCASE
        </button>
        <button
          type="submit"
          className="btn btn-secondary m-2"
          onClick={() => setText(text.toLowerCase())}
        >
          lowercase
        </button>
        <button
          type="submit"
          className="btn btn-secondary m-2"
          onClick={() => setText("")}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-secondary m-2"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          type="submit"
          className="btn btn-secondary m-2"
          onClick={removeExtraSpaces}
        >
          Remove Extra Spaces
        </button>
      </div>

      <div>
        <h1>Summary</h1>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{Math.floor(0.008 * text.split(" ").length)} Minutes read.</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
