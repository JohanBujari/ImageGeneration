import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import moment from "moment";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/profile/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        setForm(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditAndSave = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/user-edit/${id}`,
        {
          ...form,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setUser(res.data.updatedUser);
        localStorage.setItem("username", res.data.updatedUser.firstName);
        navigate(0)
        setIsEditing(false);
      });
  };

  return (
    <div>
      <Card
        style={{
          margin: "auto",
          width: "400px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <Card.Img
          variant="top"
          src="data:image/jpeg;base64,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"
          style={{
            width: "170px",
            marginTop: "20px",
            margin: "auto",
            borderRadius: "50%",
          }}
        />
        <button
          className="btn btn-success"
          style={{ borderRadius: "20px" }}
          onClick={handleEdit}
        >
          Edit profile
        </button>

        <Card.Body>
          <Card.Title style={{ marginLeft: "15px" }}>
            <strong>Your Profile</strong>
          </Card.Title>
          {!isEditing ? (
            <Card.Text>
              <ListGroup variant="flush" style={{ fontFamily: "sans-serif" }}>
                <ListGroup.Item>First Name: {user.firstName}</ListGroup.Item>
                <ListGroup.Item>Last Name : {user.lastName}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                <ListGroup.Item>
                  Joined: {moment(user.createdAt).format("MMM Do YY")}
                </ListGroup.Item>
                <ListGroup.Item>
                  Last updated: {moment(user.updatedAt).format("MMM Do YY")}
                </ListGroup.Item>
              </ListGroup>
            </Card.Text>
          ) : (
            <ListGroup variant="flush" style={{ fontFamily: "sans-serif" }}>
              <ListGroup.Item>
                {" "}
                First Name
                <input
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    marginLeft: "20px",
                  }}
                  name="firstName"
                  htmlFor="username"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Last Name
                <input
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    marginLeft: "20px",
                  }}
                  name="lastName"
                  htmlFor="lastname"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Email
                <input
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    marginLeft: "58px",
                  }}
                  name="email"
                  htmlFor="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </ListGroup.Item>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginLeft: "150px",
                  height: "55px",
                  width: "700px",
                  padding: "10px",
                }}
              >
                <button className="btn btn-dark" onClick={handleEditAndSave}>
                  Save changes
                </button>
                <button className="btn btn-dark" onClick={handleCancel}>
                  Cancel
                </button>
              </div>

              <ListGroup.Item>
                Joined: {moment(user.createdAt).format("MMM Do YY")}
              </ListGroup.Item>
              <ListGroup.Item>
                Last updated: {moment(user.updatedAt).format("MMM Do YY")}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
