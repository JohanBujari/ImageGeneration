import React from "react";
import { downloadImage } from "../utils";
import Card from "react-bootstrap/Card";

const Cardd = ({ _id, name, prompt, photo, handleDelete }) => {

   

  return (
    <div style={{ padding: "21px" }}>
      <Card style={{ width: "18rem", height: "600px", borderRadius: "20px" }}>
        <Card.Img
          style={{ borderRadius: "10px" }}
          variant="top"
          src={photo}
          alt={prompt}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{prompt}</Card.Text>
        </Card.Body>

        <Card.Body></Card.Body>
        <Card.Footer>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              downloadImage(_id, photo);
            }}
          >
            Download
          </button>
          <button style={{marginLeft:"10px"}} onClick={handleDelete}   type="button" className="btn btn-danger">
            Delete
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Cardd;
