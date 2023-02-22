import React from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = (props) => {
  const { name, onChangeHandler, value, placeholder, type } = props;

  return (
    <div style={{width:"300px", margin:"auto",marginTop:"30px"}}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={onChangeHandler}
        />
      </InputGroup>
    </div>
  );
};

export default UserForm;
