import React, { useState } from "react";

export default function Form(props) {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    const copyText = document.getElementById("texareaBox");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    props.showAlert('Text Copied','success')
  };

  const removeExtraSpaces = () => {
    const newText = text.split(/[ ]+/)
    setText(newText.join(" "))
    props.showAlert('Extra Spaced Removed','success')
  }
  return (
    <div className="container">
      <div className="mb-3">
        <h3 htmlFor="texareaBox" className={`form-label text-${props.mode === 'light' ? 'gray' : 'white'}`}>
          Enter Text Here
        </h3>
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
          onClick={() => {
            setText(text.toUpperCase())
            props.showAlert('CONVERTED To UPPERCASE','info')
          }}
        >
          UPPERCASE
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => {
            setText(text.toLowerCase())
            props.showAlert('converted to lowercase','info')
          }}
        >
          lowercase
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => {
            setText("")
            props.showAlert('cleared','warning')
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={removeExtraSpaces}
        >
          Remove Extra Spaces
        </button>
      </div>

      <div className={`text-${props.mode === 'light' ? 'gray' : 'white'}`}>
        <h4>Summary</h4>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{Math.floor(0.008 * text.split(" ").length)} Minutes read.</p>
        <h5>Preview</h5>
        <p>{text.length > 0 ? text : 'Enter Some Text For Preview'}</p>
      </div>
    </div>
  );
}
