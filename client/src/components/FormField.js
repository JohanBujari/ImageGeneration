import React from "react";
import { Form } from "react-router-dom";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  searchText,
}) =>
{
  return (
    <div>
      <div style={{ position: "relative" }}>
        <label htmlFor={name} style={{ fontSize: "20px", marginLeft: "35px" }}>
          {labelName}
        </label>
      </div>
      <div
        class="input-group mb-3"
        style={{ width: isSurpriseMe ? "500px" : "300px" }}
      >
        <input
          type="text"
          class="form-control"
          placeholder={
            isSurpriseMe
              ? "Enter your prompt"
              : searchText
              ? "Search posts"
              : null
          }
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          id={name}
          name={name}
          value={value}
          onChange={ handleChange}
          required
          style={{ marginLeft: "35px" }}
         
        />
        {isSurpriseMe && (
          <button
            onClick={handleSurpriseMe}
            class="btn btn-outline-dark"
            type="button"
            id="button-addon2"
          >
            Surprise me
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
