import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("http://localhost:8080/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          marginLeft: "-5px",
        }}
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
