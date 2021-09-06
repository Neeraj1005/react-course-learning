import React from "react";

const NoteItem = (props) => {
  const { title, description } = props.note;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i className="far fa-trash-alt mx-2"></i>
            <i className="far fa-edit mx-2"></i>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
