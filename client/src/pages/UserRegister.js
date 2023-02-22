import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";
import Alert from "react-bootstrap/Alert";


const UserRegister = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow]= useState(true);
  const [errors, setErrors] = useState("");
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
        "http://localhost:8080/api/register",
        {
          ...user,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUser(res.data.user);
        console.log(res);
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data)
      });
  };
  return (
    <div>
      <form  onSubmit={onSubmitHandler}>
      <h3
          style={{
            textAlign: "center",
            marginLeft: "-200px",
            marginTop: "30px",
          }}
        >
          Register
        </h3>
        {errors && (
          <div>
            <Alert
              style={{ width: "300px", marginLeft: "617px", height: "60px" }}
              show={show}
              variant="danger"
            >
              <p>
                {errors ? errors.message : null}
              </p>
            </Alert>
          </div>
        )}
        <UserForm
          placeholder="First Name"
          onChangeHandler={onChangeHandler}
          value={user.firstName}
          name="firstName"
        />
        <UserForm
          placeholder="Last Name"
          onChangeHandler={onChangeHandler}
          value={user.lastName}
          name="lastName"
        />
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
        <UserForm
          placeholder="Confirm password"
          onChangeHandler={onChangeHandler}
          value={user.confirmPassword}
          name="confirmPassword"
          type="password"
        />
      <div style={{display:"flex", flexDirection:"row" }}>
           <button style={{ marginLeft: "620px" }} className="btn btn-dark">
          Register
        </button>
        
        <Link style={{color:"black", marginLeft:"26px", marginTop:"13px"}} to={'/login'}>Already an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
