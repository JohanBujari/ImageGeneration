import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";
import Alert from "react-bootstrap/Alert";

const UserLogin = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/login",
        {
          ...user,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUser(res.data.user);
        console.log(res);
        localStorage.setItem("username", res.data.user.firstName);
        localStorage.setItem("id", res.data.user._id);
        navigate("/create-post");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h3
          style={{
            textAlign: "center",
            marginLeft: "-220px",
            marginTop: "30px",
          }}
        >
          Log in
        </h3>
        {errors && (
          <div>
            <Alert
              style={{ width: "300px", marginLeft: "617px", height: "60px" }}
              show={show}
              variant="danger"
            >
              <p>
                {errors ? errors.messageFields || errors.messagePass : null}
              </p>
            </Alert>
          </div>
        )}
        <p style={{ color: "red" }}></p>
        <UserForm
          placeholder="Email"
          onChangeHandler={onChangeHandler}
          value={user.email}
          name="email"
        />
        <UserForm
          placeholder="Password"
          onChangeHandler={onChangeHandler}
          value={user.password}
          name="password"
          type="password"
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button style={{ marginLeft: "620px" }} className="btn btn-dark">
            Login
          </button>

          <Link
            style={{ color: "black", marginLeft: "35px", marginTop: "13px" }}
            to={"/register"}
          >
            Not an account? Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
