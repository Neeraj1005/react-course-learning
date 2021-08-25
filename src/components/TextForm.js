import React, { useState } from "react";

export default function Form(props) {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    // navigator is efficient to copy the text
    // const copyText = document.getElementById("texareaBox");
    // copyText.select();
    // navigator.clipboard.writeText(copyText.value);
    navigator.clipboard.writeText(text);
    // document.getSelection().removeAllRanges();
    props.showAlert("Text Copied", "success");
  };

  const removeExtraSpaces = () => {
    const newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaced Removed", "success");
  };
  return (
    <div className="container mt-2">
      <div className="mb-3">
        <h3
          htmlFor="texareaBox"
          className={`form-label text-${
            props.mode === "light" ? "gray" : "white"
          }`}
        >
          {props.heading}
        </h3>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="texareaBox"
          rows="3"
          style={{
            backgroundColor: props.mode === "dark" ? "#13466e" : "white",
            color: props.mode === "dark" ? "white" : "#042743",
          }}
        ></textarea>
      </div>
      <div className="col-12">
        <button
          disabled={text.length === 0}
          type="submit"
          className="btn btn-primary m-2 my-1"
          onClick={() => {
            setText(text.toUpperCase());
            props.showAlert("CONVERTED To UPPERCASE", "info");
          }}
        >
          UPPERCASE
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          className="btn btn-primary m-2 my-1"
          onClick={() => {
            setText(text.toLowerCase());
            props.showAlert("converted to lowercase", "info");
          }}
        >
          lowercase
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          className="btn btn-primary m-2 my-1"
          onClick={() => {
            setText("");
            props.showAlert("cleared", "warning");
          }}
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          className="btn btn-primary m-2 my-1"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          className="btn btn-primary m-2 my-1"
          onClick={removeExtraSpaces}
        >
          Remove Extra Spaces
        </button>
      </div>

      <div className={`text-${props.mode === "light" ? "gray" : "white"}`}>
        <h4>Summary</h4>
        <p>
          {text.split(/\s+/).filter((element) => element.length !== 0).length}{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => element.length !== 0)
              .length}{" "}
          Minutes read.
        </p>
        <h5>Preview</h5>
        <p>{text.length > 0 ? text : "Nothing To Preview"}</p>
      </div>
    </div>
  );
}
