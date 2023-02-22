import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import Logout from "./Logout";
const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleCreateImage = () => {
    if (!username) {
      handleShow();
    } else {
      navigate("/create-post");
    }
  };
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");
  return (
    <div>
      <Modal
        style={{ marginLeft: "940px", marginTop: "100px", width: "400px" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Authnetication required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Link
              onClick={handleClose}
              style={{ textDecoration: "none" }}
              className="btn btn-dark"
              to="/login"
            >
              Log in
            </Link>
            <Link
              onClick={handleClose}
              style={{ textDecoration: "none" }}
              className="btn btn-dark"
              to="/register"
            >
              Register
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {!username ? (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "0.5px solid lightgray",
            padding: "30px",
            backgroundColor: "lightgray",
          }}
        >
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZVzRVYa0oolYF_lzPxDyi50H76pd3GDlzQ&usqp=CAU"
              style={{
                width: "170px",
                height: "120px",
                borderRadius: "10px",
              }}
            />
            <Link
              to="/"
              style={{
                fontSize: "60px",
                textDecoration: "none",
                color: "black",
                fontFamily: "sans-serif",
                marginLeft: "20px",
              }}
            >
              <strong>ImageAI</strong>
            </Link>
            <div>
              <p
                style={{
                  marginLeft: "360px",
                  marginTop: "-45px",
                  color: "gray",
                }}
              >
                OpenAI
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              height: "90px",
            }}
          >
            <button
              onClick={handleCreateImage}
              style={{ textDecoration: "none", marginTop: "50px" }}
              className="btn btn-outline-dark"
            >
              Create Image
            </button>

            <>
              {" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  marginTop: "50px",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                Log in
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  marginTop: "50px",
                  color: "black",
                  fontSize: "20px",
                  fontStyle: "bold",
                }}
              >
                <strong>Register</strong>
              </Link>
            </>
          </div>
        </header>
      ) : (
        username && (
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "0.5px solid lightgray",
              padding: "25px",
              backgroundColor: "lightgray",
            }}
          >
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZVzRVYa0oolYF_lzPxDyi50H76pd3GDlzQ&usqp=CAU"
                style={{
                  width: "170px",
                  height: "130px",
                  borderRadius: "10px",
                }}
              />
              <Link
                to="/"
                style={{
                  fontSize: "60px",
                  textDecoration: "none",
                  color: "black",
                  fontFamily: "sans-serif",
                  marginLeft: "20px",
                }}
              >
                <strong>ImageAI</strong>
              </Link>
              <div>
              <p
                style={{
                  marginLeft: "360px",
                  marginTop: "-45px",
                  color: "gray",
                }}
              >
                OpenAI
              </p>
            </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                height: "90px",
              }}
            >
              <Link
                to="/create-post"
                style={{ textDecoration: "none", marginTop: "50px" }}
                className="btn btn-outline-dark"
              >
                Create Image
              </Link>

              <>
                <Dropdown style={{ marginTop: "50px" }}>
                  <Dropdown.Toggle
                    className="bg-dark"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                    }}
                    variant="primary"
                    id="dropdown-basic"
                  >
                    Welcome {username.toLocaleUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={`/profile/${id}`}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Logout />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            </div>
          </header>
        )
      )}
    </div>
  );
};

export default Navbar;
